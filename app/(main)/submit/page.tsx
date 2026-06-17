import { CreatePostForm } from "@/components/post/CreatePostForm"
import { communityService } from "@/lib/services/community.service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SubmitPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  let communities: any[] = []
  try {
    communities = await communityService.getAll()
  } catch (error) {
    console.error("Failed to fetch communities", error)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-border pb-5">
        <h3 className="text-2xl font-bold leading-6 text-foreground font-serif">
          Create a post
        </h3>
      </div>
      <CreatePostForm communities={communities} />
    </div>
  )
}
