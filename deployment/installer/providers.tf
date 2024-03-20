provider "kubernetes" {
  config_context = var.kube_context
  config_path = var.kube_config
}

provider "helm" {
  kubernetes {
    config_path = var.kube_config
  }
}