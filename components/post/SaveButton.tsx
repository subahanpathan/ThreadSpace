"use client"

import { Bookmark } from "lucide-react"
import { useState } from "react"
import { actionToggleSavePost } from "@/actions/post.actions"
import toast from "react-hot-toast"

interface SaveButtonProps {
  postId: string
  initialIsSaved: boolean
}

export function SaveButton({ postId, initialIsSaved }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    const previousState = isSaved
    setIsSaved(!isSaved) // Optimistic update

    try {
      const result = await actionToggleSavePost(postId)
      if (result.error) {
        setIsSaved(previousState) // Revert on error
        toast.error(result.error)
      } else if (result.saved !== undefined) {
        setIsSaved(result.saved)
      }
    } catch (error) {
      setIsSaved(previousState)
      toast.error("Failed to save post")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      onClick={handleSave}
      disabled={isLoading}
      className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
        isSaved 
          ? "text-primary bg-primary/10 hover:bg-primary/20" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
      {isSaved ? "Saved" : "Save"}
    </button>
  )
}
