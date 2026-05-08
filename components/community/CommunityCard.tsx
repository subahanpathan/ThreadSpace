import Link from "next/link"
import { CommunityWithCount } from "@/types"
import { Users } from "lucide-react"

interface CommunityCardProps {
  community: CommunityWithCount
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link 
      href={`/r/${community.slug}`}
      className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-orange-50 transition-colors">
          <Users className="h-6 w-6 text-gray-500 group-hover:text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-gray-900 truncate">r/{community.name}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            {community._count.posts} posts
          </p>
        </div>
      </div>
      {community.description && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
          {community.description}
        </p>
      )}
    </Link>
  )
}
