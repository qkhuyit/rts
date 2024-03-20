resource "helm_release" "rts-ui" {
  name = "rts-ui"
  chart = "../charts/rts-ui"
  namespace = var.namespace
}
