package plugin

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/mattermost/mattermost-plugin-OpenAI/server/constants"
	"github.com/mattermost/mattermost-plugin-OpenAI/server/serializer"
)

var ErrNotFound = errors.New("not found")

func (p *Plugin) handleAPIError(w http.ResponseWriter, apiErr *serializer.APIErrorResponse) {
	w.Header().Set("Content-Type", "application/json")
	errorBytes, err := json.Marshal(apiErr)
	if err != nil {
		p.API.LogError("Failed to marshal API error", constants.Error, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(apiErr.StatusCode)

	if _, err = w.Write(errorBytes); err != nil {
		p.API.LogError("Failed to write JSON response", constants.Error, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (p *Plugin) writeJSON(w http.ResponseWriter, statusCode int, v interface{}) {
	if statusCode == 0 {
		statusCode = http.StatusOK
	}

	w.Header().Set("Content-Type", "application/json")
	b, err := json.Marshal(v)
	if err != nil {
		p.API.LogError("Failed to marshal JSON response", constants.Error, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if _, err = w.Write(b); err != nil {
		p.API.LogError("Failed to write JSON response", constants.Error, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(statusCode)
}

func (p *Plugin) hasChannelMembership(userID, channelID string) (int, error) {
	if _, err := p.API.GetChannelMember(channelID, userID); err != nil {
		p.API.LogError("Failed to verify channel membership", "ChannelID", channelID, "UserID", userID, constants.Error, err.Error())
		return err.StatusCode, err
	}

	return 0, nil
}

// handleError handles writing HTTP response error
func (p *Plugin) handleError(w http.ResponseWriter, error *serializer.Error) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(error.Code)
	message := map[string]string{constants.Error: error.Message}
	response, err := json.Marshal(message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	if _, err := w.Write(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
