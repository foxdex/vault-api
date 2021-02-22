#!/bin/bash


npm ci
npm test

docker build -t  coinflow/heco-lend-api:latest .

docker login --username $DOCKER_ACCESS_NAME -p $DOCKER_ACCESS_TOKEN


docker push coinflow/heco-lend-api:latest