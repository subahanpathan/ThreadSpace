"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { postService } from "@/lib/services/post.service"
import { CreatePostSchema } from "@/lib/validations/post.schema"
import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/utils/supabaseAdmin"

export async function actionCreatePost(formData: unknown) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "Unauthorized" }
    }

    // Convert FormData to plain object (exclude file) for validation
    const parsed = CreatePostSchema.safeParse(
      Object.fromEntries(
        [...(formData as FormData).entries()].filter(
          ([key, _]) => key !== "image"
        )
      )
    )

    if (!parsed.success) {
      return { error: "Validation failed", details: parsed.error.flatten() }
    }

    const data = parsed.data as any

    // Handle optional image upload
    const file = (formData as FormData).get("image") as File | null
    if (file && file.size > 0) {
      const fileName = `${Date.now()}_${file.name}`
      const { error: uploadError } = await supabaseAdmin.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!)
        .upload(fileName, file, { cacheControl: "3600", upsert: false })

      if (uploadError) {
        console.error("[SUPABASE_UPLOAD_ERROR]", uploadError)
        return { error: "Image upload failed" }
      }

      data.imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET}/${fileName}`
    }

    const result = await postService.create(data, session.user.id)
    revalidatePath("/")
    revalidatePath(`/r/${result.community.slug}`)
    return { success: true, data: result }
  } catch (error) {
    console.error("[POST_ACTION_ERROR]", error)
    return { error: "Internal server error" }
  }
}

export async function actionToggleSavePost(postId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "Unauthorized" }
    }

    const userId = session.user.id
    const hasSaved = await postService.isSaved(postId, userId)

    if (hasSaved) {
      await postService.unsave(postId, userId)
    } else {
      await postService.save(postId, userId)
    }

    revalidatePath("/")
    revalidatePath(`/post/${postId}`)

    return { success: true, saved: !hasSaved }
  } catch (error) {
    console.error("[TOGGLE_SAVE_ERROR]", error)
    return { error: "Internal server error" }
  }
}
