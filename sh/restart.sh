#!/bin/bash

docker login --username lend -p $DOCKER_ACCESS_TOKEN

docker rmi -f coinflow/heco-converter-api:latest
docker rmi -f coinflow/heco-converter-api:latest
docker-compose  -f  docker-compose.yml  pull api web

docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d