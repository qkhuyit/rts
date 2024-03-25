package mappers

import (
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"github.com/qkhuyit/rts/rts-shared/core/models"
)

type GroupMapper interface {
	MapKeycloakEntity2Model(e *entities.GroupEntity) *models.GroupModel
	MapAllKeycloakEntities2Models(e []entities.GroupEntity) []models.GroupModel
	MapGroupPrivilegeEntities2Models(e *entities.GroupPrivilegeEntity) *models.GroupPrivilegeModel
	MapPagedEntity2Model(paged *pagination.Paged[entities.GroupEntity]) *pagination.Paged[models.GroupModel]
}

type GroupMapperImpl struct {
}

func NewGroupMapper() GroupMapper {
	return &GroupMapperImpl{}
}

func (u *GroupMapperImpl) MapKeycloakEntity2Model(e *entities.GroupEntity) *models.GroupModel {
	description := ""
	status := "0"
	if e.Attributes != nil {
		if v, ok := e.Attributes["Description"]; ok {
			description = v[0]
		}
		if v, ok := e.Attributes["Status"]; ok {
			status = v[0]
		}
	}
	return &models.GroupModel{
		ID:            e.ID,
		Name:          e.Name,
		Path:          e.Path,
		SubGroupCount: e.SubGroupCount,
		SubGroups:     u.MapAllKeycloakEntities2Models(e.SubGroups),
		Privilege:     u.MapGroupPrivilegeEntities2Models(e.Access),
		Description:   description,
		Status:        status,
	}
}

func (u *GroupMapperImpl) MapAllKeycloakEntities2Models(entityList []entities.GroupEntity) []models.GroupModel {
	result := make([]models.GroupModel, len(entityList))

	for i, e := range entityList {
		result[i] = *u.MapKeycloakEntity2Model(&e)
	}

	return result
}

func (u *GroupMapperImpl) MapPagedEntity2Model(paged *pagination.Paged[entities.GroupEntity]) *pagination.Paged[models.GroupModel] {
	return &pagination.Paged[models.GroupModel]{
		Items: u.MapAllKeycloakEntities2Models(paged.Items),
		Meta:  paged.Meta,
	}
}

func (u *GroupMapperImpl) MapGroupPrivilegeEntities2Models(e *entities.GroupPrivilegeEntity) *models.GroupPrivilegeModel {
	return &models.GroupPrivilegeModel{
		View:             e.View,
		ViewMembers:      e.ViewMembers,
		ManageMembers:    e.ManageMembers,
		Manage:           e.Manage,
		ManageMembership: e.ManageMembership,
	}
}
