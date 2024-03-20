package web

import "github.com/labstack/echo/v4"

type useable interface {
	Setup(e *echo.Echo)
}
