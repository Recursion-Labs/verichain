import { WalletBuilder } from "@midnight-ntwrk/wallet";
import { NetworkId, getZswapNetworkId, setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { firstValueFrom } from "rxjs";

/**
 * Create a wallet and wait for it to have funds
 */
export async function createWalletAndWaitForFunds(
  config: any,
  seedOrWallet: string | any,
  networkId: string = ""
): Promise<any> {
  let wallet: any;

  if (typeof seedOrWallet === 'string') {
    // Set the network ID
    setNetworkId(networkId === "undeployed" ? NetworkId.Undeployed : NetworkId.TestNet);
    
    wallet = await WalletBuilder.build(
      config.indexer,
      config.indexerWS,
      config.proofServer,
      config.node,
      seedOrWallet,
      getZswapNetworkId(),
      "info"
    );
  } else {
    wallet = seedOrWallet;
  }

  // Start the wallet
  wallet.start();

  // Wait for wallet to be ready
  await firstValueFrom(wallet.state());

  return wallet;
}

/**
 * Build a fresh wallet
 */
export async function buildFreshWallet(config: any): Promise<any> {
  // Set the network ID for testnet
  setNetworkId(NetworkId.TestNet);
  
  const wallet = await WalletBuilder.build(
    config.indexer,
    config.indexerWS,
    config.proofServer,
    config.node,
    "", // empty seed for fresh wallet
    getZswapNetworkId(),
    "info"
  );

  wallet.start();

  await firstValueFrom(wallet.state());

  return wallet;
}