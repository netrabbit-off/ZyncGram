package redis

import (
	"github.com/netrabbit-off/ZyncGram/backend/internal/config"
	"github.com/redis/go-redis/v9"
)

type RedisClient struct {
	Client *redis.Client
}

func NewClient(cfg *config.Config) *RedisClient {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.RedisAddr,
		Password: "",
		DB:       0,
	})

	return &RedisClient{Client: client}
}

var Nil redis.Error = redis.Nil
