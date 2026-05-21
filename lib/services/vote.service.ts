import { db } from "@/lib/db"
type VoteType = "UP" | "DOWN"

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

    const result = existingVote
      ? existingVote.type === type
        ? await db.vote.delete({
            where: { userId_postId: { userId, postId } },
          })
        : await db.vote.update({
            where: { userId_postId: { userId, postId } },
            data: { type },
          })
      : await db.vote.create({
          data: { type, userId, postId },
        })

    const post = await db.post.findUnique({
      where: { id: postId },
      select: {
        community: {
          select: { slug: true },
        },
      },
    })

    return { result, post }
  },
}
