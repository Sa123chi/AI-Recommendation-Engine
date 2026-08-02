# deploy/

AWS ECS (Fargate) deployment assets. See `../AWS_DEPLOYMENT.md` for the full step-by-step guide.

- `push-to-ecr.sh` — builds the backend and frontend Docker images and pushes them to ECR.
- `ecs-task-definition-backend.json` — Fargate task definition template for the API. Fill in
  `<AWS_ACCOUNT_ID>`, `<AWS_REGION>`, and `<YOUR_FRONTEND_DOMAIN>`, and create the referenced
  Secrets Manager entries before registering it.
- `ecs-task-definition-frontend.json` — Fargate task definition template for the Nginx-served SPA.

Quick path:

```bash
# 1. Build and push images
AWS_ACCOUNT_ID=123456789012 AWS_REGION=ap-south-1 \
  VITE_API_URL=https://api.yourdomain.com/api \
  ./deploy/push-to-ecr.sh

# 2. Register task definitions (after filling in placeholders)
aws ecs register-task-definition --cli-input-json file://deploy/ecs-task-definition-backend.json
aws ecs register-task-definition --cli-input-json file://deploy/ecs-task-definition-frontend.json

# 3. Create/update ECS services pointing at the new task definitions,
#    behind an Application Load Balancer with path-based routing
#    (/api/* -> backend target group, /* -> frontend target group).
```
