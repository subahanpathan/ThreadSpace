import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { postService } from "@/lib/services/post.service"
import { communityService } from "@/lib/services/community.service"
import { PostFeed } from "@/components/post/PostFeed"
import { PostSort } from "@/components/post/PostSort"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface CommunityPageProps {
  params: Promise<{
    communitySlug: string
  }>
  searchParams: Promise<{ sort?: string }>
}

export default async function CommunityPage({ params, searchParams }: CommunityPageProps) {
  const session = await getServerSession(authOptions)
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const sort = (resolvedSearchParams.sort === "popular" ? "popular" : "latest") as "latest" | "popular"
  const community = await communityService.getBySlug(resolvedParams.communitySlug)
  
  if (!community) {
    notFound()
  }

  const posts = await postService.getByCommunity(community.id, sort)

  return (
    <div className="space-y-6">
      <div className="bg-background rounded-lg border border-border p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center font-bold text-muted-foreground">
          👤
        </div>
        <Link href={`/r/${resolvedParams.communitySlug}/submit`} className="flex-1">
          <input
            readOnly
            placeholder="Create Post"
            className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-background hover:border-primary transition-all focus:outline-none text-foreground"
          />
        </Link>
        <div className="flex gap-2">
          <Link href={`/r/${resolvedParams.communitySlug}/submit`}>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <PostSort />

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PostFeed posts={posts as any} />
    </div>
  )
}
