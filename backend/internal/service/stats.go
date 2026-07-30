package service

import (
	"context"
	"slices"
	"strconv"
	"strings"
	"time"
	"unicode"
	"unicode/utf8"

	"github.com/amarnathcjd/gogram/telegram"
	"github.com/netrabbit-off/ZyncGram/backend/internal/repository/redis"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/dictionary"
)

type StatsService struct {
	repo *redis.RedisClient
}

func NewStatsService(repo *redis.RedisClient) *StatsService {
	return &StatsService{repo: repo}
}

func (s *StatsService) ProcessMessage(message *telegram.NewMessage) error {
	ctx := context.Background()
	messageText := message.Text()
	date := time.Now().Format("2006-01-02")

	// Пополняем статистику
	if err := s.repo.Incr(ctx, "stats:day:"+date+":total"); err != nil {
		return err
	}

	// Пополняем статистику в зависимости от типа
	if message.IsMedia() {
		if err := s.repo.Incr(ctx, "stats:day:"+date+":media"); err != nil {
			return err
		}
	}
	if message.IsPrivate() {
		if err := s.repo.Incr(ctx, "stats:day:"+date+":private"); err != nil {
			return err
		}
	}

	// Пополняем статистику по количеству сообщений
	if err := s.repo.Incr(ctx, "stats:total"); err != nil {
		return err
	}

	// Пополняем статистику по количеству слов
	if err := s.repo.IncrBy(ctx, "words:total", int64(len(strings.Fields(messageText)))); err != nil {
		return err
	}

	// Анализируем только свои тексты
	if !message.IsForward() {
		return s.UpdateWordsTop(messageText)
	} else {
		return nil
	}
}

func (s *StatsService) UpdateWordsTop(messageText string) error {
	ctx := context.Background()

	for _, word := range strings.Fields(messageText) {
		// Нормализация
		word = strings.ToLower(word)
		word = strings.TrimFunc(word, func(r rune) bool {
			return !unicode.IsLetter(r)
		})

		// Удаление повторяющихся подряд символов
		var builder strings.Builder
		var prev rune
		for i, r := range word {
			if i == 0 || r != prev {
				builder.WriteRune(r)
			}
			prev = r
		}
		word = builder.String()

		if word == "" {
			continue
		}

		// Учитываем только слова больше 3 символов
		if utf8.RuneCountInString(word) < 3 {
			continue
		}

		// Есть ли смысл учитывать это слово
		if dictionary.IgnoredWords[word] {
			continue
		}

		// Пополняем топ
		if err := s.repo.Client.ZIncrBy(ctx, "words:top:total", 1, word).Err(); err != nil {
			return err
		}

		// Если мат => пополняем статистику мата
		if dictionary.CensoredWords[word] {
			if err := s.repo.IncrBy(ctx, "words:uncensored", 1); err != nil {
				return err
			}
		}
	}

	return s.repo.Client.ZRemRangeByRank(ctx, "words:top:total", 0, -50001).Err()
}

func (s *StatsService) GetWeekStatistic(ctx context.Context) ([]int, error) {
	weekStats := []int{}
	date := time.Now()
	for i := range 7 {
		value, err := s.repo.Client.Get(
			ctx,
			"stats:day:"+date.Add(-time.Duration(i)*24*time.Hour).Format("2006-01-02")+":total",
		).Result()

		if err != nil {
			weekStats = append(weekStats, 0)
			continue
		}

		res, err := strconv.Atoi(value)
		if err != nil {
			return nil, err
		}

		weekStats = append(weekStats, res)
	}
	slices.Reverse(weekStats)

	return weekStats, nil
}

func (s *StatsService) GetWordsTop(ctx context.Context) (map[string]int, error) {
	wordsTop := map[string]int{}
	z, err := s.repo.Client.ZRevRangeWithScores(ctx, "words:top:total", 0, 29).Result()
	if err != nil {
		return nil, err
	}

	for _, i := range z {
		wordsTop[i.Member.(string)] = int(i.Score)
	}

	return wordsTop, nil
}

func (s *StatsService) GetTotalStats(ctx context.Context) (int, int, int, error) {
	value, err := s.repo.Client.Get(ctx, "stats:total").Result()
	if err != nil {
		return 0, 0, 0, err
	}
	totalMessages, err := strconv.Atoi(value)
	if err != nil {
		return 0, 0, 0, err
	}

	value, err = s.repo.Client.Get(ctx, "words:total").Result()
	if err != nil {
		return 0, 0, 0, err
	}
	totalWords, err := strconv.Atoi(value)
	if err != nil {
		return 0, 0, 0, err
	}

	value, err = s.repo.Client.Get(ctx, "words:uncensored").Result()
	if err != nil {
		return 0, 0, 0, err
	}
	uncensoredWords, err := strconv.Atoi(value)
	if err != nil {
		return 0, 0, 0, err
	}

	return totalMessages, totalWords, uncensoredWords, nil
}
