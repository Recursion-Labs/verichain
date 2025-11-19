# Docker and Services

The VeriChain application relies on a number of supporting services to function. These services are managed using Docker and Docker Compose, which makes it easy to set up and run the entire application in a local development environment.

## The `docker` Directory

The `docker` directory in the root of the project contains the Docker Compose files for each of the supporting services.

- `docker/node/compose.yaml`: The Docker Compose file for the Midnight node.
- `docker/indexer/compose.yaml`: The Docker Compose file for the Midnight indexer.
- `docker/proofserver/compose.yaml`: The Docker Compose file for the Midnight proof server.

## The Supporting Services

### PostgreSQL Database

- **Purpose**: The PostgreSQL database is used to store all of the off-chain data for the VeriChain application, such as user accounts and product information.
- **Management**: The database is not managed by the Docker Compose files in the `docker` directory. It is expected to be run as a separate service. The `SETUP.md` file provides instructions for running a PostgreSQL database in a Docker container.

### Midnight Node

- **Purpose**: The Midnight node is the gateway to the Midnight network. The backend of the VeriChain application connects to this node to send transactions and query the blockchain.
- **Configuration**: The `docker/node/compose.yaml` file defines the configuration for the Midnight node service.

### Midnight Indexer

- **Purpose**: The Midnight indexer is a service that listens for events on the Midnight network and stores them in a database. This allows for efficient querying of blockchain data, which is essential for the VeriChain application to function correctly.
- **Configuration**: The `docker/indexer/compose.yaml` file defines the configuration for the Midnight indexer service.

### Midnight Proof Server

- **Purpose**: The Midnight proof server is responsible for generating and verifying the zero-knowledge proofs that are used by the VeriChain application. When the backend needs to create a proof for a transaction, it sends a request to the proof server.
- **How it Works**: The proof server is a highly specialized service that is optimized for performing the complex mathematical calculations required to generate ZKPs. By offloading this work to a dedicated service, the VeriChain application is able to remain fast and responsive.
- **Configuration**: The `docker/proofserver/compose.yaml` file defines the configuration for the Midnight proof server service.

## Running the Services

To run all of the Midnight services, you can use the `docker compose up -d` command in each of the service directories. The `SETUP.md` file provides detailed instructions for starting the services in the correct order.

By using Docker to manage these services, the VeriChain project ensures that the development environment is consistent and easy to set up for all developers.
