package redis

import "github.com/redis/go-redis/v9"

type RedisClient struct {
	Client *redis.Client
}

func NewClient() *RedisClient {
	client := redis.NewClient(&redis.Options{
		Addr:     "127.0.0.1:6379",
		Password: "",
		DB:       0,
	})

	return &RedisClient{Client: client}
}

var Nil redis.Error = redis.Nil
