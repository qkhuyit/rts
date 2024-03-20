package v1

import (
	"github.com/labstack/echo/v4"
	v1 "github.com/qkhuyit/rts/rts-api/internal/app/controllers/v1"
	"github.com/sirupsen/logrus"
)

type RoleRoute struct {
	baseEndPoint   string
	logger         *logrus.Logger
	roleController v1.RoleController
}

func NewRoleRoute(
	roleController v1.RoleController,
	logger *logrus.Logger,
) *RoleRoute {
	return &RoleRoute{
		baseEndPoint:   "/api/v1/roles",
		roleController: roleController,
		logger:         logger,
	}
}

func (r *RoleRoute) Setup(e *echo.Echo) {
	r.logger.Infoln("BEGIN - Setting up user api v1 route endpoints")
	defer r.logger.Infoln("END - Setting up user api v1 route endpoints")

	e.GET(r.baseEndPoint, r.roleController.GetRoles)
	e.POST(r.baseEndPoint, r.roleController.Create)
	e.GET(r.baseEndPoint+"/:id", r.roleController.GetRoleById)
	e.PUT(r.baseEndPoint+"/:id", r.roleController.Update)
	e.DELETE(r.baseEndPoint+"/:id", r.roleController.Delete)
}
