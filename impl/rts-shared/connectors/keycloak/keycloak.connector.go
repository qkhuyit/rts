package keycloak

import (
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/go-resty/resty/v2"
	"github.com/qkhuyit/rts/rts-shared/config"
	"github.com/sirupsen/logrus"
	"sync"
	"time"
)

const (
	authenticationHeaderField            = "Authorization"
	authenticationFieldValueFormat       = "Bearer %s"
	headerFieldContentType               = "Content-Type"
	headerFieldContentTypeFormUrlEndCode = "application/x-www-form-urlencoded"

	endpointGeAccessTokenFormant = "%s/realms/%s/protocol/openid-connect/token"
)

type KeycloakConnector interface {
	GetRealm() string
	GetEndpoint() string
	CreateRequest(
		params map[string]string,
	) (*resty.Request, error)
}

type keycloakToken struct {
	accessToken    string
	expirationTime time.Time
}

func (tk *keycloakToken) isExpired() bool {
	currentTime := time.Now()

	if tk.expirationTime.Before(currentTime) {
		return true
	}

	return false
}

type keycloakConnectorImpl struct {
	conf       *config.KeycloakConfig
	token      *keycloakToken
	tokenMutex sync.Mutex
	client     *resty.Client
	logger     *logrus.Logger
}

func NewKeycloakConnector(
	conf *config.KeycloakConfig,
	logger *logrus.Logger,
) KeycloakConnector {
	return &keycloakConnectorImpl{
		logger: logger,
		conf:   conf,
		client: resty.New(),
	}
}

func (kc *keycloakConnectorImpl) GetRealm() string { return kc.conf.Realm }

func (kc *keycloakConnectorImpl) GetEndpoint() string { return kc.conf.Endpoint }

func (kc *keycloakConnectorImpl) CreateRequest(
	params map[string]string,
) (*resty.Request, error) {
	if kc.token == nil || kc.token.isExpired() {
		err := kc.getAccessToken()
		if err != nil {
			return nil, err
		}
	}

	req := kc.
		client.
		R().
		EnableTrace().
		SetHeader(authenticationHeaderField, fmt.Sprintf(authenticationFieldValueFormat, kc.token.accessToken))

	if params != nil {
		req.SetQueryParams(params)
	}

	return req, nil

}

func (kc *keycloakConnectorImpl) getAccessToken() error {
	kc.tokenMutex.Lock()
	defer kc.tokenMutex.Unlock()

	var tokenResp KeycloakTokenRespModel
	req := kc.client.R().
		SetHeader(headerFieldContentType, headerFieldContentTypeFormUrlEndCode).
		SetFormData(map[string]string{
			"grant_type":    "password",
			"client_id":     kc.conf.ClientID,
			"username":      kc.conf.UserName,
			"password":      kc.conf.Password,
			"client_secret": kc.conf.ClientSecret,
		}).
		SetResult(&tokenResp).
		EnableTrace()

	resp, err := req.Post(fmt.Sprintf(endpointGeAccessTokenFormant, kc.conf.Endpoint, kc.conf.Realm))
	if err != nil {
		return err
	}

	bodyStr := string(resp.Body())
	if bodyStr != "" {

	}

	token, err := jwt.Parse(tokenResp.AccessToken, func(token *jwt.Token) (interface{}, error) {
		return []byte(""), nil
	})

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return errors.New("can't parsing claims")
	}

	expirationTime := time.Unix(int64(claims["exp"].(float64)), 0)
	kc.token = &keycloakToken{
		accessToken:    tokenResp.AccessToken,
		expirationTime: expirationTime,
	}

	return nil
}
