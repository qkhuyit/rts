package web

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func SendOK(data any, ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, ResponseModel{
		Code:        http.StatusOK,
		Data:        data,
		Message:     "Success",
		MessageCode: "SUCCESS",
	})
}
