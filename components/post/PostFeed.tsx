import { PostWithAuthor } from "@/types"
import { PostCard } from "./PostCard"

interface PostFeedProps {
  posts: PostWithAuthor[]
}

export function PostFeed({ posts }: PostFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-secondary/30 rounded-lg border border-dashed border-border shadow-sm">
        <p className="text-muted-foreground text-lg">No posts yet. Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
