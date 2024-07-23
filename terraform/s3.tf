resource "aws_s3_bucket" "disposable_chat_client" {
  bucket = "lucasmauro-disposable-chat-client"
  force_destroy = true
}

resource "aws_s3_bucket_policy" "disposable_chat_client_public_read" {
  bucket = aws_s3_bucket.disposable_chat_client.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id: "PolicyForCloudFrontPrivateContent",
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.disposable_chat_client.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn": "${aws_cloudfront_distribution.s3_distribution.arn}"
          }
        }
      }
    ]
  })
}
