import {
    register_product,
    mint_nft,
    verify_authenticity,
    disclose_esg
} from "../managed/main/contracts/index.cjs";

import {
    register_productProver,
    mint_nftProver,
    verify_authenticityProver,
    disclose_esgProver
} from "../managed/main/keys/index.js";

import { ProverClient } from "@midnight-ntwrk/compact-js";

// Standard initialization

const RPC_URL = "http://127.0.0.1:9944";

export const prover = new ProverClient({
    compactProver: register_productProver,
    rpcUrl: RPC_URL
});

//  REGISTER A PRODUCT

export async function registerProduct(
    productId: number,
    ownerId: number,
    commitment: Uint8Array
) {
    return await register_product({
        product_id: productId,
        owner_id: ownerId,
        commitment,
    });
}

//  MINT NFT FOR PRODUCT

export async function mintNFT(
    productId: number
) {
    return await mint_nft({
        product_id: productId
    });
}

//  VERIFY PRODUCT AUTHENTICITY

export async function verifyAuthenticity(
    productId: number,
    proof: Uint8Array
) {
    return await verify_authenticity({
        product_id: productId,
        proof
    });
}

//  DISCLOSE ESG PROOF

export async function discloseESG(
    productId: number,
    proof: Uint8Array
) {
    return await disclose_esg({
        product_id: productId,
        proof
    });
}
