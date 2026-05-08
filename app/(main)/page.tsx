import { postService } from "@/lib/services/post.service"
import { PostFeed } from "@/components/post/PostFeed"

export default async function HomePage() {
  const posts = await postService.getAll()

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Popular Posts</h3>
      </div>
      
      <PostFeed posts={posts as any} />
    </div>
  )
}
