import type { Wallet } from "@midnight-ntwrk/wallet-api";
import type { ContractProviders } from "@midnight-ntwrk/midnight-js-contracts";
import {
  deploy,
  registerProduct,
  mintNft,
  verifyProduct,
  discloseEsg,
  getLedgerState
} from "@verichain/contracts";

/**
 * VeriChain API - Main interface for interacting with VeriChain contracts
 */
export class VeriChainAPI {
  public readonly deployedContractAddress: string;

  constructor(contractAddress: string) {
    this.deployedContractAddress = contractAddress;
  }

  /**
   * Deploy a new VeriChain contract
   */
  static async deploy(
    providers: ContractProviders,
    wallet: Wallet
  ): Promise<VeriChainAPI> {
    const result = await deploy(wallet, providers);
    return new VeriChainAPI(result.contractAddress);
  }

  /**
   * Connect to an existing VeriChain contract
   */
  static async connect(
    providers: ContractProviders,
    contractAddress: string
  ): Promise<VeriChainAPI> {
    // Verify contract exists by querying state
    await getLedgerState(contractAddress, providers);
    return new VeriChainAPI(contractAddress);
  }

  /**
   * Register a new product
   */
  async registerProduct(
    wallet: Wallet,
    productId: bigint,
    ownerId: bigint,
    commitment: Uint8Array
  ): Promise<{ txHash: string }> {
    return await registerProduct(
      wallet,
      this.deployedContractAddress,
      { indexer: null, proofProvider: null, publicDataProvider: null } as any,
      productId,
      ownerId,
      commitment
    );
  }

  /**
   * Mint NFT for a product
   */
  async mintNft(
    wallet: Wallet,
    productId: bigint
  ): Promise<{ txHash: string }> {
    return await mintNft(
      wallet,
      this.deployedContractAddress,
      { indexer: null, proofProvider: null, publicDataProvider: null } as any,
      productId
    );
  }

  /**
   * Verify product authenticity
   */
  async verifyProduct(
    wallet: Wallet,
    productId: bigint,
    proof: Uint8Array
  ): Promise<{ txHash: string }> {
    return await verifyProduct(
      wallet,
      this.deployedContractAddress,
      { indexer: null, proofProvider: null, publicDataProvider: null } as any,
      productId,
      proof
    );
  }

  /**
   * Disclose ESG proof
   */
  async discloseEsg(
    wallet: Wallet,
    productId: bigint,
    proof: Uint8Array
  ): Promise<{ txHash: string }> {
    return await discloseEsg(
      wallet,
      this.deployedContractAddress,
      { indexer: null, proofProvider: null, publicDataProvider: null } as any,
      productId,
      proof
    );
  }

  /**
   * Get contract state
   */
  async getContractState(): Promise<any> {
    return await getLedgerState(
      this.deployedContractAddress,
      { indexer: null, proofProvider: null, publicDataProvider: null } as any
    );
  }
}