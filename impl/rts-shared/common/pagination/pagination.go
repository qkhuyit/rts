package pagination

type Request interface {
	GetQueryParams() map[string]string
	GetLimit() int
	GetOffset() int
}

type Base struct {
	PageSize int    `json:"pageSize" query:"pageSize"`
	Page     int    `json:"page" query:"page"`
	Sorts    string `json:"sorts" query:"sorts"`
	Filter   string `json:"filter" query:"filter"`
}

type Paged[T any] struct {
	Items []T       `json:"items"`
	Meta  PagedMeta `json:"meta"`
}

type PagedMeta struct {
	ItemCount    int `json:"itemCount"`
	TotalItems   int `json:"totalItems"`
	ItemsPerPage int `json:"itemsPerPage"`
	TotalPages   int `json:"totalPages"`
	CurrentPage  int `json:"currentPage"`
}

func (base *Base) GetOffset() int {
	return (base.GetPage() - 1) * base.GetLimit()
}

func (base *Base) GetLimit() int {
	if base.PageSize > 0 {
		return base.PageSize
	}

	return 10
}

func (base *Base) GetPage() int {
	if base.Page == 0 {
		return 1
	}

	return base.Page
}
