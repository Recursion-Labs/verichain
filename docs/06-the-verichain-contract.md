# The VeriChain Contract

The VeriChain smart contract is the heart of the VeriChain application. It is a privacy-preserving contract that is deployed on the Midnight network and is responsible for all on-chain logic.

## The `main.compact` File

The source code for the VeriChain contract is located in the `package/midnight/contracts/verichain/src/main.compact` file. This file is written in a language that is specific to the Midnight network and is designed for writing zero-knowledge smart contracts.

A `.compact` file in Midnight is a compiled smart contract that contains the ZK circuits and the logic for the contract. It is not human-readable, but it is what is deployed to the Midnight network.

## Core Concepts

The VeriChain contract is built on two core concepts:

- **Commitments**: A commitment is a cryptographic hash of a piece of data. It allows you to "commit" to the data without revealing the data itself. The VeriChain contract uses commitments to store a private record of each product on the blockchain.
- **Zero-Knowledge Proofs (ZKPs)**: ZKPs are used to prove that a statement is true without revealing any information beyond the validity of the statement itself. The VeriChain contract uses ZKPs to verify the authenticity of a product without revealing any of the product's data.

## Contract Functions

The VeriChain contract exposes a set of functions that can be called by the backend to interact with the contract. The main functions are:

### `registerProduct(commitment: private)`

This function is called by the backend to register a new product. It takes a single private argument, which is the commitment to the product's data.

When this function is called, it:

1.  Stores the commitment in the contract's private state.
2.  Mints a new veriNFT and associates it with the commitment.

### `verifyAuthenticity(productData: private)`

This function is called by the backend to verify the authenticity of a product. It takes a single private argument, which is the product's data.

When this function is called, it:

1.  Calculates the commitment to the `productData`.
2.  Checks if the calculated commitment exists in the contract's private state.
3.  Returns `true` if the commitment exists, and `false` otherwise.

This entire process is executed within a ZK circuit, which means that the `productData` is never revealed on the public blockchain.

## The ZK Circuits

The VeriChain contract is powered by a set of zero-knowledge circuits. These circuits are what allow the contract to perform its operations in a privacy-preserving manner.

While the exact implementation of the circuits is not visible in the `.compact` file, we can infer their purpose from the contract's functions:

- **Registration Circuit**: This circuit is used by the `registerProduct` function. It takes the product commitment as a private input and adds it to the contract's state.
- **Verification Circuit**: This circuit is used by the `verifyAuthenticity` function. It takes the product data as a private input, calculates the commitment, and checks if the commitment exists in the contract's state.

These circuits are the key to VeriChain's ability to provide both privacy and verifiability. They are what make it possible to build a truly trustworthy and confidential authenticity system.
