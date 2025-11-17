#!/usr/bin/env node

import { 
  deploy, 
  registerProduct, 
  mintNft, 
  verifyProduct, 
  discloseEsg,
  getLedgerState 
} from "../../contracts/src/index.js";
import { createWallet } from "./utils/wallet.js";
import { poseidonHash } from "./utils/hash.js";
import { createProviders } from "./providers.js";
import fs from "fs";
import path from "path";

const CONTRACT_ADDRESS_FILE = path.join(process.cwd(), ".verichain-contract");

console.log("VeriChain CLI");
console.log("=============\n");

const args = process.argv.slice(2);
const command = args[0];

async function saveContractAddress(address: string) {
  fs.writeFileSync(CONTRACT_ADDRESS_FILE, address, "utf-8");
  console.log(`✓ Contract address saved to ${CONTRACT_ADDRESS_FILE}`);
}

function loadContractAddress(): string {
  if (!fs.existsSync(CONTRACT_ADDRESS_FILE)) {
    throw new Error(
      `Contract not deployed. Run 'deploy' command first.\nExpected file: ${CONTRACT_ADDRESS_FILE}`
    );
  }
  return fs.readFileSync(CONTRACT_ADDRESS_FILE, "utf-8").trim();
}

/* ─────────────────────────────────────────────────────────────── */
/* DEPLOY CONTRACT */
/* ─────────────────────────────────────────────────────────────── */
if (command === "deploy") {
  (async () => {
    try {
      console.log("Creating wallet...");
      const wallet = await createWallet();
      
      console.log("Creating providers...");
      const providers = await createProviders();
      
      console.log("Deploying VeriChain contract...");
      const deployed = await deploy(wallet, providers as any);
      
      await saveContractAddress(deployed.contractAddress);
      console.log(`✓ Contract deployed at: ${deployed.contractAddress}`);
      
      await wallet.close();
    } catch (error) {
      console.error("✗ Deployment failed:", error);
      process.exit(1);
    }
  })();
}

/* ─────────────────────────────────────────────────────────────── */
/* REGISTER PRODUCT */
/* ─────────────────────────────────────────────────────────────── */
else if (command === "register") {
  const productId = args[1];
  const ownerId = args[2];
  const data = args[3];
  
  if (!productId || !ownerId || !data) {
    console.error("✗ Usage: register <productId> <ownerId> <data>");
    process.exit(1);
  }
  
  (async () => {
    try {
      const contractAddress = loadContractAddress();
      const wallet = await createWallet();
      const providers = await createProviders();
      
      const commitment = poseidonHash(data);
      
      console.log(`Registering product ${productId}...`);
      const result = await registerProduct(
        wallet,
        contractAddress,
        providers as any,
        BigInt(productId),
        BigInt(ownerId),
        commitment
      );
      
      console.log(`✓ Product registered successfully`);
      console.log(`  Transaction: ${result.txHash}`);
      
      await wallet.close();
    } catch (error) {
      console.error("✗ Registration failed:", error);
      process.exit(1);
    }
  })();
}

/* ─────────────────────────────────────────────────────────────── */
/* MINT NFT */
/* ─────────────────────────────────────────────────────────────── */
else if (command === "mint") {
  const productId = args[1];
  
  if (!productId) {
    console.error("✗ Usage: mint <productId>");
    process.exit(1);
  }
  
  (async () => {
    try {
      const contractAddress = loadContractAddress();
      const wallet = await createWallet();
      const providers = await createProviders();
      
      console.log(`Minting NFT for product ${productId}...`);
      const result = await mintNft(
        wallet,
        contractAddress,
        providers as any,
        BigInt(productId)
      );
      
      console.log(`✓ NFT minted successfully`);
      console.log(`  Transaction: ${result.txHash}`);
      
      await wallet.close();
    } catch (error) {
      console.error("✗ Minting failed:", error);
      process.exit(1);
    }
  })();
}

/* ─────────────────────────────────────────────────────────────── */
/* VERIFY PRODUCT */
/* ─────────────────────────────────────────────────────────────── */
else if (command === "verify") {
  const productId = args[1];
  const proofData = args[2];
  
  if (!productId || !proofData) {
    console.error("✗ Usage: verify <productId> <proofData>");
    process.exit(1);
  }
  
  (async () => {
    try {
      const contractAddress = loadContractAddress();
      const wallet = await createWallet();
      const providers = await createProviders();
      
      const proof = poseidonHash(proofData);
      
      console.log(`Verifying product ${productId}...`);
      const result = await verifyProduct(
        wallet,
        contractAddress,
        providers as any,
        BigInt(productId),
        proof
      );
      
      console.log(`✓ Product verified successfully`);
      console.log(`  Transaction: ${result.txHash}`);
      
      await wallet.close();
    } catch (error) {
      console.error("✗ Verification failed:", error);
      process.exit(1);
    }
  })();
}

/* ─────────────────────────────────────────────────────────────── */
/* DISCLOSE ESG */
/* ─────────────────────────────────────────────────────────────── */
else if (command === "esg") {
  const productId = args[1];
  const esgData = args[2];
  
  if (!productId || !esgData) {
    console.error("✗ Usage: esg <productId> <esgData>");
    process.exit(1);
  }
  
  (async () => {
    try {
      const contractAddress = loadContractAddress();
      const wallet = await createWallet();
      const providers = await createProviders();
      
      // Create 64-byte proof from data
      const hash1 = poseidonHash(esgData);
      const hash2 = poseidonHash(esgData + "-part2");
      const proof = new Uint8Array([...hash1, ...hash2]);
      
      console.log(`Disclosing ESG proof for product ${productId}...`);
      const result = await discloseEsg(
        wallet,
        contractAddress,
        providers as any,
        BigInt(productId),
        proof
      );
      
      console.log(`✓ ESG proof disclosed successfully`);
      console.log(`  Transaction: ${result.txHash}`);
      
      await wallet.close();
    } catch (error) {
      console.error("✗ ESG disclosure failed:", error);
      process.exit(1);
    }
  })();
}

/* ─────────────────────────────────────────────────────────────── */
/* QUERY STATE */
/* ─────────────────────────────────────────────────────────────── */
else if (command === "state") {
  (async () => {
    try {
      const contractAddress = loadContractAddress();
      const providers = await createProviders();
      
      console.log("Querying contract state...");
      const state = await getLedgerState(contractAddress, providers as any);
      
      console.log("\n📊 Contract State:");
      console.log(`  Total Products: ${state.total_products}`);
      console.log(`  Total NFTs: ${state.total_nfts}`);
      console.log(`  Nonce: ${state.nonce}`);
      console.log(`  Product Status Map Size: ${state.product_status.size()}`);
      console.log(`  NFT Minted Map Size: ${state.nft_minted.size()}`);
    } catch (error) {
      console.error("✗ State query failed:", error);
      process.exit(1);
    }
  })();
}

/* ─────────────────────────────────────────────────────────────── */
/* HELP */
/* ─────────────────────────────────────────────────────────────── */
else {
  console.log("Usage:");
  console.log("  deploy                              - Deploy the VeriChain contract");
  console.log("  register <productId> <ownerId> <data> - Register a product");
  console.log("  mint <productId>                    - Mint NFT for product");
  console.log("  verify <productId> <proofData>      - Verify product authenticity");
  console.log("  esg <productId> <esgData>           - Submit ESG proof");
  console.log("  state                               - Query contract state");
  console.log("\nExamples:");
  console.log("  npm run cli deploy");
  console.log("  npm run cli register 1 100 'Product-ABC-123'");
  console.log("  npm run cli mint 1");
  console.log("  npm run cli verify 1 'proof-data'");
  console.log("  npm run cli esg 1 'carbon-neutral-certified'");
  console.log("  npm run cli state");
}
