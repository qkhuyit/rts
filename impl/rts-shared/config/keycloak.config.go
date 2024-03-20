package config

type KeycloakConfig struct {
	Realm        string
	UserName     string
	Password     string
	ClientID     string
	ClientSecret string
	Endpoint     string
}

func LoadKeycloakConfig() *KeycloakConfig {
	return &KeycloakConfig{
		Realm:        "rts",
		UserName:     "rts",
		Password:     "admin",
		ClientID:     "admin-cli",
		ClientSecret: "LQkIhhxA5Zx45wvbHZWuVjlnnPQHpBfc",
		Endpoint:     "http://auth.rts.local",
	}
}
