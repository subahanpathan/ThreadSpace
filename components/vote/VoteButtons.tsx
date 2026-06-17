"use client"

import { Vote } from "@prisma/client"
type VoteType = "UP" | "DOWN"
import { ArrowBigUp, ArrowBigDown } from "lucide-react"
import { actionVote } from "@/actions/vote.actions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"

interface VoteButtonsProps {
  postId: string
  votes: Vote[]
}

export function VoteButtons({ postId, votes }: VoteButtonsProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const userVote = votes.find((vote) => vote.userId === session?.user?.id)

  const count = votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1
    if (vote.type === "DOWN") return acc - 1
    return acc
  }, 0)

  const handleVote = async (type: VoteType) => {
    if (!session) {
      toast.error("You must be signed in to vote")
      router.push("/sign-in")
      return
    }

    try {
      const result = await actionVote({ postId, type })
      if (result.error) {
        toast.error(result.error)
      } else {
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => handleVote("UP")}
        className={cn(
          "hover:bg-secondary p-1 rounded transition-colors",
          userVote?.type === "UP" ? "text-orange-600 bg-orange-50 dark:bg-orange-950" : "text-muted-foreground hover:text-orange-600"
        )}
      >
        <ArrowBigUp className={cn("h-6 w-6", userVote?.type === "UP" && "fill-current")} />
      </button>
      <span className={cn(
        "text-sm font-bold",
        userVote?.type === "UP" ? "text-orange-600" : userVote?.type === "DOWN" ? "text-blue-600" : "text-foreground"
      )}>
        {count}
      </span>
      <button
        onClick={() => handleVote("DOWN")}
        className={cn(
          "hover:bg-secondary p-1 rounded transition-colors",
          userVote?.type === "DOWN" ? "text-blue-600 bg-blue-50 dark:bg-blue-950" : "text-muted-foreground hover:text-blue-600"
        )}
      >
        <ArrowBigDown className={cn("h-6 w-6", userVote?.type === "DOWN" && "fill-current")} />
      </button>
    </div>
  )
}
