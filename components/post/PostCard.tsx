import Link from "next/link"
import { PostWithAuthor } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Share2, ExternalLink } from "lucide-react"
import { VoteButtons } from "@/components/vote/VoteButtons"
import Image from "next/image"

interface PostCardProps {
  post: PostWithAuthor
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-background rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden flex group">
      {/* Vote Sidebar */}
      <div className="w-12 bg-secondary/30 p-2 flex flex-col items-center border-r border-border/50">
        <VoteButtons postId={post.id} votes={post.votes} />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-3 sm:p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href={`/r/${post.community.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
            r/{post.community.slug}
          </Link>
          <span className="text-muted-foreground/50">•</span>
          <span>Posted by u/{post.author.username}</span>
          <span className="text-muted-foreground/50">•</span>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>

        <Link href={`/r/${post.community.slug}/post/${post.id}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-snug">{post.title}</h3>
        </Link>

        <div className="text-sm text-foreground/80">
          {post.type === "text" && post.content && (
            <p className="line-clamp-3 leading-relaxed">{post.content}</p>
          )}
          {post.type === "image" && post.imageUrl && (
            <div className="relative aspect-video w-full mt-3 rounded-xl overflow-hidden bg-secondary">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          {post.type === "link" && post.linkUrl && (
            <a
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline mt-2 bg-primary/10 p-3 rounded-xl transition-colors hover:bg-primary/20"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="truncate font-medium">{post.linkUrl}</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-4 pt-3">
          <Link
            href={`/r/${post.community.slug}/post/${post.id}`}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:bg-secondary px-3 py-1.5 rounded-lg transition-all hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            {(post._count?.comments ?? post.comments?.length) || 0} Comments
          </Link>
          <button className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:bg-secondary px-3 py-1.5 rounded-lg transition-all hover:text-foreground">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
