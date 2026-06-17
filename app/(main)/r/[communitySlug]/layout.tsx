import { communityService } from "@/lib/services/community.service"
import { notFound } from "next/navigation"
import { CommunityHeader } from "@/components/community/CommunityHeader"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

interface CommunityLayoutProps {
  children: React.ReactNode
  params: Promise<{
    communitySlug: string
  }>
}

export default async function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps) {
  const { communitySlug } = await params
  const session = await getServerSession(authOptions)
  const community = await communityService.getBySlug(communitySlug)

  if (!community) {
    notFound()
  }

  let isSubscribed = false
  if (session) {
    const subscription = await db.user.findFirst({
      where: {
        id: session.user.id,
        subscriptions: {
          some: {
            id: community.id,
          },
        },
      },
    })
    isSubscribed = !!subscription
  }

  return (
    <div className="flex flex-col">
      <CommunityHeader community={community} isSubscribed={isSubscribed} />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{children}</div>
        <div className="hidden lg:block">
          <div className="bg-background rounded-lg border border-border p-4 sticky top-24">
            <h3 className="font-bold mb-2">About Community</h3>
            <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
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
