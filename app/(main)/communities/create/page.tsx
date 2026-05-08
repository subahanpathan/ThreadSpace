import { CreateCommunityForm } from "@/components/community/CreateCommunityForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CreateCommunityPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Communities</h3>
      </div>
      <CreateCommunityForm />
    </div>
  )
}
