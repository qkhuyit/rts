package mappers

import (
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"github.com/qkhuyit/rts/rts-shared/core/models"
	"math"
)

type UserMapper interface {
	MapKeycloakEntity2Model(e *entities.UserEntity) *models.UserModel
	MapAllKeycloakEntities2Models(e []entities.UserEntity) []*models.UserModel
	MapPagedEntity2Model(paged *pagination.Paged[entities.UserEntity]) *pagination.Paged[*models.UserModel]
}

type userMapperImpl struct {
}

func NewUserMapper() UserMapper {
	return &userMapperImpl{}
}

func (u userMapperImpl) MapKeycloakEntity2Model(e *entities.UserEntity) *models.UserModel {
	return &models.UserModel{
		Id:            e.ID,
		UserName:      e.Username,
		Email:         e.Email,
		Enable:        e.Enabled,
		EmailVerified: e.EmailVerified,
		FirstName:     e.FirstName,
		LastName:      e.LastName,
	}
}

func (u userMapperImpl) MapAllKeycloakEntities2Models(entityList []entities.UserEntity) []*models.UserModel {
	result := make([]*models.UserModel, len(entityList))

	for i, e := range entityList {
		result[i] = u.MapKeycloakEntity2Model(&e)
	}

	return result
}

func (u userMapperImpl) MapPagedEntity2Model(paged *pagination.Paged[entities.UserEntity]) *pagination.Paged[*models.UserModel] {
	return &pagination.Paged[*models.UserModel]{
		TotalRows: paged.TotalRows,
		TotalPage: int(math.Ceil(float64(paged.TotalRows) / float64(paged.PageSize))),
		Rows:      u.MapAllKeycloakEntities2Models(paged.Rows),
		PageSize:  paged.PageSize,
		Page:      paged.Page,
	}
}
