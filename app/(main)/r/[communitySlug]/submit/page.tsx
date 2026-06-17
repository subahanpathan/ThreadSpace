import { CreatePostForm } from "@/components/post/CreatePostForm"
import { communityService } from "@/lib/services/community.service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"

interface SubmitPageProps {
  params: Promise<{
    communitySlug: string
  }>
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  const resolvedParams = await params
  const community = await communityService.getBySlug(resolvedParams.communitySlug)

  if (!community) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-border pb-5">
        <h3 className="text-lg font-medium leading-6 text-foreground">
          Create a post in <span className="font-bold font-serif">{community.name}</span>
        </h3>
      </div>
      <CreatePostForm communityId={community.id} communitySlug={community.slug} />
    </div>
  )
}
