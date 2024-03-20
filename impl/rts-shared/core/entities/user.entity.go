package entities

// User đại diện cho cấu trúc của một người dùng trong Keycloak.
type UserEntity struct {
	ID                         string        `json:"id"`
	CreatedTimestamp           int64         `json:"createdTimestamp"`
	Username                   string        `json:"username"`
	Enabled                    bool          `json:"enabled"`
	TOTP                       bool          `json:"totp"`
	EmailVerified              bool          `json:"emailVerified"`
	FirstName                  string        `json:"firstName"`
	LastName                   string        `json:"lastName"`
	Email                      string        `json:"email"`
	DisableableCredentialTypes []interface{} `json:"disableableCredentialTypes"`
	RequiredActions            []interface{} `json:"requiredActions"`
	NotBefore                  int64         `json:"notBefore"`
	Access                     AccessEntity  `json:"access"`
}

// Access đại diện cho cấu trúc của quyền truy cập của một người dùng trong Keycloak.
type AccessEntity struct {
	ManageGroupMembership bool `json:"manageGroupMembership"`
	View                  bool `json:"view"`
	MapRoles              bool `json:"mapRoles"`
	Impersonate           bool `json:"impersonate"`
	Manage                bool `json:"manage"`
}
