.PHONY: migrate-up migrate-down migrate-create migrate-force help

# Migration settings
MIGRATIONS_PATH=./migrations
DATABASE_URL=postgres://indian_biased:indian_biased_password@localhost:5432/indian_biased?sslmode=disable

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

migrate-up: ## Run all pending migrations
	@echo "Running migrations..."
	migrate -path $(MIGRATIONS_PATH) -database $(DATABASE_URL) up

migrate-down: ## Rollback the last migration
	@echo "Rolling back last migration..."
	migrate -path $(MIGRATIONS_PATH) -database $(DATABASE_URL) down 1

migrate-down-all: ## Rollback all migrations
	@echo "Rolling back all migrations..."
	migrate -path $(MIGRATIONS_PATH) -database $(DATABASE_URL) down

migrate-create: ## Create a new migration (usage: make migrate-create NAME=add_new_table)
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME parameter is required. Usage: make migrate-create NAME=migration_name"; \
		exit 1; \
	fi
	@echo "Creating migration: $(NAME)"
	migrate create -ext sql -dir $(MIGRATIONS_PATH) -seq $(NAME)

migrate-force: ## Set migration version (usage: make migrate-force VERSION=1)
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION parameter is required. Usage: make migrate-force VERSION=1"; \
		exit 1; \
	fi
	@echo "Setting migration version to $(VERSION)"
	migrate -path $(MIGRATIONS_PATH) -database $(DATABASE_URL) force $(VERSION)

migrate-version: ## Show current migration version
	@echo "Current migration version:"
	migrate -path $(MIGRATIONS_PATH) -database $(DATABASE_URL) version
