import { persistentHash } from "@midnight-ntwrk/compact-runtime";
import { CompactTypeBytes } from "@midnight-ntwrk/compact-runtime";

/**
 * Creates a commitment hash using Midnight's persistent hash function
 * This uses the actual cryptographic primitives from the Midnight runtime
 * @param data - String data to hash
 * @returns 32-byte commitment hash
 */
export function createCommitment(data: string): Uint8Array {
	// Convert string to bytes
	const encoder = new TextEncoder();
	const dataBytes = encoder.encode(data);

	// Use Midnight's persistent hash (guaranteed to persist between upgrades)
	const bytesType = new CompactTypeBytes(dataBytes.length);
	const hash = persistentHash(bytesType, dataBytes);

	// Return exactly 32 bytes as required by the contract
	return hash;
}

/**
 * Alias for backward compatibility
 */
export const poseidonHash = createCommitment;
