package repositories

import (
	"fmt"
	"github.com/qkhuyit/rts/rts-shared/common/pagination"
	"github.com/qkhuyit/rts/rts-shared/connectors/keycloak"
	"github.com/qkhuyit/rts/rts-shared/core/entities"
	"strconv"
)

const (
	keycloakUserEndpointFormat = "%s/admin/realms/%s/users"
)

type UserRepository interface {
	GetUsers(
		p *pagination.Pagination[entities.UserEntity],
	) (*pagination.Pagination[entities.UserEntity], error)
}

type userRepositoryImpl struct {
	kc keycloak.KeycloakConnector
}

func NewUserRepository(
	keycloakConnector keycloak.KeycloakConnector,
) UserRepository {
	return &userRepositoryImpl{
		kc: keycloakConnector,
	}
}

func (r *userRepositoryImpl) GetUsers(
	p *pagination.Pagination[entities.UserEntity],
) (*pagination.Pagination[entities.UserEntity], error) {
	var users []entities.UserEntity
	endpoint := fmt.Sprintf(keycloakUserEndpointFormat, r.kc.GetEndpoint(), r.kc.GetRealm())

	// Fetch keycloak users
	req, err := r.kc.CreateRequest()
	if err != nil {
		return nil, err
	}

	resp, err := req.
		SetResult(users).
		Get(endpoint)
	if err != nil {
		return nil, err
	}

	rw := string(resp.Body())
	if rw != "nil" {

	}

	// Fetch total rows
	req, err = r.kc.CreateRequest()
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
	return &pagination.Pagination[entities.UserEntity]{
		Rows:      users,
		TotalRows: int64(totalRows),
		Page:      p.Page,
		PageSize:  p.PageSize,
	}, nil
}
