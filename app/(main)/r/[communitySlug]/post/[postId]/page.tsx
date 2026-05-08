import { postService } from "@/lib/services/post.service"
import { notFound } from "next/navigation"
import { PostCard } from "@/components/post/PostCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface PostDetailPageProps {
  params: {
    communitySlug: string
    postId: string
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await postService.getById(params.postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PostCard post={post as any} />

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">
          Comments ({post.comments.length})
        </h3>

        {/* Comment Input Placeholder */}
        <div className="mb-8">
          <textarea
            placeholder="What are your thoughts?"
            className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm">Comment</Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {post.comments.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No comments yet.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-gray-900">u/{comment.author.username}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
