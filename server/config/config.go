package config

import (
	"fmt"
	"strings"
)

// Configuration captures the plugin's external configuration as exposed in the Mattermost server
// configuration, as well as values computed from the configuration. Any public fields will be
// deserialized from the Mattermost server configuration in OnConfigurationChange.
//
// As plugins are inherently concurrent (hooks being called asynchronously), and the plugin
// configuration can change at any time, access to the configuration must be synchronized. The
// strategy used in this plugin is to guard a pointer to the configuration, and clone the entire
// struct whenever it changes. You may replace this with whatever strategy you choose.
//
// If you add non-reference types to your configuration struct, be sure to rewrite Clone as a deep
// copy appropriate for your types.
type Configuration struct {
	OpenAIAPIBaseURL     string `json:"openAiApiBaseUrl"`
	OpenAIAPIKey         string `json:"openAiApiKey"`
	OpenAIOrganizationID string `json:"openAiOrganizationId"`
}

// Clone shallow copies the configuration. Your implementation may require a deep copy if
// your configuration has reference types.
func (c *Configuration) Clone() *Configuration {
	var clone = *c
	return &clone
}

// Used for post-processing on the configuration.
func (c *Configuration) ProcessConfiguration() error {
	c.OpenAIAPIKey = strings.TrimSpace(c.OpenAIAPIKey)
	c.OpenAIOrganizationID = strings.TrimSpace(c.OpenAIOrganizationID)

	return nil
}

// Used for config validations.
func (c *Configuration) IsValid() error {
	if c.OpenAIAPIBaseURL == "" {
		return fmt.Errorf("openAiApiBaseUrl should not be empty")
	}

	if c.OpenAIAPIKey == "" {
		return fmt.Errorf("openAiApiKey should not be empty")
	}

	if c.OpenAIOrganizationID == "" {
		return fmt.Errorf("openAiOrganizationId should not be empty")
	}

	return nil
}
