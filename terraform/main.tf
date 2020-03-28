provider "aws" {
  region  = "us-east-1"
  profile = "default"
}

resource "aws_s3_bucket" "snake" {
  bucket        = "sudoku-game.com"
  acl           = "public-read"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
