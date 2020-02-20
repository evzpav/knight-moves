.DEFAULT_GOAL := all 
.PHONY: build-image run install all help

NAME= knight-moves-server
VERSION=1.0.0

all: install build-front run ## Run pipeline

install: ## install server and client dependencies locally
	npm install
	cd ./client && npm install

build-front: ## run locally
	cd ./client && npm run build

run: ## run locally
	node ./server/server.js

run-front: ## run locally port 8080
	cd client && npm start

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'