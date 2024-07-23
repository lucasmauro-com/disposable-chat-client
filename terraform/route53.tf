data "aws_route53_zone" "lucasmauro_com" {
  name = local.domain_name
}

resource "aws_route53_record" "chat_lucasmauro_com" {
  zone_id = data.aws_route53_zone.lucasmauro_com.zone_id
  name    = "chat.${local.domain_name}"
  type    = "A"
  alias {
    name                   = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}
