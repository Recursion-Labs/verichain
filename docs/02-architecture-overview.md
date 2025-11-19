# Architecture Overview

VeriChain is a full-stack decentralized application that is designed to be modular, scalable, and secure. It is composed of several distinct components that work together to provide a seamless experience for both manufacturers and consumers.

## High-Level Architecture

The VeriChain architecture can be broken down into four main layers:

1.  **Frontend**: A user-facing application that allows users to interact with the VeriChain system.
2.  **Backend**: A server-side application that handles business logic, user authentication, and communication with the other layers.
3.  **Blockchain**: The Midnight network, which provides the foundation for our privacy-preserving authenticity proofs.
4.  **Services**: A collection of supporting services, such as the database and the Midnight network services.

![Architecture Diagram](https://i.imgur.com/your-diagram-url.png) 
(Note: This is a placeholder for a diagram URL.)

## Component Breakdown

### Frontend

- **Framework**: React with Vite
- **Language**: TypeScript
- **Key Directories**:
  - `frontend/src/components`: Reusable UI components.
  - `frontend/src/pages`: The main pages of the application.
  - `frontend/src/services`: Modules for interacting with the backend and the blockchain.

The frontend is a single-page application (SPA) that provides a rich user experience. It is responsible for rendering the user interface, handling user input, and making requests to the backend API.

### Backend

- **Framework**: Express.js
- **Language**: TypeScript
- **Key Directories**:
  - `package/api/src/controllers`: Request handlers.
  - `package/api/src/routes`: API endpoint definitions.
  - `package/api/src/services`: Business logic modules.
  - `package/api/prisma`: Database schema.

The backend is a RESTful API that serves as the central hub of the VeriChain application. It is responsible for:

- User authentication and authorization.
- Storing and retrieving data from the PostgreSQL database.
- Interacting with the Midnight network to create and verify authenticity proofs.

### Blockchain

- **Platform**: Midnight Network
- **Key Directories**:
  - `package/midnight/contracts/verichain`: The VeriChain smart contract.
  - `package/midnight/api/verichain`: A library for interacting with the contract.
  - `package/midnight/cli/verichain`: a CLI for interacting with the contract.

The blockchain layer is the heart of VeriChain's privacy-preserving features. The VeriChain smart contract, written in a language specific to Midnight, defines the on-chain logic for registering products and verifying their authenticity.

### Services

- **Database**: PostgreSQL is used to store user data, product information, and other data that does not need to be on the blockchain.
- **Midnight Services**: The VeriChain application relies on several Midnight network services to function:
  - **Node**: A Midnight node that the backend connects to.
  - **Indexer**: A service that indexes data from the Midnight network to allow for efficient querying.
  - **Proof Server**: A service that generates and verifies the zero-knowledge proofs that are used to protect user privacy.

These services are managed using Docker Compose, which makes it easy to run the entire VeriChain application in a local development environment.
