import { postService } from "@/lib/services/post.service"
import { PostFeed } from "@/components/post/PostFeed"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  let posts = []
  if (session) {
    posts = await postService.getPersonalizedFeed(session.user.id)
    // If no subscriptions, show popular posts
    if (posts.length === 0) {
      posts = await postService.getAll()
    }
  } else {
    posts = await postService.getAll()
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">
          {session ? "Your Feed" : "Popular Posts"}
        </h3>
      </div>
      
      <PostFeed posts={posts as any} />
    </div>
  )
}
