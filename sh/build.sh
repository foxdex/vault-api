#!/bin/bash


npm ci
npm test

docker build -t  coinflow/lend-api:latest .

docker login --username $DOCKER_ACCESS_NAME -p $DOCKER_ACCESS_TOKEN


docker push coinflow/lend-api:latest