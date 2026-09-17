import type { Product } from '@prisma/client';

export function serializeProduct(product: Product) {
  return {
    id: product.id,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    name: product.name,
    slug: product.slug,
    description: product.description,
    priceCents: product.priceCents,
    category: product.category,
    sku: product.sku,
    imageUrl: product.imageUrl,
    inStock: product.inStock,
  };
}
