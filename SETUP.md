# VeriChain Setup Guide

This guide provides step-by-step instructions for setting up the VeriChain project locally.

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL (or use Docker)
- Git

## Architecture Overview

VeriChain consists of:
- **Frontend**: React + Vite application for manufacturer and consumer interfaces
- **Backend API**: Express.js + TypeScript API with authentication and database
- **Blockchain**: Midnight Network integration for ZK-proven product authenticity
- **Database**: PostgreSQL for user and product data
- **Services**: Midnight node, indexer, and proof server for blockchain operations

## Quick Setup Order

1. **Start Midnight Network services** (Docker)
2. **Set up database** (PostgreSQL)
3. **Build blockchain packages** (@verichain/api)
4. **Set up backend API** (install deps, migrate DB)
5. **Set up frontend** (install deps)
6. **Run the application**

## Detailed Setup Instructions

### 1. Start Midnight Network Services

The project requires Midnight Network services running locally for blockchain operations.

```bash
# Start Midnight node
cd docker/node
docker compose up -d

# Start indexer (in another terminal)
cd docker/indexer
docker compose up -d

# Start proof server (in another terminal)
cd docker/proofserver
docker compose up -d
```

Verify services are running:
- Node: http://localhost:9944/health
- Indexer: http://localhost:8088
- Proof Server: http://localhost:6300

### 2. Set up Database

You need a PostgreSQL database. You can use a local installation or Docker:

```bash
# Using Docker
docker run --name verichain-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=verichain -p 5432:5432 -d postgres:15

# Or use your existing PostgreSQL installation
```

### 3. Build Blockchain Packages

The @verichain/api package needs to be built before the frontend can use it.

```bash
# Navigate to the API package
cd package/midnight/api/verichain

# Install dependencies
npm install

# Build the package
npm run build
```

### 4. Set up Backend API

```bash
# Navigate to API directory
cd ../../../../package/api

# Install dependencies
npm install

# Set up environment variables
cp .example.env .env
# Edit .env with your database URL:
# DATABASE_URL="postgresql://username:password@localhost:5432/verichain"

# Generate Prisma client and run migrations
npx prisma generate
npx prisma db push

# Start the API server
npm run dev
```

The API will be available at http://localhost:3000

### 5. Set up Frontend

```bash
# Navigate to frontend directory
cd ../../../frontend

# Install dependencies
npm install

# Create environment file (optional)
# echo "VITE_API_URL=http://localhost:3000/api/v1" > .env

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/verichain
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api/v1
```

## Running the Application

1. **Start all services in order:**
   - Midnight services (node, indexer, proof server)
   - Database (PostgreSQL)
   - Backend API (`npm run dev` in package/api)
   - Frontend (`npm run dev` in frontend)

2. **Access the application:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/v1

## Development Workflow

- **Frontend changes**: Hot reload enabled
- **Backend changes**: Server restarts automatically with nodemon
- **Blockchain changes**: Rebuild @verichain/api package and restart frontend

## Troubleshooting

### Common Issues

1. **@verichain/api module not found**
   - Ensure you've built the package: `cd package/midnight/api/verichain && npm run build`

2. **Database connection errors**
   - Verify DATABASE_URL in package/api/.env
   - Ensure PostgreSQL is running

3. **Midnight services not responding**
   - Check Docker containers: `docker ps`
   - View logs: `docker logs <container_name>`

4. **Port conflicts**
   - Midnight node: 9944
   - Indexer: 8088
   - Proof server: 6300
   - API: 3000
   - Frontend: 3000 (Vite will use next available port)

### Reset Everything

```bash
# Stop all containers
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

# Clean node_modules
find . -name node_modules -type d -exec rm -rf {} +

# Reinstall everything
npm install
```

## Project Structure

```
verichain/
├── docker/                 # Midnight Network services
│   ├── node/
│   ├── indexer/
│   └── proofserver/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API and blockchain services
│   │   └── contexts/      # React contexts
│   └── package.json
├── package/
│   ├── api/               # Backend API
│   │   ├── src/
│   │   ├── prisma/        # Database schema
│   │   └── package.json
│   └── midnight/
│       └── api/verichain/ # Blockchain API package
└── README.md
```

## Next Steps

1. Register as a manufacturer
2. Create product commitments
3. Mint veriNFTs
4. Verify product authenticity

For detailed API documentation, see the backend routes and frontend service files.