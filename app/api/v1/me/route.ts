import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request.headers.get('authorization'), ['customer', 'admin']);
  if (auth instanceof Response) {
    return auth;
  }
  return NextResponse.json({
    data: {
      id: auth.id,
      role: auth.role,
      ...(auth.email ? { email: auth.email } : {}),
    },
  });
}
