package redis

import "context"

func (c *RedisClient) Ping(ctx context.Context) error {
	if err := c.Client.Ping(ctx).Err(); err != nil {
		return err
	}
	return nil
}
