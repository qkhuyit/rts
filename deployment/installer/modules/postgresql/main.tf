resource "helm_release" "rts-pg" {
  name = "rts-pg"
  chart = "../charts/postgresql"
  namespace = var.namespace

  set {
    name  = "auth.postgresPassword"
    value = var.pg_password
  }

  set {
    name  = "auth.username"
    value = "rts"
  }

  set {
    name  = "auth.password"
    value = var.pg_password
  }

  set {
    name  = "auth.database"
    value = var.pg_database
  }
}
