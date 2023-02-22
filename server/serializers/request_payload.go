package serializers

type WellsiteRequestPayload struct {
	ConnectionParameters ConnectionParameters `json:"connectionParameters"`
	Operation            string               `json:"operation"`
}

type ConnectionParameters struct {
	SourceName string `json:"sourceName"`
	Username   string `json:"username"`
}

// Request payload for all the Wellsite APIs is the same except for the field "Operation"
// Use this function to get the request payload for different operations
func GetRequestPayload(operation string) WellsiteRequestPayload {
	// TODO: Get "SourceName" and "Username" from the KV store
	return WellsiteRequestPayload{
		ConnectionParameters: ConnectionParameters{SourceName: "NOV Server", Username: "chris.ely"},
		Operation:            operation,
	}
}
