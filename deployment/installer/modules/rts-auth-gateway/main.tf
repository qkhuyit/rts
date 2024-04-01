resource "helm_release" "common-gateway" {
  name = "common-gateway"
  chart = "../charts/rts-common-gateway"
  namespace = var.namespace

}
