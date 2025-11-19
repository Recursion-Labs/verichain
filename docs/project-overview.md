# Project Overview

VeriChain is a decentralized application that provides a privacy-preserving solution for verifying the authenticity of products. It leverages the Midnight network to ensure that sensitive business data remains confidential while still providing consumers with a verifiable proof of authenticity.

## The Problem

In the modern supply chain, there is a growing need for transparency and traceability. Consumers want to be sure that the products they buy are genuine, and businesses want to protect their brand from counterfeiting. However, existing solutions have significant drawbacks:

- **Public blockchains** like Ethereum expose sensitive supplier data, which can be a major concern for businesses.
- **Centralized systems** like GS1 and SAP are opaque and do not provide the same level of verifiability as a blockchain-based solution.

This leaves a gap in the market for a solution that can provide both privacy and verifiability.

## The Solution: VeriChain

VeriChain addresses this gap by using a privacy-preserving blockchain architecture. By building on the Midnight network, VeriChain is able to:

- **Protect enterprise confidentiality:** Businesses can verify their products without revealing sensitive trade secrets or supply chain information.
- **Provide public proof of trust:** Consumers can easily verify the authenticity of a product using a simple and accessible interface.

## Architecture

The VeriChain application consists of the following components:

- **Frontend:** A React application (built with Vite) that provides a user interface for both manufacturers and consumers.
- **Backend API:** An Express.js server (written in TypeScript) that handles user authentication, database interactions, and communication with the Midnight network.
- **Blockchain:** The Midnight network is used to store and verify product authenticity information in a privacy-preserving manner.
- **Database:** A PostgreSQL database is used to store user and product data that does not need to be on the blockchain.

This architecture allows for a separation of concerns, with the backend API acting as a bridge between the frontend and the blockchain. The use of a traditional database for non-sensitive data ensures that the application is both efficient and scalable.
