import { z } from "zod"

export const VoteSchema = z.object({
  postId: z.string(),
  type: z.enum(["UP", "DOWN"]),
})

export type VoteInput = z.infer<typeof VoteSchema>
