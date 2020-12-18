#!/bin/bash

npm install
npm ci
npm test

yarn build:prod

docker build -t  lend-data/node:latest .

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN


docker push lend-data/node:latest