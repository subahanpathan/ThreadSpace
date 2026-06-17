import { userService } from "@/lib/services/user.service"
import { postService } from "@/lib/services/post.service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PostFeed } from "@/components/post/PostFeed"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

interface UserProfilePageProps {
  params: Promise<{
    username: string
  }>
  searchParams: Promise<{ tab?: string }>
}

export default async function UserProfilePage({ params, searchParams }: UserProfilePageProps) {
  const session = await getServerSession(authOptions)
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const tab = resolvedSearchParams.tab || "posts"
  const user = await userService.findByUsername(resolvedParams.username)
  
  if (!user) {
    notFound()
  }

  const isOwnProfile = session?.user?.username === user.username

  let posts = []
  if (tab === "saved" && isOwnProfile) {
    posts = await postService.getSavedByAuthor(user.id)
  } else {
    posts = await postService.getByAuthor(user.id)
  }

  return (
    <div className="space-y-6">
      <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm">
        <div className="h-24 bg-gradient-to-r from-primary to-primary/70" />
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-4">
            <div className="relative h-24 w-24 rounded-full border-4 border-background bg-secondary overflow-hidden">
              {user.image ? (
                <Image src={user.image} alt={user.username} fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                  {user.username[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">{user.username}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {format(new Date(user.createdAt), "MMMM d, yyyy")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-2">
        <Link href={`/u/${user.username}?tab=posts`}>
          <Button variant={tab === "posts" ? "default" : "ghost"} size="sm">Posts</Button>
        </Link>
        {isOwnProfile && (
          <Link href={`/u/${user.username}?tab=saved`}>
            <Button variant={tab === "saved" ? "default" : "ghost"} size="sm">Saved</Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-secondary/30 rounded-lg border border-dashed border-border shadow-sm">
            <p className="text-muted-foreground text-lg">No {tab} found.</p>
          </div>
        ) : (
          <PostFeed posts={posts as any} />
        )}
      </div>
    </div>
  )
}
