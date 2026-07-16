package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/models"
)

type StatsController struct {
	service *service.StatsService
}

func NewStatsController(service *service.StatsService) *StatsController {
	return &StatsController{service: service}
}

func (c *StatsController) GetWeekStatistic(ctx *gin.Context) {
	stats, err := c.service.GetWeekStatistic(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.JSON(http.StatusOK, &models.Response{
		Error: false,
		Data:  stats,
	})
}

func (c *StatsController) GetWordsTop(ctx *gin.Context) {
	top, err := c.service.GetWordsTop(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.JSON(http.StatusOK, &models.Response{
		Error: false,
		Data:  top,
	})
}

func (c *StatsController) GetTotalStats(ctx *gin.Context) {
	totalMessages, totalWords, uncensoredWords, err := c.service.GetTotalStats(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.JSON(http.StatusOK, &models.Response{
		Error: false,
		Data: map[string]interface{}{
			"total": map[string]int{
				"messages":   totalMessages,
				"words":      totalWords,
				"uncensored": uncensoredWords,
			},
		},
	})
}
