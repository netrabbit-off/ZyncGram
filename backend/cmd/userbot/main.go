package main

import (
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/netrabbit-off/ZyncGram/backend/internal/api"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api/controllers"
	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
	"github.com/netrabbit-off/ZyncGram/backend/internal/repository/redis"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service"
	botservice "github.com/netrabbit-off/ZyncGram/backend/internal/service/bot_service"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service/profile"
)

func main() {
	cfg := config.LoadConfig()
	redisClient := redis.NewClient(cfg)

	var wg sync.WaitGroup

	statsService := service.NewStatsService(redisClient)
	settingsService := service.NewSettingsService(redisClient)

	client := bot.NewClient(cfg, statsService, settingsService)
	botService := botservice.NewBotService(client, &wg)
	profileService := profile.NewProfileService(client)

	// Инициализация телеграм клиента
	client.Init()
	client.RegisterHandlers(bot.GetHandlers(client))

	// Инициализация роутера
	router := api.CreateRouter(
		controllers.NewBotController(botService),
		controllers.NewStatsController(statsService),
		controllers.NewProfileController(profileService),
		controllers.NewSettingsController(settingsService),
	)

	router.EnableCORS()
	router.EnableAuth()
	router.InitHandlers()

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
