# VeriChain

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-%232D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Midnight-black?style=for-the-badge" alt="Midnight">
</p>

VeriChain is a privacy-preserving blockchain-based authenticity system that protects enterprise confidentiality while giving consumers public proof of trust.

## The Problem

In today's market, there's a clear need for a system that can verify a product's authenticity without compromising sensitive business information. Here's why current solutions fall short:

- **Public blockchains**, like Ethereum, expose all supplier data, creating significant privacy risks for businesses.
- **Centralized systems**, such as GS1 or SAP, are opaque and lack the verifiable trust that a blockchain can provide.
- **The core conflict**: Businesses want to offer verification but are unwilling to reveal their trade secrets in the process.

This creates a gap for a solution that can bridge the need for public trust with the requirement of enterprise privacy.

## Our Solution: The VeriChain MVP

VeriChain is a decentralized application that leverages the Midnight network to provide a privacy-first solution for product authenticity. Our Minimum Viable Product (MVP) demonstrates how businesses can register their products and generate authenticity proofs, while consumers can verify these proofs without either party exposing sensitive information.

## Features

- **User Authentication**: Secure registration and login for manufacturers.
- **Product Registration**: Manufacturers can register their products, creating a unique, private record on the Midnight network.
- **NFT-based Verification**: For each product, a unique "veriNFT" can be minted, acting as a verifiable certificate of authenticity.
- **Public Verification**: Consumers can scan a product's QR code or enter its unique ID to verify its authenticity without needing to know any of the underlying business data.

### Feature Flow

1.  **Manufacturer Registration**: A manufacturer signs up on the VeriChain platform.
2.  **Product Creation**: The manufacturer registers a new product, providing its details. This creates a commitment on the Midnight network.
3.  **veriNFT Minting**: A veriNFT is minted for the product, linked to its authenticity record.
4.  **Consumer Verification**: A consumer receives a product and uses the VeriChain app to scan its unique identifier.
5.  **Proof of Authenticity**: The app communicates with the Midnight network to verify the product's authenticity, returning a simple "verified" or "not verified" status to the consumer.

## Future Scope

VeriChain is just getting started. Here are some of the features and improvements we're planning for the future:

- **Supply Chain Tracking**: Expanding the system to track a product's journey through the entire supply chain, with each step recorded as a private transaction on the Midnight network.
- **Decentralized Identity Integration**: Allowing manufacturers and consumers to manage their identities in a decentralized way.
- **Advanced Analytics**: Providing manufacturers with privacy-preserving analytics about their products' verification history.
- **Mobile Application**: Developing native mobile apps for iOS and Android to provide a more seamless user experience for consumers.

## Project Structure

The VeriChain project is organized as a monorepo with a clear separation of concerns:

```
verichain/
├── docker/                 # Midnight Network services
│   ├── node/
│   ├── indexer/
│   └── proofserver/
├── frontend/               # React application
│   ├── src/
│   └── package.json
├── package/
│   ├── api/               # Backend API
│   │   ├── src/
│   │   ├── prisma/
│   │   └── package.json
│   └── midnight/
│       └── api/verichain/ # Blockchain API package
└── README.md
```

## Documentation

For a deeper dive into the project's architecture, core concepts, and code, please refer to our comprehensive documentation:

- **[Documentation Home](./docs/index.md)**
- **[Project Overview](./docs/project-overview.md)**
- **[Core Concepts](./docs/core-concepts.md)**
- **[Code Explanation](./docs/code-explanation.md)**
- **[Midnight Beginner Guide](./docs/midnight-beginner-guide.md)**

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.