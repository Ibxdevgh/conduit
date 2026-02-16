import { AGENT_NAMES, AGENT_TYPES, CATEGORIES, MERCHANT_NAMES } from './constants';
import type { SimulatedAgent } from './types';

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const HEX_CHARS = '0123456789abcdef';

function randomFromBase58(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += BASE58_ALPHABET[Math.floor(Math.random() * BASE58_ALPHABET.length)];
  }
  return result;
}

/**
 * Generate a fake but realistic-looking Solana base58 public key (44 chars).
 */
export function generateBase58Key(): string {
  return randomFromBase58(44);
}

/**
 * Generate a fake 88-char base58 transaction signature.
 */
export function generateTxSignature(): string {
  return randomFromBase58(88);
}

/**
 * Generate a short hex agent ID like "0x" + 8 random hex chars.
 */
export function generateAgentId(): string {
  let hex = '';
  for (let i = 0; i < 8; i++) {
    hex += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  }
  return `0x${hex}`;
}

/**
 * Returns a random amount between 0.50 and 500.00, weighted toward lower amounts.
 * Uses an exponential distribution so most transactions are small.
 */
export function randomAmount(): number {
  // Exponential weighting: square root of uniform pulls values toward the low end
  const raw = Math.random();
  const weighted = Math.pow(raw, 2.5);
  const amount = 0.5 + weighted * 499.5;
  return Math.round(amount * 100) / 100;
}

/**
 * Returns a random merchant { id, name } from the constants list.
 */
export function randomMerchant(): { id: string; name: string } {
  const index = Math.floor(Math.random() * MERCHANT_NAMES.length);
  const name = MERCHANT_NAMES[index];
  // Derive a deterministic-looking merchant ID from the index
  const id = `merchant_${name.toLowerCase().replace(/\s+/g, '_')}`;
  return { id, name };
}

/**
 * Returns a random simulated agent { id, name, type } from the constants list.
 */
export function randomAgent(): SimulatedAgent {
  const name = AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)];
  const type = AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)];
  const id = generateAgentId();
  return { id, name, type };
}

/**
 * Returns a random category from the constants list.
 */
export function randomCategory(): string {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

/**
 * Returns a random settlement time between 280ms and 520ms.
 */
export function randomSettlementTime(): number {
  return Math.floor(280 + Math.random() * 240);
}
