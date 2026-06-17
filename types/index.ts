import { User, Community, Post, Comment, Vote } from "@prisma/client"

export type PostWithAuthor = Post & {
  author: Pick<User, "id" | "username" | "image">
  community: Pick<Community, "id" | "name" | "slug">
  votes: Vote[]
  comments?: (Comment & { author: Pick<User, "id" | "username" | "image"> })[]
  savedBy?: { id: string }[]
  _count?: {
    comments: number
  }
}

export type CommunityWithCount = Community & {
  _count: {
    posts: number
  }
}
