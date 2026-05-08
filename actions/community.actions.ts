"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { communityService } from "@/lib/services/community.service"
import { CreateCommunitySchema } from "@/lib/validations/community.schema"
import { revalidatePath } from "next/cache"

export async function actionCreateCommunity(formData: unknown) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "Unauthorized" }
    }

    const parsed = CreateCommunitySchema.safeParse(formData)
    if (!parsed.success) {
      return { error: "Validation failed", details: parsed.error.flatten() }
    }

    const slug = parsed.data.name.toLowerCase().replace(/\s+/g, "-")
    const existing = await communityService.exists(slug)
    if (existing) {
      return { error: "Community with this name already exists" }
    }

    const result = await communityService.create(parsed.data)
    
    revalidatePath("/communities")
    return { success: true, data: result }

  } catch (error) {
    console.error("[COMMUNITY_ACTION_ERROR]", error)
    return { error: "Internal server error" }
  }
}
