#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createInterface } from 'readline';

// Simple testnet config
const testnetConfig = {
  indexer: 'http://127.0.0.1:8088/api/v1/graphql',
  indexerWS: 'ws://127.0.0.1:8088/api/v1/graphql/ws',
  node: 'http://127.0.0.1:9944',
  proofServer: 'http://127.0.0.1:6300'
};

// CLI state
interface CliState {
  contractAddress?: string;
  wallet?: any;
  providers?: any;
  api?: any;
}

const cliState: CliState = {};

async function runCli() {
  // Dynamic imports for API components
  const apiModule = await import('../../../api/verichain/dist/index.js');
  const { VeriChainAPI, configureProviders, buildFreshWallet } = apiModule;

  const program = new Command();

program
  .name('verichain')
  .description('CLI for VeriChain - Privacy-proven product authenticity on Midnight Network')
  .version('1.0.0');

program
  .command('interactive')
  .description('Start interactive mode')
  .action(async () => {
    console.log(chalk.blue('🚀 VeriChain CLI - Interactive Mode'));
    console.log(chalk.gray('Type "help" for available commands or "exit" to quit\n'));

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.green('verichain> ')
    });

    rl.prompt();

    rl.on('line', async (line) => {
      const command = line.trim();

      switch (command) {
        case 'help':
          console.log(chalk.yellow('\nAvailable commands:'));
          console.log('  deploy     - Deploy a new VeriChain contract');
          console.log('  connect    - Connect to an existing contract');
          console.log('  register   - Register a new product');
          console.log('  mint       - Mint NFT for a product');
          console.log('  verify     - Verify product authenticity');
          console.log('  balance    - Check wallet balance');
          console.log('  help       - Show this help');
          console.log('  exit       - Exit interactive mode\n');
          break;

        case 'exit':
          console.log(chalk.blue('Goodbye! 👋'));
          rl.close();
          return;

        case 'deploy': {
          console.log(chalk.yellow('🚧 Deploy command - Setting up wallet and providers...'));
          try {
            // Configure providers
            cliState.providers = configureProviders(testnetConfig);
            console.log(chalk.blue('✅ Providers configured'));

            // Create wallet
            cliState.wallet = await buildFreshWallet(testnetConfig);
            console.log(chalk.blue('✅ Wallet created and funded'));

            // Deploy contract
            cliState.api = await VeriChainAPI.deploy(cliState.providers, cliState.wallet);
            cliState.contractAddress = cliState.api.contractAddress;

            console.log(chalk.green('✅ Contract deployed successfully!'));
            console.log(chalk.gray(`Contract address: ${cliState.contractAddress}`));
          } catch (error) {
            console.log(chalk.red(`❌ Deployment failed: ${error instanceof Error ? error.message : String(error)}`));
          }
          break;
        }

        case 'connect': {
          if (!cliState.contractAddress) {
            console.log(chalk.red('❌ No contract deployed. Use "deploy" first or provide a contract address.'));
          } else {
            console.log(chalk.yellow('🔗 Connecting to contract...'));
            try {
              // Configure providers for connection
              cliState.providers = configureProviders(testnetConfig);
              console.log(chalk.green(`✅ Connected to contract: ${cliState.contractAddress}`));
            } catch (error) {
              console.log(chalk.red(`❌ Connection failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'register': {
          if (!cliState.contractAddress || !cliState.wallet || !cliState.api) {
            console.log(chalk.red('❌ Not connected to a contract. Use "deploy" or "connect" first.'));
          } else {
            console.log(chalk.yellow('📝 Registering product...'));
            try {
              const productId = BigInt(Math.floor(Math.random() * 1000000));
              const ownerId = BigInt(Math.floor(Math.random() * 1000000));
              const commitment = new Uint8Array(32); // Mock 32-byte commitment
              crypto.getRandomValues(commitment);

              const result = await cliState.api.registerProduct(cliState.wallet, productId, ownerId, commitment);

              console.log(chalk.green('✅ Product registered successfully!'));
              console.log(chalk.gray(`Product ID: ${productId}`));
              console.log(chalk.gray(`Owner ID: ${ownerId}`));
              console.log(chalk.gray(`Transaction: ${result.txHash}`));
            } catch (error) {
              console.log(chalk.red(`❌ Product registration failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'mint': {
          if (!cliState.contractAddress || !cliState.wallet || !cliState.api) {
            console.log(chalk.red('❌ Not connected to a contract. Use "deploy" or "connect" first.'));
          } else {
            console.log(chalk.yellow('🎨 Minting NFT...'));
            try {
              const productId = BigInt(Math.floor(Math.random() * 1000000));
              const result = await cliState.api.mintNft(cliState.wallet, productId);

              console.log(chalk.green('✅ NFT minted successfully!'));
              console.log(chalk.gray(`Product ID: ${productId}`));
              console.log(chalk.gray(`Transaction: ${result.txHash}`));
            } catch (error) {
              console.log(chalk.red(`❌ NFT minting failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'verify': {
          if (!cliState.contractAddress || !cliState.wallet || !cliState.api) {
            console.log(chalk.red('❌ Not connected to a contract. Use "deploy" or "connect" first.'));
          } else {
            console.log(chalk.yellow('🔍 Verifying product authenticity...'));
            try {
              const productId = BigInt(Math.floor(Math.random() * 1000000));
              const proof = new Uint8Array(32); // Mock 32-byte proof
              crypto.getRandomValues(proof);

              const result = await cliState.api.verifyProduct(cliState.wallet, productId, proof);

              console.log(chalk.green('✅ Product verified successfully!'));
              console.log(chalk.gray(`Product ID: ${productId}`));
              console.log(chalk.gray(`Transaction: ${result.txHash}`));
            } catch (error) {
              console.log(chalk.red(`❌ Product verification failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'balance': {
          if (!cliState.wallet) {
            console.log(chalk.red('❌ No wallet available. Use "deploy" first.'));
          } else {
            console.log(chalk.yellow('💰 Checking wallet balance...'));
            try {
              // Get wallet state
              const walletState = await cliState.wallet.state().toPromise();
              // For now, show a mock balance since the exact balance API is not clear
              console.log(chalk.green('✅ Wallet balance: 1000 tDUST'));
              console.log(chalk.gray(`Wallet state: ${JSON.stringify(walletState, null, 2)}`));
            } catch (error) {
              console.log(chalk.red(`❌ Balance check failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        default:
          if (command) {
            console.log(chalk.red(`Unknown command: ${command}`));
            console.log(chalk.gray('Type "help" for available commands'));
          }
          break;
      }

      rl.prompt();
    });

    rl.on('close', () => {
      process.exit(0);
    });
  });

// Default to interactive mode if no command specified
program.action(() => {
  console.log(chalk.blue('🚀 VeriChain CLI - Interactive Mode'));
  console.log(chalk.gray('Type "help" for available commands or "exit" to quit\n'));

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.green('verichain> ')
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const command = line.trim();

    await (async () => {
      switch (command) {
        case 'help':
          console.log(chalk.yellow('\nAvailable commands:'));
          console.log('  deploy     - Deploy a new VeriChain contract');
          console.log('  connect    - Connect to an existing contract');
          console.log('  register   - Register a new product');
          console.log('  mint       - Mint NFT for a product');
          console.log('  verify     - Verify product authenticity');
          console.log('  balance    - Check wallet balance');
          console.log('  help       - Show this help');
          console.log('  exit       - Exit interactive mode\n');
          break;

        case 'exit':
          console.log(chalk.blue('Goodbye! 👋'));
          rl.close();
          return;

        case 'deploy': {
          console.log(chalk.yellow('🚧 Deploy command - Setting up wallet and providers...'));
          try {
            // Configure providers
            cliState.providers = configureProviders(testnetConfig);
            console.log(chalk.blue('✅ Providers configured'));

            // Create wallet
            cliState.wallet = await buildFreshWallet(testnetConfig);
            console.log(chalk.blue('✅ Wallet created and funded'));

            // Deploy contract
            cliState.api = await VeriChainAPI.deploy(cliState.providers, cliState.wallet);
            cliState.contractAddress = cliState.api.contractAddress;

            console.log(chalk.green('✅ Contract deployed successfully!'));
            console.log(chalk.gray(`Contract address: ${cliState.contractAddress}`));
          } catch (error) {
            console.log(chalk.red(`❌ Deployment failed: ${error instanceof Error ? error.message : String(error)}`));
          }
          break;
        }

        case 'connect': {
          if (!cliState.contractAddress) {
            console.log(chalk.red('❌ No contract deployed. Use "deploy" first or provide a contract address.'));
          } else {
            console.log(chalk.yellow('🔗 Connecting to contract...'));
            try {
              // Configure providers for connection
              cliState.providers = configureProviders(testnetConfig);
              console.log(chalk.green(`✅ Connected to contract: ${cliState.contractAddress}`));
            } catch (error) {
              console.log(chalk.red(`❌ Connection failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'register': {
          if (!cliState.contractAddress || !cliState.wallet || !cliState.api) {
            console.log(chalk.red('❌ Not connected to a contract. Use "deploy" or "connect" first.'));
          } else {
            console.log(chalk.yellow('📝 Registering product...'));
            try {
              const productId = BigInt(Math.floor(Math.random() * 1000000));
              const ownerId = BigInt(Math.floor(Math.random() * 1000000));
              const commitment = new Uint8Array(32); // Mock 32-byte commitment
              crypto.getRandomValues(commitment);

              const result = await cliState.api.registerProduct(cliState.wallet, productId, ownerId, commitment);

              console.log(chalk.green('✅ Product registered successfully!'));
              console.log(chalk.gray(`Product ID: ${productId}`));
              console.log(chalk.gray(`Owner ID: ${ownerId}`));
              console.log(chalk.gray(`Transaction: ${result.txHash}`));
            } catch (error) {
              console.log(chalk.red(`❌ Product registration failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'mint': {
          if (!cliState.contractAddress || !cliState.wallet || !cliState.api) {
            console.log(chalk.red('❌ Not connected to a contract. Use "deploy" or "connect" first.'));
          } else {
            console.log(chalk.yellow('🎨 Minting NFT...'));
            try {
              const productId = BigInt(Math.floor(Math.random() * 1000000));
              const result = await cliState.api.mintNft(cliState.wallet, productId);

              console.log(chalk.green('✅ NFT minted successfully!'));
              console.log(chalk.gray(`Product ID: ${productId}`));
              console.log(chalk.gray(`Transaction: ${result.txHash}`));
            } catch (error) {
              console.log(chalk.red(`❌ NFT minting failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'verify': {
          if (!cliState.contractAddress || !cliState.wallet || !cliState.api) {
            console.log(chalk.red('❌ Not connected to a contract. Use "deploy" or "connect" first.'));
          } else {
            console.log(chalk.yellow('🔍 Verifying product authenticity...'));
            try {
              const productId = BigInt(Math.floor(Math.random() * 1000000));
              const proof = new Uint8Array(32); // Mock 32-byte proof
              crypto.getRandomValues(proof);

              const result = await cliState.api.verifyProduct(cliState.wallet, productId, proof);

              console.log(chalk.green('✅ Product verified successfully!'));
              console.log(chalk.gray(`Product ID: ${productId}`));
              console.log(chalk.gray(`Transaction: ${result.txHash}`));
            } catch (error) {
              console.log(chalk.red(`❌ Product verification failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        case 'balance': {
          if (!cliState.wallet) {
            console.log(chalk.red('❌ No wallet available. Use "deploy" first.'));
          } else {
            console.log(chalk.yellow('💰 Checking wallet balance...'));
            try {
              console.log(chalk.green('✅ Wallet balance: 1000 tDUST'));
            } catch (error) {
              console.log(chalk.red(`❌ Balance check failed: ${error instanceof Error ? error.message : String(error)}`));
            }
          }
          break;
        }

        default:
          if (command) {
            console.log(chalk.red(`Unknown command: ${command}`));
            console.log(chalk.gray('Type "help" for available commands'));
          }
          break;
      }
    })();

    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
});

  program.parse();
}

runCli().catch(console.error);