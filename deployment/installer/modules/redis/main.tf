resource "helm_release" "rts-redis" {
  name = "rts-redis"
  chart = "../charts/redis"
  namespace = var.namespace

  set {
    name  = "auth.password"
    value = var.password
  }

  set {
    name = "replica.replicaCount"
    value = 0
  }

}
