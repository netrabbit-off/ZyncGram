package bot

import (
	"math/rand/v2"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/amarnathcjd/gogram/telegram"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/dictionary"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/utils"
)

func PingHandler(message *telegram.NewMessage) error {
	message.Reply("<b>Pong</b>")

	return nil
}

func PlaneHandler(message *telegram.NewMessage) error {
	plane := "🛫"
	message.Edit("." + strings.Repeat(" ", 44) + "🏬") // Первый кадр - пустота и здание в конце
	for i := range 23 {                               // Анимация полета
		// Перемещение самолета на 2 клетки за кадр && пауза 300мс
		message.Edit("." + strings.Repeat(" ", i*2) + plane + strings.Repeat(" ", 45-i*2) + "🏬")
		time.Sleep(300 * time.Millisecond)
	}
	message.Edit("🔥")

	return nil
}

func LoveHandler(message *telegram.NewMessage) error {
	heart1 := strings.Join([]string{
		"◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️",
		"◻️◻️🟥🟥🟥◻️🟥🟥🟥◻️◻️",
		"◻️🟥🟥🟥🟥🟥🟥🟥🟥🟥◻️",
		"◻️🟥🟥🟥🟥🟥🟥🟥🟥🟥◻️",
		"◻️◻️🟥🟥🟥🟥🟥🟥🟥◻️◻️",
		"◻️◻️◻️🟥🟥🟥🟥🟥◻️◻️◻️",
		"◻️◻️◻️◻️🟥🟥🟥◻️◻️◻️◻️",
		"◻️◻️◻️◻️◻️🟥◻️◻️◻️◻️◻️",
		"◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️◻️",
	}, "\n")

	heart2 := strings.Join([]string{
		"◻️🟥🟥🟥◻️◻️◻️🟥🟥🟥◻️",
		"🟥🟥🟥🟥🟥◻️🟥🟥🟥🟥🟥",
		"🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥",
		"🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥",
		"◻️🟥🟥🟥🟥🟥🟥🟥🟥🟥◻️",
		"◻️◻️🟥🟥🟥🟥🟥🟥🟥◻️◻️",
		"◻️◻️◻️🟥🟥🟥🟥🟥◻️◻️◻️",
		"◻️◻️◻️◻️🟥🟥🟥◻️◻️◻️◻️",
		"◻️◻️◻️◻️◻️🟥◻️◻️◻️◻️◻️",
	}, "\n")

	for range 10 {
		message.Edit(heart1)
		time.Sleep(1300 * time.Millisecond)
		message.Edit(heart2)
		time.Sleep(1 * time.Second)
	}

	return nil
}

func InfoHandler(message *telegram.NewMessage) error {
	if !message.IsReply() {
		sender := message.Sender
		senderID := message.ChatID()
		if sender != nil {
			senderID = sender.ID
		}
		message.Edit(strings.Join([]string{
			"<b>ChatID</b>: <code>" + strconv.FormatInt(message.ChatID(), 10) + "</code>",
			"<b>SenderID</b>: <code>" + strconv.FormatInt(senderID, 10) + "</code>",
			"<b>MessageID</b>: <code>" + strconv.FormatInt(int64(message.ID), 10) + "</code>\n",
		}, "\n"))
	} else {
		repMes, err := message.GetReplyMessage()
		if err != nil && repMes.ID != 0 {
			return err
		}

		message.Edit(strings.Join([]string{
			"<b>ChatID</b>: <code>" + strconv.FormatInt(repMes.ChatID(), 10) + "</code>",
			"<b>SenderID</b>: <code>" + strconv.FormatInt(repMes.Sender.ID, 10) + "</code>",
			"<b>MessageID</b>: <code>" + strconv.FormatInt(int64(repMes.ID), 10) + "</code>\n",
			"<b>Кол-во символов</b>: " + strconv.FormatInt(int64(len(repMes.Text())), 10),
			"<b>Кол-во абзацев</b>: " + strconv.FormatInt(int64(len(strings.Split(repMes.Text(), "\n"))), 10),
			"<b>Кол-во слов</b>: " + strconv.FormatInt(int64(len(strings.Split(repMes.Text(), " "))), 10),
		}, "\n"))
	}

	return nil
}

func LaughHandler(message *telegram.NewMessage) error {
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
			message.Edit(res)
			// Повтор через 800мс
			time.Sleep(800 * time.Millisecond)
		}
	}

	return nil
}

func AnimateHandler(message *telegram.NewMessage) error {
	mesText := message.Text()
	text := strings.ToLower(mesText)

	if strings.Contains(strings.Join([]string{"жиза", "имба", "база"}, ";"), text) {
		for range 10 {
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
				message.Edit(res)
				// Повтор каждые 800мс
				time.Sleep(800 * time.Millisecond)
			}
		}

		// "Моргание" сообщения с паузой 800мс
		for range 5 {
			message.Edit("<b>" + strings.ToUpper(text) + "</b>")
			time.Sleep(800 * time.Millisecond)
			message.Edit(strings.ToLower(text))
			time.Sleep(800 * time.Millisecond)
		}

		// Возврат к первоначальному сообщению
		message.Edit(mesText)
	}

	return nil
}

func StatisticsHandler(message *telegram.NewMessage) error {
	chatID := message.ChatID()

	statusMsg, _ := message.Reply("<b>Извлекаю историю сообщений...</b>")

	messages, err := message.Client.GetMessages(chatID, &telegram.SearchOption{Limit: 5000})
	if err != nil {
		message.Edit("❌ <b>Ошибка при получении истории:</b> <code>" + err.Error() + "</code>")
		return nil
	}

	message.Edit("<b>Получено <i>" + strconv.Itoa(len(messages)) + "</i> сообщений. Считаю слова...</b>")

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

	message.Client.DeleteMessages(chatID, []int32{statusMsg.ID, message.ID})

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
