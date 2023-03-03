package plugin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/pkg/errors"

	"github.com/mattermost/mattermost-plugin-open-ai/server/constants"
)

type Client interface {
}

type client struct {
	plugin     *Plugin
	HTTPClient *http.Client
}

// Wrapper to make REST API requests with "application/json" type content
func (c *client) callJSON(url, path, method string, in, out interface{}) (responseData []byte, err error) {
	contentType := "application/json"
	buf := &bytes.Buffer{}
	err = json.NewEncoder(buf).Encode(in)
	if err != nil {
		return nil, err
	}
	return c.call(url, method, path, contentType, buf, out)
}

// Makes HTTP request to REST APIs
func (c *client) call(basePath, method, path, contentType string, inBody io.Reader, out interface{}) (responseData []byte, err error) {
	errContext := fmt.Sprintf("Wellsite WITSML: Call failed: method:%s, path:%s", method, path)
	pathURL, err := url.Parse(path)
	if err != nil {
		return nil, errors.WithMessage(err, errContext)
	}

	if pathURL.Scheme == "" || pathURL.Host == "" {
		var baseURL *url.URL
		baseURL, err = url.Parse(basePath)
		if err != nil {
			return nil, errors.WithMessage(err, errContext)
		}
		if path[0] != '/' {
			path = "/" + path
		}
		path = baseURL.String() + path
	}

	req, err := http.NewRequest(method, path, inBody)
	if err != nil {
		return nil, err
	}
	if contentType != "" {
		req.Header.Add("Content-Type", contentType)
	}

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}

	if resp.Body == nil {
		return nil, nil
	}
	defer resp.Body.Close()

	responseData, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	switch resp.StatusCode {
	case http.StatusOK, http.StatusCreated:
		if out != nil {
			err = json.Unmarshal(responseData, out)
			if err != nil {
				return responseData, err
			}
		}
		return responseData, nil

	case http.StatusNoContent:
		return nil, nil

	case http.StatusNotFound:
		return nil, errors.Errorf("not found")
	}

	// TODO: Refactor the below code when proper error handling is done on the Wellsite APIs
	// for now we are sending a generic error message in case of any error

	// type ErrorResponse struct {
	// 	Message string `json:"message"`
	// }
	// errResp := ErrorResponse{}
	// err = json.Unmarshal(responseData, &errResp)
	// if err != nil {
	// 	return nil, errors.New(constants.GenericErrorMessage)
	// }
	return responseData, errors.New(constants.GenericErrorMessage)
}

func InitClient(p *Plugin) Client {
	return &client{
		plugin:     p,
		HTTPClient: &http.Client{},
	}
}
