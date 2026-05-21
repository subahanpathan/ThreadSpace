import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined
}

let db: PrismaClient;

if (globalThis.cachedPrisma) {
  db = globalThis.cachedPrisma;
} else {
  let connectionString = process.env.DATABASE_URL;
  if (connectionString?.startsWith("prisma+postgres://")) {
    const url = new URL(connectionString);
    const apiKey = url.searchParams.get("api_key");
    if (apiKey) {
      try {
        const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString("utf-8"));
        if (decoded.databaseUrl) {
          connectionString = decoded.databaseUrl;
        }
      } catch (e) {}
    }
  }
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  db = new PrismaClient({ adapter, log: ["query", "error", "warn"] })
}

if (process.env.NODE_ENV !== "production") {
  globalThis.cachedPrisma = db
}

export { db }
