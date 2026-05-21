import { db } from "@/lib/db"
import { CreateCommentInput } from "@/lib/validations/comment.schema"

export const commentService = {
  async create(data: CreateCommentInput, authorId: string) {
    return await db.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            community: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    })
  },
}
