"use client"

import { Vote } from "@prisma/client"
import { ArrowBigUp, ArrowBigDown } from "lucide-react"

interface VoteButtonsProps {
  postId: string
  votes: Vote[]
}

export function VoteButtons({ postId, votes }: VoteButtonsProps) {
  const count = votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1
    if (vote.type === "DOWN") return acc - 1
    return acc
  }, 0)

  return (
    <div className="flex flex-col items-center gap-1">
      <button className="hover:bg-gray-200 p-1 rounded transition-colors text-gray-400 hover:text-orange-600">
        <ArrowBigUp className="h-6 w-6" />
      </button>
      <span className="text-sm font-bold">{count}</span>
      <button className="hover:bg-gray-200 p-1 rounded transition-colors text-gray-400 hover:text-blue-600">
        <ArrowBigDown className="h-6 w-6" />
      </button>
    </div>
  )
}
