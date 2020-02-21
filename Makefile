.DEFAULT_GOAL := all 
.PHONY: build-image run install all help

NAME= knight-moves-server
VERSION=1.0.0
PORT=3000
BUILD         	= $(shell git rev-parse --short HEAD)
MONGO_NAME    = mongodb_$(NAME)_$(BUILD)
NETWORK_NAME  = network_$(NAME)_$(BUILD)
MONGO_URL = mongodb://localhost:27018/${MONGO_NAME}


all: install build-front run ## Run pipeline

install: ## install server and client dependencies locally
	npm install
	cd ./client && npm install

build-front: ## run locally
	cd ./client && npm run build

run-front: ## run locally port 8080
	cd client && npm start

run-target: ## run target
	DOCKER_BUILDKIT=1 docker build  -t $(NAME):$(VERSION) --target=$(TARGET) .

run-mongo: ## run mongo container.
	docker run --rm -d \
		--name ${MONGO_NAME} \
		-p 27018:27017 \
		mongo:3.6 \
		--smallfiles --noprealloc --nojournal

audit: ## run audit
	make run-target TARGET=audit

dependencies: ## run dependencies check
	make run-target TARGET=dependencies

lint: ## run lint
	make run-target TARGET=lint

test: ## run tests
	make run-target TARGET=test

build-image: ## build docker image
	make run-target TARGET=release

front: ## build docker image
	make run-target TARGET=front


run-docker: build-image ## run server on docker
	DOCKER_BUILDKIT=1 \
	docker run --rm \
		-p $(PORT):$(PORT) \
		-e PORT=$(PORT) \
		-e MONGO_URL=$(MONGO_URL) \
		--network host \
		$(NAME):$(VERSION)

run: ## run locally
	PORT=$(PORT) \
	MONGO_URL=$(MONGO_URL) \
	node ./server/server.js


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'