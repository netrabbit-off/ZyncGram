package profile

import (
	"errors"
	"fmt"
	"log"
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

func (s *ProfileService) getProfilePhotoInfo() (*telegram.PhotoObj, error) {
	photosPhotos, err := s.client.Telegram.PhotosGetUserPhotos(
		&telegram.InputUserSelf{},
		0,
		0,
		1,
	)
	if err != nil {
		return nil, err
	}

	var photo *telegram.PhotoObj

	switch p := photosPhotos.(type) {
	case *telegram.PhotosPhotosObj:
		photo = p.Photos[0].(*telegram.PhotoObj)

	case *telegram.PhotosPhotosSlice:
		photo = p.Photos[0].(*telegram.PhotoObj)

	default:
		return nil, errors.New("no photo")
	}

	return photo, nil
}

func (s *ProfileService) GetProfilePhoto() ([]byte, error) {
	photo, err := s.getProfilePhotoInfo()
	if err != nil {
		return nil, err
	}
	fmt.Printf("%x\n", photo.FileReference)
	fmt.Println(len(photo.FileReference))

	loc := &telegram.InputPeerPhotoFileLocation{
		Peer:    &telegram.InputPeerSelf{},
		PhotoID: photo.ID,
		Big:     true,
	}
	res, err := s.client.Telegram.UploadGetFile(&telegram.UploadGetFileParams{
		Location: loc,
		Offset:   0,
		Limit:    1024 * 1024,
	})
	if err != nil {
		log.Fatalln(err)
	}
	file := res.(*telegram.UploadFileObj)

	return file.Bytes, nil
}
