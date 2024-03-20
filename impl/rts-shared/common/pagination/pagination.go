package pagination

type Pagination[T any] struct {
	PageSize    int    `json:"pageSize" query:"pageSize"`
	Page        int    `json:"page" query:"page"`
	Rows        []T    `json:"rows"`
	TotalRows   int64  `json:"totalRows"`
	TotalPage   int    `json:"totalPage"`
	Sorts       string `json:"sorts" query:"sorts"`
	Filter      string `json:"filter" query:"filter"`
	QueryParams map[string][]string
}
