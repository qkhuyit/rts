package v1

import (
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(NewUserController),
	fx.Provide(NewSystemController),
	fx.Provide(NewGroupController),
	fx.Provide(NewRoleController),
)
