# The Backend API

The backend of the VeriChain application is a RESTful API built with Express.js and written in TypeScript. It acts as the central nervous system of the application, connecting the frontend to the database and the Midnight network.

## Core Responsibilities

- **User Management**: The backend handles user registration, login, and session management. It uses a PostgreSQL database to store user credentials and profile information.
- **Data Persistence**: The backend is responsible for all interactions with the PostgreSQL database. It uses Prisma as its Object-Relational Mapper (ORM), which provides a type-safe way to interact with the database.
- **Blockchain Interaction**: The backend communicates with the Midnight network to register new products and verify their authenticity. It uses the `@verichain/api` package to interact with the VeriChain smart contract.
- **Business Logic**: The backend contains the core business logic of the application, such as creating product commitments and minting veriNFTs.

## Code Structure

The backend code is located in the `package/api` directory and is organized as follows:

- `src/app.ts`: The main entry point for the backend application. This file initializes the Express.js server and sets up the middleware.
- `src/config/`: Configuration files for the database, environment variables, and module aliases.
- `src/controllers/`: Express.js controllers that handle incoming HTTP requests. Each controller is responsible for a specific resource, such as users or products.
- `src/handlers/`: Middleware functions for handling errors and asynchronous operations.
- `src/routes/`: Express.js routes that define the API endpoints. The routes are organized by version, with the current version being `v1`.
- `src/services/`: Service modules that contain the business logic of the application. For example, the `mail.service.ts` is responsible for sending emails.
- `src/utils/`: Utility functions that are used throughout the backend, such as the `APIError` class for handling errors and the `logger` for logging.
- `prisma/schema.prisma`: The Prisma schema that defines the structure of the PostgreSQL database.

## API Endpoints

The backend API exposes a set of RESTful endpoints for interacting with the VeriChain system. The main endpoints are:

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Log in an existing user.
- `POST /api/v1/products`: Register a new product.
- `GET /api/v1/products/:id`: Get the details of a specific product.
- `POST /api/v1/products/:id/verify`: Verify the authenticity of a product.

For a complete list of API endpoints, please refer to the route definitions in the `package/api/src/routes/v1` directory.
