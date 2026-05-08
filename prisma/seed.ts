import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10)

  // Create test user
  const user = await prisma.user.upsert({
    where: { email: "admin@threadspace.com" },
    update: {},
    create: {
      email: "admin@threadspace.com",
      username: "admin",
      password: hashedPassword,
    },
  })

  // Create test community
  const community = await prisma.community.upsert({
    where: { slug: "announcements" },
    update: {},
    create: {
      name: "Announcements",
      slug: "announcements",
      description: "Official ThreadSpace updates",
    },
  })

  console.log("Seed data created successfully")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
