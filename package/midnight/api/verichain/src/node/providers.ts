import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import type { VeriChainConfig } from "../common/config.js";

/**
 * Configure contract providers for the given config
 */
export function configureProviders(config: VeriChainConfig) {
	const proofProvider = httpClientProofProvider(config.proofServer);
	const publicDataProvider = indexerPublicDataProvider(
		config.indexer,
		config.indexerWS,
	);

	return {
		proofProvider,
		publicDataProvider,
		indexer: null, // Not used in current implementation
	};
}
