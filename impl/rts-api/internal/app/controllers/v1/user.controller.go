package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/models"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/web"
	"github.com/qkhuyit/rts/rts-api/internal/app/facades"
	"net/http"
)

type UserController interface {
	GetUsers(ctx echo.Context) error
	GetOneById(ctx echo.Context) error
	DeleteById(ctx echo.Context) error
	Update(ctx echo.Context) error
	Create(ctx echo.Context) error
	GetProfile(ctx echo.Context) error
	GetPermission(ctx echo.Context) error
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

func (c userControllerImpl) GetUsers(ctx echo.Context) error {
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

func (c *userControllerImpl) GetProfile(ctx echo.Context) error {
	return web.SendOK(models.ProfileModel{
		ID:       1,
		Username: "admin",
		Nickname: "bqy",
		Avatar:   "https://thirdqq.qlogo.cn/g?b=qq&s=100&nk=1743369777",
		Email:    "1743369777@qq.com",
		Phone:    "10086",
		Remark:   "管理",
		Status:   1,
		Roles: []models.AssignedRoleModel{
			{
				ID:      1,
				Name:    "管理员",
				Value:   "admin",
				Remark:  "超级管理员",
				Default: nil,
				Status:  1,
			},
		},
	}, ctx)
}

func (c *userControllerImpl) GetPermission(ctx echo.Context) error {
	return web.SendOK([]string{
		"system:user:list",
		"system:role:list",
		"system:menu:list",
		"system:online:list",
		"system:log:login:list",
		"system:serve:stat",
		"system:task:list",
		"system:user:create",
		"system:user:delete",
		"system:user:update",
		"system:user:read",
		"system:role:create",
		"system:role:delete",
		"system:role:update",
		"system:role:read",
		"system:menu:create",
		"system:menu:delete",
		"system:menu:update",
		"system:menu:read",
		"system:online:kick",
		"system:task:create",
		"system:task:delete",
		"system:task:once",
		"system:task:read",
		"system:task:start",
		"system:task:stop",
		"system:task:update",
		"system:log:task:list",
		"system:tools:email",
		"tools:email:send",
		"tool:storage:list",
		"upload:upload",
		"tool:storage:delete",
		"system:user:password",
		"system:dict-type:list",
		"system:dict-type:create",
		"system:dict-type:update",
		"system:dict-type:delete",
		"system:dict-type:info",
		"system:dept:list",
		"system:dept:create",
		"system:dept:update",
		"system:dept:delete",
		"system:dept:read",
		"app:health:network",
		"app:health: database",
		"system:param-config:list",
		"system:param-config:read",
		"system:param-config:create",
		"system:param-config:update",
		"system:param-config:delete",
		"system:dict-item:list",
		"system:dict-item:create",
		"system:dict-item:update",
		"system:dict-item:delete",
		"system:dict-item:info",
		"netdisk:manage:list",
		"netdisk:manage:create",
		"netdisk:manage:read",
		"netdisk:manage:update",
		"netdisk:manage:delete",
		"netdisk:manage:token",
		"netdisk:manage:mark",
		"netdisk:manage:download",
		"netdisk:manage:rename",
		"netdisk:manage:copy",
		"netdisk:manage:cut",
		"netdisk:overview:desc",
	}, ctx)
}
