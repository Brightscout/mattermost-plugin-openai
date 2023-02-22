package plugin

import (
	"encoding/json"
	"net/http"
	"path/filepath"
	"runtime/debug"

	"github.com/gorilla/mux"

	"github.com/mattermost/mattermost-plugin-wellsite-witsml/server/constants"
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

	// TODO: for testing purpose, remove later
	s.HandleFunc("/test", p.testAPI).Methods(http.MethodGet)
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

// TODO: for testing purpose, remove later
func (p *Plugin) testAPI(w http.ResponseWriter, r *http.Request) {
	// TODO: remove later
	wells, err := p.Client.GetWellList()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	res, _ := json.Marshal(wells)
	w.Header().Add("Content-Type", "application/json")
	if _, err := w.Write(res); err != nil {
		p.API.LogError("Error while writing response", "Error", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// Handles the static files under the assets directory.
func (p *Plugin) HandleStaticFiles() {
	bundlePath, err := p.API.GetBundlePath()
	if err != nil {
		p.API.LogWarn("Failed to get bundle path.", "Error", err.Error())
		return
	}

	// This will serve static files from the 'assets' directory under '/static/<filename>'
	p.router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(filepath.Join(bundlePath, "assets")))))
}
