import { postService } from "@/lib/services/post.service"
import { notFound } from "next/navigation"
import { PostCard } from "@/components/post/PostCard"
import { CommentForm } from "@/components/comment/CommentForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface PostDetailPageProps {
  params: {
    communitySlug: string
    postId: string
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const session = await getServerSession(authOptions)
  const post = await postService.getById(params.postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PostCard post={post as any} />

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="mb-6">
          {session ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Comment as <span className="text-orange-600 font-bold">u/{session.user.username}</span>
              </p>
              <CommentForm postId={post.id} />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">Log in or sign up to leave a comment</p>
              <div className="flex gap-2">
                <Link href="/sign-in" className="text-sm font-bold text-orange-600 hover:underline">Log In</Link>
                <Link href="/sign-up" className="text-sm font-bold text-orange-600 hover:underline">Sign Up</Link>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 border-t pt-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Comments ({post.comments.length})
          </h3>
          
          {post.comments.length === 0 ? (
            <p className="text-gray-500 text-sm italic py-4 text-center">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="space-y-8">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 group">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-orange-600 text-xs">
                    u/
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-gray-900">u/{comment.author.username}</span>
                      <span className="text-gray-200">•</span>
                      <span className="text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
