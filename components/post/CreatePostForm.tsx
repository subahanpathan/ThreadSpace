"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  communityId: string
  communitySlug: string
}

export function CreatePostForm({ communityId, communitySlug }: CreatePostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"text" | "image" | "link">("text")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      type: "text",
      communityId: communityId,
    },
  })

  const onSubmit = async (data: CreatePostInput) => {
    setIsLoading(true)
    try {
      const result = await actionCreatePost(data)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Post created successfully!")
        router.push(`/r/${communitySlug}/post/${result.data?.id}`)
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
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
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-all",
              activeTab === tab.id
                ? "border-orange-500 text-orange-600 bg-orange-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
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
              className="w-full min-h-[150px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
            />
          </div>
        )}

        {activeTab === "image" && (
          <div>
            <Input
              {...register("imageUrl")}
              placeholder="Image URL"
              error={errors.imageUrl?.message}
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
