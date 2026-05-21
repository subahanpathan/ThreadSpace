import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { postService } from "@/lib/services/post.service"
import { communityService } from "@/lib/services/community.service"
import { PostFeed } from "@/components/post/PostFeed"
import { notFound } from "next/navigation"

interface CommunityPageProps {
  params: {
    communitySlug: string
  }
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const community = await communityService.getBySlug(params.communitySlug)
  
  if (!community) {
    notFound()
  }

  const posts = await postService.getByCommunity(community.id)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-400">
          u/
        </div>
        <Link href={`/r/${params.communitySlug}/submit`} className="flex-1">
          <input
            readOnly
            placeholder="Create Post"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-white hover:border-orange-500 transition-all focus:outline-none"
          />
        </Link>
        <div className="flex gap-2">
          <Link href={`/r/${params.communitySlug}/submit`}>
            <Button variant="ghost" size="icon" className="hover:text-orange-600 transition-colors">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PostFeed posts={posts as any} />
    </div>
  )
}
