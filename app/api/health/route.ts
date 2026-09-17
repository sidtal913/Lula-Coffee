import { NextResponse } from 'next/server';
import { probeDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const database = await probeDatabase();
  return NextResponse.json({
    status: 'ok',
    service: 'lula-coffee-api',
    timestamp: new Date().toISOString(),
    database,
  });
}
