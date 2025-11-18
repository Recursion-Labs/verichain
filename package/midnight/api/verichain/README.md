# VeriChain API Library

## Overview

TypeScript library providing programmatic access to VeriChain contracts on the Midnight Network. This library enables developers to interact with VeriChain smart contracts from Node.js applications.

## Architecture

- **Node.js API**: Full-featured API for server-side interactions
- **Common API**: Shared interfaces and types
- **Wallet Integration**: Built-in wallet management and transaction signing
- **Provider Configuration**: Handles network connections (indexer, proof server, etc.)

## Installation

```bash
npm install @verichain/api
```

## Quick Start

```typescript
import { VeriChainAPI, configureProviders, buildFreshWallet } from '@verichain/api';

// Configure network providers
const providers = configureProviders({
  indexer: 'http://127.0.0.1:8088/api/v1/graphql',
  indexerWS: 'ws://127.0.0.1:8088/api/v1/graphql/ws',
  node: 'http://127.0.0.1:9944',
  proofServer: 'http://127.0.0.1:6300'
});

// Create or load wallet
const wallet = await buildFreshWallet(testnetConfig);

// Deploy new contract
const api = await VeriChainAPI.deploy(providers, wallet);
console.log('Contract deployed at:', api.contractAddress);

// Or connect to existing contract
const api = await VeriChainAPI.connect(providers, contractAddress);
```

## API Reference

### VeriChainAPI Class

#### Static Methods

##### `deploy(providers, wallet)`
Deploys a new VeriChain contract.
- **Parameters**:
  - `providers`: Configured network providers
  - `wallet`: Wallet instance for deployment
- **Returns**: Promise<VeriChainAPI> - API instance connected to deployed contract

##### `connect(providers, contractAddress)`
Connects to an existing VeriChain contract.
- **Parameters**:
  - `providers`: Configured network providers
  - `contractAddress`: Address of deployed contract
- **Returns**: Promise<VeriChainAPI> - API instance connected to contract

#### Instance Methods

##### `registerProduct(wallet, productId, ownerId, commitment)`
Registers a new product.
- **Parameters**:
  - `wallet`: Wallet instance
  - `productId`: BigInt product identifier
  - `ownerId`: BigInt owner identifier
  - `commitment`: Uint8Array(32) cryptographic commitment
- **Returns**: Promise<TransactionResult>

##### `mintNft(wallet, productId)`
Mints an NFT for a registered product.
- **Parameters**:
  - `wallet`: Wallet instance
  - `productId`: BigInt product identifier
- **Returns**: Promise<TransactionResult>

##### `verifyProduct(wallet, productId, proof)`
Verifies product authenticity.
- **Parameters**:
  - `wallet`: Wallet instance
  - `productId`: BigInt product identifier
  - `proof`: Uint8Array(32) verification proof
- **Returns**: Promise<TransactionResult>

##### `getContractState()`
Retrieves current contract state.
- **Returns**: Promise<ContractState>

### Provider Configuration

#### `configureProviders(config)`
Configures network providers for Midnight Network connection.
- **Parameters**:
  - `config`: Provider configuration object
- **Returns**: Configured providers object

### Wallet Management

#### `buildFreshWallet(config)`
Creates a new wallet with testnet funding.
- **Parameters**:
  - `config`: Testnet configuration
- **Returns**: Promise<Wallet> - New wallet instance

## Configuration

### Testnet Configuration
```typescript
const testnetConfig = {
  indexer: 'http://127.0.0.1:8088/api/v1/graphql',
  indexerWS: 'ws://127.0.0.1:8088/api/v1/graphql/ws',
  node: 'http://127.0.0.1:9944',
  proofServer: 'http://127.0.0.1:6300'
};
```

### Mainnet Configuration
For mainnet deployment, update provider URLs to production endpoints.

## Error Handling

All API methods throw errors for:
- Network connectivity issues
- Invalid parameters
- Contract state violations
- Insufficient wallet balance

```typescript
try {
  await api.registerProduct(wallet, productId, ownerId, commitment);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

## Types

See `src/common/types.ts` for complete type definitions including:
- `TransactionResult`
- `ContractState`
- `ProviderConfig`
- `WalletState`