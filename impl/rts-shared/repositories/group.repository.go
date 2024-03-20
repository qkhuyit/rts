package repositories

import (
	"fmt"
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/connectors/keycloak"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"github.com/sirupsen/logrus"
)

const (
	keycloakGroupEndpointFormat = "%s/admin/realms/%s/groups"
)

type GroupRepository interface {
	GetGroups(p pagination.Request) (*pagination.Paged[entities.GroupEntity], error)
}

type groupRepositoryImpl struct {
	kc     keycloak.KeycloakConnector
	logger *logrus.Logger
}

func NewGroupRepository(
	kc keycloak.KeycloakConnector,
	logger *logrus.Logger,
) GroupRepository {
	return &groupRepositoryImpl{
		kc:     kc,
		logger: logger,
	}
}

func (r *groupRepositoryImpl) GetGroups(
	p pagination.Request,
) (*pagination.Paged[entities.GroupEntity], error) {
	var groups []entities.GroupEntity
	endpoint := fmt.Sprintf(keycloakGroupEndpointFormat, r.kc.GetEndpoint(), r.kc.GetRealm())

	// Fetch keycloak users
	req, err := r.kc.CreateRequest(p.GetQueryParams())
	if err != nil {
		r.logger.Error("failed to create keycloak request, err: ", err)
		return nil, err
	}

	if _, err := req.
		SetResult(&groups).
		Get(endpoint); err != nil {
		return nil, err
	}

	// Fetch total rows
	var groupCountEntity entities.GroupCountEntity
	req, err = r.kc.CreateRequest(p.GetQueryParams())
	req.SetResult(&groupCountEntity)
	_, err = req.Get(endpoint + "/count?top=true")
	if err != nil {
		return nil, err
	}

	// Return paging result
	return &pagination.Paged[entities.GroupEntity]{
		Items: groups,
		Meta: pagination.PagedMeta{
			ItemCount:    groupCountEntity.Count,
			ItemsPerPage: p.GetLimit(),
			CurrentPage:  p.GetOffset(),
			TotalPages:   1,
		},
	}, nil
}
