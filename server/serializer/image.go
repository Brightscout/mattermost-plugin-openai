package serializer

import (
	"encoding/json"
	"io"
)

type ImageGenerationRequestPayload struct {
	Prompt string `json:"prompt"`
	Number int    `json:"n"`
	Size   string `json:"size"`
}

type ImageGenerationResponsePayload struct {
	Created int     `json:"created"`
	Data    []*Data `json:"data"`
}

type Data struct {
	URL string `json:"url"`
}

func GetImageGenerationPayloadFromJSON(data io.Reader) (*ImageGenerationRequestPayload, error) {
	var body *ImageGenerationRequestPayload
	if err := json.NewDecoder(data).Decode(&body); err != nil {
		return nil, err
	}
	return body, nil
}
