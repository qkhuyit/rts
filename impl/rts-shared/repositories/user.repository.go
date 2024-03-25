package repositories

import (
	"fmt"
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/connectors/keycloak"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"github.com/sirupsen/logrus"
	"strconv"
)

const (
	keycloakUserEndpointFormat = "%s/admin/realms/%s/users"
)

type UserRepository interface {
	GetUsers(
		p pagination.Request,
	) (*pagination.Paged[entities.UserEntity], error)
}

type userRepositoryImpl struct {
	kc     keycloak.KeycloakConnector
	logger *logrus.Logger
}

func NewUserRepository(
	logger *logrus.Logger,
	keycloakConnector keycloak.KeycloakConnector,
) UserRepository {
	return &userRepositoryImpl{
		kc:     keycloakConnector,
		logger: logger,
	}
}

func (r *userRepositoryImpl) GetUsers(
	p pagination.Request,
) (*pagination.Paged[entities.UserEntity], error) {
	var users []entities.UserEntity
	endpoint := fmt.Sprintf(keycloakUserEndpointFormat, r.kc.GetEndpoint(), r.kc.GetRealm())

	// Fetch keycloak users
	req, err := r.kc.CreateRequest(p.GetQueryParams())
	if err != nil {
		r.logger.Error("failed to create keycloak request, err: ", err)
		return nil, err
	}

	if _, err := req.
		SetResult(&users).
		Get(endpoint); err != nil {
		return nil, err
	}

	// Fetch total rows
	req, err = r.kc.CreateRequest(p.GetQueryParams())
	count, err := req.Get(endpoint + "/count")
	if err != nil {
		return nil, err
	}

	//Convert resp from raw body string to number
	totalRows, err := strconv.Atoi(string(count.Body()))
	if err != nil {
		return nil, err
	}

	// Return paging result
	return &pagination.Paged[entities.UserEntity]{
		Items: users,
		Meta: pagination.PagedMeta{
			ItemCount:    totalRows,
			ItemsPerPage: p.GetLimit(),
			CurrentPage:  p.GetOffset(),
			TotalPages:   1,
		},
	}, nil
}
