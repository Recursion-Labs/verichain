import type { ContractProviders } from "@midnight-ntwrk/midnight-js-contracts";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";

/**
 * Creates contract providers for interacting with the Midnight network
 * @returns Contract providers configured for local development
 */
export function createProviders(): ContractProviders {
  // Configure for local development environment
  const indexerUri = process.env.INDEXER_URI || "http://127.0.0.1:8088/api/v1/graphql";
  const indexerWsUri = process.env.INDEXER_WS_URI || "ws://127.0.0.1:8088/api/v1/graphql/ws";
  const proverServerUri = process.env.PROVER_URI || "http://127.0.0.1:6300";

  // Create public data provider (indexer)
  const publicDataProvider = indexerPublicDataProvider(indexerUri, indexerWsUri);

  // Create proof provider
  const proofProvider = httpClientProofProvider(proverServerUri);

  return {
    publicDataProvider,
    proofProvider,
  } as ContractProviders;
}
