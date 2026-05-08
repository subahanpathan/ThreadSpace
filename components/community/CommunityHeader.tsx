import { Community } from "@prisma/client"
import { Button } from "@/components/ui/Button"

interface CommunityHeaderProps {
  community: Community
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 mb-6">
      <div className="h-20 bg-orange-500 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative flex items-end -mt-8 gap-4">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white overflow-hidden flex-shrink-0 shadow-sm">
            <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-3xl">
              r/
            </div>
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-2xl font-bold text-gray-900">r/{community.name}</h1>
            <p className="text-sm text-gray-500">r/{community.slug}</p>
          </div>
          <div className="pb-1">
            <Button className="px-8">Join</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
