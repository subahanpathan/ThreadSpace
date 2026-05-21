import { PrismaClient } from "@prisma/client"

async function test() {
  try {
    console.log("Attempting with datasourceUrl...")
    const p1 = new PrismaClient({
      datasourceUrl: "postgresql://postgres:postgres@localhost:5432/threadspace"
    } as any)
    console.log("Success with datasourceUrl")
  } catch (e) {
    console.log("datasourceUrl failed:", (e as Error).message)
  }

  try {
    console.log("\nAttempting with datasources.db.url...")
    const p2 = new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://postgres:postgres@localhost:5432/threadspace"
        }
      }
    } as any)
    console.log("Success with datasources.db.url")
  } catch (e) {
    console.log("datasources.db.url failed:", (e as Error).message)
  }
}

test()
