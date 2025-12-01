variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "lumina"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

# GitHub Actions OIDC Configuration
variable "create_oidc_provider" {
  description = "Whether to create the GitHub OIDC provider (set to false if it already exists in account)"
  type        = bool
  default     = false # OIDC provider already exists from landing app
}

variable "github_org" {
  description = "GitHub organization name"
  type        = string
  default     = "luminastudy"
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "support"
}

variable "domain_name" {
  description = "Domain name for the support site"
  type        = string
  default     = "support.lumina.study"
}

variable "root_domain" {
  description = "Root domain for ACM certificate"
  type        = string
  default     = "lumina.study"
}
