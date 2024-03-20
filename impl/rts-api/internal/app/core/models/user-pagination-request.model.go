package models

import "github.com/qkhuyit/rts/rts-shared/common/pagination"

type UserPaginationRequestModel struct {
	pagination.Base
	UserName  string `json:"userName" query:"userName"`
	FirstName string `json:"firstName" query:"firstName"`
	LastName  string `json:"lastName" query:"lastName"`
	Email     string `json:"email" query:"email"`
}

func (m *UserPaginationRequestModel) GetQueryParams() map[string]string {
	return map[string]string{
		"firstName": m.FirstName,
		"lastName":  m.LastName,
		"username":  m.UserName,
		"email":     m.Email,
	}
}
