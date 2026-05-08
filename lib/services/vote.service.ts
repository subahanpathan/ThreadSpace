import { db } from "@/lib/db"
import { VoteType } from "@prisma/client"

export const voteService = {
  async handleVote(postId: string, userId: string, type: VoteType) {
    const existingVote = await db.vote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    if (existingVote) {
      if (existingVote.type === type) {
        return await db.vote.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        })
      }

      return await db.vote.update({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
        data: {
          type,
        },
      })
    }

    return await db.vote.create({
      data: {
        type,
        userId,
        postId,
      },
    })
  },
}
