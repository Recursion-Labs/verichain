# Midnight Beginner Guide

This guide provides a beginner-friendly introduction to building decentralized applications (dApps) on the Midnight network. It is based on the official Midnight documentation and is intended to help new developers get started as quickly as possible.

## 1. Installation

Before you can start building on Midnight, you need to install the Midnight CLI. This is the primary tool for interacting with the Midnight network.

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Git

### Install the CLI

To install the Midnight CLI globally, open your terminal and run the following command:

```bash
npm install -g @midnight-network/cli
```

After the installation is complete, you can verify that the CLI is installed correctly by running:

```bash
mn --version
```

This should print the version number of the Midnight CLI.

## 2. Create a New Project

Once the CLI is installed, you can create a new Midnight project using the `mn create` command.

```bash
mn create my-midnight-app
```

This will prompt you to choose a template. For your first project, the `hello-world` template is a good choice.

After the project is created, navigate into the project directory:

```bash
cd my-midnight-app
```

## 3. Project Structure

A new Midnight project has the following structure:

- `src/lib.mn`: The source code for your dApp, written in the Midnight language.
- `tests/lib.test.ts`: Example tests for your dApp.
- `mn.toml`: The configuration file for your project.
- `package.json`: The Node.js project configuration file.

## 4. Build and Deploy

To build your dApp, run the following command in your project directory:

```bash
mn build
```

This will compile your code and create a `dist/` directory with the build artifacts.

To deploy your dApp, you first need to start a local development network:

```bash
mn devnet start
```

Then, in a separate terminal, you can deploy your dApp to the local network:

```bash
mn deploy
```

The CLI will prompt you to choose a network. Select `local` to deploy to your local development network.

## 5. Interact with Your dApp

After your dApp is deployed, you can interact with it using the `mn call` command.

```bash
mn call YOUR_APP_ADDRESS FUNCTION_NAME
```

Replace `YOUR_APP_ADDRESS` with the address of your deployed dApp, and `FUNCTION_NAME` with the name of the function you want to call.

## Further Reading

This guide provides a very basic introduction to building on Midnight. For more detailed information, please refer to the official Midnight documentation:

- [Installation](https://docs.midnight.network/getting-started/installation)
- [Create a Midnight App](https://docs.midnight.network/getting-started/create-mn-app)
- [Deploy "Hello, World!"](https://docs.midnight.network/getting-started/deploy-hello-world)
- [Interact with a Midnight App](https://docs.midnight.network/getting-started/interact-with-mn-app)
