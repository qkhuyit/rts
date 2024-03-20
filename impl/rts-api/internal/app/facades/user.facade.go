package facades

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/models"
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/core/mappers"
	coreModels "github.com/qkhuyit/rts/rts-shared/core/models"
	"github.com/qkhuyit/rts/rts-shared/repositories"
	"github.com/sirupsen/logrus"
)

type UserFacade interface {
	GetUsers(ctx echo.Context) (*pagination.Paged[*coreModels.UserModel], error)
}

type userFacadeImpl struct {
	logger         *logrus.Logger
	userRepository repositories.UserRepository
	userMapper     mappers.UserMapper
}

func NewUserFacade(
	logger *logrus.Logger,
	userRepository repositories.UserRepository,
) UserFacade {
	return &userFacadeImpl{
		logger:         logger,
		userRepository: userRepository,
		userMapper:     mappers.NewUserMapper(),
	}
}

func (userFacade *userFacadeImpl) GetUsers(ctx echo.Context) (*pagination.Paged[*coreModels.UserModel], error) {
	var userPaginationRequestModel models.UserPaginationRequestModel
	err := ctx.Bind(&userPaginationRequestModel)
	if err != nil {
		userFacade.logger.Error("failed to bind request query params to [models.UserPaginationRequestModel], err: ", err)
		return nil, err
	}

	paged, err := userFacade.userRepository.GetUsers(&userPaginationRequestModel)

	if err != nil {
		return nil, err
	}

	return userFacade.userMapper.MapPagedEntity2Model(paged), nil
}
