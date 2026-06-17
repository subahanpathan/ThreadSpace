import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined
}

export const db = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (!globalThis.cachedPrisma) {
      globalThis.cachedPrisma = new PrismaClient({ log: ["error", "warn"] });
    }
    const val = (globalThis.cachedPrisma as any)[prop];
    return typeof val === 'function' ? val.bind(globalThis.cachedPrisma) : val;
  }
});

