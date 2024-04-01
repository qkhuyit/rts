# Define Helm release
resource "helm_release" "oauth2-proxy" {
  name       = "oauth2-proxy"
  chart       = "../charts/oauth2-proxy"
  namespace  = var.namespace

  # Set values with sensitive information using vault integration
  set {
    name    = "configuration.clientID"
    value   = "oauth2"
  }

  set {
    name    = "configuration.clientSecret"
    value   = "GzJH982Fl83mStbC3Sts9h2mOy1c9kp9"
  }

  # Set configuration content directly (avoid heredoc syntax)
  set {
    name    = "configuration.content"
    value  = <<-EOF
provider = "oidc"
provider_display_name = "RTS System"
login_url = "http://auth.rts.local/realms/rts/protocol/openid-connect/auth"
redeem_url = "http://rts-auth-keycloak/realms/rts/protocol/openid-connect/token"
validate_url = "http://rts-auth-keycloak/realms/rts/protocol/openid-connect/userinfo"
oidc_jwks_url = "http://rts-auth-keycloak/realms/rts/protocol/openid-connect/certs"
oidc_issuer_url = "http://auth.rts.local/realms/rts"
redirect_url = "http://rts.local/oauth2/callback"
email_domains = [ "*" ]
cookie_domains = [ "*" ]
whitelist_domains = [ "*" ]
scope = "openid email profile"
reverse_proxy = "true"
skip_provider_button = "true"
skip_jwt_bearer_tokens = "true"
skip_oidc_discovery = "true"
set_authorization_header = "true"
set_xauthrequest = "true"
pass_access_token = "true"
pass_authorization_header = "true"
pass_user_headers = "true"
insecure_oidc_allow_unverified_email = "true"
cookie_expire = "24h"
cookie_refresh = "30m"
cookie_samesite = "strict"
cookie_csrf_per_request = "true"
cookie_csrf_expire = "5m"
cookie_secure = "false"
ssl_insecure_skip_verify = "true"
    EOF
  }
}



