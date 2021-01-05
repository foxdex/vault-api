#!/bin/bash

docker login --username lend -p $DOCKER_ACCESS_TOKEN

docker rmi -f lend/node:latest
docker-compose  -f  docker-compose-dev.yml  pull lend

docker-compose -f docker-compose-dev.yml down
docker-compose -f docker-compose-dev.yml up -d