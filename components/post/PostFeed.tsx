import { PostWithAuthor } from "@/types"
import { PostCard } from "./PostCard"

interface PostFeedProps {
  posts: PostWithAuthor[]
}

export function PostFeed({ posts }: PostFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
        <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
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
