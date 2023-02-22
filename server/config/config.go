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
	// TODO: Below configs are not final they are used as placeholder here
	WebhookSecret      string `json:"webhookSecret"`
	WellsiteAPIBaseURL string `json:"wellsiteAPIBaseURL"`
}

// Clone shallow copies the configuration. Your implementation may require a deep copy if
// your configuration has reference types.
func (c *Configuration) Clone() *Configuration {
	var clone = *c
	return &clone
}

// Used for post-processing on the configuration.
func (c *Configuration) ProcessConfiguration() error {
	c.WebhookSecret = strings.TrimSpace(c.WebhookSecret)
	c.WellsiteAPIBaseURL = strings.TrimRight(strings.TrimSpace(c.WellsiteAPIBaseURL), "/")

	return nil
}

// Used for config validations.
func (c *Configuration) IsValid() error {
	if c.WebhookSecret == "" {
		return fmt.Errorf("webhookSecret should not be empty")
	}

	if c.WellsiteAPIBaseURL == "" {
		return fmt.Errorf("base URL of the Wellsite API should not be empty")
	}

	return nil
}
