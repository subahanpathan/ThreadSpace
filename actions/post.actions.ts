"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { postService } from "@/lib/services/post.service"
import { CreatePostSchema } from "@/lib/validations/post.schema"
import { revalidatePath } from "next/cache"

export async function actionCreatePost(formData: unknown) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "Unauthorized" }
    }

    const parsed = CreatePostSchema.safeParse(formData)
    if (!parsed.success) {
      return { error: "Validation failed", details: parsed.error.flatten() }
    }

    const result = await postService.create(parsed.data, session.user.id)
    
    revalidatePath("/")
    revalidatePath(`/r/${result.community.slug}`)
    
    return { success: true, data: result }

  } catch (error) {
    console.error("[POST_ACTION_ERROR]", error)
    return { error: "Internal server error" }
  }
}
