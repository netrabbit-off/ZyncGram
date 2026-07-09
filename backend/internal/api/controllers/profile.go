package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/netrabbit-off/ZyncGram/backend/internal/service/profile"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/models"
)

type ProfileController struct {
	service *profile.ProfileService
}

func NewProfileController(service *profile.ProfileService) *ProfileController {
	return &ProfileController{service: service}
}

func (c *ProfileController) GetProfile(ctx *gin.Context) {
	profile, err := c.service.GetProfile()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.JSON(http.StatusOK, &models.Response{
		Error: false,
		Data:  profile,
	})
}

func (c *ProfileController) GetProfilePhoto(ctx *gin.Context) {
	photo, err := c.service.GetProfilePhoto()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
			Error:     true,
			ErrorText: err,
		})
		return
	}

	ctx.Data(http.StatusOK, "image/jpeg", photo)
}
