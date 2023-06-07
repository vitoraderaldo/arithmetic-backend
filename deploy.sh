### Old way: Deploying using Elastic Container Service
# docker context use default
# docker buildx build --push --tag vitor96k/arithmetic-backend:4.0.0 -o type=image --platform=linux/arm64,linux/amd64 . -f Dockerfile
# docker context use arithmetic-staging
# ENVIRONMENT=staging docker compose up

### New way: Deploying using Elastic Kubernetes Service
kubectl apply -f k8s/deploy
