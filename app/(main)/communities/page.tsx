import { communityService } from "@/lib/services/community.service"
import { CommunityCard } from "@/components/community/CommunityCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function CommunitiesPage() {
  let communities: any[] = [];
  try {
    communities = await communityService.getAll();
  } catch (error) {
    console.error("Failed to fetch communities:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <h3 className="text-2xl font-bold leading-6 text-foreground">All Communities</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse and join communities that interest you.
          </p>
        </div>
        <Link href="/communities/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Community
          </Button>
        </Link>
      </div>

      {communities.length === 0 ? (
        <div className="text-center py-20 bg-secondary/30 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No communities yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  )
}
