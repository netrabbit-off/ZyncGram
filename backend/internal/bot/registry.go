package bot

import "github.com/amarnathcjd/gogram/telegram"

func GetHandlers(client *Client) []Handler {
	// Антиспам хэндлер
	as := NewAntiSpam(client)

	return []Handler{

		{Command: "ping", Handler: client.PingHandler, Filter: telegram.IsOutgoing},
		{Command: "ping", Handler: client.PingHandler, Filter: telegram.Any(telegram.IsPrivate, telegram.IsGroup)},

		{Command: "стата", Handler: client.StatisticsHandler, Filter: telegram.IsOutgoing},
		{Command: "stats", Handler: client.StatisticsHandler, Filter: telegram.IsOutgoing},

		{Command: "люблю", Handler: client.LoveHandler, Filter: telegram.IsOutgoing},
		{Command: "love", Handler: client.LoveHandler, Filter: telegram.IsOutgoing},

		{Command: "info", Handler: client.InfoHandler, Filter: telegram.IsOutgoing},
		{Command: "инфа", Handler: client.InfoHandler, Filter: telegram.IsOutgoing},

		{Command: "119", Handler: client.PlaneHandler, Filter: telegram.IsOutgoing},

		{Command: "", Handler: client.ReactionHandler, Filter: telegram.Any(telegram.IsPrivate, telegram.IsGroup)},
		{Command: "", Handler: client.AnimateHandler, Filter: telegram.IsOutgoing},
		{Command: "", Handler: client.LaughHandler, Filter: telegram.IsOutgoing},

		// Хэндлер анти-спам
		{Command: "", Handler: as.Handle, Filter: telegram.IsPrivate},

		// Хэндлер для статистики
		{Command: "", Handler: client.ProcessMessageHandler, Filter: telegram.IsOutgoing},
	}
}
