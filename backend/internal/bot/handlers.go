package bot

import (
	"math/rand/v2"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/amarnathcjd/gogram/telegram"
)

func uniqueCharacters(input string) string {
	seen := make(map[rune]bool)
	var result strings.Builder

	for _, char := range input {
		if !seen[char] {
			seen[char] = true
			result.WriteRune(char)
		}
	}

	return result.String()
}

func PingHandler(message *telegram.NewMessage) error {
	message.Reply("<b>Pong</b>")

	return nil
}

func PlaneHandler(message *telegram.NewMessage) error {
	plane := "🛫"
	message.Edit("." + strings.Repeat(" ", 44) + "🏬")
	for i := range 23 {
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
		message.Edit(strings.Join([]string{
			"<b>ChatID</b>: <code>" + strconv.FormatInt(message.ChatID(), 10) + "</code>",
			"<b>SenderID</b>: <code>" + strconv.FormatInt(message.Sender.ID, 10) + "</code>",
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
	if len(uniqueCharacters(text)) <= 8 && (strings.Contains(text, "ах") || strings.Contains(text, "ха")) {
		for range 10 {
			res := ""
			for _, c := range text {
				if rand.IntN(2) == 1 {
					res += "<b>" + strings.ToUpper(string(c)) + "</b>"
				} else {
					res += string(c)
				}
			}
			message.Edit(res)
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
				time.Sleep(800 * time.Millisecond)
			}
		}
		for range 5 {
			message.Edit("<b>" + strings.ToUpper(text) + "</b>")
			time.Sleep(800 * time.Millisecond)
			message.Edit(strings.ToLower(text))
			time.Sleep(800 * time.Millisecond)
		}
		message.Edit(mesText)
	}
	return nil
}

var ignoredWords = map[string]bool{
	"кто": true, "кем": true, "чтоли": true, "чем": true, "тем": true,
	"как": true, "эта": true, "этот": true, "что-то": true, "что": true,
	"как-то": true, "как-нибудь": true, "нибудь": true, "она": true,
	"оно": true, "они": true, "это": true, "для": true, "или": true,
	"его": true, "который": true, "если": true, "без": true, "так": true,
	"также": true, "даже": true, "чтобы": true, "только": true, "при": true,
	"про": true, "еще": true, "ещё": true, "там": true, "уже": true,
	"всё": true, "все": true, "я": true, "меня": true, "мной": true,
	"мне": true, "вот": true, "когда": true, "тогда": true, "тот": true,
	"тут": true, "тоже": true, "раз": true, "где": true, "тобой": true,
	"тебе": true, "тебя": true, "себя": true, "собой": true, "него": true,
	"неё": true, "после": true, "нет": true, "был": true, "есть": true,
}

var censoredWords = map[string]bool{
	"хуй": true, "хуи": true, "пиздец": true, "пизда": true, "ебать": true,
	"ебал": true, "ахуеть": true, "охуеть": true, "опиздохуеть": true,
	"блять": true, "бля": true, "блядь": true, "бляздец": true, "гандон": true,
	"гондон": true, "нахуй": true, "нахуя": true, "разъебать": true,
	"разъебанный": true, "ёбанный": true, "ебанный": true, "наебать": true,
	"уебок": true, "уёбок": true, "уебать": true, "хуесос": true, "похуй": true,
	"нихуя": true, "охуенно": true, "охуенный": true, "охуенная": true,
	"охуенное": true, "хуесосик": true, "хуесосина": true, "хуесосище": true,
	"долбаёб": true, "долбаеб": true, "далбаеб": true, "далбаёб": true,
	"ебало": true, "залупа": true, "блядина": true, "залупы": true,
	"блядины": true, "еблан": true, "еблана": true, "пиздопротивный": true,
	"пиздопротивно": true, "пиздопротивное": true, "пиздопротивная": true,
	"схуя": true, "схуяли": true, "идинахуй": true, "динахуй": true,
	"динаху": true, "зуй": true, "еби": true, "ебите": true, "ебитесь": true,
	"ебали": true, "заебали": true, "заебли": true, "заебала": true,
	"заебла": true, "заеб": true, "заебал": true, "уебская": true, "уёбская": true,
	"уебский": true, "уёбский": true, "злоебучий": true, "злоебучая": true,
	"злоебучее": true, "злоебучие": true, "нахуячил": true, "нахуячить": true,
	"нахуячила": true, "нахуячило": true, "еблет": true, "хуепутала": true,
	"еблетом": true, "еблета": true, "хуепутало": true, "хуепуталом": true,
	"захуячил": true, "захуячить": true, "захуячила": true, "захуячило": true,
	"пидор": true, "пидора": true, "пидорас": true, "пидораса": true,
	"спиздить": true, "спиздил": true, "спиздила": true, "спиздило": true,
	"упиздил": true, "упиздила": true, "упидить": true, "упиздило": true,
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
			if len(w) < 6 || ignoredWords[w] {
				continue
			}
			userWordCount[uid][w]++
			userTotalWords[uid]++

			if censoredWords[w] {
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
	if message.Sender.Username == c.cfg.Clown {
		message.React("🤡")
	}
	return nil
}
