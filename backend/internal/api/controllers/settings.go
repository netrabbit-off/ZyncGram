package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/models"
)

type SettingsController struct {
	service *service.SettingsService
}

func NewSettingsController(service *service.SettingsService) *SettingsController {
	return &SettingsController{service: service}
}

func (c *SettingsController) GetSettings(ctx *gin.Context) {
	settings, err := c.service.GetSettings(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.JSON(http.StatusOK, &models.Response{
		Error: false,
		Data:  settings,
	})
}

func (c *SettingsController) SetReactions(ctx *gin.Context) {
	reactions := []models.Reaction{}
	if err := ctx.ShouldBindJSON(&reactions); err != nil {
		ctx.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	if err := c.service.SetReactions(ctx.Request.Context(), reactions); err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.Status(http.StatusNoContent)
}
