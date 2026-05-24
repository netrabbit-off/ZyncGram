package bot

import (
	"log"

	"github.com/amarnathcjd/gogram/telegram"

	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

type Client struct {
	cfg      *config.Config
	Telegram *telegram.Client
}

func NewClient(cfg *config.Config) *Client {
	client, err := telegram.NewClient(telegram.ClientConfig{
		AppID: cfg.AppID, AppHash: cfg.AppHash,
	})
	if err != nil {
		log.Fatal(err)
	}

	return &Client{cfg: cfg, Telegram: client}
}

func (c *Client) Start() {
	c.Telegram.Conn()

	c.Telegram.Login(c.cfg.Phone) // for user account, or client.AuthPrompt() for interactive login
	c.Telegram.SetParseMode("html")
}
