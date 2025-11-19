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

Counterfeiting is one of the world’s largest hidden economic losses. Over 500 billion dollars are lost every year across industries that depend on authenticity.

- **Luxury goods** lose over 100 billion annually.
- **Pharmaceuticals** lose more than 200 billion, and in this case, counterfeits are not just an economic issue but a safety issue. Fake medicine can be lethal.
- **Agriculture and exports** lose another 50 billion due to false origin claims, fake sustainability reports, and unverifiable supply chains.

Despite having QR codes, RFID tags, and digital traceability platforms, nothing guarantees that the information attached to a product is actually true. These systems still depend on centralized databases and trust-based verification. Labels can be copied, certificates can be forged, and QR codes can be duplicated in seconds.

On the enterprise side, brands hesitate to reveal their supplier or manufacturing data because it exposes trade secrets and IP-sensitive processes. So even when companies want to prove authenticity, they cannot do it without risking private data leakage.

The result is a global market where consumers cannot verify anything, businesses cannot prove their legitimacy without exposing confidential information, and regulators cannot trust the data they receive. Authenticity today is based almost entirely on trust, not proof.

## The Tech and Market Gap

The demand for verifiable products has never been higher.

- **Luxury buyers** want provenance.
- **Pharmaceutical supply chains** need safety, batch verification, and zero-counterfeit risk.
- **Export markets** require clear origin and ESG compliance.
- **Second-hand marketplaces** need reliable proof of legitimacy.
- **Insurance** needs effortless authenticity checks.

Every year, billions of products move through global supply chains without any cryptographic identity or verifiable history. The opportunity is massive: a universal system that gives every product a verifiable identity without compromising privacy. VeriChain is designed to fill this gap.

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
- **[01 - The Problem and Solution](./docs/01-problem-and-solution.md)**
- **[02 - Architecture Overview](./docs/02-architecture-overview.md)**
- **[03 - The Backend API](./docs/03-backend-api.md)**
- **[04 - The Frontend Application](./docs/04-frontend-application.md)**
- **[05 - Midnight Integration](./docs/05-midnight-integration.md)**
- **[06 - The VeriChain Contract](./docs/06-the-verichain-contract.md)**
- **[07 - Docker and Services](./docs/07-docker-and-services.md)**
- **[Midnight Beginner Guide](./docs/midnight-beginner-guide.md)**

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.