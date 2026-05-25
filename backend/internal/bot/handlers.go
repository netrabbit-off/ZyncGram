package bot

import (
	"math/rand/v2"
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
