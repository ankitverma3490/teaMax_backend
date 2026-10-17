import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: config.isProduction ? ['error', 'warn'] : ['warn', 'error'],
  });

if (!config.isProduction) {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
