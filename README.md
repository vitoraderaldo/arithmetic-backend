## Description

This repository contains a backend application that performs arithmetic operations such as addition, subtraction, division, multiplication, square root, and generates random numbers. The application requires user authentication and maintains individual user balances for performing operations.

The backend application is utilized by the corresponding frontend project, which can be found at [arithmetic-frontend](https://github.com/vitoraderaldo/arithmetic-frontend).

## Live App
**Staging URL**: 
https://k8s-api-staging.arithmetic-services.click

## Stack
The following technologies are employed in this project:
1. NestJS: Node.js framework used to create the API.
2. Cognito: AWS service used for user authentication.
3. Docker: Containerization platform for running the API.
4. Amazon Elastic Kubernetes Service: AWS service for deploying and running containers using Kubernetes in the cloud.
5. Load Balancer: AWS service for receiving and forwarding requests to the containers.

## Running the service
Before running the service, ensure that you have [Docker](https://www.docker.com) and [AWS-CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) installed on your system.
Then run these commands below:
```bash
$ docker compose up -d
$ npm run migration:run
$ npm run seed:run
$ npm install
$ npm run start:dev
```

## Running the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Deployment
The deployment to staging will happen when a tag gets created.
