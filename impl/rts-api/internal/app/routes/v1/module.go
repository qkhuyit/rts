package v1

import (
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(NewUserRoute),
	fx.Provide(NewSystemRoute),
	fx.Provide(NewGroupRoute),
	fx.Provide(NewRoleRoute),
	fx.Invoke(registerRoutes),
)

func registerRoutes(
	server web.Server,
	userRoute *UserRoute,
	systemRoute *SystemRoute,
	groupRoute *GroupRoute,
	roleRoute *RoleRoute,
) {
	server.Use(userRoute)
	server.Use(systemRoute)
	server.Use(groupRoute)
	server.Use(roleRoute)
}
