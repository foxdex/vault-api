#!/bin/bash

docker login --username lend -p $DOCKER_ACCESS_TOKEN

docker rmi -f lend/node:latest
docker-compose  -f  docker-compose.yml  pull lend

docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d