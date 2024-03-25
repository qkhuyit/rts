package app

import (
	"github.com/qkhuyit/rts/rts-api/internal/app/bootstrap"
	"github.com/qkhuyit/rts/rts-api/internal/app/controllers"
	"github.com/qkhuyit/rts/rts-api/internal/app/core"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"github.com/qkhuyit/rts/rts-api/internal/app/facades"
	"github.com/qkhuyit/rts/rts-api/internal/app/middlewares"
	"github.com/qkhuyit/rts/rts-api/internal/app/routes"
	"github.com/qkhuyit/rts/rts-shared/connectors"
	"github.com/qkhuyit/rts/rts-shared/repositories"
	"github.com/qkhuyit/rts/rts-shared/services"
	"go.uber.org/fx"
)

var App = fx.New(
	bootstrap.Module,
	connectors.Module,
	repositories.Module,
	services.Module,
	core.Module,
	facades.Module,
	controllers.Module,
	routes.Module,
	middlewares.Module,

	fx.Invoke(func(lc fx.Lifecycle, s web.Server) {
		lc.Append(fx.Hook{
			OnStart: s.Start,
			OnStop:  s.Stop,
		})
	}),
)
