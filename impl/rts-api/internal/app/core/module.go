package core

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/config"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"github.com/qkhuyit/rts/rts-shared/core/logger"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(echo.New),
	fx.Provide(config.LoadAppConfig),
	fx.Provide(logger.NewLogger),
	fx.Provide(web.NewServer),
)
