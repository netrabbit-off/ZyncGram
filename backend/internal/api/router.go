package api

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api/controllers"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

type Router struct {
	router     *gin.Engine
	controller *controllers.StatsController
	srv        *http.Server
	cfg        *config.Config
}

func CreateRouter(controller *controllers.StatsController) *Router {
	return &Router{router: gin.Default(), controller: controller, srv: &http.Server{}, cfg: config.LoadConfig()}
}

func (r *Router) InitHandlers() {
	r.srv = &http.Server{
		Addr:    ":8080",
		Handler: r.router.Handler(),
	}
	r.router.GET("/ping", controllers.PingHander)
	r.router.GET("/stats/total", r.controller.GetTotalStats)
	r.router.GET("/stats/week", r.controller.GetWeekStatistic)
	r.router.GET("/stats/words/top", r.controller.GetWordsTop)
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
