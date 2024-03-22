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
}
