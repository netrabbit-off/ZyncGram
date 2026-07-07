package service

import (
	"context"
	"encoding/json"

	"github.com/netrabbit-off/ZyncGram/backend/internal/repository/redis"
	"github.com/netrabbit-off/ZyncGram/backend/pkg/models"
)

type SettingsService struct {
	repo *redis.RedisClient
}

func NewSettingsService(repo *redis.RedisClient) *SettingsService {
	return &SettingsService{repo: repo}
}

func (s *SettingsService) setSettings(ctx context.Context, settings *models.Settings) error {
	settingsJson, err := json.Marshal(settings)
	if err != nil {
		return err
	}

	if _, err := s.repo.Client.Set(ctx, "settings", settingsJson, 0).Result(); err != nil {
		return err
	}

	return nil
}

func (s *SettingsService) GetSettings(ctx context.Context) (*models.Settings, error) {
	settingsJson, err := s.repo.Client.Get(ctx, "settings").Result()
	if err != nil {
		return nil, err
	}

	settings := &models.Settings{Reactions: []models.Reaction{}}
	if err := json.Unmarshal([]byte(settingsJson), &settings); err != nil {
		return nil, err
	}

	return settings, nil
}

func (s *SettingsService) SetReactions(ctx context.Context, reactions []models.Reaction) error {
	settings, err := s.GetSettings(ctx)
	if err != nil {
		return err
	}
	settings.Reactions = reactions

	return s.setSettings(ctx, settings)
}
