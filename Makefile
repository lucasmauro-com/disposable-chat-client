docker-run:
	docker compose -f ./docker/docker-compose.yml up --build

install:
	npm install

run:
	npm run dev

format:
	npm run format
