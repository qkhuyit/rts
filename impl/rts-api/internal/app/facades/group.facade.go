package facades

import (
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/models"
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/core/mappers"
	coreModels "github.com/qkhuyit/rts/rts-shared/core/models"
	"github.com/qkhuyit/rts/rts-shared/services"
	"github.com/sirupsen/logrus"
)

type GroupFacade interface {
	GetGroups(ctx echo.Context) (*pagination.Paged[coreModels.GroupModel], error)
}

type groupFacadeImpl struct {
	logger       *logrus.Logger
	groupService services.GroupService
	mapper       mappers.GroupMapper
}

func NewGroupFacade(
	logger *logrus.Logger,
	groupService services.GroupService,
) GroupFacade {
	return &groupFacadeImpl{
		logger:       logger,
		groupService: groupService,
		mapper:       mappers.NewGroupMapper(),
	}
}

func (g *groupFacadeImpl) GetGroups(ctx echo.Context) (*pagination.Paged[coreModels.GroupModel], error) {
	var paginationReq models.GroupPaginationRequestModel
	err := ctx.Bind(&paginationReq)
	if err != nil {
		g.logger.Error("failed to bind request query params to [models.GroupPaginationRequestModel], err: ", err)
		return nil, err
	}

	paged, err := g.groupService.GetGroups(&paginationReq)

	if err != nil {
		return nil, err
	}

	return g.mapper.MapPagedEntity2Model(paged), nil
}
