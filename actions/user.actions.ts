"use server"

import { userService } from "@/lib/services/user.service"
import { SignUpSchema } from "@/lib/validations/auth.schema"

export async function actionSignUp(formData: unknown) {
  try {
    const parsed = SignUpSchema.safeParse(formData)
    
    if (!parsed.success) {
      return { error: "Validation failed", details: parsed.error.flatten() }
    }
    
    const existingUser = await userService.findByEmail(parsed.data.email)
    if (existingUser) {
      return { error: "Email already in use" }
    }
    
    const existingUsername = await userService.findByUsername(parsed.data.username)
    if (existingUsername) {
      return { error: "Username already taken" }
    }
    
    await userService.create(parsed.data)
    
    return { success: true }
    
  } catch (error) {
    console.error("[SIGNUP_ACTION]", error)
    return { error: "Internal server error" }
  }
}
