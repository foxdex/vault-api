#!/bin/bash

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN

docker rmi -f lend-data/node:latest
docker-compose  -f  docker-compose.yml  pull foxdex

docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d