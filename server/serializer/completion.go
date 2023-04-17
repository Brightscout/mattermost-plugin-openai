package serializer

import (
	"encoding/json"
	"io"
)

type CompletionRequestPayload struct {
	Model       string `json:"model"`
	Prompt      string `json:"prompt"`
	MaxTokens   int    `json:"max_tokens"`
	Temperature int    `json:"temperature"`
}

type ChatCompletionRequestPayload struct {
	Model     string     `json:"model"`
	Messages  []*Message `json:"messages"`
	MaxTokens int        `json:"max_tokens"`
}

type CompletionResponsePayload struct {
	ID      string    `json:"id"`
	Object  string    `json:"object"`
	Created int       `json:"created"`
	Model   string    `json:"model"`
	Choices []*Choice `json:"choices"`
	Usage   *Usage    `json:"usage"`
}

type ChatCompletionResponsePayload struct {
	ID      string         `json:"id"`
	Object  string         `json:"object"`
	Created int            `json:"created"`
	Choices []*ChatChoices `json:"choices"`
	Usage   *Usage         `json:"usage"`
}

type Choice struct {
	Text         string `json:"text"`
	Index        int    `json:"index"`
	LogProbs     int    `json:"logprobs"`
	FinishReason string `json:"finish_reason"`
}

type ChatChoices struct {
	Index        int      `json:"index"`
	Message      *Message `json:"message"`
	FinishReason string   `json:"finish_reason"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

func GetCompletionRequestPayloadFromJSON(data io.Reader) (*CompletionRequestPayload, error) {
	var body *CompletionRequestPayload
	if err := json.NewDecoder(data).Decode(&body); err != nil {
		return nil, err
	}
	return body, nil
}

func GetChatCompletionRequestPayloadFromJSON(data io.Reader) (*ChatCompletionRequestPayload, error) {
	var body *ChatCompletionRequestPayload
	if err := json.NewDecoder(data).Decode(&body); err != nil {
		return nil, err
	}
	return body, nil
}
