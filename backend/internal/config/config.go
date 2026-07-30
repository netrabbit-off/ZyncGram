package config

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	AppID     int32  `envconfig:"APP_ID" required:"true"`
	AppHash   string `envconfig:"APP_HASH" required:"true"`
	Phone     string `envconfig:"PHONE" required:"true"`
	AuthToken string `envconfig:"AUTH_TOKEN" required:"true"`
	RedisAddr string `envconfig:"REDIS_ADDR" required:"true"`
	Port      int    `envconfig:"PORT" required:"true"`
}

func LoadConfig() *Config {
	var cfg Config

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	if err := envconfig.Process("", &cfg); err != nil {
		log.Fatalf("Failed to process env vars: %v", err)
	}

	return &cfg
}
