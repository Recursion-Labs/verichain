#!/usr/bin/env node

/**
 * VeriChain API Demo Script
 * This demonstrates how to use the VeriChain API library
 */

import { VeriChainAPI, createWalletAndWaitForFunds, configureProviders, TestnetConfig } from './dist/index.js';

async function demo() {
  console.log('🚀 VeriChain API Demo');
  console.log('======================\n');

  try {
    // 1. Configure providers
    console.log('1. Configuring providers...');
    const config = new TestnetConfig();
    const providers = configureProviders(config);
    console.log('✅ Providers configured\n');

    // 2. Create wallet (this would normally require Midnight Network to be running)
    console.log('2. Creating wallet...');
    console.log('⚠️  Note: This requires Midnight Network services to be running locally');
    console.log('   For demo purposes, we\'ll show the API structure instead\n');

    // 3. Show API methods available
    console.log('3. VeriChainAPI Methods:');
    const apiMethods = Object.getOwnPropertyNames(VeriChainAPI.prototype)
      .filter(method => method !== 'constructor');

    console.log('Static methods:');
    console.log('  - VeriChainAPI.deploy(providers, wallet)');
    console.log('  - VeriChainAPI.connect(providers, contractAddress)');

    console.log('\nInstance methods:');
    apiMethods.forEach(method => {
      console.log(`  - api.${method}(...)`);
    });

    console.log('\n4. Example Usage:');
    console.log(`
// Deploy a new contract
const api = await VeriChainAPI.deploy(providers, wallet);

// Register a product
await api.registerProduct(wallet, productId, ownerId, commitment);

// Mint an NFT
await api.mintNft(wallet, productId);

// Verify authenticity
await api.verifyProduct(wallet, productId, proof);
    `);

    console.log('\n✅ API Demo completed successfully!');
    console.log('💡 To use this API, import it in your application:');
    console.log('   import { VeriChainAPI } from "@verichain/api";');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
  }
}

// Run the demo
demo().catch(console.error);