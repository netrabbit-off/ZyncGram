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

func (c *Client) Init() {
	c.Telegram.Conn()
	c.Telegram.Login(c.cfg.Phone)
	c.Telegram.SetParseMode("html")
}

func (c *Client) RegisterHandlers() {
	c.Telegram.OnCommand("ping", PingHandler, telegram.Any(telegram.IsPrivate, telegram.IsGroup))
	c.Telegram.OnCommand("119", PlaneHandler, telegram.IsOutgoing)
	c.Telegram.OnCommand("люблю", LoveHandler, telegram.IsOutgoing)
	c.Telegram.OnCommand("info", InfoHandler, telegram.IsOutgoing)
}

func (c *Client) Start() {
	c.Telegram.Idle()
}
