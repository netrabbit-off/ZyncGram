package main

import (
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/amarnathcjd/gogram/telegram"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api/controllers"
	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
	"github.com/netrabbit-off/ZyncGram/backend/internal/repository/redis"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service"
)

func main() {
	cfg := config.LoadConfig()
	statsService := service.NewService(redis.NewClient())
	client := bot.NewClient(cfg, statsService)
	handlers := []bot.Handler{
		{Command: "ping", Handler: client.PingHandler, Filter: telegram.Any(telegram.IsPrivate, telegram.IsGroup)},
		{Command: "", Handler: client.ClownHandler, Filter: telegram.Any(telegram.IsPrivate, telegram.IsGroup)},
		{Command: "стата", Handler: client.StatisticsHandler, Filter: telegram.IsOutgoing},
		{Command: "люблю", Handler: client.LoveHandler, Filter: telegram.IsOutgoing},
		{Command: "info", Handler: client.InfoHandler, Filter: telegram.IsOutgoing},
		{Command: "119", Handler: client.PlaneHandler, Filter: telegram.IsOutgoing},
		{Command: "", Handler: client.AnimateHandler, Filter: telegram.IsOutgoing},
		{Command: "", Handler: client.LaughHandler, Filter: telegram.IsOutgoing},
		// Хэндлер для статистики
		{Command: "", Handler: client.ProcessMessageHandler, Filter: telegram.IsOutgoing},
	}

	// Антиспам хэндлер
	// TODO Вынести адекватно к остальным хэндлерам
	as := bot.NewAntiSpam(client.Telegram)
	client.Telegram.On(telegram.OnMessage, as.Handle)

	// Инициализация телеграм клиента
	client.Init()
	client.RegisterHandlers(handlers)

	// Инициализация роутера
	router := api.CreateRouter(controllers.NewStatsController(statsService))
	router.InitHandlers()

	var wg sync.WaitGroup

	// Запускаем юзербот
	wg.Add(1)
	go func() {
		defer wg.Done()
		client.Start()
	}()

	// Запускаем API сервер
	wg.Add(1)
	go func() {
		defer wg.Done()
		router.Start()
	}()

	// Получение сигнала для выхода
	exit := make(chan os.Signal, 1)
	signal.Notify(exit, syscall.SIGINT, syscall.SIGTERM)
	<-exit

	// Закрытие соединений
	client.Telegram.Stop()
	router.Stop()

	// Ждем завершения обоих горутин
	done := make(chan struct{}, 1)
	go func() {
		wg.Wait()
		close(done)
	}()

	select {
	case <-done:
		log.Println("All goroutines finished!")
	case <-time.After(10 * time.Second):
		log.Println("Timeout! force exit")
	}

	log.Println("Exited")
}
