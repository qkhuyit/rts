package config

import (
	"fmt"
	"os"
	"strconv"
)

type AppConfig struct {
	Port int
}

func LoadAppConfig() *AppConfig {
	appPortStr, ok := os.LookupEnv("APP_PORT")
	if !ok {
		err := fmt.Errorf("[ERROR] APP_PORT config is not found")
		panic(err)
	}

	appPort, err := strconv.Atoi(appPortStr)
	if err != nil {
		err := fmt.Errorf("[ERROR] APP_PORT config %s is invalid, err: %v", appPortStr, err)
		panic(err)
	}

	return &AppConfig{
		Port: appPort,
	}
}
