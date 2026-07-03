package service

import (
	"context"
	"strings"
	"time"
	"unicode"
	"unicode/utf8"

	"github.com/netrabbit-off/ZyncGram/backend/internal/repository/redis"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/dictionary"
)

type StatsService struct {
	repo *redis.RedisClient
}

func NewService(repo *redis.RedisClient) *StatsService {
	return &StatsService{repo: repo}
}

func (s *StatsService) ProcessMessage(messageText string) error {
	ctx := context.Background()

	date := time.Now().Format("2006-01-02")
	if err := s.repo.Incr(ctx, "stats:day:"+date); err != nil {
		return err
	}
	if err := s.repo.Client.Expire(ctx, "stats:day:"+date, 8*24*time.Hour).Err(); err != nil {
		return err
	}

	if err := s.repo.Incr(ctx, "stats:total"); err != nil {
		return err
	}

	if err := s.repo.IncrBy(ctx, "words:total", int64(len(strings.Fields(messageText)))); err != nil {
		return err
	}

	return s.UpdateWordsTop(messageText)
}

func (s *StatsService) UpdateWordsTop(messageText string) error {
	ctx := context.Background()

	for _, word := range strings.Fields(messageText) {
		word = strings.ToLower(word)
		word = strings.TrimFunc(word, func(r rune) bool {
			return !unicode.IsLetter(r)
		})
		if word == "" {
			continue
		}

		if utf8.RuneCountInString(word) < 3 {
			continue
		}

		if dictionary.IgnoredWords[word] {
			continue
		}

		if err := s.repo.Client.ZIncrBy(ctx, "words:top:total", 1, word).Err(); err != nil {
			return err
		}
	}

	return s.repo.Client.ZRemRangeByRank(ctx, "words:top:total", 0, -50001).Err()
}
