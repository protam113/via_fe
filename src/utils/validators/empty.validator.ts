import { z } from 'zod';

/**
 * Check if a value is considered "empty"
 * - undefined, null
 * - string empty
 * - array empty
 * - object without key
 * - Map, Empty Set
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;

  if (typeof value === 'string') return value.trim().length === 0;

  if (Array.isArray(value)) return value.length === 0;

  if (value instanceof Map || value instanceof Set) return value.size === 0;

  if (typeof value === 'object') return Object.keys(value).length === 0;

  return false;
}

/**
 * Zod schema to validate a non-empty string
 * - Trims whitespace
 * - Ensures the string is not empty after trimming
 */
export const zodIsNotEmptyString = (message: string) =>
  z
    .string()
    .trim()
    .refine((val) => val.length > 0, { message });
