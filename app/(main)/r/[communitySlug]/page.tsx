import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Plus } from "lucide-react"

interface CommunityPageProps {
  params: {
    communitySlug: string
  }
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0" />
        <Link href={`/r/${params.communitySlug}/submit`} className="flex-1">
          <input
            readOnly
            placeholder="Create Post"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-white hover:border-orange-500 transition-all"
          />
        </Link>
        <div className="flex gap-2">
          <Link href={`/r/${params.communitySlug}/submit`}>
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* PostFeed will go here */}
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No posts in this community yet.</p>
        </div>
      </div>
    </div>
  )
}
