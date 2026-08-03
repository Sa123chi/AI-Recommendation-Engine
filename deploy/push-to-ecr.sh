#!/usr/bin/env bash
# Build the backend and frontend Docker images and push them to ECR.
#
# Usage:
#   AWS_ACCOUNT_ID=123456789012 AWS_REGION=ap-south-1 \
#   VITE_API_URL=https://api.yourdomain.com/api \
#   ./deploy/push-to-ecr.sh [image-tag]
#
# Requires: AWS CLI (configured with credentials), Docker.
# Assumes the ECR repositories already exist:
#   smart-recommend-ai-backend
#   smart-recommend-ai-frontend
# Create them once with:
#   aws ecr create-repository --repository-name smart-recommend-ai-backend
#   aws ecr create-repository --repository-name smart-recommend-ai-frontend

set -euo pipefail

: "${AWS_ACCOUNT_ID:?Set AWS_ACCOUNT_ID}"
: "${AWS_REGION:?Set AWS_REGION}"
VITE_API_URL="${VITE_API_URL:-http://localhost:5000/api}"
TAG="${1:-latest}"

REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
BACKEND_REPO="smart-recommend-ai-backend"
FRONTEND_REPO="smart-recommend-ai-frontend"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Logging in to ECR ($REGISTRY)"
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$REGISTRY"

echo "==> Building backend image"
docker build -t "${REGISTRY}/${BACKEND_REPO}:${TAG}" "$ROOT_DIR/backend"

echo "==> Building frontend image (VITE_API_URL=${VITE_API_URL})"
docker build \
  --build-arg VITE_API_URL="$VITE_API_URL" \
  -t "${REGISTRY}/${FRONTEND_REPO}:${TAG}" "$ROOT_DIR/frontend"

echo "==> Pushing backend image"
docker push "${REGISTRY}/${BACKEND_REPO}:${TAG}"

echo "==> Pushing frontend image"
docker push "${REGISTRY}/${FRONTEND_REPO}:${TAG}"

echo "==> Done. Images:"
echo "    ${REGISTRY}/${BACKEND_REPO}:${TAG}"
echo "    ${REGISTRY}/${FRONTEND_REPO}:${TAG}"
