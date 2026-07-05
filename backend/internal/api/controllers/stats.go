package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service"
)

type StatsController struct {
	service *service.StatsService
}

func NewStatsController(service *service.StatsService) *StatsController {
	return &StatsController{service: service}
}

func PingHander(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]string{
		"error":   "false",
		"message": "PONG!",
	})
}

func (c *StatsController) GetWeekStatistic(ctx *gin.Context) {
	stats, err := c.service.GetWeekStatistic(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error":     true,
			"errorText": err,
		})
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"error":     false,
		"weekStats": stats,
	})
}

func (c *StatsController) GetWordsTop(ctx *gin.Context) {
	top, err := c.service.GetWordsTop(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error":     true,
			"errorText": err,
		})
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"error":    false,
		"wordsTop": top,
	})
}

func (c *StatsController) GetTotalStats(ctx *gin.Context) {
	totalMessages, totalWords, err := c.service.GetTotalStats(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error":     true,
			"errorText": err,
		})
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"error": false,
		"total": map[string]int{
			"messages": totalMessages,
			"words":    totalWords,
		},
	})
}
