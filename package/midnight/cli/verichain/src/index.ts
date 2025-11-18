#!/usr/bin/env node

import { promisify } from "node:util";
import { type Interface, createInterface } from "readline";
import chalk from "chalk";
import { Command } from "commander";
import { createCommitment } from "./utils/hash.js";

// Simple testnet config
const testnetConfig = {
    indexer: "https://indexer.testnet-02.midnight.network/api/v1/graphql",
    indexerWS: "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws",
    node: "https://rpc.testnet-02.midnight.network",
    proofServer: "http://127.0.0.1:6300",
};

// CLI state
interface CliState {
	contractAddress?: string;
	wallet?: import("@midnight-ntwrk/wallet-api").Wallet;
	providers?: any;
	api?: import("../../../api/verichain/dist/common/api.js").VeriChainAPI;
}

const cliState: CliState = {};

// Helper function to prompt user for input
function question(rl: Interface, query: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(query, resolve);
	});
}

async function runCli() {
	// Dynamic imports for API components
	const apiModule = await import("../../../api/verichain/dist/index.js");
	const { VeriChainAPI, configureProviders, buildFreshWallet } = apiModule;

	const program = new Command();

	program
		.name("verichain")
		.description(
			"CLI for VeriChain - Privacy-proven product authenticity on Midnight Network",
		)
		.version("1.0.0");

	program
		.command("interactive")
		.description("Start interactive mode")
		.action(async () => {
			console.log(chalk.blue("🚀 VeriChain CLI - Interactive Mode"));
			console.log(
				chalk.gray('Type "help" for available commands or "exit" to quit\n'),
			);

			const rl = createInterface({
				input: process.stdin,
				output: process.stdout,
				prompt: chalk.green("verichain> "),
			});

			rl.prompt();

			rl.on("line", async (line) => {
				const command = line.trim();

				switch (command) {
					case "help":
						console.log(chalk.yellow("\nAvailable commands:"));
						console.log("  deploy     - Deploy a new VeriChain contract");
						console.log("  connect    - Connect to an existing contract");
						console.log(
							"  register   - Register a new product (requires Product ID, Owner ID, Commitment)",
						);
						console.log(
							"  mint       - Mint NFT for a product (requires Product ID)",
						);
						console.log(
							"  verify     - Verify product authenticity (requires Product ID, Proof)",
						);
						console.log("  balance    - Check wallet balance");
						console.log("  help       - Show this help");
						console.log("  exit       - Exit interactive mode\n");
						break;

					case "exit":
						console.log(chalk.blue("Goodbye! 👋"));
						rl.close();
						return;

					case "deploy": {
						console.log(
							chalk.yellow(
								"🚧 Deploy command - Setting up wallet and providers...",
							),
						);
						try {
							// Configure providers
							cliState.providers = configureProviders(testnetConfig);
							console.log(chalk.blue("✅ Providers configured"));

							// Create wallet
							cliState.wallet = await buildFreshWallet(testnetConfig);
							console.log(chalk.blue("✅ Wallet created and funded"));

							// Deploy contract
							cliState.api = await VeriChainAPI.deploy(
								cliState.providers,
								cliState.wallet,
							);
							cliState.contractAddress = cliState.api.deployedContractAddress;

							console.log(chalk.green("✅ Contract deployed successfully!"));
							console.log(
								chalk.gray(`Contract address: ${cliState.contractAddress}`),
							);
						} catch (error) {
							console.log(
								chalk.red(
									`❌ Deployment failed: ${error instanceof Error ? error.message : String(error)}`,
								),
							);
						}
						break;
					}

					case "connect": {
						if (!cliState.contractAddress) {
							console.log(
								chalk.red(
									'❌ No contract deployed. Use "deploy" first or provide a contract address.',
								),
							);
						} else {
							console.log(chalk.yellow("🔗 Connecting to contract..."));
							try {
								// Configure providers for connection
								cliState.providers = configureProviders(testnetConfig);
								console.log(
									chalk.green(
										`✅ Connected to contract: ${cliState.contractAddress}`,
									),
								);
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Connection failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "register": {
						if (
							!cliState.contractAddress ||
							!cliState.wallet ||
							!cliState.api
						) {
							console.log(
								chalk.red(
									'❌ Not connected to a contract. Use "deploy" or "connect" first.',
								),
							);
						} else {
							console.log(chalk.yellow("📝 Registering product..."));
							try {
								// Prompt for real product details
								const productIdStr = await question(
									rl,
									chalk.cyan("Enter Product ID (number): "),
								);
								const ownerIdStr = await question(
									rl,
									chalk.cyan("Enter Owner ID (number): "),
								);
								const commitmentInput = await question(
									rl,
									chalk.cyan(
										"Enter Product Commitment (raw string or hex string, 64 characters): ",
									),
								);

								const productId = BigInt(productIdStr.trim());
								const ownerId = BigInt(ownerIdStr.trim());

								let commitment: Uint8Array;

								// Check if input is a hex string (64 characters) or raw data
								const trimmedInput = commitmentInput.trim();
								if (
									trimmedInput.length === 64 &&
									/^[0-9a-fA-F]+$/.test(trimmedInput)
								) {
									// Convert hex string to Uint8Array
									commitment = new Uint8Array(32);
									for (let i = 0; i < 32; i++) {
										commitment[i] = Number.parseInt(
											trimmedInput.slice(i * 2, i * 2 + 2),
											16,
										);
									}
								} else {
									// Use raw string input and create commitment hash
									commitment = createCommitment(trimmedInput);
								}

								const result = await cliState.api.registerProduct(
									cliState.wallet,
									productId,
									ownerId,
									commitment,
								);

								console.log(chalk.green("✅ Product registered successfully!"));
								console.log(chalk.gray(`Product ID: ${productId}`));
								console.log(chalk.gray(`Owner ID: ${ownerId}`));
								console.log(
									chalk.gray(
										`Commitment: ${Array.from(commitment)
											.map((b) => b.toString(16).padStart(2, "0"))
											.join("")}`,
									),
								);
								console.log(chalk.gray(`Transaction: ${result.txHash}`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Product registration failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "mint": {
						if (
							!cliState.contractAddress ||
							!cliState.wallet ||
							!cliState.api
						) {
							console.log(
								chalk.red(
									'❌ Not connected to a contract. Use "deploy" or "connect" first.',
								),
							);
						} else {
							console.log(chalk.yellow("🎨 Minting NFT..."));
							try {
								const productIdStr = await question(
									rl,
									chalk.cyan("Enter Product ID to mint NFT for: "),
								);
								const productId = BigInt(productIdStr.trim());

								const result = await cliState.api.mintNft(
									cliState.wallet,
									productId,
								);

								console.log(chalk.green("✅ NFT minted successfully!"));
								console.log(chalk.gray(`Product ID: ${productId}`));
								console.log(chalk.gray(`Transaction: ${result.txHash}`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ NFT minting failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "verify": {
						if (
							!cliState.contractAddress ||
							!cliState.wallet ||
							!cliState.api
						) {
							console.log(
								chalk.red(
									'❌ Not connected to a contract. Use "deploy" or "connect" first.',
								),
							);
						} else {
							console.log(chalk.yellow("🔍 Verifying product authenticity..."));
							try {
								const productIdStr = await question(
									rl,
									chalk.cyan("Enter Product ID to verify: "),
								);
								const proofStr = await question(
									rl,
									chalk.cyan(
										"Enter Authenticity Proof (hex string, 64 characters): ",
									),
								);

								const productId = BigInt(productIdStr.trim());

								// Convert hex string to Uint8Array
								const proof = new Uint8Array(32);
								for (let i = 0; i < 32; i++) {
									proof[i] = Number.parseInt(
										proofStr.slice(i * 2, i * 2 + 2),
										16,
									);
								}

								const result = await cliState.api.verifyProduct(
									cliState.wallet,
									productId,
									proof,
								);

								console.log(chalk.green("✅ Product verified successfully!"));
								console.log(chalk.gray(`Product ID: ${productId}`));
								console.log(chalk.gray(`Transaction: ${result.txHash}`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Product verification failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "balance": {
						if (!cliState.wallet) {
							console.log(
								chalk.red('❌ No wallet available. Use "deploy" first.'),
							);
						} else {
							console.log(chalk.yellow("💰 Checking wallet balance..."));
							try {
								// Get wallet state and extract balance
								const walletState = await cliState.wallet.state().toPromise();
								const balance = walletState?.balances?.[0] || "0";
								console.log(chalk.green(`✅ Wallet balance: ${balance} tDUST`));
								console.log(
									chalk.gray(
										`Wallet state: ${JSON.stringify(walletState, null, 2)}`,
									),
								);
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Balance check failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "hash": {
						console.log(chalk.yellow("🔐 Generating commitment hash..."));
						try {
							const inputData = await question(
								rl,
								chalk.cyan("Enter data to hash: "),
							);

							const hash = createCommitment(inputData.trim());
							const hexHash = Array.from(hash)
								.map((b) => b.toString(16).padStart(2, "0"))
								.join("");

							console.log(chalk.green("✅ Commitment hash generated!"));
							console.log(chalk.gray(`Input: "${inputData.trim()}"`));
							console.log(chalk.gray(`Hash: ${hexHash}`));
						} catch (error) {
							console.log(
								chalk.red(
									`❌ Hash generation failed: ${error instanceof Error ? error.message : String(error)}`,
								),
							);
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

			rl.on("close", () => {
				process.exit(0);
			});
		});

	// Default to interactive mode if no command specified
	program.action(() => {
		console.log(chalk.blue("🚀 VeriChain CLI - Interactive Mode"));
		console.log(
			chalk.gray('Type "help" for available commands or "exit" to quit\n'),
		);

		const rl = createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: chalk.green("verichain> "),
		});

		rl.prompt();

		rl.on("line", async (line) => {
			const command = line.trim();

			await (async () => {
				switch (command) {
					case "help":
						console.log(chalk.yellow("\nAvailable commands:"));
						console.log("  deploy     - Deploy a new VeriChain contract");
						console.log("  connect    - Connect to an existing contract");
						console.log(
							"  register   - Register a new product (requires Product ID, Owner ID, Commitment)",
						);
						console.log(
							"  mint       - Mint NFT for a product (requires Product ID)",
						);
						console.log(
							"  verify     - Verify product authenticity (requires Product ID, Proof)",
						);
						console.log("  balance    - Check wallet balance");
						console.log(
							"  hash       - Generate commitment hash from input data",
						);
						console.log("  help       - Show this help");
						console.log("  exit       - Exit interactive mode\n");
						break;

					case "exit":
						console.log(chalk.blue("Goodbye! 👋"));
						rl.close();
						return;

					case "deploy": {
						console.log(
							chalk.yellow(
								"🚧 Deploy command - Setting up wallet and providers...",
							),
						);
						try {
							// Configure providers
							cliState.providers = configureProviders(testnetConfig);
							console.log(chalk.blue("✅ Providers configured"));

							// Create wallet
							cliState.wallet = await buildFreshWallet(testnetConfig);
							console.log(chalk.blue("✅ Wallet created and funded"));

							// Deploy contract
							cliState.api = await VeriChainAPI.deploy(
								cliState.providers,
								cliState.wallet,
							);
							cliState.contractAddress = cliState.api.deployedContractAddress;

							console.log(chalk.green("✅ Contract deployed successfully!"));
							console.log(
								chalk.gray(`Contract address: ${cliState.contractAddress}`),
							);
						} catch (error) {
							console.log(
								chalk.red(
									`❌ Deployment failed: ${error instanceof Error ? error.message : String(error)}`,
								),
							);
						}
						break;
					}

					case "connect": {
						if (!cliState.contractAddress) {
							console.log(
								chalk.red(
									'❌ No contract deployed. Use "deploy" first or provide a contract address.',
								),
							);
						} else {
							console.log(chalk.yellow("🔗 Connecting to contract..."));
							try {
								// Configure providers for connection
								cliState.providers = configureProviders(testnetConfig);
								console.log(
									chalk.green(
										`✅ Connected to contract: ${cliState.contractAddress}`,
									),
								);
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Connection failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "register": {
						if (
							!cliState.contractAddress ||
							!cliState.wallet ||
							!cliState.api
						) {
							console.log(
								chalk.red(
									'❌ Not connected to a contract. Use "deploy" or "connect" first.',
								),
							);
						} else {
							console.log(chalk.yellow("📝 Registering product..."));
							try {
								// Prompt for real product details
								const productIdStr = await question(
									rl,
									chalk.cyan("Enter Product ID (number): "),
								);
								const ownerIdStr = await question(
									rl,
									chalk.cyan("Enter Owner ID (number): "),
								);
								const commitmentInput = await question(
									rl,
									chalk.cyan(
										"Enter Product Commitment (raw string or hex string, 64 characters): ",
									),
								);

								const productId = BigInt(productIdStr.trim());
								const ownerId = BigInt(ownerIdStr.trim());

								let commitment: Uint8Array;

								// Check if input is a hex string (64 characters) or raw data
								const trimmedInput = commitmentInput.trim();
								if (
									trimmedInput.length === 64 &&
									/^[0-9a-fA-F]+$/.test(trimmedInput)
								) {
									// Convert hex string to Uint8Array
									commitment = new Uint8Array(32);
									for (let i = 0; i < 32; i++) {
										commitment[i] = Number.parseInt(
											trimmedInput.slice(i * 2, i * 2 + 2),
											16,
										);
									}
								} else {
									// Use raw string input and create commitment hash
									commitment = createCommitment(trimmedInput);
								}

								const result = await cliState.api.registerProduct(
									cliState.wallet,
									productId,
									ownerId,
									commitment,
								);

								console.log(chalk.green("✅ Product registered successfully!"));
								console.log(chalk.gray(`Product ID: ${productId}`));
								console.log(chalk.gray(`Owner ID: ${ownerId}`));
								console.log(
									chalk.gray(
										`Commitment: ${Array.from(commitment)
											.map((b) => b.toString(16).padStart(2, "0"))
											.join("")}`,
									),
								);
								console.log(chalk.gray(`Transaction: ${result.txHash}`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Product registration failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "mint": {
						if (
							!cliState.contractAddress ||
							!cliState.wallet ||
							!cliState.api
						) {
							console.log(
								chalk.red(
									'❌ Not connected to a contract. Use "deploy" or "connect" first.',
								),
							);
						} else {
							console.log(chalk.yellow("🎨 Minting NFT..."));
							try {
								const productIdStr = await question(
									rl,
									chalk.cyan("Enter Product ID to mint NFT for: "),
								);
								const productId = BigInt(productIdStr.trim());

								const result = await cliState.api.mintNft(
									cliState.wallet,
									productId,
								);

								console.log(chalk.green("✅ NFT minted successfully!"));
								console.log(chalk.gray(`Product ID: ${productId}`));
								console.log(chalk.gray(`Transaction: ${result.txHash}`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ NFT minting failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "verify": {
						if (
							!cliState.contractAddress ||
							!cliState.wallet ||
							!cliState.api
						) {
							console.log(
								chalk.red(
									'❌ Not connected to a contract. Use "deploy" or "connect" first.',
								),
							);
						} else {
							console.log(chalk.yellow("🔍 Verifying product authenticity..."));
							try {
								const productIdStr = await question(
									rl,
									chalk.cyan("Enter Product ID to verify: "),
								);
								const proofStr = await question(
									rl,
									chalk.cyan(
										"Enter Authenticity Proof (hex string, 64 characters): ",
									),
								);

								const productId = BigInt(productIdStr.trim());

								// Convert hex string to Uint8Array
								const proof = new Uint8Array(32);
								for (let i = 0; i < 32; i++) {
									proof[i] = Number.parseInt(
										proofStr.slice(i * 2, i * 2 + 2),
										16,
									);
								}

								const result = await cliState.api.verifyProduct(
									cliState.wallet,
									productId,
									proof,
								);

								console.log(chalk.green("✅ Product verified successfully!"));
								console.log(chalk.gray(`Product ID: ${productId}`));
								console.log(chalk.gray(`Transaction: ${result.txHash}`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Product verification failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "balance": {
						if (!cliState.wallet) {
							console.log(
								chalk.red('❌ No wallet available. Use "deploy" first.'),
							);
						} else {
							console.log(chalk.yellow("💰 Checking wallet balance..."));
							try {
								// Get wallet state and extract balance
								const walletState = await cliState.wallet.state().toPromise();
								const balance = walletState?.balances?.[0] || "0";
								console.log(chalk.green(`✅ Wallet balance: ${balance} tDUST`));
							} catch (error) {
								console.log(
									chalk.red(
										`❌ Balance check failed: ${error instanceof Error ? error.message : String(error)}`,
									),
								);
							}
						}
						break;
					}

					case "hash": {
						console.log(chalk.yellow("🔐 Generating commitment hash..."));
						try {
							const inputData = await question(
								rl,
								chalk.cyan("Enter data to hash: "),
							);

							const hash = createCommitment(inputData.trim());
							const hexHash = Array.from(hash)
								.map((b) => b.toString(16).padStart(2, "0"))
								.join("");

							console.log(chalk.green("✅ Commitment hash generated!"));
							console.log(chalk.gray(`Input: "${inputData.trim()}"`));
							console.log(chalk.gray(`Hash: ${hexHash}`));
						} catch (error) {
							console.log(
								chalk.red(
									`❌ Hash generation failed: ${error instanceof Error ? error.message : String(error)}`,
								),
							);
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

		rl.on("close", () => {
			process.exit(0);
		});
	});

	program.parse();
}

runCli().catch(console.error);
