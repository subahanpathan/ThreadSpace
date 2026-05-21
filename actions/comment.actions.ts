"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { commentService } from "@/lib/services/comment.service"
import { CreateCommentSchema } from "@/lib/validations/comment.schema"
import { revalidatePath } from "next/cache"

export async function actionCreateComment(formData: unknown) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "You must be signed in to comment" }
    }

    const parsed = CreateCommentSchema.safeParse(formData)
    if (!parsed.success) {
      return { error: "Comment cannot be empty" }
    }

    const result = await commentService.create(parsed.data, session.user.id)
    
    revalidatePath("/")
    revalidatePath(`/r/${result.post.community.slug}/post/${result.postId}`)
    revalidatePath(`/r/${result.post.community.slug}`)
    
    return { success: true, data: result }

  } catch (error) {
    console.error("[COMMENT_ACTION_ERROR]", error)
    return { error: "Internal server error" }
  }
}
