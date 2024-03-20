package bootstrap

import (
	"github.com/qkhuyit/rts/rts-shared/config"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(config.LoadKeycloakConfig),
)
