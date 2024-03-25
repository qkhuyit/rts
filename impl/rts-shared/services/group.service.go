package services

import (
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"github.com/qkhuyit/rts/rts-shared/repositories"
	"github.com/sirupsen/logrus"
)

type GroupService interface {
	GetGroups(p pagination.Request) (*pagination.Paged[entities.GroupEntity], error)
}

type groupServiceImpl struct {
	logger    *logrus.Logger
	groupRepo repositories.GroupRepository
}

func NewGroupService(
	logger *logrus.Logger,
	groupRepo repositories.GroupRepository,
) GroupService {
	return &groupServiceImpl{
		logger:    logger,
		groupRepo: groupRepo,
	}
}

func (r *groupServiceImpl) GetGroups(
	p pagination.Request,
) (*pagination.Paged[entities.GroupEntity], error) {
	return r.groupRepo.GetGroups(p)
}
