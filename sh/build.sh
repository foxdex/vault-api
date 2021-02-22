#!/bin/bash


npm ci
npm test

docker build -t  coinflow/heco-converter-api:latest .

docker login --username $DOCKER_ACCESS_NAME -p $DOCKER_ACCESS_TOKEN


docker push coinflow/converter-api:latest