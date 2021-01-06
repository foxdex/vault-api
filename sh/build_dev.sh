#!/bin/bash

npm install
npm ci
npm test

yarn build:prod

docker build -t  coinflow/lend-api:dev .

docker login --username $DOCKER_ACCESS_NAME -p $DOCKER_ACCESS_TOKEN


docker push coinflow/lend-api:dev