variable "app_name" {
  type = string
  default = "rts"
}

variable "namespace_auth" {
  type = string
  default = "rts-auth"
}

variable "namespace_common" {
  type = string
  default = "rts-common"
}

variable "namespace_services" {
  type = string
  default = "rts-services"
}

variable "namespace_datastore" {
  type = string
  default = "rts-datastore"
}

variable "kube_config" {
  type = string
  default = "~/.kube/config"
}

variable "kube_context" {
  type = string
  default = "minikube"
}