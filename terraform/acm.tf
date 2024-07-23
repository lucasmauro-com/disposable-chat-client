data "aws_acm_certificate" "lucasmauro_com" {
  domain   = local.domain_name
  statuses = ["ISSUED"]
}
