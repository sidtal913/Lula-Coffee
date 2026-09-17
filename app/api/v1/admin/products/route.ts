import { NextRequest, NextResponse } from 'next/server';
import { ProductCategory } from '@prisma/client';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { badRequest } from '@/lib/errors';
import { serializeProduct } from '@/lib/serializers';

export const dynamic = 'force-dynamic';

function parseCreateBody(body: unknown) {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  const category = b.category;
  if (
    typeof b.name !== 'string' ||
    typeof b.slug !== 'string' ||
    typeof b.sku !== 'string' ||
    typeof b.priceCents !== 'number' ||
    typeof category !== 'string' ||
    !Object.values(ProductCategory).includes(category as ProductCategory)
  ) {
    return null;
  }
  return {
    name: b.name,
    slug: b.slug,
    sku: b.sku,
    priceCents: b.priceCents,
    category: category as ProductCategory,
    description: typeof b.description === 'string' ? b.description : undefined,
    imageUrl: typeof b.imageUrl === 'string' ? b.imageUrl : undefined,
    inStock: typeof b.inStock === 'boolean' ? b.inStock : true,
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request.headers.get('authorization'), ['admin']);
  if (auth instanceof Response) {
    return auth;
  }
  try {
    const rows = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({
      data: rows.map(serializeProduct),
      pagination: { limit: rows.length, offset: 0, total: rows.length },
    });
  } catch {
    return NextResponse.json({
      data: [],
      pagination: { limit: 0, offset: 0, total: 0 },
    });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request.headers.get('authorization'), ['admin']);
  if (auth instanceof Response) {
    return auth;
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }
  const parsed = parseCreateBody(body);
  if (!parsed) {
    return badRequest('Invalid product payload');
  }
  try {
    const product = await prisma.product.create({ data: parsed });
    return NextResponse.json({ data: serializeProduct(product) }, { status: 201 });
  } catch {
    return badRequest('Unable to create product — slug or sku may already exist');
  }
}
