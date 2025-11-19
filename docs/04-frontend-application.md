# The Frontend Application

The frontend of the VeriChain application is a modern single-page application (SPA) built with React and Vite. It is written in TypeScript and is designed to be both fast and user-friendly.

## Core Responsibilities

- **User Interface**: The frontend is responsible for rendering the user interface of the VeriChain application. It provides a set of reusable components that are used to build the various pages of the application.
- **User Interaction**: The frontend handles all user interactions, such as filling out forms, clicking buttons, and navigating between pages.
- **API Communication**: The frontend communicates with the backend API to send and receive data. It uses the `axios` library to make HTTP requests to the backend.
- **Blockchain Communication**: The frontend also communicates directly with the Midnight network in some cases, such as when verifying a product's authenticity. It uses the `@verichain/api` package to interact with the VeriChain smart contract.

## Code Structure

The frontend code is located in the `frontend` directory and is organized as follows:

- `src/App.tsx`: The main component of the application. This file sets up the routing and renders the main layout of the application.
- `src/main.tsx`: The entry point for the frontend application. This file renders the `App` component and mounts it to the DOM.
- `src/components/`: A collection of reusable React components that are used throughout the application. For example, the `NavBar.tsx` component renders the navigation bar.
- `src/contexts/`: React contexts for managing global state. The `AuthContext.tsx` is used to manage the user's authentication state.
- `src/pages/`: The main pages of the application. Each page is a React component that is rendered when the user navigates to a specific URL.
- `src/services/`: Modules for interacting with the backend API and the blockchain.
  - `api.ts`: Contains functions for making requests to the backend API.
  - `blockchain.ts`: Contains functions for interacting with the Midnight network.

## Key Features

The frontend provides a number of key features for both manufacturers and consumers.

### For Manufacturers

- **Dashboard**: A dashboard where manufacturers can view a list of their registered products.
- **Product Registration**: A form that allows manufacturers to register new products.
- **NFT Minting**: A feature that allows manufacturers to mint veriNFTs for their products.

### For Consumers

- **Verification Screen**: A simple screen where consumers can enter a product's unique ID to verify its authenticity.
- **Product Page**: A page that displays the details of a specific product, including its authenticity status.

The frontend is designed to be intuitive and easy to use, even for users who are not familiar with blockchain technology.
