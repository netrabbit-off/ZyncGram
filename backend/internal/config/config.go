package config

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	AppID   int32  `envconfig:"APP_ID" required:"true"`
	AppHash string `envconfig:"APP_HASH" required:"true"`
	Phone   string `envconfig:"PHONE" required:"true"`
	Clown   string `envconfig:"CLOWN" required:"true"`
}

func LoadConfig() *Config {
	var cfg Config
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	if err := envconfig.Process("", &cfg); err != nil {
		log.Fatal(err)
	}

	return &cfg
}
