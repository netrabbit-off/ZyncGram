package bot

import (
	"log"
	"strings"
	"time"

	"github.com/amarnathcjd/gogram/telegram"

	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service"
)

type Handler struct {
	Command string
	Handler func(*telegram.NewMessage) error
	Filter  telegram.Filter
}

type Client struct {
	cfg             *config.Config
	StatsService    *service.StatsService
	SettingsService *service.SettingsService
	Telegram        *telegram.Client
}

func NewClient(cfg *config.Config, statsService *service.StatsService, settingsService *service.SettingsService) *Client {
	client, err := telegram.NewClient(telegram.ClientConfig{
		AppID: cfg.AppID, AppHash: cfg.AppHash,
	})
	if err != nil {
		log.Fatal(err)
	}

	return &Client{cfg: cfg, StatsService: statsService, SettingsService: settingsService, Telegram: client}
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

func (c *Client) RegisterHandlers(handlers []Handler) {
	outgoingHandlers := []Handler{}
	for _, handler := range handlers {
		if handler.Command == "" {
			c.Telegram.OnMessage("", handler.Handler, handler.Filter)
		} else {
			c.Telegram.OnCommand(handler.Command, handler.Handler, handler.Filter)
		}

		if handler.Filter == telegram.IsOutgoing {
			outgoingHandlers = append(outgoingHandlers, handler)
		}
	}

	// Handle updates
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

					for _, handler := range outgoingHandlers {
						if text == "/"+handler.Command || handler.Command == "" {
							handler.Handler(&msg)
						}
					}

				}(int64(u.ChannelID))

				//case *telegram.UpdateReaction

			}

			return nil
		},
	)

}

func (c *Client) Start() {
	c.Telegram.Idle()
}

func (c *Client) Edit(message *telegram.NewMessage, newText string) error {
	_, err := message.Edit(newText)
	if waitSeconds := telegram.GetFloodWait(err); waitSeconds > 0 {
		time.Sleep(time.Duration(waitSeconds) * time.Second)
		c.Edit(message, newText)
	}

	return err
}
