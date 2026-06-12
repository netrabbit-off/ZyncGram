package api

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/api/controllers"
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
)

type Router struct {
	router *gin.Engine
	cfg    *config.Config
}

func CreateRouter() *Router {
	return &Router{router: gin.Default(), cfg: config.LoadConfig()}
}

func (r *Router) InitHandlers() {
	r.router.GET("/ping", controllers.PingHander)
}

func (r *Router) Start() {
	if err := r.router.Run(); err != nil {
		log.Fatalf("failed to run server: %d", err)
	}
}
