# Makefile for PetroGuard AI

.PHONY: build run stop logs retrain clean test dev seed-db smoke-test

# Build the application (Vite + Express)
build:
	npm run build

# Run the application in production mode
run:
	npm start

# Stop the application (if running in background)
stop:
	pkill -f "node server.ts" || true

# View application logs
logs:
	tail -f logs/app.log

# Trigger model retraining (via API)
retrain:
	curl -X POST http://localhost:3000/api/model/retrain

# Clean build artifacts and temporary files
clean:
	rm -rf dist/
	rm -rf node_modules/
	rm -f dev.db

# Run tests
test:
	npm test

# Run in development mode
dev:
	npm run dev

# Seed the database with synthetic data
seed-db:
	npm run seed

# Run a smoke test against the running API
smoke-test:
	./scripts/smoke-test.sh
