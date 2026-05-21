import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { userService } from "./services/user.service"
import { SignInSchema } from "./validations/auth.schema"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = SignInSchema.safeParse(credentials)
        
        if (!parsed.success) return null
        
        const user = await userService.findByEmail(parsed.data.email)
        
        if (!user || !user.password) return null
        
        const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password)
        
        if (!isPasswordValid) return null
        
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await userService.findByEmail(token.email as string)
      
      if (!dbUser) {
        if (user) {
          token.id = user.id
        }
        return token
      }
      
      return {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
        picture: dbUser.image,
      }
    }
  }
}
