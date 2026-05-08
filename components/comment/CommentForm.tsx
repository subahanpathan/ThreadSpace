"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { CreateCommentSchema, CreateCommentInput } from "@/lib/validations/comment.schema"
import { Button } from "@/components/ui/Button"
import { actionCreateComment } from "@/actions/comment.actions"
import { useRouter } from "next/navigation"

interface CommentFormProps {
  postId: string
}

export function CommentForm({ postId }: CommentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCommentInput>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      postId,
    },
  })

  const onSubmit = async (data: CreateCommentInput) => {
    setIsLoading(true)
    try {
      const result = await actionCreateComment(data)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Comment posted!")
        reset()
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <textarea
          {...register("content")}
          placeholder="What are your thoughts?"
          className="w-full min-h-[120px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none bg-gray-50/50 hover:bg-white transition-all shadow-inner"
        />
        {errors.content && (
          <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading} size="sm" className="px-6">
          Comment
        </Button>
      </div>
    </form>
  )
}
