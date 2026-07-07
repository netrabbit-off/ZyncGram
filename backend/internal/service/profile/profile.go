package profile

import (
	"errors"
	"strconv"

	"github.com/amarnathcjd/gogram/telegram"
	"github.com/netrabbit-off/ZyncGram/backend/internal/bot"
)

type ProfileService struct {
	client *bot.Client
}

func NewProfileService(client *bot.Client) *ProfileService {
	return &ProfileService{client: client}
}

func (s *ProfileService) GetProfile() (map[string]string, error) {
	profile := map[string]string{
		"id":        "0",
		"username":  "-",
		"firstname": "-",
		"lastname":  "-",
	}

	user, err := s.client.Telegram.GetMe()
	if err != nil {
		return nil, err
	}

	profile["id"] = strconv.FormatInt(user.ID, 10)
	profile["username"] = user.Username
	profile["firstname"] = user.FirstName
	profile["lastname"] = user.LastName

	return profile, nil
}

func (s *ProfileService) getProfilePhotoID() (int64, error) {
	photosPhotos, err := s.client.Telegram.PhotosGetUserPhotos(
		&telegram.InputUserSelf{},
		0,
		0,
		1,
	)
	if err != nil {
		return 0, err
	}

	var photo *telegram.PhotoObj

	switch p := photosPhotos.(type) {
	case *telegram.PhotosPhotosObj:
		photo = p.Photos[0].(*telegram.PhotoObj)

	case *telegram.PhotosPhotosSlice:
		photo = p.Photos[0].(*telegram.PhotoObj)

	default:
		return 0, errors.New("no profile photo")
	}

	return photo.ID, nil
}

func (s *ProfileService) GetProfilePhoto() ([]byte, error) {
	photoID, err := s.getProfilePhotoID()
	if err != nil {
		return nil, err
	}

	loc := &telegram.InputPeerPhotoFileLocation{
		Peer:    &telegram.InputPeerSelf{},
		PhotoID: photoID,
		Big:     true,
	}
	res, err := s.client.Telegram.UploadGetFile(&telegram.UploadGetFileParams{
		Location: loc,
		Offset:   0,
		Limit:    1024 * 1024,
	})
	if err != nil {
		return nil, err
	}
	file := res.(*telegram.UploadFileObj)

	return file.Bytes, nil
}
