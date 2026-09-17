import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { serializeProduct } from '@/lib/serializers';
import { parseIntInRange, parseProductCategory } from '@/lib/validation';
import { badRequest } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = parseProductCategory(searchParams.get('category'));
  if (searchParams.get('category') && !category) {
    return badRequest('Invalid category');
  }
  const limit = parseIntInRange(searchParams.get('limit'), 24, 1, 100);
  const offset = parseIntInRange(searchParams.get('offset'), 0, 0, 10_000);

  try {
    const where = category ? { category } : {};
    const [total, rows] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
    ]);
    return NextResponse.json({
      data: rows.map(serializeProduct),
      pagination: { limit, offset, total },
    });
  } catch {
    return NextResponse.json(
      { data: [], pagination: { limit, offset, total: 0 } },
      { status: 200 },
    );
  }
}
