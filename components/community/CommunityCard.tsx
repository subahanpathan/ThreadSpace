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
      className="block p-6 bg-secondary/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-foreground truncate">{community.name}</h4>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {community._count.posts} posts
          </p>
        </div>
      </div>
      {community.description && (
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {community.description}
        </p>
      )}
    </Link>
  )
}
