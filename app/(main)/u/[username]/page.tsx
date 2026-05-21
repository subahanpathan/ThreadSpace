import { userService } from "@/lib/services/user.service"
import { postService } from "@/lib/services/post.service"
import { PostFeed } from "@/components/post/PostFeed"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

interface UserProfilePageProps {
  params: {
    username: string
  }
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const user = await userService.findByUsername(params.username)
  
  if (!user) {
    notFound()
  }

  const posts = await postService.getByAuthor(user.id)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="h-24 bg-orange-600" />
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-4">
            <div className="relative h-24 w-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {user.image ? (
                <Image src={user.image} alt={user.username} fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-gray-400">
                  {user.username[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">u/{user.username}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Joined {format(new Date(user.createdAt), "MMMM d, yyyy")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 px-1">
          Posts by u/{user.username}
        </h3>
        <PostFeed posts={posts as any} />
      </div>
    </div>
  )
}
