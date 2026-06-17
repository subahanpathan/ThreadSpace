"use client"

import Link from "next/link"
import { ImageIcon, Link2, Type } from "lucide-react"
import { useSession } from "next-auth/react"

interface CreatePostBoxProps {
  defaultCommunitySlug?: string
}

export function CreatePostBox({ defaultCommunitySlug }: CreatePostBoxProps) {
  const { data: session } = useSession()

  const postHref = defaultCommunitySlug
    ? `/r/${defaultCommunitySlug}/submit`
    : "/submit"

  if (!session) {
    return (
      <div className="bg-background rounded-2xl border border-border p-4 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0" />
        <Link href="/sign-in" className="flex-1">
          <input
            readOnly
            placeholder="Log in to create a post"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm cursor-pointer hover:bg-muted hover:border-primary/50 transition-all focus:outline-none text-muted-foreground"
          />
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-2xl border border-border p-4 flex items-center gap-3 shadow-sm">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex-shrink-0 flex items-center justify-center font-bold text-primary text-sm">
        {session.user.username?.[0]?.toUpperCase() ?? "?"}
      </div>

      {/* Input area */}
      <Link href={postHref} className="flex-1">
        <input
          readOnly
          placeholder="Create a post"
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm cursor-pointer hover:bg-muted hover:border-primary/50 transition-all focus:outline-none text-foreground"
        />
      </Link>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <Link href={`${postHref}?type=image`}>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors" title="Image post">
            <ImageIcon className="h-5 w-5" />
          </button>
        </Link>
        <Link href={`${postHref}?type=link`}>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors" title="Link post">
            <Link2 className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  )
}
