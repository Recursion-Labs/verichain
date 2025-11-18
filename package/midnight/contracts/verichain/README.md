# VeriChain Smart Contract

## Overview

This folder contains the core smart contract logic for VeriChain built using Midnight Network's Compact language. The contract implements privacy-preserving product authenticity verification using zero-knowledge proofs (ZKPs).

## Contract Features

- **Product Lifecycle Management**: Tracks products through states (Registered → Minted → Verified)
- **Zero-Knowledge Proofs**: Uses ZKP for privacy-preserving verification
- **NFT Minting**: Creates NFTs for verified products
- **ESG Disclosure**: Stores environmental/social/governance proofs

## Core Functions

### `register_product(product_id, owner_id, commitment)`
Registers a new product in the system.
- **Parameters**:
  - `product_id`: Unique 32-bit product identifier
  - `owner_id`: 32-bit owner identifier
  - `commitment`: 32-byte cryptographic commitment
- **Requirements**: Product must not already exist

### `mint_nft(product_id)`
Mints an NFT for a registered product.
- **Parameters**:
  - `product_id`: Product to mint NFT for
- **Requirements**: Product must be registered and not already have an NFT

### `verify_authenticity(product_id, proof)`
Verifies product authenticity using zero-knowledge proof.
- **Parameters**:
  - `product_id`: Product to verify
  - `proof`: 32-byte verification proof
- **Requirements**: Product must be minted

### `disclose_esg(product_id, proof)`
Stores ESG compliance proof for a product.
- **Parameters**:
  - `product_id`: Product identifier
  - `proof`: 64-byte ESG proof data

## Data Structures

- `product_status`: Maps product IDs to their current status (Registered/Minted/Verified)
- `product_owner`: Maps products to owner IDs
- `product_commitment`: Stores cryptographic commitments for each product
- `nft_minted`: Tracks whether NFT has been minted for each product
- `esg_proof`: Stores ESG compliance proofs

## State Transitions

```
Unregistered → register_product() → Registered
Registered → mint_nft() → Minted
Minted → verify_authenticity() → Verified
```

## Dependencies

- Compact Standard Library
- Midnight Network runtime (v0.16-0.18)