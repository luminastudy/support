# CloudFront outputs
output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.support.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.support.domain_name
}

# S3 outputs
output "s3_bucket_name" {
  description = "S3 bucket name for support site"
  value       = aws_s3_bucket.support.id
}

# GitHub Actions outputs
output "github_actions_role_arn" {
  description = "The ARN of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}

output "github_actions_role_name" {
  description = "The name of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.name
}

# Instructions
output "next_steps" {
  description = "Next steps for deployment"
  value       = <<-EOF

    Next steps:
    1. Create a CNAME record for support.lumina.study pointing to:
       ${aws_cloudfront_distribution.support.domain_name}

    2. Add the following secrets to GitHub repository:
       - AWS_ROLE_ARN: ${aws_iam_role.github_actions.arn}
       - CLOUDFRONT_DISTRIBUTION_ID: ${aws_cloudfront_distribution.support.id}

    3. Push to main branch to trigger deployment
  EOF
}
