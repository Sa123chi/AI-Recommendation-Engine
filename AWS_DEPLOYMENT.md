# AWS Deployment Guide

This is the primary deployment guide for Smart Recommend AI. Two options are covered:

- **Option A — Docker Compose on a single EC2 instance.** Simplest, cheapest, good for a demo or
  low-traffic deployment.
- **Option B — ECS Fargate.** Scalable, no servers to patch, recommended for anything beyond a demo.

Both options use the same Docker images (`backend/Dockerfile`, `frontend/Dockerfile`) and the same
PostgreSQL schema (`database/schema.sql`).

```
Internet → AWS ALB (HTTPS :443)
             ├── /api/* → backend target group  (Express, port 5000)
             └── /*     → frontend target group (Nginx serving the built SPA, port 80)
                              ↓
                        AWS RDS (PostgreSQL, port 5432, security-group restricted)
```

## Option A — EC2 + Docker Compose

### 1. Create the RDS PostgreSQL database

1. Open the RDS console. Engine: **PostgreSQL 14+**.
2. Create a database named `smart_recommend_ai` and a user (e.g. `app_user`) with a strong password.
3. Restrict the RDS security group to allow inbound PostgreSQL (5432) only from the EC2 instance's
   security group.

### 2. Set up the EC2 instance

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin git
sudo usermod -aG docker $USER   # log out/in for this to take effect

git clone https://github.com/your-org/AI-Recommendation-Engine.git
cd AI-Recommendation-Engine
```

### 3. Configure environment

```bash
cp .env.example .env
nano .env
# Set DATABASE_URL to the RDS endpoint, JWT secrets, CORS_ORIGIN, FRONTEND_URL, Stripe keys.
# Set VITE_API_URL to the public URL the frontend will call (e.g. https://your-domain.com/api).
```

### 4. Build and start the stack

```bash
docker compose up -d --build
```

This builds the backend and frontend images and starts them alongside a local Postgres container.
To use RDS instead of the bundled Postgres container, remove the `postgres` service from
`docker-compose.yml` and point `DATABASE_URL` at your RDS endpoint.

### 5. Apply the schema

```bash
DATABASE_URL="postgresql://app_user:password@<RDS_ENDPOINT>:5432/smart_recommend_ai" \
  node database/migrate.js --seed
```

### 6. Put it behind HTTPS

Put an ALB or a reverse proxy (e.g. Caddy/Certbot-managed Nginx) in front of the EC2 instance to
terminate TLS and forward `/api/*` to port 5000 and everything else to port 5173 (or 80, if you
remap the frontend container's published port).

## Option B — ECS Fargate

See `deploy/README.md` for the scripts and task definition templates. High level:

1. Create two ECR repositories: `smart-recommend-ai-backend`, `smart-recommend-ai-frontend`.
2. Create an RDS PostgreSQL instance as in Option A, step 1.
3. Store secrets (`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, Stripe keys) in AWS
   Secrets Manager under the `smart-recommend-ai/` prefix.
4. Build and push images:
   ```bash
   AWS_ACCOUNT_ID=123456789012 AWS_REGION=ap-south-1 \
     VITE_API_URL=https://api.yourdomain.com/api \
     ./deploy/push-to-ecr.sh
   ```
5. Fill in the placeholders in `deploy/ecs-task-definition-backend.json` and
   `deploy/ecs-task-definition-frontend.json`, then register them:
   ```bash
   aws ecs register-task-definition --cli-input-json file://deploy/ecs-task-definition-backend.json
   aws ecs register-task-definition --cli-input-json file://deploy/ecs-task-definition-frontend.json
   ```
6. Create an ALB with two target groups (`/api/*` → backend, `/*` → frontend) and two ECS services
   (Fargate launch type) attached to those target groups, running in private subnets with the ALB
   in public subnets.
7. Apply the schema against RDS as in Option A, step 5.

## Troubleshooting

**Connection refused to RDS**
Check the RDS security group allows inbound TCP 5432 from the EC2 or ECS task security group.

**`role "app_user" does not exist`**
Connect to RDS as the master user and create the role:
```sql
CREATE USER app_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE smart_recommend_ai TO app_user;
```

**Frontend 404 on page refresh**
The bundled `frontend/nginx.conf` already handles this with `try_files $uri $uri/ /index.html;`.
If you're using a custom Nginx/ALB config, make sure that fallback rule is present.

**Backend container exits immediately / nothing listens on 5000**
Check `docker logs smart-recommend-backend` — this almost always means `DATABASE_URL` is missing
or unreachable; the backend intentionally fails fast on startup if it can't connect to Postgres.
