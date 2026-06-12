package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingHander(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]string{
		"error":   "false",
		"message": "PONG!",
	})
}
