.DEFAULT_GOAL:= help
.PHONY: help build aws-variables-exported serverless config

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

##
## Build
## --------
build:          ## Install serverless, deploy and watch the logs
build: aws-variables-exported config deploy logs

##
## Single commands
## --------
aws-variables-exported:           ## Show AWS variables to confirm if they are correct
aws-variables-exported:
	@echo AWS_SECRET_ACCESS_KEY: $(AWS_SECRET_ACCESS_KEY)
	@echo AWS_ACCESS_KEY_ID: $(AWS_ACCESS_KEY_ID)
	@read -p "If keys not set, press Cmd+C and check the readme to set these variables"

serverless:           ## Install serverless
serverless:
	@echo Installing serverless
	@npm install -g serverless

config:           ## Create new config fil
config:
	@echo Creating config.js file\n
	@cp config.js.dist config.js

deploy:           ## Deploy on Lambda
deploy:
	serverless deploy

logs:           ## Read logs
logs:
	@echo Reading logs
	serverless logs -f requestUrl -t
