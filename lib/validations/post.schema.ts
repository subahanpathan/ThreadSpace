import { z } from "zod"

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(300, "Title must be at most 300 characters")
    .trim(),
  content: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  linkUrl: z.string().url("Invalid link URL").optional().or(z.literal("")),
  type: z.enum(["text", "image", "link"]),
  communityId: z.string().min(1, "Community is required"),
})

export type CreatePostInput = z.infer<typeof CreatePostSchema>
