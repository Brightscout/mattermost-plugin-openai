package plugin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/mattermost/mattermost-plugin-OpenAI/server/constants"
	"github.com/mattermost/mattermost-plugin-OpenAI/server/serializer"
	"github.com/pkg/errors"
)

type Client interface {
	GetCompletion(payload *serializer.CompletionRequestPayload) (*serializer.CompletionResponsePayload, int, error)
	GetChatCompletion(payload *serializer.ChatCompletionRequestPayload) (*serializer.ChatCompletionResponsePayload, int, error)
	GetImage(payload *serializer.ImageGenerationRequestPayload) (*serializer.ImageGenerationResponsePayload, int, error)
}

type client struct {
	plugin     *Plugin
	httpClient *http.Client
}

func (c *client) GetCompletion(payload *serializer.CompletionRequestPayload) (*serializer.CompletionResponsePayload, int, error) {
	var response serializer.CompletionResponsePayload
	_, statusCode, err := c.CallJSON(c.plugin.getConfiguration().OpenAIAPIBaseURL, constants.OpenAIPathCompletion, http.MethodPost, &payload, &response, nil)
	if err != nil {
		return nil, statusCode, err
	}

	return &response, statusCode, nil
}

func (c *client) GetChatCompletion(payload *serializer.ChatCompletionRequestPayload) (*serializer.ChatCompletionResponsePayload, int, error) {
	var response serializer.ChatCompletionResponsePayload
	_, statusCode, err := c.CallJSON(c.plugin.getConfiguration().OpenAIAPIBaseURL, constants.OpenAIPathChatCompletion, http.MethodPost, &payload, &response, nil)
	if err != nil {
		return nil, statusCode, err
	}

	return &response, statusCode, nil
}

func (c *client) GetImage(payload *serializer.ImageGenerationRequestPayload) (*serializer.ImageGenerationResponsePayload, int, error) {
	var response serializer.ImageGenerationResponsePayload
	_, statusCode, err := c.CallJSON(c.plugin.getConfiguration().OpenAIAPIBaseURL, constants.OpenAIPathImageGeneration, http.MethodPost, &payload, &response, nil)
	if err != nil {
		return nil, statusCode, err
	}

	return &response, statusCode, nil
}

// Wrapper to make REST API requests with "application/json" type content
func (c *client) CallJSON(url, path, method string, in, out interface{}, formValues url.Values) (responseData []byte, statusCode int, err error) {
	contentType := "application/json"
	buf := &bytes.Buffer{}
	if err = json.NewEncoder(buf).Encode(in); err != nil {
		return nil, http.StatusInternalServerError, err
	}
	return c.Call(url, method, path, contentType, buf, out, formValues)
}

// Makes HTTP request to REST APIs
func (c *client) Call(basePath, method, path, contentType string, inBody io.Reader, out interface{}, formValues url.Values) (responseData []byte, statusCode int, err error) {
	errContext := fmt.Sprintf("Example client: Call failed: method:%s, path:%s", method, path)
	pathURL, err := url.Parse(path)
	if err != nil {
		return nil, http.StatusInternalServerError, errors.WithMessage(err, errContext)
	}

	if pathURL.Scheme == "" || pathURL.Host == "" {
		var baseURL *url.URL
		baseURL, err = url.Parse(basePath)
		if err != nil {
			return nil, http.StatusInternalServerError, errors.WithMessage(err, errContext)
		}
		if path[0] != '/' {
			path = "/" + path
		}
		path = baseURL.String() + path
	}

	var req *http.Request
	if formValues != nil {
		req, err = http.NewRequest(method, path, strings.NewReader(formValues.Encode()))
		if err != nil {
			return nil, http.StatusInternalServerError, err
		}
	} else {
		req, err = http.NewRequest(method, path, inBody)
		if err != nil {
			return nil, http.StatusInternalServerError, err
		}
	}

	if contentType != "" {
		req.Header.Add("Content-Type", contentType)
	}

	req.Header.Add(constants.OpenAIHeaderAuthorization, fmt.Sprintf(constants.OpenAIHeaderAuthorizationBearer, c.plugin.getConfiguration().OpenAIAPIKey))
	req.Header.Add(constants.OpenAIHeaderOrganization, c.plugin.getConfiguration().OpenAIOrganizationID)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	if resp.Body == nil {
		return nil, resp.StatusCode, nil
	}
	defer resp.Body.Close()

	responseData, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	switch resp.StatusCode {
	case http.StatusOK, http.StatusCreated:
		if out != nil {
			if err = json.Unmarshal(responseData, out); err != nil {
				return responseData, http.StatusInternalServerError, err
			}
		}
		return responseData, resp.StatusCode, nil

	case http.StatusNoContent:
		return nil, resp.StatusCode, nil

	case http.StatusNotFound:
		return nil, resp.StatusCode, ErrNotFound
	}

	errResp := serializer.ErrorResponse{}
	if err = json.Unmarshal(responseData, &errResp); err != nil {
		return responseData, http.StatusInternalServerError, errors.WithMessagef(err, "status: %s", resp.Status)
	}
	return responseData, resp.StatusCode, fmt.Errorf("errorMessage %s", errResp.Message)
}

func InitClient(p *Plugin) Client {
	return &client{
		plugin:     p,
		httpClient: &http.Client{},
	}
}
