import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function probeDatabase(): Promise<'connected' | 'unavailable'> {
  if (!process.env.DATABASE_URL) {
    return 'unavailable';
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return 'connected';
  } catch {
    return 'unavailable';
  }
}
