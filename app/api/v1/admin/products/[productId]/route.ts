import { NextRequest, NextResponse } from 'next/server';
import { ProductCategory } from '@prisma/client';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { badRequest, notFound } from '@/lib/errors';
import { serializeProduct } from '@/lib/serializers';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ productId: string }> };

function parseUpdateBody(body: unknown) {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  const data: Record<string, unknown> = {};
  if (typeof b.name === 'string') data.name = b.name;
  if (typeof b.slug === 'string') data.slug = b.slug;
  if (typeof b.sku === 'string') data.sku = b.sku;
  if (typeof b.description === 'string') data.description = b.description;
  if (typeof b.priceCents === 'number') data.priceCents = b.priceCents;
  if (typeof b.imageUrl === 'string') data.imageUrl = b.imageUrl;
  if (typeof b.inStock === 'boolean') data.inStock = b.inStock;
  if (typeof b.category === 'string') {
    if (!Object.values(ProductCategory).includes(b.category as ProductCategory)) {
      return null;
    }
    data.category = b.category;
  }
  if (Object.keys(data).length === 0) return null;
  return data;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request.headers.get('authorization'), ['admin']);
  if (auth instanceof Response) {
    return auth;
  }
  const { productId } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }
  const data = parseUpdateBody(body);
  if (!data) {
    return badRequest('Invalid or empty update payload');
  }
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data,
    });
    return NextResponse.json({ data: serializeProduct(product) });
  } catch {
    return notFound('Product not found');
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request.headers.get('authorization'), ['admin']);
  if (auth instanceof Response) {
    return auth;
  }
  const { productId } = await params;
  try {
    await prisma.product.delete({ where: { id: productId } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return notFound('Product not found');
  }
}
