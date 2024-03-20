package models

type UserModel struct {
	Id            string              `json:"id"`
	UserName      string              `json:"username"`
	Enable        bool                `json:"enable"`
	Email         string              `json:"email"`
	EmailVerified bool                `json:"emailVerified"`
	FirstName     string              `json:"firstName"`
	LastName      string              `json:"lastName"`
	AssignedRoles []AssignedItemModel `json:"assignedRoles"`
	AssignedGroup []AssignedItemModel `json:"assignedGroups"`
}

type AssignedItemModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}
