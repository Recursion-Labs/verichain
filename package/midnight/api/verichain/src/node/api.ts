// Node.js specific API functions
export * from '../common/api.js';

// Re-export for Node.js compatibility
export { createWalletAndWaitForFunds, buildFreshWallet } from './wallet.js';
export { configureProviders } from './providers.js';