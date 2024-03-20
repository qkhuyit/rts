variable "namespace" {
  type = string
}

variable "configuration_content" {
  type = string
  default = <<EOF
provider = "oidc"
provider_display_name = "RTS System"
login_url = "http://auth.rts.local/realms/rts/protocol/openid-connect/auth"
redeem_url = "http://rts-auth-keycloak.rts-auth:8080/realms/rts/protocol/openid-connect/token"
validate_url = "http://rts-auth-keycloak.rts-auth:8080/realms/rts/protocol/openid-connect/userinfo"
oidc_jwks_url = "http://rts-auth-keycloak.rts-auth:8080/realms/rts/protocol/openid-connect/certs"
oidc_issuer_url = "http://auth.rts.local/realms/rts"
redirect_url = "http://rts.local/oauth2/callback"
scope = "openid email profile"
reverse_proxy = "true"
skip_provider_button = "true"
skip_jwt_bearer_tokens = "true"
skip_oidc_discovery = "true"fir
set_authorization_header = "true"
set_xauthrequest = "true"
pass_access_token = "true"
pass_authorization_header = "true"
pass_user_headers = "true"
whitelist_domains = jsonencode([".rts.local", "rts.local"])
insecure_oidc_allow_unverified_email = "true"
cookie_domains = [".rts.local", "rts.local"]
cookie_expire = "24h"
cookie_refresh = "30m"
cookie_samesite = "strict"
cookie_csrf_per_request = "true"
cookie_csrf_expire = "5m"
cookie_secure = "false"
ssl_insecure_skip_verify = "true"
email_domains = [ "*" ]
EOF
}