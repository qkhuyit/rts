package config

import (
	"fmt"
	"os"
)

type KeycloakConfig struct {
	Realm        string
	UserName     string
	Password     string
	ClientID     string
	ClientSecret string
	Endpoint     string
}

func LoadKeycloakConfig() *KeycloakConfig {
	realm, ok := os.LookupEnv("KEYCLOAK_REALM")
	if !ok {
		err := fmt.Errorf("can't get KEYCLOAK_REALM config value")
		panic(err)
	}

	user, ok := os.LookupEnv("KEYCLOAK_USER")
	if !ok {
		err := fmt.Errorf("can't get KEYCLOAK_USER config value")
		panic(err)
	}

	pwd, ok := os.LookupEnv("KEYCLOAK_PASSWORD")
	if !ok {
		err := fmt.Errorf("can't get KEYCLOAK_PASSWORD config value")
		panic(err)
	}

	clientID, ok := os.LookupEnv("KEYCLOAK_CLIENT_ID")
	if !ok {
		err := fmt.Errorf("can't get KEYCLOAK_CLIENT_ID config value")
		panic(err)
	}

	clientSecret, ok := os.LookupEnv("KEYCLOAK_CLIENT_SECRET")
	if !ok {
		err := fmt.Errorf("can't get KEYCLOAK_CLIENT_SECRET config value")
		panic(err)
	}

	keycloakUrl, ok := os.LookupEnv("KEYCLOAK_URL")
	if !ok {
		err := fmt.Errorf("can't get KEYCLOAK_URL config value")
		panic(err)
	}

	return &KeycloakConfig{
		Realm:        realm,
		UserName:     user,
		Password:     pwd,
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint:     keycloakUrl,
	}
}
