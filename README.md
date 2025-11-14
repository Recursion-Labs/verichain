# VeriChain

A privacy-proven product-authenticity layer on the Midnight Network that turns physical items into ZK-verified NFTs, proving origin and integrity without exposing supplier data.

## Key features

- Private product registration — manufacturers commit creation events as private inputs.
- veriNFT minting — privacy-preserving NFTs with hashed product metadata.
- ZK proof of authenticity — verify on-chain proofs without revealing raw supply-chain data.
- Consumer scan (QR/NFC) — fetch authenticity results via NFT ID (optional for MVP).
- Optional ESG proofs — attach cryptographic proofs for sustainability / compliance.

## How it works

1. Manufacturer generates a combined Poseidon hash of product attributes (productId, batch, origin, certificate).
2. A compact smart contract on Midnight stores the private commitment and mints a veriNFT.
3. Consumer scans a QR/NFC linked to the NFT ID (or enters it manually). The dApp verifies commitment existence via a ZK proof.
4. The app displays authenticity status:
   - ✅ Authentic product — proof validated
   - ❌ Invalid proof — unverified source

## Hackathon MVP scope

- Show hashing of product data.
- Mint a veriNFT.
- Verify authenticity via an on-chain ZK proof.
- QR/NFC is optional for the MVP.

## Tech stack

- Blockchain: Midnight Network (compact smart contracts + ZK runtime)
- Crypto: Poseidon hash commitments
- Contracts: Compact language for private commitments and NFT minting
- Frontend: Minimal manufacturer and consumer dApps

## Demo flow (example)

- Manufacturer dApp:

  - Input: productId, batch, origin, certificate hash
  - Compute H = Poseidon(productId, batch, cert, origin)
  - Call: registerProduct(private string productData)
  - Store commitment (H) + timestamp; mint veriNFT

- Consumer dApp:
  - Scan `NFT_ID` or enter it manually
  - Call: verifyAuthenticity(productHash) → check commitment existence
  - Display result and minted timestamp

## Repository structure

- `contracts/` — compact smart contracts (commitments, veriNFT, verification)
- `frontend-manufacturer/` — dApp to register and mint
- `frontend-consumer/` — dApp to scan/verify authenticity
- `zk/` — Poseidon hashing utilities and proof helpers
- `docs/` — PRD, architecture, and demo notes

## Getting started

### Prerequisites

- Midnight toolchain and testnet access
- Node.js (for the dApps)

### Setup

1. Install dependencies in each subfolder (e.g. `npm install` or `pnpm install`).
2. Configure environment variables for Midnight RPC and test tokens.
3. Deploy contracts, then run the manufacturer and consumer dApps.

## Naming

Suggested project name: VeriChain

## License

MIT
