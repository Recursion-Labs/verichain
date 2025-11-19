#!/usr/bin/env node

import { configureProviders, buildFreshWallet, VeriChainAPI } from "../../api/verichain/dist/index.js";

// Simple testnet config
const testnetConfig = {
    indexer: "https://indexer.testnet-02.midnight.network/api/v1/graphql",
    indexerWS: "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws",
    node: "https://rpc.testnet-02.midnight.network",
    proofServer: "http://127.0.0.1:6300",
};

async function testDeploy() {
    try {
        console.log("🚧 Setting up providers...");
        const providers = configureProviders(testnetConfig);
        console.log("✅ Providers configured");

        console.log("🚧 Creating wallet...");
        const wallet = await buildFreshWallet(testnetConfig);
        console.log("✅ Wallet created");

        console.log("🚧 Deploying contract...");
        const api = await VeriChainAPI.deploy(providers, wallet);
        console.log("✅ Contract deployed successfully!");
        console.log(`Contract address: ${api.deployedContractAddress}`);

    } catch (error) {
        console.error(`❌ Deployment failed: ${error instanceof Error ? error.message : String(error)}`);
        console.error(error);
    }
}

testDeploy();