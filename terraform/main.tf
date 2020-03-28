provider "aws" {
  region  = "us-east-1"
  profile = "default"
}

resource "aws_s3_bucket" "sudoku" {
  bucket        = "sudoku-game.com"
  acl           = "public-read"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_route53_zone" "primary" {
  name = "sudoku-game.com"
}

resource "aws_route53_record" "main" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "sudoku-game.com"
  type    = "A"

  alias {
    name                   = aws_s3_bucket.sudoku.website_domain
    zone_id                = aws_s3_bucket.sudoku.hosted_zone_id
    evaluate_target_health = true
  }
}
