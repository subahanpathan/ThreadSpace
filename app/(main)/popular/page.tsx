import { postService } from "@/lib/services/post.service"
import { PostFeed } from "@/components/post/PostFeed"

export default async function PopularPage() {
  const posts = await postService.getAll("popular")

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h3 className="text-2xl font-bold leading-6 text-foreground">Popular Posts</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The most upvoted posts across all of ThreadSpace.
        </p>
      </div>
      
      <PostFeed posts={posts as any} />
    </div>
  )
}
