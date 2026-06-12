package main

import (
	"github.com/amarnathcjd/gogram/telegram"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api"
	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

func main() {
	cfg := config.LoadConfig()
	client := bot.NewClient(cfg)
	handlers := []bot.Handler{
		{Command: "ping", Handler: client.PingHandler, Filter: telegram.Any(telegram.IsPrivate, telegram.IsGroup)},
		{Command: "", Handler: client.ClownHandler, Filter: telegram.Any(telegram.IsPrivate, telegram.IsGroup)},
		{Command: "стата", Handler: client.StatisticsHandler, Filter: telegram.IsOutgoing},
		{Command: "люблю", Handler: client.LoveHandler, Filter: telegram.IsOutgoing},
		{Command: "info", Handler: client.InfoHandler, Filter: telegram.IsOutgoing},
		{Command: "119", Handler: client.PlaneHandler, Filter: telegram.IsOutgoing},
		{Command: "", Handler: client.AnimateHandler, Filter: telegram.IsOutgoing},
		{Command: "", Handler: client.LaughHandler, Filter: telegram.IsOutgoing},
	}

	client.Init()
	client.RegisterHandlers(handlers)

	// Запускаем юзербота в фоне
	go client.Start()

	// Инициируем и запускаем API сервер
	router := api.CreateRouter()
	router.InitHandlers()
	router.Start()
}
