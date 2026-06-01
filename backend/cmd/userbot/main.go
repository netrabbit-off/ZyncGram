package main

import (
	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

func main() {
	cfg := config.LoadConfig()

	client := bot.NewClient(cfg)
	client.Init()
	client.RegisterHandlers()
	client.Start()
}
