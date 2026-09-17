import { jwtVerify, type JWTPayload } from 'jose';
import { unauthorized, forbidden } from '@/lib/errors';

export type UserRole = 'customer' | 'admin';

export interface AuthUser {
  id: string;
  role: UserRole;
  email?: string;
}

interface LulaJwtPayload extends JWTPayload {
  role?: UserRole;
  email?: string;
}

function getSecretKey(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

export async function verifyBearerToken(
  authorizationHeader: string | null,
): Promise<AuthUser | null> {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null;
  }
  const token = authorizationHeader.slice('Bearer '.length).trim();
  if (!token) {
    return null;
  }
  const key = getSecretKey();
  if (!key) {
    return null;
  }
  try {
    const issuer = process.env.JWT_ISSUER ?? 'lula-coffee-api';
    const { payload } = await jwtVerify<LulaJwtPayload>(token, key, {
      algorithms: ['HS256'],
      issuer,
    });
    const sub = payload.sub;
    const role = payload.role;
    if (!sub || (role !== 'customer' && role !== 'admin')) {
      return null;
    }
    return {
      id: sub,
      role,
      email: typeof payload.email === 'string' ? payload.email : undefined,
    };
  } catch {
    return null;
  }
}

export async function requireAuth(
  authorizationHeader: string | null,
  allowedRoles?: UserRole[],
): Promise<AuthUser | Response> {
  const user = await verifyBearerToken(authorizationHeader);
  if (!user) {
    return unauthorized();
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return forbidden();
  }
  return user;
}
