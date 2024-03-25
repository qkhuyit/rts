package models

import "github.com/qkhuyit/rts/rts-shared/common/pagination"

type GroupPaginationRequestModel struct {
	pagination.Base
	Search string `json:"-" query:"search"`
}

func (m *GroupPaginationRequestModel) GetQueryParams() map[string]string {
	return map[string]string{
		"search":              m.Search,
		"briefRepresentation": "true",
	}
}
