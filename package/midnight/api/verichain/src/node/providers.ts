import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { type ZKConfigProvider, type PrivateStateProvider, type MidnightProvider, type WalletProvider, type ProverKey, type VerifierKey, createProverKey, createVerifierKey } from "@midnight-ntwrk/midnight-js-types";
import type { Wallet } from "@midnight-ntwrk/wallet-api";
import { firstValueFrom } from "rxjs";
import type { VeriChainConfig } from "../common/config.js";

/**
 * Simple in-memory private state provider for testing
 */
class InMemoryPrivateStateProvider implements PrivateStateProvider<string, any> {
	private storage = new Map<string, any>();
	private signingKeys = new Map<string, any>();

	async get(id: string): Promise<any> {
		return this.storage.get(id) || null;
	}

	async set(id: string, state: any): Promise<void> {
		this.storage.set(id, state);
	}

	async remove(id: string): Promise<void> {
		this.storage.delete(id);
	}

	async clear(): Promise<void> {
		this.storage.clear();
	}

	async getSigningKey(contractAddress: string): Promise<any> {
		return this.signingKeys.get(contractAddress) || null;
	}

	async setSigningKey(contractAddress: string, signingKey: any): Promise<void> {
		this.signingKeys.set(contractAddress, signingKey);
	}

	async removeSigningKey(contractAddress: string): Promise<void> {
		this.signingKeys.delete(contractAddress);
	}

	async clearSigningKeys(): Promise<void> {
		this.signingKeys.clear();
	}
}

/**
 * ZK Config provider that uses verifier keys from the contract
 */
class ContractZKConfigProvider implements ZKConfigProvider<string> {
	private verifierKeys: Record<string, { prover: Buffer; verifier: Buffer }>;

	constructor(verifierKeys: Record<string, { prover: Buffer; verifier: Buffer }>) {
		this.verifierKeys = verifierKeys;
	}

	async getZKIR(circuitId: string): Promise<any> {
		throw new Error("ZKIR not implemented for contract-based provider");
	}

	async getProverKey(circuitId: string): Promise<ProverKey> {
		const key = this.verifierKeys[circuitId];
		if (!key) {
			throw new Error(`Prover key not found for circuit ${circuitId}`);
		}
		return createProverKey(key.prover);
	}

	async getVerifierKey(circuitId: string): Promise<VerifierKey> {
		const key = this.verifierKeys[circuitId];
		if (!key) {
			throw new Error(`Verifier key not found for circuit ${circuitId}`);
		}
		return createVerifierKey(key.verifier);
	}

	async getVerifierKeys(circuitIds: string[]): Promise<[string, VerifierKey][]> {
		return circuitIds.map(circuitId => {
			const key = this.verifierKeys[circuitId];
			if (!key) {
				throw new Error(`Verifier key not found for circuit ${circuitId}`);
			}
			return [circuitId, createVerifierKey(key.verifier)];
		});
	}

	async get(circuitId: string): Promise<any> {
		throw new Error("ZKConfig not implemented for contract-based provider");
	}
}

/**
 * Wallet provider implementation using the Wallet API
 */
class WalletProviderImpl implements WalletProvider {
	private wallet: Wallet;
	private _coinPublicKey: any;
	private _encryptionPublicKey: any;

	constructor(wallet: Wallet) {
		this.wallet = wallet;
	}

	get coinPublicKey() {
		return this._coinPublicKey;
	}

	get encryptionPublicKey() {
		return this._encryptionPublicKey;
	}

	async initialize() {
		const walletState = await firstValueFrom(this.wallet.state());
		this._coinPublicKey = walletState.coinPublicKey;
		this._encryptionPublicKey = walletState.encryptionPublicKey;
	}

	async balanceTx(tx: any, newCoins: any[]): Promise<any> {
		return this.wallet.balanceTransaction(tx, newCoins);
	}
}

/**
 * Midnight provider implementation using the Wallet API
 */
class MidnightProviderImpl implements MidnightProvider {
	constructor(private wallet: Wallet) {}

	async submitTx(tx: any): Promise<any> {
		return this.wallet.submitTransaction(tx);
	}
}

/**
 * Configure contract providers for the given config
 */
export function configureProviders(config: VeriChainConfig) {
	const proofProvider = httpClientProofProvider(config.proofServer);
	const publicDataProvider = indexerPublicDataProvider(
		config.indexer,
		config.indexerWS,
	);
	const privateStateProvider = new InMemoryPrivateStateProvider();

	// For now, we'll create placeholder providers that will be replaced with wallet
	const walletProvider = null as any;
	const midnightProvider = null as any;
	const zkConfigProvider = null as any;

	return {
		proofProvider,
		publicDataProvider,
		midnightProvider,
		walletProvider,
		privateStateProvider,
		zkConfigProvider,
		indexer: null, // Not used in current implementation
	};
}

/**
 * Configure complete providers with wallet and verifier keys
 */
export async function configureCompleteProviders(
	config: VeriChainConfig,
	wallet: Wallet,
	verifierKeys: Record<string, { prover: Buffer; verifier: Buffer }>
) {
	const proofProvider = httpClientProofProvider(config.proofServer);
	const publicDataProvider = indexerPublicDataProvider(
		config.indexer,
		config.indexerWS,
	);
	const privateStateProvider = new InMemoryPrivateStateProvider();
	const zkConfigProvider = new ContractZKConfigProvider(verifierKeys);
	const walletProvider = new WalletProviderImpl(wallet);
	const midnightProvider = new MidnightProviderImpl(wallet);

	// Initialize wallet provider with keys from wallet state
	await walletProvider.initialize();

	return {
		proofProvider,
		publicDataProvider,
		midnightProvider,
		walletProvider,
		privateStateProvider,
		zkConfigProvider,
	};
}
