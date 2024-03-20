package middlewares

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

type HealthCheckMiddleware struct {
}

func NewHealthCheckMiddleware() *HealthCheckMiddleware {
	return &HealthCheckMiddleware{}
}

func (r HealthCheckMiddleware) handleHealthCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if c.Request().URL.Path == "/_health" {
			return c.String(http.StatusOK, "Service is healthy !")
		}

		return next(c)
	}
}

func (r HealthCheckMiddleware) Setup(e *echo.Echo) {
	e.Use(r.handleHealthCheck)
}
