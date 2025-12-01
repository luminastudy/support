# S3 bucket for static website hosting
resource "aws_s3_bucket" "support" {
  bucket = "${var.project_name}-support-${var.environment}"

  tags = {
    Name        = "${var.project_name}-support"
    Environment = var.environment
  }
}

# Block all public access - CloudFront will use OAC
resource "aws_s3_bucket_public_access_block" "support" {
  bucket = aws_s3_bucket.support.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 bucket policy to allow CloudFront OAC access
resource "aws_s3_bucket_policy" "support" {
  bucket = aws_s3_bucket.support.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.support.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.support.arn
          }
        }
      }
    ]
  })
}

# Use existing wildcard certificate from landing (includes *.lumina.study)
data "aws_acm_certificate" "wildcard" {
  provider = aws.us_east_1
  domain   = var.root_domain
  statuses = ["ISSUED"]
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "support" {
  name                              = "${var.project_name}-support-oac"
  description                       = "OAC for support site S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront Function for URL rewriting (Docusaurus routes)
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.project_name}-support-url-rewrite"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // If URI ends with / or has no extension, append index.html
      if (uri.endsWith('/')) {
        request.uri += 'index.html';
      } else if (!uri.includes('.')) {
        // Check if it's a docs path that should have /index.html appended
        request.uri += '/index.html';
      }

      return request;
    }
  EOF
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "support" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name]
  price_class         = "PriceClass_100" # US, Canada, Europe only - cheapest

  origin {
    domain_name              = aws_s3_bucket.support.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.support.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.support.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.support.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_optimized.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.cors_s3.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }
  }

  # Handle 404s - return index.html for client-side routing
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.wildcard.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name        = "${var.project_name}-support-cdn"
    Environment = var.environment
  }
}

# AWS managed cache policies
data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_origin_request_policy" "cors_s3" {
  name = "Managed-CORS-S3Origin"
}
