package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(authToken string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.URL.Path == "/profile/photo" {
			c.Next()
			return
		}

		token := c.GetHeader("Authorization")
		if len(token) < 8 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		token = token[7:]
		if token != authToken {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.Next()
	}
}
