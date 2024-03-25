package models

type GroupModel struct {
	ID            string               `json:"id"`
	Name          string               `json:"name"`
	Path          string               `json:"path"`
	SubGroupCount int                  `json:"subGroupCount"`
	SubGroups     []GroupModel         `json:"subGroups"`
	Privilege     *GroupPrivilegeModel `json:"privilege"`
	Description   string               `json:"description"`
	Status        string               `json:"status"`
}

type GroupPrivilegeModel struct {
	View             bool `json:"view"`
	ViewMembers      bool `json:"viewMembers"`
	ManageMembers    bool `json:"manageMembers"`
	Manage           bool `json:"manage"`
	ManageMembership bool `json:"manageMembership"`
}
