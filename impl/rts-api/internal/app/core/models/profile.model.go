package models

import "time"

type ProfileModel struct {
	ID        int                 `json:"id"`
	CreatedAt time.Time           `json:"createdAt"`
	UpdatedAt time.Time           `json:"updatedAt"`
	Username  string              `json:"username"`
	Nickname  string              `json:"nickname"`
	Avatar    string              `json:"avatar"`
	Email     string              `json:"email"`
	Phone     string              `json:"phone"`
	Remark    string              `json:"remark"`
	Status    int                 `json:"status"`
	Roles     []AssignedRoleModel `json:"roles"`
}

type AssignedRoleModel struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Name      string    `json:"name"`
	Value     string    `json:"value"`
	Remark    string    `json:"remark"`
	Status    int       `json:"status"`
	Default   any       `json:"default"`
}
