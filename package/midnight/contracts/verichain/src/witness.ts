import type { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import type { Ledger } from "./managed/main/contract/index.cjs";
import contractInfo from "./managed/main/compiler/contract-info.json" assert { type: "json" };

/**
 * Witness context for VeriChain contract
 * Contains ledger state and private state for witness generation
 */
export type VeriChainWitnessContext<T> = WitnessContext<Ledger, T>;

/**
 * Build witness for registering a new product
 * This witness is used to prove you have the right to register a product
 */
export function buildRegisterProductWitness<T>(
  context: VeriChainWitnessContext<T>,
  params: {
    product_id: bigint;
    owner_id: bigint;
    commitment: Uint8Array;
  }
) {
  // Verify the product doesn't already exist
  const exists = context.ledger.product_status.member(params.product_id);
  
  if (exists) {
    throw new Error(`Product ${params.product_id} already registered`);
  }
  
  // Return witness data for the circuit
  return {
    product_id: params.product_id,
    owner_id: params.owner_id,
    commitment: params.commitment,
  };
}

/**
 * Build witness for minting an NFT for a registered product
 */
export function buildMintNftWitness<T>(
  context: VeriChainWitnessContext<T>,
  params: {
    product_id: bigint;
  }
) {
  // Verify product is registered and not yet minted
  const isRegistered = context.ledger.product_status.member(params.product_id);
  const isMinted = context.ledger.nft_minted.member(params.product_id) 
    ? context.ledger.nft_minted.lookup(params.product_id) 
    : false;
  
  if (!isRegistered) {
    throw new Error(`Product ${params.product_id} is not registered`);
  }
  
  if (isMinted) {
    throw new Error(`NFT already minted for product ${params.product_id}`);
  }
  
  return {
    product_id: params.product_id,
  };
}

/**
 * Build witness for verifying product authenticity
 */
export function buildVerifyAuthenticityWitness<T>(
  context: VeriChainWitnessContext<T>,
  params: {
    product_id: bigint;
    proof: Uint8Array;
  }
) {
  // Verify product is minted before verification
  const isMinted = context.ledger.nft_minted.member(params.product_id)
    ? context.ledger.nft_minted.lookup(params.product_id)
    : false;
  
  if (!isMinted) {
    throw new Error(`Product ${params.product_id} must be minted before verification`);
  }
  
  return {
    product_id: params.product_id,
    proof: params.proof,
  };
}

/**
 * Build witness for disclosing ESG proof
 */
export function buildDiscloseEsgWitness<T>(
  context: VeriChainWitnessContext<T>,
  params: {
    product_id: bigint;
    proof: Uint8Array;
  }
) {
  // Verify product exists
  const isRegistered = context.ledger.product_status.member(params.product_id);
  
  if (!isRegistered) {
    throw new Error(`Product ${params.product_id} is not registered`);
  }
  
  return {
    product_id: params.product_id,
    proof: params.proof,
  };
}

export { contractInfo };
