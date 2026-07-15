package botservice

import (
	"sync"

	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
)

type BotService struct {
	Bot       *bot.Client
	WaitGroup *sync.WaitGroup
	IsStarted bool
}

func NewBotService(bot *bot.Client, wg *sync.WaitGroup) *BotService {
	return &BotService{Bot: bot, WaitGroup: wg, IsStarted: true}
}

func (s *BotService) Start() {
	s.WaitGroup.Add(1)
	go func() {
		defer s.WaitGroup.Done()
		s.Bot.Telegram.Start()
	}()

	s.IsStarted = true
}

func (s *BotService) Stop() {
	s.Bot.Telegram.Stop()

	s.IsStarted = false
}
