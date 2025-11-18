import { describe, it, expect } from "vitest";

import {
    buildRegisterProductWitness,
    buildMintNftWitness,
    buildVerifyAuthenticityWitness,
    buildDiscloseEsgWitness,
} from "../src/witness";

describe("VeriChain Contract Witnesses", () => {

    // Mock witness context with empty ledger
    const mockContext = {
        contractAddress: "0x1234567890abcdef",
        ledger: {
            product_status: {
                member: () => false,
                lookup: () => undefined
            },
            nft_minted: {
                member: () => false,
                lookup: () => false
            },
            product_commitments: {
                member: () => false,
                lookup: () => undefined
            },
            esg_proofs: {
                member: () => false,
                lookup: () => undefined
            }
        },
        privateState: {}
    } as any;

    it("register product witness works", () => {
        const w = buildRegisterProductWitness(mockContext, {
            product_id: 1n,
            owner_id: 999n,
            commitment: new Uint8Array(32).fill(1)
        });
        expect(w).toBeDefined();
    });

    it("mint nft witness works", () => {
        // Mock context with registered product
        const contextWithProduct = {
            contractAddress: "0x1234567890abcdef",
            ledger: {
                ...mockContext.ledger,
                product_status: {
                    member: () => true,
                    lookup: () => true
                }
            },
            privateState: {}
        } as any;
        
        const w = buildMintNftWitness(contextWithProduct, {
            product_id: 1n
        });
        expect(w).toBeDefined();
    });

    it("verify authenticity witness works", () => {
        const proof = new Uint8Array(32).fill(5);
        
        // Mock context with minted NFT
        const contextWithMintedNft = {
            contractAddress: "0x1234567890abcdef",
            ledger: {
                ...mockContext.ledger,
                nft_minted: {
                    member: () => true,
                    lookup: () => true
                }
            },
            privateState: {}
        } as any;
        
        const w = buildVerifyAuthenticityWitness(contextWithMintedNft, {
            product_id: 1n,
            proof
        });
        expect(w).toBeDefined();
    });

    it("disclose esg witness works", () => {
        const proof = new Uint8Array(64).fill(3);
        
        // Mock context with registered product
        const contextWithProduct = {
            contractAddress: "0x1234567890abcdef",
            ledger: {
                ...mockContext.ledger,
                product_status: {
                    member: () => true,
                    lookup: () => true
                }
            },
            privateState: {}
        } as any;
        
        const w = buildDiscloseEsgWitness(contextWithProduct, {
            product_id: 3n,
            proof
        });
        expect(w).toBeDefined();
    });
});