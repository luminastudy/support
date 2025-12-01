# Terraform Backend Configuration
#
# Using local backend for now - can migrate to S3 for team collaboration

terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}

# To migrate to S3 backend (shared with landing):
# terraform {
#   backend "s3" {
#     bucket         = "lumina-terraform-state"
#     key            = "support/terraform.tfstate"
#     region         = "eu-central-1"
#     encrypt        = true
#     dynamodb_table = "lumina-terraform-locks"
#   }
# }
