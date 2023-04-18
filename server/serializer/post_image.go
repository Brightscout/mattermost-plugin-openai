package serializer

import (
	"encoding/json"
	"io"
)

type PostImage struct {
	ImageURL string `json:"imageUrl"`
	FileName string `json:"fileName"`
}

func GetPostImageDetailsFromJSON(data io.Reader) (*PostImage, error) {
	var body *PostImage
	if err := json.NewDecoder(data).Decode(&body); err != nil {
		return nil, err
	}
	return body, nil
}
