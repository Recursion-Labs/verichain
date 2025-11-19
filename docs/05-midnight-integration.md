# Midnight Integration

The integration with the Midnight network is what gives VeriChain its unique privacy-preserving capabilities. This document explains how the VeriChain application interacts with the Midnight network to create and verify authenticity proofs.

## The Midnight Packages

The VeriChain project contains a set of packages in the `package/midnight` directory that are specifically designed for interacting with the Midnight network.

- `contracts/verichain`: This package contains the VeriChain smart contract, which is the core of the on-chain logic.
- `api/verichain`: This package provides a JavaScript/TypeScript library for interacting with the VeriChain smart contract. It is used by both the backend and the frontend.
- `cli/verichain`: This package provides a command-line interface (CLI) for interacting with the VeriChain smart contract. It is used for testing and administrative tasks.

## The Interaction Flow

The process of registering a new product and verifying its authenticity involves a series of interactions between the frontend, the backend, and the Midnight network.

### 1. Product Registration

1.  **Frontend**: The manufacturer fills out the product registration form on the frontend and submits it to the backend.
2.  **Backend**: The backend receives the product information and creates a "commitment" to that information. A commitment is a cryptographic hash of the product data that does not reveal the data itself.
3.  **Backend**: The backend sends a transaction to the Midnight network to call the `registerProduct` function on the VeriChain smart contract. This transaction contains the commitment as a private input.
4.  **Midnight Network**: The VeriChain smart contract receives the transaction and stores the commitment in its private state. It also mints a new veriNFT that is associated with the commitment.

### 2. Product Verification

1.  **Frontend**: The consumer enters a product's unique ID into the verification screen on the frontend.
2.  **Frontend**: The frontend sends a request to the backend to verify the product's authenticity.
3.  **Backend**: The backend receives the request and queries the Midnight network to see if there is a veriNFT associated with the product ID.
4.  **Backend**: If a veriNFT is found, the backend then calls the `verifyAuthenticity` function on the VeriChain smart contract. This function takes the product data as a private input and checks if it matches the commitment that is stored on the blockchain.
5.  **Midnight Network**: The VeriChain smart contract executes the `verifyAuthenticity` function and returns a boolean value indicating whether the product is authentic or not. This verification is done in a zero-knowledge manner, which means that the product data is never revealed on the public blockchain.
6.  **Backend**: The backend receives the result of the verification from the Midnight network and sends it back to the frontend.
7.  **Frontend**: The frontend displays the verification result to the consumer.

This entire process is designed to be as private as possible. At no point is any sensitive product data exposed on the public blockchain.
