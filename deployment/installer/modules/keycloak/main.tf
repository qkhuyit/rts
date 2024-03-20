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

  set {
      name = "postgresql.enabled"
      value = "false"
  }

  set {
    name  = "externalDatabase.host"
    value = ""
  }

  set {
    name  = "externalDatabase.port"
    value = ""
  }

  set {
    name  = "externalDatabase.user"
    value = ""
  }

  set {
    name  = "externalDatabase.database"
    value = ""
  }

  set {
    name  = "externalDatabase.password"
    value = ""
  }

  set {
    name  = "keycloakConfigCli.configuration.realm.json"
    value = <<EOF
file("${path.module}/realm.json")
    EOF

  }
}
