resource "helm_release" "rts-auth-gateway" {
  name = "rts-auth-gateway"
  chart = "../charts/rts-common-gateway"
  namespace = var.namespace

}
