# Cluster creation
eksctl create cluster --without-nodegroup --name=arithmetic-staging-cluster --region=sa-east-1
eksctl create nodegroup -f cluster-config.yml
