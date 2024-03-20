package middlewares

import (
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(NewHealthCheckMiddleware),
	fx.Invoke(middlewaresRegister),
)

func middlewaresRegister(
	server web.Server,
	healthCheckMiddleware *HealthCheckMiddleware,
) {
	server.Use(healthCheckMiddleware)
}
