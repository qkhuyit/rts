package web

type ResponseModel struct {
	Data        any    `json:"data"`
	Code        int    `json:"code"`
	Message     string `json:"message"`
	MessageCode string `json:"messageCode"`
}
