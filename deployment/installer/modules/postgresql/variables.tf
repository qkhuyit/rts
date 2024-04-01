#---------------------------------------------------------------------------------------------------
# Kubernetes
#---------------------------------------------------------------------------------------------------
variable "namespace" {
  type = string
  description = "Kubernetes namespace"
}

#---------------------------------------------------------------------------------------------------
# PostgreSQL
#---------------------------------------------------------------------------------------------------
variable "pg_database" {
  type = string
  description = "PostgreSQL default database name"
}

#---------------------------------------------------------------------------------------------------
# Authentication
#---------------------------------------------------------------------------------------------------
variable "pg_username" {
  type = string
  default = "rts"
  description = "PostgreSQL authentication username"
}

variable "pg_password" {
  type = string
  description = "PostgreSQL password"
}

