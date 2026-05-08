"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { voteService } from "@/lib/services/vote.service"
import { VoteSchema } from "@/lib/validations/vote.schema"
import { revalidatePath } from "next/cache"

export async function actionVote(formData: unknown) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "You must be signed in to vote" }
    }

    const parsed = VoteSchema.safeParse(formData)
    if (!parsed.success) {
      return { error: "Invalid vote data" }
    }

    await voteService.handleVote(parsed.data.postId, session.user.id, parsed.data.type)
    
    revalidatePath("/")
    return { success: true }

  } catch (error) {
    console.error("[VOTE_ACTION_ERROR]", error)
    return { error: "Internal server error" }
  }
}
