# VeriChain CLI

## Overview

Command-line interface for development, testing, and deployment of VeriChain contracts on the Midnight Network. Provides an interactive environment for contract operations and testing.

## Installation

```bash
npm install -g @verichain/cli
```

## Usage

### Interactive Mode (Default)

```bash
verichain
# or
verichain interactive
```

Starts an interactive REPL where you can execute commands sequentially.

### Available Commands

#### `deploy`
Deploy a new VeriChain contract to the network.
- Creates a new wallet
- Funds the wallet with testnet tokens
- Deploys the contract
- Returns contract address

#### `connect`
Connect to an existing VeriChain contract.
- Requires contract address
- Configures providers for interaction

#### `register`
Register a new product in the contract.
- Generates random product ID and owner ID
- Creates mock cryptographic commitment
- Submits registration transaction

#### `mint`
Mint an NFT for a registered product.
- Generates random product ID
- Mints NFT if product exists and is in correct state

#### `verify`
Verify product authenticity.
- Generates random product ID and proof
- Submits verification transaction

#### `balance`
Check wallet balance and state.
- Displays current tDUST balance
- Shows wallet state information

#### `help`
Display available commands and usage.

#### `exit`
Exit the interactive mode.

## Configuration

The CLI is pre-configured for local Midnight testnet:

```typescript
const testnetConfig = {
  indexer: 'http://127.0.0.1:8088/api/v1/graphql',
  indexerWS: 'ws://127.0.0.1:8088/api/v1/graphql/ws',
  node: 'http://127.0.0.1:9944',
  proofServer: 'http://127.0.0.1:6300'
};
```

## Interactive Session Example

```
🚀 VeriChain CLI - Interactive Mode
Type "help" for available commands or "exit" to quit

verichain> deploy
🚧 Deploy command - Setting up wallet and providers...
✅ Providers configured
✅ Wallet created and funded
✅ Contract deployed successfully!
Contract address: 0x1234567890abcdef...

verichain> register
📝 Registering product...
✅ Product registered successfully!
Product ID: 123456
Owner ID: 789012
Transaction: 0xabcdef123456...

verichain> mint
🎨 Minting NFT...
✅ NFT minted successfully!
Product ID: 123456
Transaction: 0x789012345678...

verichain> verify
🔍 Verifying product authenticity...
✅ Product verified successfully!
Product ID: 123456
Transaction: 0x345678901234...

verichain> exit
Goodbye! 👋
```

## Prerequisites

- Node.js 16+
- Local Midnight testnet running
- Required ports available:
  - Indexer: 8088
  - Proof Server: 6300
  - Node: 9944

## Development

### Building from Source

```bash
cd package/midnight/cli/verichain
npm install
npm run build
npm link
```

### Testing

```bash
npm test
```

## Architecture

The CLI uses:
- **Commander.js**: For command parsing
- **Chalk**: For colored terminal output
- **Readline**: For interactive input
- **VeriChain API**: For contract interactions
- **Midnight Wallet**: For transaction signing

## Error Handling

The CLI provides user-friendly error messages for:
- Network connectivity issues
- Invalid contract states
- Missing prerequisites
- Transaction failures

All errors are displayed with red ❌ indicators and descriptive messages.

## Integration

The CLI is designed to work seamlessly with:
- Local development environments
- CI/CD pipelines for contract testing
- Manual testing and debugging
- Demonstration and education purposes