import type { Wallet } from "@midnight-ntwrk/wallet-api";
import type { ContractProviders } from "@midnight-ntwrk/midnight-js-contracts";
import { Contract, type Ledger, ledger } from "./managed/main/contract/index.cjs";
import contractInfo from "./managed/main/compiler/contract-info.json" assert { type: "json" };
import { 
  buildRegisterProductWitness, 
  buildMintNftWitness, 
  buildVerifyAuthenticityWitness, 
  buildDiscloseEsgWitness 
} from "./witness.js";
import { firstValueFrom } from "rxjs";

/**
 * VeriChain contract instance
 * Uses the compiled Contract class from managed/main/contract
 */
export const veriChainContract = new Contract({});

/**
 * Deploy the VeriChain contract to the Midnight network
 * @param wallet - The Midnight wallet instance
 * @param providers - Contract providers (indexer, proof server)
 * @returns Deployed contract information with contract address
 */
export async function deploy(
  wallet: Wallet,
  providers: ContractProviders
): Promise<{ contractAddress: string }> {
  try {
    // Get wallet state
    const walletState = await firstValueFrom(wallet.state());
    
    // Import the deployment function dynamically
    const { deployContract } = await import("@midnight-ntwrk/midnight-js-contracts");
    
    // Deploy with minimal configuration
    const deployed = await deployContract(providers as any, {
      contract: veriChainContract,
      args: [],
    } as any);

    return {
      contractAddress: (deployed as any).deployTxData?.public?.contractAddress || (deployed as any).contractAddress,
    };
  } catch (error) {
    throw new Error(`Contract deployment failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get the current ledger state of a deployed contract
 * @param contractAddress - The deployed contract address
 * @param providers - Contract providers
 * @returns Current ledger state with all maps and counters
 */
export async function getLedgerState(
  contractAddress: string,
  providers: ContractProviders
): Promise<Ledger> {
  const state = await providers.publicDataProvider.queryContractState(contractAddress);
  if (!state) {
    throw new Error(`Contract ${contractAddress} not found`);
  }
  return ledger(state.data);
}

/**
 * Register a new product on the VeriChain contract
 * @param wallet - The Midnight wallet instance
 * @param contractAddress - The deployed contract address
 * @param providers - Contract providers
 * @param productId - Unique product identifier
 * @param ownerId - Product owner identifier
 * @param commitment - Product commitment hash (32 bytes)
 * @returns Transaction result with hash
 */
export async function registerProduct(
  wallet: Wallet,
  contractAddress: string,
  providers: ContractProviders,
  productId: bigint,
  ownerId: bigint,
  commitment: Uint8Array
): Promise<{ txHash: string }> {
  try {
    // Parse ledger state for witness validation
    const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
    if (!contractState) {
      throw new Error("Failed to query contract state");
    }
    
    const currentLedger = ledger(contractState.data);
    
    // Build witness context and validate
    const witnessContext = {
      contractAddress,
      ledger: currentLedger,
      privateState: {},
    } as any;
    
    buildRegisterProductWitness(witnessContext, {
      product_id: productId,
      owner_id: ownerId,
      commitment: commitment,
    });

    // Get wallet state
    const walletState = await firstValueFrom(wallet.state());

    // Import functions dynamically to avoid type issues
    const { createUnprovenCallTx, submitTx } = await import("@midnight-ntwrk/midnight-js-contracts");

    // Create and submit transaction
    const unprovenTx = await createUnprovenCallTx(providers as any, {
      contract: veriChainContract,
      circuitId: "register_product",
      contractAddress,
      args: [productId, ownerId, commitment],
    } as any);

    const txData = await submitTx(providers as any, {
      unprovenTx: (unprovenTx as any).tx || unprovenTx,
      circuitId: "register_product",
      newCoins: (unprovenTx as any).newCoins || [],
    } as any);

    return {
      txHash: (txData as any).transactionHash || (txData as any).transactionId || "transaction-submitted",
    };
  } catch (error) {
    throw new Error(`Product registration failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Mint an NFT for a registered product
 * @param wallet - The Midnight wallet instance
 * @param contractAddress - The deployed contract address
 * @param providers - Contract providers
 * @param productId - Product identifier to mint NFT for
 * @returns Transaction result with hash
 */
export async function mintNft(
  wallet: Wallet,
  contractAddress: string,
  providers: ContractProviders,
  productId: bigint
): Promise<{ txHash: string }> {
  try {
    // Parse ledger state for witness validation
    const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
    if (!contractState) {
      throw new Error("Failed to query contract state");
    }
    
    const currentLedger = ledger(contractState.data);
    
    // Build witness context and validate
    const witnessContext = {
      contractAddress,
      ledger: currentLedger,
      privateState: {},
    } as any;
    
    buildMintNftWitness(witnessContext, {
      product_id: productId,
    });

    // Get wallet state
    const walletState = await firstValueFrom(wallet.state());

    // Import functions dynamically
    const { createUnprovenCallTx, submitTx } = await import("@midnight-ntwrk/midnight-js-contracts");

    // Create and submit transaction
    const unprovenTx = await createUnprovenCallTx(providers as any, {
      contract: veriChainContract,
      circuitId: "mint_nft",
      contractAddress,
      args: [productId],
    } as any);

    const txData = await submitTx(providers as any, {
      unprovenTx: (unprovenTx as any).tx || unprovenTx,
      circuitId: "mint_nft",
      newCoins: (unprovenTx as any).newCoins || [],
    } as any);

    return {
      txHash: (txData as any).transactionHash || (txData as any).transactionId || "transaction-submitted",
    };
  } catch (error) {
    throw new Error(`NFT minting failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Verify product authenticity using a zero-knowledge proof
 * @param wallet - The Midnight wallet instance
 * @param contractAddress - The deployed contract address
 * @param providers - Contract providers
 * @param productId - Product identifier to verify
 * @param proof - Authenticity proof (32 bytes)
 * @returns Transaction result with hash
 */
export async function verifyProduct(
  wallet: Wallet,
  contractAddress: string,
  providers: ContractProviders,
  productId: bigint,
  proof: Uint8Array
): Promise<{ txHash: string }> {
  try {
    // Parse ledger state for witness validation
    const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
    if (!contractState) {
      throw new Error("Failed to query contract state");
    }
    
    const currentLedger = ledger(contractState.data);
    
    // Build witness context and validate
    const witnessContext = {
      contractAddress,
      ledger: currentLedger,
      privateState: {},
    } as any;
    
    buildVerifyAuthenticityWitness(witnessContext, {
      product_id: productId,
      proof: proof,
    });

    // Get wallet state
    const walletState = await firstValueFrom(wallet.state());

    // Import functions dynamically
    const { createUnprovenCallTx, submitTx } = await import("@midnight-ntwrk/midnight-js-contracts");

    // Create and submit transaction
    const unprovenTx = await createUnprovenCallTx(providers as any, {
      contract: veriChainContract,
      circuitId: "verify_authenticity",
      contractAddress,
      args: [productId, proof],
    } as any);

    const txData = await submitTx(providers as any, {
      unprovenTx: (unprovenTx as any).tx || unprovenTx,
      circuitId: "verify_authenticity",
      newCoins: (unprovenTx as any).newCoins || [],
    } as any);

    return {
      txHash: (txData as any).transactionHash || (txData as any).transactionId || "transaction-submitted",
    };
  } catch (error) {
    throw new Error(`Product verification failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Disclose ESG (Environmental, Social, Governance) proof for a product
 * @param wallet - The Midnight wallet instance
 * @param contractAddress - The deployed contract address
 * @param providers - Contract providers
 * @param productId - Product identifier
 * @param proof - ESG proof data (64 bytes)
 * @returns Transaction result with hash
 */
export async function discloseEsg(
  wallet: Wallet,
  contractAddress: string,
  providers: ContractProviders,
  productId: bigint,
  proof: Uint8Array
): Promise<{ txHash: string }> {
  try {
    // Parse ledger state for witness validation
    const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
    if (!contractState) {
      throw new Error("Failed to query contract state");
    }
    
    const currentLedger = ledger(contractState.data);
    
    // Build witness context and validate
    const witnessContext = {
      contractAddress,
      ledger: currentLedger,
      privateState: {},
    } as any;
    
    buildDiscloseEsgWitness(witnessContext, {
      product_id: productId,
      proof: proof,
    });

    // Get wallet state
    const walletState = await firstValueFrom(wallet.state());

    // Import functions dynamically
    const { createUnprovenCallTx, submitTx } = await import("@midnight-ntwrk/midnight-js-contracts");

    // Create and submit transaction
    const unprovenTx = await createUnprovenCallTx(providers as any, {
      contract: veriChainContract,
      circuitId: "disclose_esg",
      contractAddress,
      args: [productId, proof],
    } as any);

    const txData = await submitTx(providers as any, {
      unprovenTx: (unprovenTx as any).tx || unprovenTx,
      circuitId: "disclose_esg",
      newCoins: (unprovenTx as any).newCoins || [],
    } as any);

    return {
      txHash: (txData as any).transactionHash || (txData as any).transactionId || "transaction-submitted",
    };
  } catch (error) {
    throw new Error(`ESG disclosure failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export { contractInfo, Contract, ledger };
export type { Ledger };
export * from "./witness.js";
