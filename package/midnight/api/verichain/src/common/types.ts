/**
 * Type definitions for VeriChain API
 */

import type {
	ProofProvider,
	PublicDataProvider,
} from "@midnight-ntwrk/midnight-js-types";

export interface ContractProviders {
	indexer: null;
	proofProvider: ProofProvider<string>;
	publicDataProvider: PublicDataProvider;
}

export interface TransactionResult {
	txHash: string;
}

export interface ProductInfo {
	productId: bigint;
	ownerId: bigint;
	commitment: Uint8Array;
}

export interface LedgerState {
	total_products: bigint;
	total_nfts: bigint;
	nonce: bigint;
	product_status: Map<bigint, boolean>;
	nft_minted: Map<bigint, boolean>;
}
