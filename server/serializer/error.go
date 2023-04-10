package serializer

// Error struct to store error IDs and error messages.
type APIErrorResponse struct {
	ID         string `json:"id"`
	Message    string `json:"message"`
	StatusCode int    `json:"-"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

// Error struct to return error code and error message to HTTP client.
type Error struct {
	Code    int
	Message string
}
