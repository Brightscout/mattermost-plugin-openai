package plugin

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"path/filepath"
	"runtime/debug"

	"github.com/gorilla/mux"

	"github.com/mattermost/mattermost-plugin-OpenAI/server/constants"
	"github.com/mattermost/mattermost-plugin-OpenAI/server/serializer"
	"github.com/mattermost/mattermost-server/v6/model"
)

// Initializes the plugin REST API
func (p *Plugin) InitAPI() *mux.Router {
	r := mux.NewRouter()
	r.Use(p.WithRecovery)

	// 404 handler
	r.Handle(constants.WildRoute, http.NotFoundHandler())
	return r
}

// Add custom routes and corresponding handlers here
func (p *Plugin) InitRoutes() {
	p.Client = InitClient(p)
	s := p.router.PathPrefix(constants.APIPrefix).Subrouter()

	s.HandleFunc(constants.PathPostImage, p.checkAuth(p.handlePostImage)).Methods(http.MethodPost)
	s.HandleFunc(constants.PathCompletion, p.checkAuth(p.handleGetCompletion)).Methods(http.MethodPost)
	s.HandleFunc(constants.PathChatCompletion, p.checkAuth(p.handleGetChatCompletion)).Methods(http.MethodPost)
	s.HandleFunc(constants.PathImageGeneration, p.checkAuth(p.handleImageGeneration)).Methods(http.MethodPost)
}

func (p *Plugin) WithRecovery(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if x := recover(); x != nil {
				p.API.LogError("Recovered from a panic",
					"url", r.URL.String(),
					"error", x,
					"stack", string(debug.Stack()))
			}
		}()

		next.ServeHTTP(w, r)
	})
}

// Handles the static files under the assets directory.
func (p *Plugin) HandleStaticFiles() {
	bundlePath, err := p.API.GetBundlePath()
	if err != nil {
		p.API.LogWarn("Failed to get bundle path.", constants.Error, err.Error())
		return
	}

	// This will serve static files from the 'assets' directory under '/static/<filename>'
	p.router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(filepath.Join(bundlePath, "assets")))))
}

func (p *Plugin) handlePostImage(w http.ResponseWriter, r *http.Request) {
	pathParams := mux.Vars(r)
	channelID := pathParams[constants.PathParamChannelID]
	if !model.IsValidId(channelID) {
		p.API.LogWarn(constants.ErrorInvalidChannelID)
		p.handleError(w, &serializer.Error{Code: http.StatusBadRequest, Message: constants.ErrorInvalidChannelID})
		return
	}

	mattermostUserID := r.Header.Get(constants.HeaderMattermostUserID)
	if statusCode, err := p.hasChannelMembership(mattermostUserID, channelID); err != nil {
		p.handleError(w, &serializer.Error{Code: statusCode, Message: err.Error()})
		return
	}

	body, err := serializer.GetPostImageDetailsFromJSON(r.Body)
	if err != nil {
		p.API.LogError("Error occurred while decoding the body for posting the image", constants.Error, err.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}

	response, imageErr := http.Get(body.ImageURL)
	if imageErr != nil {
		p.API.LogWarn("Error occurred while fetching the image", imageErr.Error())
		p.handleError(w, &serializer.Error{Code: response.StatusCode, Message: imageErr.Error()})
		return
	}
	defer response.Body.Close()

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, response.Body); err != nil {
		p.API.LogWarn("Error copying the image file", constants.Error, err.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}
	data := buf.Bytes()

	fileUploadResponse, uploadErr := p.API.UploadFile(data, channelID, body.FileName)
	if uploadErr != nil {
		p.API.LogError("Error uploading the image file", constants.Error, uploadErr.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusInternalServerError, Message: uploadErr.Error()})
		return
	}

	if _, postErr := p.API.CreatePost(&model.Post{
		UserId:    mattermostUserID,
		ChannelId: channelID,
		FileIds:   model.StringArray{fileUploadResponse.Id},
	}); postErr != nil {
		p.API.LogError(postErr.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusInternalServerError, Message: postErr.Error()})
		return
	}

	p.writeJSON(w, http.StatusCreated, map[string]string{"success": "Image posted"})
}

func (p *Plugin) handleGetCompletion(w http.ResponseWriter, r *http.Request) {
	body, err := serializer.GetCompletionRequestPayloadFromJSON(r.Body)
	if err != nil {
		p.API.LogError("Error occurred while decoding the body for completion", constants.Error, err.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusBadRequest, Message: constants.ErrorInvalidRequestPayload})
		return
	}

	response, statusCode, responseErr := p.Client.GetCompletion(body)
	if responseErr != nil {
		p.API.LogWarn("Error occurred while processing the completion request", constants.Error, responseErr.Error())
		p.handleError(w, &serializer.Error{Code: statusCode, Message: responseErr.Error()})
		return
	}

	p.writeJSON(w, http.StatusOK, response)
}

func (p *Plugin) handleGetChatCompletion(w http.ResponseWriter, r *http.Request) {
	body, err := serializer.GetChatCompletionRequestPayloadFromJSON(r.Body)
	if err != nil {
		p.API.LogError("Error occurred while decoding the body for completion", constants.Error, err.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusBadRequest, Message: constants.ErrorInvalidRequestPayload})
		return
	}

	response, statusCode, responseErr := p.Client.GetChatCompletion(body)
	if responseErr != nil {
		p.API.LogWarn("Error occurred while processing the chat completion request", constants.Error, responseErr.Error())
		p.handleError(w, &serializer.Error{Code: statusCode, Message: responseErr.Error()})
		return
	}

	p.writeJSON(w, http.StatusOK, response)
}

func (p *Plugin) handleImageGeneration(w http.ResponseWriter, r *http.Request) {
	body, err := serializer.GetImageGenerationPayloadFromJSON(r.Body)
	if err != nil {
		p.API.LogError("Error occurred while decoding the body for completion", constants.Error, err.Error())
		p.handleError(w, &serializer.Error{Code: http.StatusBadRequest, Message: constants.ErrorInvalidRequestPayload})
		return
	}

	response, statusCode, responseErr := p.Client.GetImage(body)
	if responseErr != nil {
		p.API.LogWarn("Error occurred while generating image", constants.Error, responseErr.Error())
		p.handleError(w, &serializer.Error{Code: statusCode, Message: responseErr.Error()})
		return
	}

	p.writeJSON(w, http.StatusOK, response)
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

func (p *Plugin) checkAuth(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Header.Get(constants.HeaderMattermostUserID)
		if userID == "" {
			p.handleAPIError(w, &serializer.APIErrorResponse{StatusCode: http.StatusUnauthorized, Message: constants.ErrorNotAuthorized})
			return
		}

		handler(w, r)
	}
}
