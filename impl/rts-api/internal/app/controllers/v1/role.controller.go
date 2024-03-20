package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/controllers/base"
	"github.com/sirupsen/logrus"
)

type RoleController interface {
	GetRoles(ctx echo.Context) error
	GetRoleById(ctx echo.Context) error
	Delete(ctx echo.Context) error
	Create(ctx echo.Context) error
	Update(ctx echo.Context) error
}

type roleControllerImpl struct {
	base.BaseController
	logger *logrus.Logger
}

func NewRoleController(
	logger *logrus.Logger,
) RoleController {
	return &roleControllerImpl{
		logger: logger,
	}
}

func (c *roleControllerImpl) GetRoles(ctx echo.Context) error {
	c.logger.Infoln("BEGIN - GetRoles")
	var err error
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *roleControllerImpl) GetRoleById(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetRoles")
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *roleControllerImpl) Delete(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetRoles")
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *roleControllerImpl) Create(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetRoles")
	defer c.LogEndAction(err, c.logger)

	return err
}

func (c *roleControllerImpl) Update(ctx echo.Context) error {
	var err error
	c.logger.Infoln("BEGIN - GetRoles")
	defer c.LogEndAction(err, c.logger)

	return err
}
