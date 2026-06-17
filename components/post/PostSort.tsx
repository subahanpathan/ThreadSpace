"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Clock, TrendingUp } from "lucide-react"

export function PostSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const sort = searchParams.get("sort") || "latest"

  const handleSort = (newSort: "latest" | "popular") => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", newSort)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 bg-background p-2 rounded-lg border border-border shadow-sm mb-4">
      <Button
        variant={sort === "latest" ? "default" : "ghost"}
        size="sm"
        onClick={() => handleSort("latest")}
        className="flex items-center gap-2"
      >
        <Clock className="w-4 h-4" />
        New
      </Button>
      <Button
        variant={sort === "popular" ? "default" : "ghost"}
        size="sm"
        onClick={() => handleSort("popular")}
        className="flex items-center gap-2"
      >
        <TrendingUp className="w-4 h-4" />
        Hot
      </Button>
    </div>
  )
}
