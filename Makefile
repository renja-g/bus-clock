.PHONY: dev prod stop clean logs logs-dev

# Development mode with hot reload
dev:
	docker compose -f docker/docker-compose.dev.yml up -d

dev-build:
	docker compose -f docker/docker-compose.dev.yml build

# Production mode (nginx)
prod:
	docker compose -f docker/docker-compose.yml up -d

prod-build:
	docker compose -f docker/docker-compose.yml build

# Stop all containers
stop:
	docker compose -f docker/docker-compose.yml down
	docker compose -f docker/docker-compose.dev.yml down

# Clean up containers and images
clean: stop
	docker rmi bus-clock_bus-clock 2>/dev/null || true
	docker rmi bus-clock-dev_bus-clock-dev 2>/dev/null || true

# View logs
logs:
	docker compose -f docker/docker-compose.yml logs -f

logs-dev:
	docker compose -f docker/docker-compose.dev.yml logs -f

