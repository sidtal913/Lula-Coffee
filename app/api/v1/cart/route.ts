import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { badRequest } from '@/lib/errors';
import { serializeProduct } from '@/lib/serializers';

export const dynamic = 'force-dynamic';

async function loadCart(userId: string) {
  const lines = await prisma.cartLine.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'asc' },
  });
  return {
    userId,
    lines: lines.map((line) => ({
      id: line.id,
      createdAt: line.createdAt.toISOString(),
      updatedAt: line.updatedAt.toISOString(),
      productId: line.productId,
      quantity: line.quantity,
      product: serializeProduct(line.product),
    })),
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request.headers.get('authorization'), ['customer']);
  if (auth instanceof Response) {
    return auth;
  }
  try {
    const data = await loadCart(auth.id);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: { userId: auth.id, lines: [] } });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request.headers.get('authorization'), ['customer']);
  if (auth instanceof Response) {
    return auth;
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }
  if (
    !body ||
    typeof body !== 'object' ||
    !Array.isArray((body as { lines?: unknown }).lines)
  ) {
    return badRequest('Body must include lines array');
  }
  const lines = (body as { lines: Array<{ productId?: unknown; quantity?: unknown }> }).lines;
  for (const line of lines) {
    if (typeof line.productId !== 'string' || typeof line.quantity !== 'number') {
      return badRequest('Each line requires productId (uuid) and quantity (number)');
    }
    if (line.quantity < 1) {
      return badRequest('Quantity must be at least 1');
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.cartLine.deleteMany({ where: { userId: auth.id } });
      if (lines.length > 0) {
        await tx.cartLine.createMany({
          data: lines.map((line) => ({
            userId: auth.id,
            productId: line.productId as string,
            quantity: line.quantity as number,
          })),
        });
      }
    });
    const data = await loadCart(auth.id);
    return NextResponse.json({ data });
  } catch {
    return badRequest('Unable to update cart — check product ids and database connectivity');
  }
}
