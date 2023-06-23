delete-cluster:
	eksctl delete cluster --name arithmetic-staging-cluster --region sa-east-1 

create-cluster:
	eksctl create cluster --without-nodegroup --name=arithmetic-staging-cluster --region=sa-east-1

create-nodegroup:
	eksctl create nodegroup -f cluster-config.yml

install_dns_creation:
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm repo update
	helm install external-dns bitnami/external-dns \
  --set provider=aws \
  --set aws.zoneType=public \
  --set aws.credentials.secretKey=$(SECRET_KEY) \
  --set aws.credentials.accessKey=$(ACCESS_KEY) \
  --set txtOwnerId=12345678 \
  --set rbac.create=true

deploy:
	kubectl apply -f ../deploy/secrets
	kubectl apply -f ../deploy
