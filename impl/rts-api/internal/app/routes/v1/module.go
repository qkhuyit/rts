package v1

import (
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(NewUserRoute),
	fx.Invoke(registerRoutes),
)

func registerRoutes(
	server web.Server,
	userRoute *UserRoute,
) {
	server.Use(userRoute)
}
