import { User, Community, Post, Comment, Vote } from "@prisma/client"

export type PostWithAuthor = Post & {
  author: User
  community: Community
  votes: Vote[]
  comments: Comment[]
}

export type CommunityWithCount = Community & {
  _count: {
    posts: number
  }
}
