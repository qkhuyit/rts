package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/facades"
	"net/http"
)

type UserController interface {
	GetProfile(ctx echo.Context) error
	GetUsers(ctx echo.Context) error
	GetOneById(ctx echo.Context) error
	DeleteById(ctx echo.Context) error
	Update(ctx echo.Context) error
	Create(ctx echo.Context) error
}

type userControllerImpl struct {
	userFacade facades.UserFacade
}

func NewUserController(
	userFacade facades.UserFacade,
) UserController {
	return &userControllerImpl{
		userFacade: userFacade,
	}
}

func (c userControllerImpl) GetProfile(ctx echo.Context) error {
	return nil
}

func (c userControllerImpl) GetUsers(ctx echo.Context) error {
	ctx.QueryParams()
	data, err := c.userFacade.GetUsers(ctx)
	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, data)
}

func (c userControllerImpl) GetOneById(ctx echo.Context) error {
	return nil
}

func (c userControllerImpl) DeleteById(ctx echo.Context) error {
	return nil
}

func (c userControllerImpl) Update(ctx echo.Context) error {
	return nil
}

func (c userControllerImpl) Create(ctx echo.Context) error {
	return nil
}
