PROJECT_NAME ?= journal


# a variable that stores application's container id if the container is running
CONTAINER_ID := $(shell docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) ps -q api)
ifeq ($(CONTAINER_ID),)
	CONTAINER := $(shell docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) ps -q api)
else
	CONTAINER := $(shell docker ps -q --no-trunc | grep $$(docker-compose -f docker-compose.yml ps -q api))
endif



start:
	@ ${INFO} "Building required docker images"
	@ docker compose -p $(PROJECT_NAME) build
	@ ${INFO} "Build Completed successfully"
	@ echo " "
	@ ${INFO} "Starting local development server"
	@ docker compose -p $(PROJECT_NAME) up



migrate:
	@ ${INFO} "Running migrations"
	@ docker-compose exec api npx sequelize-cli db:migrate
	@ ${SUCCESS} "Done migrations"



# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
NC := "\e[0m"
RESET  := $(shell tput -Txterm sgr0)

# Shell Functions
INFO := @bash -c 'printf "\n"; printf $(YELLOW); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
SUCCESS := @bash -c 'printf "\n"; printf $(GREEN); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE