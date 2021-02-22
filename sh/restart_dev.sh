#!/bin/bash

docker login --username lend -p $DOCKER_ACCESS_TOKEN

docker rmi -f coinflow/heco-converter-api:dev
docker rmi -f coinflow/heco-converter-api:dev
docker-compose  -f  docker-compose-dev.yml  pull api web

docker-compose -f docker-compose-dev.yml down
docker-compose -f docker-compose-dev.yml up -d