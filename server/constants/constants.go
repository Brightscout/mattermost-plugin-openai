package constants

const (
	// Bot configs
	BotUsername    = "wellsite"
	BotDisplayName = "Wellsite WITSML Plugin"
	BotDescription = "A bot account created by the Wellsite WITSML plugin."

	// Command configs
	CommandTriggerName = "witsml"
	HelpText           = "###### Mattermost WITSML Plugin - Slash Command Help\n"
	InvalidCommand     = "Invalid command parameters. Please use `/witsml help` for more information."

	// Plugin API Routes
	APIPrefix = "/api/v1"
	WildRoute = "{anything:.*}"

	// Wellsite API Routes
	PathCommonAPI = "post"

	// Wellsite operations
	GetWells = "Get wells"

	// Error messages
	GenericErrorMessage = "something went wrong, please try again later"
)
