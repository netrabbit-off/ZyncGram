package bot

import (
	"fmt"
	"math/rand/v2"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/amarnathcjd/gogram/telegram"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/dictionary"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/utils"
)

func (c *Client) PingHandler(message *telegram.NewMessage) error {
	message.Reply("<b>Pong</b>")

	return nil
}

func (c *Client) PlaneHandler(message *telegram.NewMessage) error {
	plane := "🛫"
	c.Edit(message, "."+strings.Repeat(" ", 44)+"🏬") // Первый кадр - пустота и здание в конце
	for i := range 23 {                              // Анимация полета
		// Перемещение самолета на 2 клетки за кадр && пауза 300мс
		c.Edit(message, "."+strings.Repeat(" ", i*2)+plane+strings.Repeat(" ", 45-i*2)+"🏬")
		time.Sleep(300 * time.Millisecond)
	}
	c.Edit(message, "🔥")

	return nil
}

func (c *Client) LoveHandler(message *telegram.NewMessage) error {
	heart1 := "◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️\n" +
		"◻️◻️🟥🟥🟥◻️🟥🟥🟥◻️◻️\n" +
		"◻️🟥🟥🟥🟥🟥🟥🟥🟥🟥◻️\n" +
		"◻️🟥🟥🟥🟥🟥🟥🟥🟥🟥◻️\n" +
		"◻️◻️🟥🟥🟥🟥🟥🟥🟥◻️◻️\n" +
		"◻️◻️◻️🟥🟥🟥🟥🟥◻️◻️◻️\n" +
		"◻️◻️◻️◻️🟥🟥🟥◻️◻️◻️◻️\n" +
		"◻️◻️◻️◻️◻️🟥◻️◻️◻️◻️◻️\n" +
		"◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️"

	heart2 := "◻️🟥🟥🟥◻️◻️◻️🟥🟥🟥◻️\n" +
		"🟥🟥🟥🟥🟥◻️🟥🟥🟥🟥🟥\n" +
		"🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n" +
		"🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n" +
		"◻️🟥🟥🟥🟥🟥🟥🟥🟥🟥◻️\n" +
		"◻️◻️🟥🟥🟥🟥🟥🟥🟥◻️◻️\n" +
		"◻️◻️◻️🟥🟥🟥🟥🟥◻️◻️◻️\n" +
		"◻️◻️◻️◻️🟥🟥🟥◻️◻️◻️◻️\n" +
		"◻️◻️◻️◻️◻️🟥◻️◻️◻️◻️◻️"

	for range 10 {
		c.Edit(message, heart1)
		time.Sleep(1300 * time.Millisecond)
		c.Edit(message, heart2)
		time.Sleep(1 * time.Second)
	}

	return nil
}

func (c *Client) InfoHandler(message *telegram.NewMessage) error {
	if !message.IsReply() {
		sender := message.Sender
		senderID := message.ChatID()
		if sender != nil {
			senderID = sender.ID
		}
		c.Edit(message, fmt.Sprintf(
			"<b>ChatID</b>: <code>%d</code>\n"+
				"<b>SenderID</b>: <code>%d</code>\n"+
				"<b>MessageID</b>: <code>%d</code>\n",
			message.ChatID(), senderID, message.ID,
		))
	} else {
		repMes, err := message.GetReplyMessage()
		if err != nil && repMes.ID != 0 {
			return err
		}

		c.Edit(message, fmt.Sprintf(
			"<b>ChatID</b>: <code>%d</code>\n"+
				"<b>SenderID</b>: <code>%d</code>\n"+
				"<b>MessageID</b>: <code>%d</code>\n"+
				"<b>Кол-во символов</b>: %d\n"+
				"<b>Кол-во абзацев</b>: %d\n"+
				"<b>Кол-во слов</b>: %d\n",
			message.ChatID(), repMes.Sender.ID, repMes.ID,
			len(repMes.Text()), len(strings.Split(repMes.Text(), "\n")), len(strings.Split(repMes.Text(), " ")),
		))
	}

	return nil
}

func (c *Client) LaughHandler(message *telegram.NewMessage) error {
	text := strings.ToLower(message.Text())
	// Сообщение определяется как смех, если
	// 1) количество уникальных символов не больше 4 (8 байт);
	// 2) есть хотя бы раз подряд Х и А
	if len(utils.UniqueCharacters(text)) <= 8 && (strings.Contains(text, "ах") || strings.Contains(text, "ха")) {
		for range 15 {
			res := ""
			for _, c := range text { // Случайная замена буквы на заглавную + выделение
				if rand.IntN(2) == 1 {
					res += "<b>" + strings.ToUpper(string(c)) + "</b>"
				} else {
					res += string(c)
				}
			}
			c.Edit(message, res)
			// Повтор через 800мс
			time.Sleep(800 * time.Millisecond)
		}
	}

	return nil
}

func (c *Client) AnimateHandler(message *telegram.NewMessage) error {
	mesText := message.Text()
	text := strings.ToLower(mesText)

	if strings.Contains(strings.Join([]string{"жиза", "имба", "база"}, ";"), text) {
		for range 3 {
			// Поочередная замена буквы на заглавную + выделение (по очереди слева направо)
			for i := range text {
				res := ""
				for j, c := range text {
					if i == j {
						res += "<b>" + strings.ToUpper(string(c)) + "</b>"
					} else {
						res += string(c)
					}
				}
				c.Edit(message, res)
				// Повтор каждые 800мс
				time.Sleep(800 * time.Millisecond)
			}
		}

		// "Моргание" сообщения с паузой 800мс
		for range 5 {
			c.Edit(message, "<b>"+strings.ToUpper(text)+"</b>")
			time.Sleep(800 * time.Millisecond)
			c.Edit(message, strings.ToLower(text))
			time.Sleep(800 * time.Millisecond)
		}

		// Возврат к первоначальному сообщению
		c.Edit(message, mesText)
	}

	return nil
}

func (c *Client) StatisticsHandler(message *telegram.NewMessage) error {
	chatID := message.ChatID()

	c.Edit(message, "<b>Извлекаю историю сообщений...</b>")

	messages, err := message.Client.GetMessages(chatID, &telegram.SearchOption{Limit: 5000})
	if err != nil {
		c.Edit(message, "❌ <b>Ошибка при получении истории:</b> <code>"+err.Error()+"</code>")
		return nil
	}

	c.Edit(message, "<b>Получено <i>"+strconv.Itoa(len(messages))+"</i> сообщений. Считаю слова...</b>")

	// Статистика
	userWordCount := make(map[int64]map[string]int)
	userTotalWords := make(map[int64]int)
	userCensoredWords := make(map[int64]int)
	userMsgCount := make(map[int64]int)
	userName := make(map[int64]string)
	var isMedia, isText int

	for _, msg := range messages {
		// Получаем ID отправителя
		var uid int64
		if msg.Sender != nil {
			uid = msg.Sender.ID
		} else {
			continue
		}

		// Инициализация пользователя
		if _, ok := userWordCount[uid]; !ok {
			userWordCount[uid] = make(map[string]int)
			// Получаем имя пользователя
			if msg.Sender.FirstName != "" {
				userName[uid] = msg.Sender.FirstName
			} else if msg.Sender.Username != "" {
				userName[uid] = msg.Sender.Username
			} else {
				userName[uid] = "Unknown"
			}
		}
		userMsgCount[uid]++

		// Определяем тип сообщения и текст
		var text string
		if msg.Media() != nil {
			isMedia++
			// Пробуем получить caption
			if captioner, ok := msg.Media().(interface{ Caption() string }); ok {
				text = captioner.Caption()
			}
		} else {
			isText++
			text = msg.Text()
		}

		if text == "" {
			continue
		}

		// Чистим текст
		text = strings.ToLower(text)
		// Разбиваем на слова
		words := strings.FieldsFunc(text, func(r rune) bool {
			return !((r >= 'a' && r <= 'z') || (r >= 'а' && r <= 'я') || r == '-')
		})

		for _, w := range words {
			w = strings.Trim(w, ".,!?;:()[]{}<>\"'`")
			if len(w) < 6 || dictionary.IgnoredWords[w] {
				continue
			}
			userWordCount[uid][w]++
			userTotalWords[uid]++

			if dictionary.CensoredWords[w] {
				userCensoredWords[uid]++
			}
		}
	}

	// Отправляем статистику по каждому пользователю
	for uid, words := range userWordCount {
		if len(words) == 0 {
			continue
		}

		// Сортируем слова по частоте
		type kv struct {
			Word  string
			Count int
		}
		var sortedWords []kv
		for k, v := range words {
			sortedWords = append(sortedWords, kv{k, v})
		}
		sort.Slice(sortedWords, func(i, j int) bool {
			return sortedWords[i].Count > sortedWords[j].Count
		})

		// Берем топ-30
		topList := ""
		for i := 0; i < len(sortedWords) && i < 30; i++ {
			topList += "<b>" + strconv.Itoa(i+1) + ".</b> <i>" + sortedWords[i].Word +
				" (" + strconv.Itoa(sortedWords[i].Count) + ")</i>\n"
		}

		percent := 0.0
		if userTotalWords[uid] > 0 {
			percent = float64(userCensoredWords[uid]) / float64(userTotalWords[uid]) * 100
		}

		answer := "<b>Статистика <code>" + userName[uid] + "</code></b>\n" +
			"<b>Сообщений:</b> <i>" + strconv.Itoa(userMsgCount[uid]) + "</i>\n" +
			"<b>Матов:</b> <i>" + strconv.Itoa(userCensoredWords[uid]) + "</i>" +
			" (<i>" + strconv.FormatFloat(percent, 'f', 2, 64) + "%</i>)\n\n" +
			"<b>Топ слов:</b>\n" + topList

		message.Client.SendMessage(chatID, answer)
		time.Sleep(500 * time.Millisecond)
	}

	// Удаляю сообщение со статусом получения истории
	message.Delete()

	// Отправляем общую статистику
	totalUsers := len(userMsgCount)
	msgCount := len(messages)

	totalMsgText := "сообщений"
	if msgCount%10 == 1 && msgCount%100 != 11 {
		totalMsgText = "сообщение"
	} else if msgCount%10 >= 2 && msgCount%10 <= 4 && (msgCount%100 < 10 || msgCount%100 >= 20) {
		totalMsgText = "сообщения"
	}

	overall := "<b>Общая статистика чата</b>\n\n" +
		"<b>Всего сообщений:</b> <i>" + strconv.Itoa(msgCount) + "</i> " + totalMsgText + "\n" +
		"<b>Медиа:</b> <i>" + strconv.Itoa(isMedia) + "</i>\n" +
		"<b>Текст:</b> <i>" + strconv.Itoa(isText) + "</i>\n" +
		"<b>Участников:</b> <i>" + strconv.Itoa(totalUsers) + "</i>"

	message.Client.SendMessage(chatID, overall)

	return nil
}

func (c *Client) ClownHandler(message *telegram.NewMessage) error {
	// Получаем отправителя, если nil => выходим
	sender := message.Sender
	if sender == nil {
		return nil
	}

	// Если нужный отправитель => ставим реакцию
	if sender.Username == c.cfg.Clown {
		message.React("🤡")
	}

	return nil
}

type AntiSpam struct {
	mu     sync.Mutex
	last   map[int64]time.Time
	client *telegram.Client
}

func NewAntiSpam(client *telegram.Client) *AntiSpam {
	return &AntiSpam{
		last:   make(map[int64]time.Time),
		client: client,
	}
}

func (a *AntiSpam) Handle(msg *telegram.NewMessage) error {
	// Только личные сообщения
	if !msg.IsPrivate() {
		return nil
	}

	// Не трогаем контакты
	if msg.Sender.Contact {
		return nil
	}

	uid := msg.Sender.ID
	// Не баним себя
	if uid == a.client.Me().ID {
		return nil
	}

	a.mu.Lock()
	defer a.mu.Unlock()

	now := time.Now()
	if last, ok := a.last[uid]; ok && now.Sub(last).Seconds() < 1.5 {
		peer := &telegram.InputPeerUser{
			UserID:     uid,
			AccessHash: msg.Sender.AccessHash,
		}
		_, err := a.client.ContactsBlock(false, peer)
		return err
	}
	a.last[uid] = now

	return nil
}
