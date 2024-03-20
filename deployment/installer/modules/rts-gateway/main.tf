resource "helm_release" "rts-gateway" {
  name = "rts-gateway"
  chart = "../charts/rts-gateway"
  namespace = var.namespace
}
