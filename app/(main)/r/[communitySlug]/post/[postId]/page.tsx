import { postService } from "@/lib/services/post.service"
import { notFound } from "next/navigation"
import { PostCard } from "@/components/post/PostCard"
import { CommentForm } from "@/components/comment/CommentForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface PostDetailPageProps {
  params: Promise<{
    communitySlug: string
    postId: string
  }>
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const session = await getServerSession(authOptions)
  const resolvedParams = await params
  const post = await postService.getById(resolvedParams.postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PostCard post={post as any} />

      <div className="bg-background rounded-lg border border-border p-6 shadow-sm">
        <div className="mb-6">
          {session ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Comment as <span className="text-primary font-bold">{session.user.username}</span>
              </p>
              <CommentForm postId={post.id} />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground font-medium">Log in or sign up to leave a comment</p>
              <div className="flex gap-2">
                <Link href="/sign-in" className="text-sm font-bold text-primary hover:underline">Log In</Link>
                <Link href="/sign-up" className="text-sm font-bold text-primary hover:underline">Sign Up</Link>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 border-t pt-6">
          <h3 className="font-bold text-foreground mb-4">
            Comments ({post.comments?.length ?? 0})
          </h3>
          
          {(!post.comments || post.comments.length === 0) ? (
            <p className="text-muted-foreground text-sm italic py-4 text-center">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="space-y-8">
              {post.comments?.map((comment: any) => (
                <div key={comment.id} className="flex gap-4 group">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-primary text-xs">
                    {comment.author.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-foreground">{comment.author.username}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="text-muted-foreground">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{comment.content}</p>
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
