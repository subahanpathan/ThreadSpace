import { Community } from "@prisma/client"
import { SubscribeButton } from "./SubscribeButton"


// Simple deterministic color generator based on a string (e.g., community ID)
function hashToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h = Math.abs(hash) % 360 // hue 0‑359
  return `hsl(${h}, 70%, 80%)`
}

interface CommunityHeaderProps {
  community: Community
  isSubscribed: boolean
}

export function CommunityHeader({ community, isSubscribed }: CommunityHeaderProps) {
  return (
    <div className="bg-background border-b border-border -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 mb-6">
      <div className="h-20 bg-primary w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative flex items-end -mt-8 gap-4">
          {/* Dynamic background color derived from community ID */}
          <div className="w-20 h-20 rounded-full border-4 border-background overflow-hidden flex-shrink-0 shadow-sm"
               style={{ backgroundColor: hashToColor(community.id) }}>
            {community.imageUrl ? (
              <img
                src={community.imageUrl}
                alt={`${community.name} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary font-bold text-3xl">
                {community.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-2xl font-bold text-foreground">{community.name}</h1>
            <p className="text-sm text-muted-foreground">{community.slug}</p>
          </div>
          <div className="pb-1">
            <SubscribeButton communityId={community.id} initialIsSubscribed={isSubscribed} />
          </div>
        </div>
      </div>
    </div>
  )
}
