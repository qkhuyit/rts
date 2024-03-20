package controllers

import (
	"github.com/qkhuyit/rts/rts-api/internal/app/controllers/v1"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Options(v1.Module),
)
