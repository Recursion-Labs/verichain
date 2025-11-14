export function createRegisterWitness(product_id: number, owner_id: number, commitment: Uint8Array) {
    return {
        product_id,
        owner_id,
        commitment
    };
}

export function createMintNftWitness(product_id: number) {
    return {
        product_id
    };
}

export function createVerifyWitness(product_id: number, proof: Uint8Array) {
    return {
        product_id,
        proof
    };
}

export function createEsgWitness(product_id: number, proof: Uint8Array) {
    return {
        product_id,
        proof
    };
}
