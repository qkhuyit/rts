package v1

import "github.com/labstack/echo/v4"

type SystemController interface {
	GetSystemMenus(ctx echo.Context) error
}

type systemControllerImpl struct {
}

func NewSystemController() SystemController {
	return &systemControllerImpl{}
}

func (c *systemControllerImpl) GetSystemMenus(ctx echo.Context) error {
	return nil
}
