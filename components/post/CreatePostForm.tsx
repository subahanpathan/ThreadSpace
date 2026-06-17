"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { CreatePostSchema, CreatePostInput } from "@/lib/validations/post.schema"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { actionCreatePost } from "@/actions/post.actions"
import { cn } from "@/lib/utils"
import { FileText, Image as ImageIcon, Link as LinkIcon } from "lucide-react"

interface CreatePostFormProps {
  communityId?: string
  communitySlug?: string
  communities?: { id: string; name: string; slug: string }[]
}

export function CreatePostForm({ communityId, communitySlug, communities }: CreatePostFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = (searchParams?.get("type") as "text" | "image" | "link") || "text"

  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<"text" | "image" | "link">(defaultType)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      type: defaultType,
      communityId: communityId || "",
    },
  })

  const onSubmit = async (data: CreatePostInput) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      if (data.content) formData.append('content', data.content)
      formData.append('communityId', data.communityId)
      formData.append('type', data.type)
      if (data.linkUrl) formData.append('linkUrl', data.linkUrl)
      if (selectedFile) {
        formData.append('image', selectedFile)
      }
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (!response.ok) {
        toast.error(result.error || 'Failed to create post')
      } else {
        toast.success('Post created successfully!')
        const targetSlug = result.community?.slug || communitySlug
        router.push(`/r/${targetSlug}/post/${result.id}`)
        router.refresh()
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (tab: "text" | "image" | "link") => {
    setActiveTab(tab)
    setValue("type", tab)
  }

  const tabs = [
    { id: "text", label: "Post", icon: FileText },
    { id: "image", label: "Image", icon: ImageIcon },
    { id: "link", label: "Link", icon: LinkIcon },
  ]

  return (
    <div className="w-full bg-background rounded-lg border border-border overflow-hidden shadow-sm">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-all",
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/10"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        {!communityId && communities && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Choose a community</label>
            <select
              onChange={(e) => {
                setValue("communityId", e.target.value)
              }}
              defaultValue=""
              className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            >
              <option value="" disabled>Select a community...</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  r/{c.slug}
                </option>
              ))}
            </select>
            {errors.communityId?.message && (
              <p className="text-xs text-destructive">{errors.communityId.message}</p>
            )}
          </div>
        )}

        <div>
          <Input
            {...register("title")}
            placeholder="Title"
            className="text-lg font-semibold"
            error={errors.title?.message}
          />
        </div>

        {activeTab === "text" && (
          <div>
            <textarea
              {...register("content")}
              placeholder="Text (optional)"
              className="w-full min-h-[150px] rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y bg-background text-foreground"
            />
          </div>
        )}

        {activeTab === "image" && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
          </div>
        )}

        {activeTab === "link" && (
          <div>
            <Input
              {...register("linkUrl")}
              placeholder="Link URL"
              error={errors.linkUrl?.message}
            />
          </div>
        )}

        <div className="flex justify-end pt-2 border-t mt-4">
          <Button type="submit" isLoading={isLoading} className="px-8">
            Post
          </Button>
        </div>
      </form>
    </div>
  )
}
