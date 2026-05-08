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
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors shadow-sm overflow-hidden flex">
      {/* Vote Sidebar */}
      <div className="w-12 bg-gray-50 p-2 flex flex-col items-center">
        <VoteButtons postId={post.id} votes={post.votes} />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href={`/r/${post.community.slug}`} className="font-bold text-gray-900 hover:underline">
            r/{post.community.slug}
          </Link>
          <span>•</span>
          <span>Posted by u/{post.author.username}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>

        <Link href={`/r/${post.community.slug}/post/${post.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-snug">{post.title}</h3>
        </Link>

        <div className="text-sm text-gray-700">
          {post.type === "text" && post.content && (
            <p className="line-clamp-3 text-gray-600">{post.content}</p>
          )}
          {post.type === "image" && post.imageUrl && (
            <div className="relative aspect-video w-full mt-2 rounded-md overflow-hidden bg-gray-100">
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
              className="flex items-center gap-2 text-blue-600 hover:underline mt-1 bg-blue-50/50 p-2 rounded-md"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="truncate">{post.linkUrl}</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Link
            href={`/r/${post.community.slug}/post/${post.id}`}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            {post.comments?.length || 0} Comments
          </Link>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
