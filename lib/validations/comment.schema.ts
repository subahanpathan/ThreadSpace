import { z } from "zod"

export const CreateCommentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1, "Comment cannot be empty").max(1000),
})

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>
