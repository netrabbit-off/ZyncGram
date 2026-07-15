package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	botservice "github.com/netrabbit-off/ZyncGram/backend/internal/service/bot_service"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/models"
)

type BotController struct {
	service *botservice.BotService
}

func NewBotController(service *botservice.BotService) *BotController {
	return &BotController{service: service}
}

func (c *BotController) PowerBot(ctx *gin.Context) {
	if !c.service.IsStarted {
		c.service.Start()
	} else {
		c.service.Stop()
	}

	ctx.Status(http.StatusNoContent)
}

func (c *BotController) GetStatus(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, &models.Response{
		Error: false,
		Data:  c.service.IsStarted,
	})
}
