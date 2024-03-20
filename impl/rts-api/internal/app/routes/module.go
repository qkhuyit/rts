package routes

import (
	v1 "github.com/qkhuyit/rts/rts-api/internal/app/routes/v1"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Options(v1.Module),
)
