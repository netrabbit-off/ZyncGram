package models

type Response struct {
	Error bool        `json:"error"`
	Data  interface{} `json:"data"`
}

type ErrorResponse struct {
	Error     bool  `json:"error"`
	ErrorText error `json:"error_text`
}
