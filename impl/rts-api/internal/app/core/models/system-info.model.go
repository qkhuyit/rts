package models

type SystemInfoModel struct {
	Name        string            `json:"name"`
	Title       string            `json:"title"`
	Status      int               `json:"status"`
	Description string            `json:"description"`
	Menus       []SystemMenuModel `json:"menus"`
}

type SystemMenuModel struct {
	ID        int                  `json:"id"`
	Path      string               `json:"path"`
	Component string               `json:"component"`
	Name      string               `json:"name"`
	Redirect  string               `json:"redirect,omitempty"`
	Meta      *SystemMenuMetaModel `json:"meta,omitempty"`
	Children  []SystemMenuModel    `json:"children,omitempty"`
}

type SystemMenuMetaModel struct {
	Title       string `json:"title"`
	Icon        string `json:"icon"`
	IsExt       bool   `json:"isExt"`
	ExtOpenMode int    `json:"extOpenMode"`
	Type        int    `json:"type"`
	OrderNo     int    `json:"orderNo"`
	Show        int    `json:"show"`
	ActiveMenu  any    `json:"activeMenu"`
	Status      int    `json:"status"`
	KeepAlive   int    `json:"keepAlive"`
}
