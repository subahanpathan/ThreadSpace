import { z } from "zod"

export const CreateCommunitySchema = z.object({
  name: z
    .string()
    .min(3, "Community name must be at least 3 characters")
    .max(21, "Community name must be at most 21 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores are allowed")
    .trim(),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
})

export type CreateCommunityInput = z.infer<typeof CreateCommunitySchema>
