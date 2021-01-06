#!/bin/bash

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN

docker rmi -f coinflow/lend-api:dev
docker rmi -f coinflow/lend-web:dev
docker-compose  -f  docker-compose-dev.yml  pull lend web

docker-compose -f docker-compose-dev.yml down
docker-compose -f docker-compose-dev.yml up -d