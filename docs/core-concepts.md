# Core Concepts

VeriChain is built on a foundation of cutting-edge technologies that enable it to provide a unique combination of privacy and verifiability. This document explains the core concepts that underpin the VeriChain application.

## The Midnight Network

The Midnight network is a privacy-preserving blockchain that is specifically designed for applications that require data confidentiality. Unlike public blockchains such as Ethereum, where all data is public, Midnight uses zero-knowledge proofs (ZK proofs) to allow for private data and transactions.

This makes Midnight the ideal platform for VeriChain, as it allows businesses to store and verify product information on the blockchain without exposing sensitive data to the public.

## Zero-Knowledge Proofs (ZK Proofs)

Zero-knowledge proofs are a cryptographic technique that allows one party (the prover) to prove to another party (the verifier) that a statement is true, without revealing any information beyond the validity of the statement itself.

In the context of VeriChain, ZK proofs are used to:

- **Prove product authenticity:** A manufacturer can create a ZK proof that proves a product is genuine, without revealing any details about the manufacturing process or supply chain.
- **Protect consumer privacy:** A consumer can verify the authenticity of a product without revealing their own identity or purchase history.

## The VeriChain Contract (`main.compact`)

The core logic of the VeriChain application is encapsulated in a smart contract that is deployed on the Midnight network. This contract is written in a language specific to the Midnight ecosystem and is stored in the `main.compact` file within the `package/midnight/contracts/verichain/src/` directory.

The VeriChain contract is responsible for:

- **Registering new products:** When a manufacturer registers a new product, the contract creates a unique digital identity for that product on the blockchain.
- **Minting veriNFTs:** For each registered product, the contract can mint a non-fungible token (NFT) that represents ownership of the authenticity proof.
- **Verifying product authenticity:** The contract provides a function that allows anyone to verify the authenticity of a product by checking its digital identity on the blockchain.

The use of a smart contract ensures that the process of registering and verifying products is both transparent and tamper-proof. Because the contract is deployed on the Midnight network, all of these operations can be performed in a privacy-preserving manner.
