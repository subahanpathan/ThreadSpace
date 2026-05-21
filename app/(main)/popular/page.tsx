import { postService } from "@/lib/services/post.service"
import { PostFeed } from "@/components/post/PostFeed"

export default async function PopularPage() {
  const posts = await postService.getAll("popular")

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Popular Posts</h3>
        <p className="mt-2 text-sm text-gray-500">
          The most upvoted posts across all of ThreadSpace.
        </p>
      </div>
      
      <PostFeed posts={posts as any} />
    </div>
  )
}
