package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/controllers/base"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"github.com/qkhuyit/rts/rts-api/internal/app/facades"
	"github.com/sirupsen/logrus"
)

type GroupController interface {
	GetGroups(ctx echo.Context) error
	GetGroupById(ctx echo.Context) error
	Delete(ctx echo.Context) error
	Create(ctx echo.Context) error
	Update(ctx echo.Context) error
}

type groupControllerImpl struct {
	base.BaseController
	logger      *logrus.Logger
	groupFacade facades.GroupFacade
}

func NewGroupController(
	logger *logrus.Logger,
	groupFacade facades.GroupFacade,
) GroupController {
	return &groupControllerImpl{
		logger:      logger,
		groupFacade: groupFacade,
	}
}

func (c *groupControllerImpl) GetGroups(ctx echo.Context) error {
	c.logger.Infoln("BEGIN - GetGroups")
	var err error
	defer c.LogEndAction(err, c.logger)

	data, err := c.groupFacade.GetGroups(ctx)
	if err != nil {
		return err
	}
	err = web.SendOK(data, ctx)
	return err
}

func (c *groupControllerImpl) GetGroupById(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetGroups")
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *groupControllerImpl) Delete(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetGroups")
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *groupControllerImpl) Create(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetGroups")
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *groupControllerImpl) Update(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetGroups")
	defer c.LogEndAction(err, c.logger)

	return err
}
