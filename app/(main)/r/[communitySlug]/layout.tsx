import { communityService } from "@/lib/services/community.service"
import { notFound } from "next/navigation"
import { CommunityHeader } from "@/components/community/CommunityHeader"

interface CommunityLayoutProps {
  children: React.ReactNode
  params: {
    communitySlug: string
  }
}

export default async function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps) {
  const community = await communityService.getBySlug(params.communitySlug)

  if (!community) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <CommunityHeader community={community} />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{children}</div>
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
            <h3 className="font-bold mb-2">About Community</h3>
            <p className="text-sm text-gray-600 mb-4">{community.description}</p>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Created</span>
                <span className="font-medium">
                  {new Date(community.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
