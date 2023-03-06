package serializer

// Error struct to store error IDs and error messages.
type APIErrorResponse struct {
	ID         string `json:"id"`
	Message    string `json:"message"`
	StatusCode int    `json:"-"`
}
