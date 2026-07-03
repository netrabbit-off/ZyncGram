package bot

import (
	"sync"
	"time"

	"github.com/amarnathcjd/gogram/telegram"
)

type AntiSpam struct {
	mu     sync.Mutex
	last   map[int64]time.Time
	client *telegram.Client // TODO Поменять в структуре объект telegram.Client на мой bot.Client
}

func NewAntiSpam(client *telegram.Client) *AntiSpam {
	return &AntiSpam{
		last:   make(map[int64]time.Time),
		client: client,
	}
}

func (a *AntiSpam) Handle(message *telegram.NewMessage) error {
	uid := message.ChatID()

	// Только личные сообщения
	if !message.IsPrivate() {
		return nil
	}

	// Не трогаем ботов
	if message.Sender.Bot {
		return nil
	}

	// Игнорируем пересланные сообщения
	if message.IsForward() {
		return nil
	}

	// Игнорируем медиа
	if message.IsMedia() {
		return nil
	}

	// Не трогаем контакты
	if message.Sender.Contact {
		return nil
	}

	// Не баним себя
	if uid == a.client.Me().ID {
		return nil
	}

	a.mu.Lock()
	defer a.mu.Unlock()

	now := time.Now()
	if last, ok := a.last[uid]; ok && now.Sub(last).Seconds() < 0.8 {
		peerID := &telegram.InputPeerUser{
			UserID:     uid,
			AccessHash: message.Sender.AccessHash,
		}
		// Блокируем пользователя
		_, err := a.client.ContactsBlock(false, peerID)
		message.Reply("<b>🤖 Зафиксирован спам\n\n" +
			"‼️ Ты забанен за скорострельность ‼️\n" +
			"<i>Если это ошибка, я скоро разблокирую</b> (ну или нет..)</i>")

		return err
	}
	// Обновляем время
	a.last[uid] = now

	return nil
}
