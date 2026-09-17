import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { notFound } from '@/lib/errors';
import { serializeProduct } from '@/lib/serializers';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ productId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { productId } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return notFound('Product not found');
    }
    return NextResponse.json({ data: serializeProduct(product) });
  } catch {
    return notFound('Product not found');
  }
}
