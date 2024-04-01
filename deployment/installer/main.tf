# 1. Create namespaces
module "auth_namespace" {
  source = "./modules/namespace"
  namespace_name = var.namespace_auth
}

module "datastore_namespace" {
  source = "./modules/namespace"
  namespace_name = var.namespace_datastore
}

module "services_namespace" {
  source = "./modules/namespace"
  namespace_name = var.namespace_service
}

# 2. Deploy redis
module "redis" {
  source = "./modules/redis"
  namespace = var.namespace_datastore
  password = "rts"
  depends_on = [module.datastore_namespace]
}

# 3. Deploy postgresql
module "postgresql" {
  source = "./modules/postgresql"
  namespace = var.namespace_datastore
  pg_database = "rts_db"
  pg_password = "rts"
  depends_on = [module.datastore_namespace]
}

# 4. Deploy keycloak
module "keycloak" {
  source = "./modules/keycloak"
  namespace = var.namespace_auth
  admin_password = "rts"
  depends_on = [module.auth_namespace, module.postgresql, module.redis]
}

# 5. Deploy keycloak
module "oauth2-proxy" {
  source = "./modules/oauth2-proxy"
  namespace = var.namespace_auth
  depends_on = [module.auth_namespace, module.postgresql, module.redis]
}

# 6. Deploy common gateway
module "auth-gateway" {
  source = "./modules/rts-auth-gateway"
  namespace = var.namespace_auth
  depends_on = [module.auth_namespace, module.keycloak, module.oauth2-proxy]
}

# 7. Deploy gate way
module "gateway" {
  source = "./modules/rts-gateway"
  namespace = var.namespace_service
  depends_on = [module.services_namespace, module.auth-gateway]
}

# 8. Deploy UI
module "rts-ui" {
  source = "./modules/rts-ui"
  namespace = var.namespace_service
  depends_on = [module.services_namespace, module.gateway]
}

# 9. Deploy API
module "rts-api" {
  source = "./modules/rts-api"
  namespace = var.namespace_service
  depends_on = [module.services_namespace, module.gateway]
}