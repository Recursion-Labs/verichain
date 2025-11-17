import { webcrypto } from "crypto";
import { WalletBuilder } from "@midnight-ntwrk/wallet";
import { NetworkId } from "@midnight-ntwrk/zswap";

/**
 * Creates a new Midnight wallet instance for local development
 * @returns A started wallet instance with Resource interface
 */
export async function createWallet() {
    const seed = randomSeed();
    
    // For local development - adjust these URLs for your environment
    const indexerUri = "http://127.0.0.1:8088/api/v1/graphql";
    const indexerWsUri = "ws://127.0.0.1:8088/api/v1/graphql/ws";
    const proverServerUri = "http://127.0.0.1:6300";
    const substrateNodeUri = "http://127.0.0.1:9944";
    
    // Use Undeployed network for local development
    const networkId = NetworkId.Undeployed;

    const wallet = await WalletBuilder.build(
        indexerUri,
        indexerWsUri,
        proverServerUri,
        substrateNodeUri,
        seed,
        networkId,
        "info"
    );

    wallet.start();
    return wallet;
}

/**
 * Generates a random BIP32 compatible seed phrase (hex encoded)
 * @returns 32-byte random seed as hex string
 */
function randomSeed(): string {
    const bytes = new Uint8Array(32);
    webcrypto.getRandomValues(bytes);
    return Buffer.from(bytes).toString("hex");
}
