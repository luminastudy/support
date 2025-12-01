terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Service     = "support"
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}

# US East 1 provider for CloudFront ACM certificates
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = var.project_name
      Service     = "support"
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}
