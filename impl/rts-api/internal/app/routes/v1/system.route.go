package v1

import (
	"github.com/labstack/echo/v4"
	v1 "github.com/qkhuyit/rts/rts-api/internal/app/controllers/v1"
	"github.com/sirupsen/logrus"
)

var baseSystemAPIEndpointV1 = "/api/v1/system"

type SystemRoute struct {
	baseEndPoint     string
	logger           *logrus.Logger
	systemController v1.SystemController
}

func NewSystemRoute(
	systemController v1.SystemController,
	logger *logrus.Logger,
) *SystemRoute {
	return &SystemRoute{
		baseEndPoint:     baseSystemAPIEndpointV1,
		systemController: systemController,
		logger:           logger,
	}
}

func (r *SystemRoute) Setup(e *echo.Echo) {
	r.logger.Infoln("BEGIN - Setting up user api v1 route endpoints")
	defer r.logger.Infoln("END - Setting up user api v1 route endpoints")

	e.GET(r.baseEndPoint+"/info", r.systemController.GetSystemInfo)
	r.logger.Infoln("  GET /api/v1/system/info - Get system info")
}
