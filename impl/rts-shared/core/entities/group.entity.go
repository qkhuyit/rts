package entities

type GroupEntity struct {
	ID            string                `json:"id"`
	Name          string                `json:"name"`
	Path          string                `json:"path"`
	SubGroupCount int                   `json:"subGroupCount"`
	SubGroups     []GroupEntity         `json:"subGroups"`
	Access        *GroupPrivilegeEntity `json:"access"`
	Attributes    map[string][]string   `json:"attributes"`
}

type GroupPrivilegeEntity struct {
	View             bool `json:"view"`
	ViewMembers      bool `json:"viewMembers"`
	ManageMembers    bool `json:"manageMembers"`
	Manage           bool `json:"manage"`
	ManageMembership bool `json:"manageMembership"`
}

type GroupCountEntity struct {
	Count int `json:"count"`
}
