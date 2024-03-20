package v1

import (
	"github.com/labstack/echo/v4"
	v1 "github.com/qkhuyit/rts/rts-api/internal/app/controllers/v1"
	"github.com/sirupsen/logrus"
)

var baseUserAPIEndpointV1 = "/api/v1/users"

type UserRoute struct {
	baseEndPoint   string
	logger         *logrus.Logger
	userController v1.UserController
}

func NewUserRoute(
	userController v1.UserController,
	logger *logrus.Logger,
) *UserRoute {
	return &UserRoute{
		baseEndPoint:   baseUserAPIEndpointV1,
		userController: userController,
		logger:         logger,
	}
}

func (r *UserRoute) Setup(e *echo.Echo) {
	r.logger.Infoln("BEGIN - Setting up user api v1 route endpoints")
	defer r.logger.Infoln("END - Setting up user api v1 route endpoints")

	e.GET(r.baseEndPoint, r.userController.GetUsers)
	r.logger.Infoln("  GET /api/v1/users - Get user list")

	e.POST(r.baseEndPoint, r.userController.Create)
	r.logger.Infoln("  POST /api/v1/users - Create new user")

	e.GET(r.baseEndPoint+"/:id", r.userController.GetOneById)
	r.logger.Infoln("  GET /api/v1/users/:id - Get user detail by id")

	e.PUT(r.baseEndPoint+"/:id", r.userController.Update)
	r.logger.Infoln("  PUT /api/v1/users/:id - Update user info by id")

	e.DELETE(r.baseEndPoint+"/:id", r.userController.DeleteById)
	r.logger.Infoln("  DELETE /api/v1/users/:id - Delete user by id")

	e.GET(r.baseEndPoint+"/profile", r.userController.GetProfile)
	r.logger.Infoln("  DELETE /api/v1/profile - Get user requester profile")

	e.GET(r.baseEndPoint+"/permissions", r.userController.GetPermission)
	r.logger.Infoln("  DELETE /api/v1/permissions - Get user requester allowed permissions")
}
