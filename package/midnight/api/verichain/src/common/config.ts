/**
 * Configuration for VeriChain API
 */
export interface VeriChainConfig {
  indexer: string;
  indexerWS: string;
  node: string;
  proofServer: string;
}

/**
 * Default testnet configuration
 */
export class TestnetConfig implements VeriChainConfig {
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  node = 'http://127.0.0.1:9944';
  proofServer = 'http://127.0.0.1:6300';
}

/**
 * Standalone configuration for local development
 */
export class StandaloneConfig implements VeriChainConfig {
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  node = 'http://127.0.0.1:9944';
  proofServer = 'http://127.0.0.1:6300';
}