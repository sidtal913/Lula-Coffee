import { ProductCategory } from '@prisma/client';

const CATEGORIES = new Set<string>(Object.values(ProductCategory));

export function parseProductCategory(value: string | null): ProductCategory | undefined {
  if (!value) return undefined;
  if (CATEGORIES.has(value)) {
    return value as ProductCategory;
  }
  return undefined;
}

export function parseIntInRange(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
