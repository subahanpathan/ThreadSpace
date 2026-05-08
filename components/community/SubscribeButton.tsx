"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { actionToggleSubscription } from "@/actions/subscription.actions"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface SubscribeButtonProps {
  communityId: string
  initialIsSubscribed: boolean
}

export function SubscribeButton({ communityId, initialIsSubscribed }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed)
  const router = useRouter()

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      const result = await actionToggleSubscription(communityId)
      if (result.error) {
        toast.error(result.error)
      } else {
        setIsSubscribed(!!result.isSubscribed)
        toast.success(result.isSubscribed ? "Subscribed!" : "Unsubscribed")
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isSubscribed ? "outline" : "default"}
      className="px-8"
      isLoading={isLoading}
      onClick={handleToggle}
    >
      {isSubscribed ? "Joined" : "Join"}
    </Button>
  )
}
