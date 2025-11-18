import {
	NetworkId,
	getZswapNetworkId,
	setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { WalletBuilder } from "@midnight-ntwrk/wallet";
import type { Wallet } from "@midnight-ntwrk/wallet-api";
import { firstValueFrom } from "rxjs";
import { webcrypto } from "node:crypto";
import type { VeriChainConfig } from "../common/config.js";

/**
 * Generates a random 32-byte seed for wallet creation
 */
function generateRandomSeed(): string {
	const bytes = new Uint8Array(32);
	webcrypto.getRandomValues(bytes);
	return Buffer.from(bytes).toString("hex");
}

/**
 * Create a wallet and wait for it to have funds
 */
export async function createWalletAndWaitForFunds(
	config: VeriChainConfig,
	seedOrWallet: string | Wallet,
	networkId = "",
): Promise<Wallet> {
	let wallet: Wallet;

	if (typeof seedOrWallet === "string") {
		// Set the network ID
		setNetworkId(
			networkId === "undeployed" ? NetworkId.Undeployed : NetworkId.TestNet,
		);

		wallet = await WalletBuilder.build(
			config.indexer,
			config.indexerWS,
			config.proofServer,
			config.node,
			seedOrWallet,
			getZswapNetworkId(),
			"info",
		);
	} else {
		wallet = seedOrWallet;
	}

	// Wait for wallet to be ready
	await firstValueFrom(wallet.state());

	return wallet;
}

/**
 * Build a fresh wallet
 */
export async function buildFreshWallet(
	config: VeriChainConfig,
): Promise<Wallet> {
	// Set the network ID for testnet
	setNetworkId(NetworkId.TestNet);

	const wallet = await WalletBuilder.build(
		config.indexer,
		config.indexerWS,
		config.proofServer,
		config.node,
		generateRandomSeed(), // Generate random 32-byte seed
		getZswapNetworkId(),
		"info",
	);

	await firstValueFrom(wallet.state());

	return wallet;
}
