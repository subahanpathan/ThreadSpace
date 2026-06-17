import { postService } from "@/lib/services/post.service"
import { PostFeed } from "@/components/post/PostFeed"
import { PostSort } from "@/components/post/PostSort"
import { CreatePostBox } from "@/components/post/CreatePostBox"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const session = await getServerSession(authOptions)
  const resolvedSearchParams = await searchParams
  const sort = (resolvedSearchParams.sort === "popular" ? "popular" : "latest") as "latest" | "popular"
  
  let posts = []
  if (session) {
    posts = await postService.getPersonalizedFeed(session.user.id, sort)
    // If no subscriptions, show popular posts
    if (posts.length === 0) {
      posts = await postService.getAll(sort)
    }
  } else {
    posts = await postService.getAll(sort)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h3 className="text-2xl font-bold leading-6 text-foreground font-serif">
          {session ? "Your Feed" : "All Posts"}
        </h3>
      </div>
      
      <CreatePostBox />
      <PostSort />
      <PostFeed posts={posts as any} />
    </div>
  )
}
