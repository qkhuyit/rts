package web

import (
	"context"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/qkhuyit/rts/rts-api/internal/app/core/config"
	"github.com/sirupsen/logrus"
)

type Server interface {
	Use(item useable)
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
}

type serverImpl struct {
	echoInstance *echo.Echo
	appConfig    *config.AppConfig
	logger       *logrus.Logger
}

func NewServer(
	e *echo.Echo,
	appConfig *config.AppConfig,
	logger *logrus.Logger,
) Server {
	return &serverImpl{
		echoInstance: e,
		logger:       logger,
		appConfig:    appConfig,
	}
}

func (s *serverImpl) Use(item useable) {
	item.Setup(s.echoInstance)
}

func (s *serverImpl) Start(ctx context.Context) error {
	go func() {
		err := s.echoInstance.Start(fmt.Sprintf(":%d", s.appConfig.Port))
		if err != nil {
			s.logger.Error("Failed to start echo server, err: ", err)
			panic(err)
		}
	}()

	return nil
}

func (s *serverImpl) Stop(ctx context.Context) error {
	return s.echoInstance.Close()
}
