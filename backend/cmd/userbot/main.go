package main

import (
	"strings"

	"github.com/amarnathcjd/gogram/telegram"

	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

func main() {
	cfg := config.LoadConfig()

	client := bot.NewClient(cfg)

	client.Init()

	client.Telegram.OnCommand("ping", bot.PingHandler, telegram.Any(telegram.IsPrivate, telegram.IsGroup))
	client.Telegram.OnMessage("", client.ClownHandler, telegram.Any(telegram.IsPrivate, telegram.IsGroup))
	client.Telegram.OnCommand("стата", bot.StatisticsHandler, telegram.IsOutgoing)
	client.Telegram.OnCommand("люблю", bot.LoveHandler, telegram.IsOutgoing)
	client.Telegram.OnCommand("119", bot.PlaneHandler, telegram.IsOutgoing)
	client.Telegram.OnCommand("info", bot.InfoHandler, telegram.IsOutgoing)
	client.Telegram.OnMessage("", bot.AnimateHandler, telegram.IsOutgoing)
	client.Telegram.OnMessage("", bot.LaughHandler, telegram.IsOutgoing)

	// КОСТЫЛЬ ТОЛЬКО ДЛЯ OUTGOING В ГРУППАХ
	client.Telegram.AddRawHandler(
		nil,
		func(update telegram.Update, tg *telegram.Client) error {

			switch u := update.(type) {

			case *telegram.UpdateReadChannelInbox:
				go func(channelID int64) {
					messages, err := tg.GetMessages(
						channelID,
						&telegram.SearchOption{
							Limit: 1,
						},
					)

					if err != nil || len(messages) == 0 {
						return
					}

					msg := messages[0]

					if !msg.Message.Out {
						return
					}

					text := strings.TrimSpace(
						strings.ToLower(msg.Text()),
					)

					switch text {

					case "/119":
						bot.PlaneHandler(&msg)

					case "/люблю":
						bot.LoveHandler(&msg)

					case "/info":
						bot.InfoHandler(&msg)

					case "/стата":
						bot.StatisticsHandler(&msg)
					}

					bot.AnimateHandler(&msg)
					bot.LaughHandler(&msg)

				}(int64(u.ChannelID))
			}

			return nil
		},
	)

	client.Start()
}
