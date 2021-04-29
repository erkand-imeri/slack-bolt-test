info: usage

PWD := $(shell pwd)

usage:
	@echo " make prep               Prep project for running locally."
	@echo " make build              Build dependencies."
	@echo " make start              Start the server."
	@echo " make stop               Stop the server."
	@echo " make logs               Tail the container logs."
	@echo " make lint               Run linters on the project source."
	@echo " make test               Runs all jest tests."
	@echo " make snapshot           Updates test snapshots."
	@echo " make package            Ready the app for deployment."

prep: do_prep
build: do_build
start: do_start
stop: do_stop
lint: do_lint
logs: do_logs
test: do_tests

do_prep:
	cp .env.example .env

do_build:
	docker-compose down
	docker-compose build
	docker run -w=/app -v=$(PWD):/app node:lts-alpine npm install

do_start:
	docker-compose up -d

do_stop:	
	docker-compose down

do_logs:
	docker-compose logs --tail=5 -f

do_lint:
	docker run -w=/app -v=$(PWD):/app node:lts-alpine npm run pretest

do_tests:
	docker run -w=/app -v=$(PWD):/app node:lts-alpine npm run test
