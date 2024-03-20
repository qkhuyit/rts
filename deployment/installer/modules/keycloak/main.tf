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
    value = "rts-pg-postgresql.rts-datastore"
  }

  set {
    name  = "externalDatabase.port"
    value = "5432"
  }

  set {
    name  = "externalDatabase.user"
    value = "rts"
  }

  set {
    name  = "externalDatabase.database"
    value = "rts_db"
  }

  set {
    name  = "externalDatabase.password"
    value = "rts"
  }

  set {
    name  = "keycloakConfigCli.configuration.realm.json"
    value = <<EOF
file("${path.module}/realm.json")
    EOF
  }

}
