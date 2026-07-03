package redis

import (
	"context"
	"log"
)

func (c *RedisClient) Ping(ctx context.Context) error {
	if err := c.Client.Ping(ctx).Err(); err != nil {
		return err
	}
	return nil
}

func (c *RedisClient) Incr(context context.Context, key string) error {
	newValue, err := c.Client.Incr(context, key).Result()
	if err != nil {
		return err
	}
	log.Printf("New value for %v is %v", key, newValue)

	return nil
}

func (c *RedisClient) IncrBy(context context.Context, key string, n int64) error {
	newValue, err := c.Client.IncrBy(context, key, n).Result()
	if err != nil {
		return err
	}
	log.Printf("New value for %v is %v", key, newValue)

	return nil
}
