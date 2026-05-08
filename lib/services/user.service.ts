import { db } from "@/lib/db"
import { SignUpInput } from "@/lib/validations/auth.schema"
import bcrypt from "bcryptjs"

export const userService = {
  async findByEmail(email: string) {
    return await db.user.findUnique({
      where: { email },
    })
  },

  async findByUsername(username: string) {
    return await db.user.findUnique({
      where: { username },
    })
  },

  async create(data: SignUpInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    return await db.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
      }
    })
  }
}
