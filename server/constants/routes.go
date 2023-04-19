package constants

const (
	APIPrefix           = "/api/v1"
	PathGetConfig       = "/config"
	PathPostImage       = "/{channel_id:[A-Za-z0-9]+}/image"
	PathCompletion      = "/completions"
	PathChatCompletion  = "/chat/completions"
	PathImageGeneration = "/images/generations"
	WildRoute           = "{anything:.*}"

	// openAI APIs
	OpenAIPathCompletion      = "/completions"
	OpenAIPathChatCompletion  = "/chat/completions"
	OpenAIPathImageGeneration = "/images/generations"
)
