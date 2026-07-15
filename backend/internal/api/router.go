package api

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api/controllers"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api/middlewares"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

type Router struct {
	router             *gin.Engine
	BotController      *controllers.BotController
	StatsController    *controllers.StatsController
	ProfileController  *controllers.ProfileController
	SettingsController *controllers.SettingsController
	srv                *http.Server
	cfg                *config.Config
}

func CreateRouter(
	BotController *controllers.BotController,
	StatsController *controllers.StatsController,
	ProfileController *controllers.ProfileController,
	SettingsController *controllers.SettingsController,
) *Router {
	return &Router{
		router:             gin.Default(),
		BotController:      BotController,
		StatsController:    StatsController,
		ProfileController:  ProfileController,
		SettingsController: SettingsController,
		srv:                &http.Server{},
		cfg:                config.LoadConfig(),
	}
}

func (r *Router) InitHandlers() {
	r.srv = &http.Server{
		Addr:    ":8080",
		Handler: r.router.Handler(),
	}

	r.router.GET("/bot/power", r.BotController.PowerBot)
	r.router.GET("/bot/status", r.BotController.GetStatus)

	r.router.GET("/stats/total", r.StatsController.GetTotalStats)
	r.router.GET("/stats/week", r.StatsController.GetWeekStatistic)
	r.router.GET("/stats/words/top", r.StatsController.GetWordsTop)

	r.router.GET("/profile", r.ProfileController.GetProfile)
	r.router.GET("/profile/photo", r.ProfileController.GetProfilePhoto)

	r.router.GET("/settings", r.SettingsController.GetSettings)
	r.router.POST("/settings/reactions", r.SettingsController.SetReactions)
	r.router.POST("/settings/laugh", r.SettingsController.SetLaughEnabled)
	r.router.POST("/settings/animate/enabled", r.SettingsController.SetAnimateEnabled)
	r.router.POST("/settings/animate/words", r.SettingsController.SetAnimateWords)
}

func (r *Router) EnableCORS() {
	r.router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
}

func (r *Router) EnableAuth() {
	r.router.Use(middlewares.AuthMiddleware(r.cfg.AuthToken))
}

func (r *Router) Start() {
	if err := r.srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("listen: %v\n", err)
	}
}

func (r *Router) Stop() {
	ctxShutdown, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := r.srv.Shutdown(ctxShutdown); err != nil {
		log.Fatalf("server shutdown: %v\n", err)
	}
}
