#!/bin/bash

docker login --username lend -p $DOCKER_ACCESS_TOKEN

docker rmi -f coinflow/lend-api:latest
docker rmi -f coinflow/lend-web:latest
docker-compose  -f  docker-compose.yml  pull lend web

docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d