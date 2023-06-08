delete-cluster:
	eksctl delete cluster --name arithmetic-staging-cluster --region sa-east-1 

create-cluster:
	eksctl create cluster --without-nodegroup --name=arithmetic-staging-cluster --region=sa-east-1

create-nodegroup:
	eksctl create nodegroup -f cluster-config.yml

install-nginx-ingress:
	helm upgrade --install ingress-nginx ingress-nginx \
	  --repo https://kubernetes.github.io/ingress-nginx \
	  --namespace ingress-nginx --create-namespace

deploy:
	kubectl apply -f ../deploy
