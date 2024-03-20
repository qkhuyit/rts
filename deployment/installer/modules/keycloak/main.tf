resource "helm_release" "rts-auth" {
  name = "rts-auth-keycloak"
  chart = "../charts/keycloak"
  namespace = var.namespace

  set {
    name  = "auth.adminUser"
    value = "admin"
  }

  set {
    name  = "auth.adminPassword"
    value = var.admin_password
  }
}
