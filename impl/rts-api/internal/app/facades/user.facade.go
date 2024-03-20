package facades

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"github.com/qkhuyit/rts/rts-shared/repositories"
)

type UserFacade interface {
	GetUsers(ctx echo.Context) (*pagination.Pagination[entities.UserEntity], error)
}

type userFacadeImpl struct {
	userRepository repositories.UserRepository
}

func NewUserFacade(
	userRepository repositories.UserRepository,
) UserFacade {
	return &userFacadeImpl{
		userRepository: userRepository,
	}
}

func (u userFacadeImpl) GetUsers(ctx echo.Context) (*pagination.Pagination[entities.UserEntity], error) {
	return u.userRepository.GetUsers(&pagination.Pagination[entities.UserEntity]{
		Page:     0,
		PageSize: 10,
	})
}
