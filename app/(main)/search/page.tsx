import { postService } from "@/lib/services/post.service"
import { communityService } from "@/lib/services/community.service"
import { PostFeed } from "@/components/post/PostFeed"
import { CommunityCard } from "@/components/community/CommunityCard"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  
  const [posts, communities] = await Promise.all([
    postService.search(query),
    communityService.search(query),
  ])

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h3 className="text-2xl font-bold leading-6 text-foreground">
          Search results for "{query}"
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Found {posts.length} posts and {communities.length} communities.
        </p>
      </div>

      <div className="space-y-8">
        {communities.length > 0 && (
          <section className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Communities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community as any} />
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Posts
          </h4>
          {posts.length > 0 ? (
            <PostFeed posts={posts as any} />
          ) : (
            <div className="text-center py-10 bg-secondary/30 rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">No posts found matching your search.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
