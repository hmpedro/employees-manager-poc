SHELL := /bin/bash
.PHONY: check-dependencies-to-run start dev turn-off

check-dependencies-to-run:
	./check-dependencies-to-run.sh

#run the application and all it's dependencies with docker
start: check-dependencies-to-run
	docker build -t employee-manager-poc-api . && \
	docker-compose -f docker-compose.yaml up -d

#run the application dependencies with docker
dev: check-dependencies-to-run
	docker build -t employee-manager-poc-api . && \
	docker-compose -f docker-compose.yaml up -d && \
	docker stop $$(docker ps -q --filter name=employee-manager-poc-api) || true > /dev/null

#turn off docker containers related to the application
turn-off: check-dependencies-to-run
	docker stop $$(docker ps -q --filter name=edro-mognon-project-*) || true > /dev/null
