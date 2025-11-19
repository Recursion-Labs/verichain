#!/usr/bin/env node

import { configureProviders, buildFreshWallet } from "../../../api/verichain/dist/node/api.js";
import { VeriChainAPI } from "../../../api/verichain/dist/common/api.js";

// Simple testnet config
const testnetConfig = {
    indexer: "https://indexer.testnet-02.midnight.network/api/v1/graphql",
    indexerWS: "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws",
    node: "https://rpc.testnet-02.midnight.network",
    proofServer: "http://127.0.0.1:6300",
};

async function testDeploy() {
    console.log("🚀 Testing VeriChain contract deployment...");

    try {
        // Configure providers
        console.log("📡 Configuring providers...");
        const providers = configureProviders(testnetConfig);
        console.log("✅ Providers configured");

        // Create wallet
        console.log("💰 Creating wallet...");
        const wallet = await buildFreshWallet(testnetConfig);
        console.log("✅ Wallet created and funded");

        // Deploy contract
        console.log("📄 Deploying contract...");
        const api = await VeriChainAPI.deploy(providers as any, wallet);
        const contractAddress = api.deployedContractAddress;

        console.log("✅ Contract deployed successfully!");
        console.log(`Contract address: ${contractAddress}`);

        // Test getting contract state
        console.log("🔍 Testing contract state query...");
        const state = await api.getContractState();
        console.log("✅ Contract state retrieved successfully");
        console.log(`Total products: ${state.total_products}`);
        console.log(`Total NFTs: ${state.total_nfts}`);

    } catch (error) {
        console.error("❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    }
}

testDeploy();