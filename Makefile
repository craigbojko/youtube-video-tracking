.PHONY: start build build-dev build-prod watch;

BIN = ./node_modules/.bin

start:
	@npm start

build: build-dev
build: build-prod

build-dev: export NODE_ENV=development
build-dev:
	@webpack

build-prod: export NODE_ENV=production
build-prod:
	@npm version patch
	@webpack

watch: export NODE_ENV=development
watch:
	@webpack --watch
