package connectors

import (
	"github.com/qkhuyit/rts/rts-shared/connectors/keycloak"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(keycloak.NewKeycloakConnector),
)
