import { CreatePostForm } from "@/components/post/CreatePostForm"
import { communityService } from "@/lib/services/community.service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"

interface SubmitPageProps {
  params: {
    communitySlug: string
  }
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  const community = await communityService.getBySlug(params.communitySlug)

  if (!community) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create a post in <span className="font-bold font-serif">r/{community.name}</span>
        </h3>
      </div>
      <CreatePostForm communityId={community.id} communitySlug={community.slug} />
    </div>
  )
}
