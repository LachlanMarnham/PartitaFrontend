run-server-locally:
	python app.py

build:
	docker build -t partita-dev-server .

develop: build
	@docker run -v $(shell pwd):/src -p 5678:5678 partita-dev-server

open-in-shell:
	$(eval CONTAINER_ID := $(shell docker ps | sed -n 2p | awk '{print $$1}'))
	docker exec -it $(CONTAINER_ID) bash
