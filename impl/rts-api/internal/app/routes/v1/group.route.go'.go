package v1

import (
	"github.com/labstack/echo/v4"
	v1 "github.com/qkhuyit/rts/rts-api/internal/app/controllers/v1"
	"github.com/sirupsen/logrus"
)

type GroupRoute struct {
	baseEndPoint    string
	logger          *logrus.Logger
	groupController v1.GroupController
}

func NewGroupRoute(
	groupController v1.GroupController,
	logger *logrus.Logger,
) *GroupRoute {
	return &GroupRoute{
		baseEndPoint:    "/api/v1/groups",
		groupController: groupController,
		logger:          logger,
	}
}

func (r *GroupRoute) Setup(e *echo.Echo) {
	r.logger.Infoln("BEGIN - Setting up group api v1 route endpoints")
	defer r.logger.Infoln("END - Setting up group api v1 route endpoints")

	e.GET(r.baseEndPoint, r.groupController.GetGroups)
	e.POST(r.baseEndPoint, r.groupController.Create)
	e.GET(r.baseEndPoint+"/:id", r.groupController.GetGroupById)
	e.DELETE(r.baseEndPoint+"/:id", r.groupController.Delete)
	e.PUT(r.baseEndPoint+"/:id", r.groupController.Update)
}
