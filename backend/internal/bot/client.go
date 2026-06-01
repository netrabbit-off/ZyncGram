package bot

import (
	"log"
	"strings"

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
	_, err := c.Telegram.UpdatesGetState()
	if err != nil {
		panic(err)
	}
	c.Telegram.SetParseMode("html")
}

func (c *Client) RegisterHandlers() {
	c.Telegram.OnCommand("ping", PingHandler, telegram.Any(telegram.IsPrivate, telegram.IsGroup))
	c.Telegram.OnMessage("", c.ClownHandler, telegram.Any(telegram.IsPrivate, telegram.IsGroup))
	c.Telegram.OnCommand("стата", StatisticsHandler, telegram.IsOutgoing)
	c.Telegram.OnCommand("люблю", LoveHandler, telegram.IsOutgoing)
	c.Telegram.OnCommand("119", PlaneHandler, telegram.IsOutgoing)
	c.Telegram.OnCommand("info", InfoHandler, telegram.IsOutgoing)
	c.Telegram.OnMessage("", AnimateHandler, telegram.IsOutgoing)
	c.Telegram.OnMessage("", LaughHandler, telegram.IsOutgoing)

	c.Telegram.AddRawHandler(
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
						PlaneHandler(&msg)

					case "/люблю":
						LoveHandler(&msg)

					case "/info":
						InfoHandler(&msg)

					case "/стата":
						StatisticsHandler(&msg)
					}

					AnimateHandler(&msg)
					LaughHandler(&msg)

				}(int64(u.ChannelID))
			}

			return nil
		},
	)

}

func (c *Client) Start() {
	c.Telegram.Idle()
}
