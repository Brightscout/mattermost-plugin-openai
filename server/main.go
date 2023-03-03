package main

import (
	mattermostPlugin "github.com/mattermost/mattermost-server/v6/plugin"

	"github.com/mattermost/mattermost-plugin-open-ai/server/plugin"
)

func main() {
	mattermostPlugin.ClientMain(&plugin.Plugin{})
}
