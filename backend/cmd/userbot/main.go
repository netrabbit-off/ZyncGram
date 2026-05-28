package main

import (
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

	client.Start()
}
