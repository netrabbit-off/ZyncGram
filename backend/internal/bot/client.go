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
	Filter  telegram.Filter
	Handler func(*telegram.NewMessage) error
}

type Client struct {
	cfg             *config.Config
	Telegram        *telegram.Client
	StatsService    *service.StatsService
	SettingsService *service.SettingsService
}

func NewClient(
	cfg *config.Config,
	statsService *service.StatsService,
	settingsService *service.SettingsService,
) *Client {

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

	// Ловим сырые апдейты
	c.Telegram.AddRawHandler(
		nil,
		func(update telegram.Update, tg *telegram.Client) error {
			switch u := update.(type) {

			/*
											Для справки:
				Методом научного тыка и дебага было выяснено,
				что Outgoing сообщения в групповых чатах не вылавливаются стоковым хэндлером,
				поэтому они ловятся здесь в row-хэндлере.

				Эти сообщения поступают сюда, как "UpdateReadChannelInbox".
			*/

			case *telegram.UpdateReadChannelInbox:
				go func(channelID int64) {
					// Получаем нужное сообщение из истории
					messages, err := tg.GetMessages(
						channelID,
						&telegram.SearchOption{
							Limit: 1,
						},
					)

					// Обрабатываем исключения
					if err != nil || len(messages) == 0 {
						return
					}

					msg := messages[0]

					// Проверяем, что полученное сообщение - наше
					if !msg.Message.Out {
						return
					}

					// Приводим к нужному формату
					text := strings.TrimSpace(
						strings.ToLower(msg.Text()),
					)

					// В зависимости от команды пускаем по хэндлерам
					for _, handler := range outgoingHandlers {
						if text == "/"+handler.Command || handler.Command == "" {
							go handler.Handler(&msg)
						}
					}

				}(int64(u.ChannelID))

			}

			return nil
		},
	)

}

func (c *Client) Start() {
	c.Telegram.Idle()
}

// Рекурсивая функция для редактирования сообщения с обработкой FloodWait исключения
func (c *Client) Edit(message *telegram.NewMessage, newText string) error {
	_, err := message.Edit(newText)
	if waitSeconds := telegram.GetFloodWait(err); waitSeconds > 0 {
		time.Sleep(time.Duration(waitSeconds) * time.Second)
		c.Edit(message, newText)
	}

	return err
}

// Рекурсивая функция для реакции сообщения с обработкой FloodWait исключения
func (c *Client) React(message *telegram.NewMessage, emoji string) error {
	err := message.React(emoji)
	if waitSeconds := telegram.GetFloodWait(err); waitSeconds > 0 {
		time.Sleep(time.Duration(waitSeconds) * time.Second)
		c.React(message, emoji)
	}

	return err
}
