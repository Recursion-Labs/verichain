import { VeriChainAPI, TestnetConfig, configureProviders, buildFreshWallet } from '@verichain/api/browser';
import type { Wallet } from '@midnight-ntwrk/wallet-api';

export class BlockchainService {
  private api: VeriChainAPI | null = null;
  private providers: any = null;
  private wallet: Wallet | null = null;
  private contractAddress: string | null = null;

  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
  }

  async initialize() {
    try {
      console.log('Initializing VeriChain blockchain service...');

      // Configure providers for testnet
      const config = new TestnetConfig();
      this.providers = configureProviders(config);

      console.log('Blockchain service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error);
      return false;
    }
  }

  async createWallet(): Promise<boolean> {
    try {
      if (!this.providers) {
        throw new Error('Providers not initialized');
      }

      console.log('Creating wallet...');
      const config = new TestnetConfig();
      this.wallet = await buildFreshWallet(config);

      console.log('Wallet created successfully');
      return true;
    } catch (error) {
      console.error('Failed to create wallet:', error);
      return false;
    }
  }

  async deployContract(): Promise<string | null> {
    try {
      if (!this.providers || !this.wallet) {
        throw new Error('Providers or wallet not initialized');
      }

      console.log('Deploying VeriChain contract...');
      this.api = await VeriChainAPI.deploy(this.providers, this.wallet);
      this.contractAddress = this.api.deployedContractAddress;

      console.log('Contract deployed at:', this.contractAddress);
      return this.contractAddress;
    } catch (error) {
      console.error('Failed to deploy contract:', error);
      return null;
    }
  }

  async connectToContract(contractAddress: string): Promise<boolean> {
    try {
      if (!this.providers) {
        throw new Error('Providers not initialized');
      }

      console.log('Connecting to contract:', contractAddress);
      this.api = await VeriChainAPI.connect(this.providers, contractAddress);
      this.contractAddress = contractAddress;

      console.log('Connected to contract successfully');
      return true;
    } catch (error) {
      console.error('Failed to connect to contract:', error);
      return false;
    }
  }

  async registerProduct(productId: string, ownerId: string, commitment: string): Promise<boolean> {
    try {
      if (!this.api || !this.wallet) {
        throw new Error('API or wallet not initialized');
      }

      console.log('Registering product:', productId);

      // Convert strings to required types
      const productIdBigInt = BigInt(productId);
      const ownerIdBigInt = BigInt(ownerId);
      const commitmentBytes = this.hexToBytes(commitment.slice(2)); // Remove 0x prefix

      const result = await this.api.registerProduct(
        this.wallet,
        productIdBigInt,
        ownerIdBigInt,
        commitmentBytes
      );

      console.log('Product registered successfully, tx:', result.txHash);
      return true;
    } catch (error) {
      console.error('Failed to register product:', error);
      return false;
    }
  }

  async mintNft(productId: string): Promise<boolean> {
    try {
      if (!this.api || !this.wallet) {
        throw new Error('API or wallet not initialized');
      }

      console.log('Minting NFT for product:', productId);
      const productIdBigInt = BigInt(productId);

      const result = await this.api.mintNft(this.wallet, productIdBigInt);

      console.log('NFT minted successfully, tx:', result.txHash);
      return true;
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      return false;
    }
  }

  async verifyProduct(productId: string, proof: string): Promise<boolean> {
    try {
      if (!this.api || !this.wallet) {
        throw new Error('API or wallet not initialized');
      }

      console.log('Verifying product:', productId);
      const productIdBigInt = BigInt(productId);
      const proofBytes = this.hexToBytes(proof.slice(2)); // Remove 0x prefix

      const result = await this.api.verifyProduct(
        this.wallet,
        productIdBigInt,
        proofBytes
      );

      console.log('Product verified successfully, tx:', result.txHash);
      return true;
    } catch (error) {
      console.error('Failed to verify product:', error);
      return false;
    }
  }

  async getContractState(): Promise<any> {
    try {
      if (!this.api) {
        throw new Error('API not initialized');
      }

      const state = await this.api.getContractState();
      return state;
    } catch (error) {
      console.error('Failed to get contract state:', error);
      return null;
    }
  }

  getContractAddress(): string | null {
    return this.contractAddress;
  }

  isInitialized(): boolean {
    return !!(this.api && this.wallet && this.contractAddress);
  }
}

// Singleton instance
export const blockchainService = new BlockchainService();