#!/bin/bash

npm install
npm ci
npm test

yarn build:prod

docker build -t  lend/node:latest .

docker login --username lend -p $DOCKER_ACCESS_TOKEN


docker push lend/node:latest