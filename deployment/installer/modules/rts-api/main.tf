resource "helm_release" "rts-api" {
  name = "rts-api"
  chart = "../charts/rts-api"
  namespace = var.namespace

  set {
    name  = "image.repository"
    value = "qkhuyit/rts-api"
  }

  set {
    name  = "image.tag"
    value = "latest"
  }

  set {
    name  = "image.pullPolicy"
    value = "Always"
  }

  set {
    name  = "keycloak.clientSecret"
    value = "DnPzaO7yNHl52byqGWe6lm2wGsWuZH19"
  }

  set {
    name  = "keycloak.username"
    value = "administrator"
  }

  set {
    name  = "keycloak.realm"
    value = "rts"
  }

  set {
    name  = "keycloak.clientID"
    value = "admin-cli"
  }

  set {
    name  = "keycloak.password"
    value = "Asd123$$"
  }

  set {
    name  = "keycloak.url"
    value = "http://keycloak.rts-auth"
  }
}
