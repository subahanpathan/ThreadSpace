"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { CreateCommunitySchema, CreateCommunityInput } from "@/lib/validations/community.schema"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { actionCreateCommunity } from "@/actions/community.actions"

export function CreateCommunityForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommunityInput>({
    resolver: zodResolver(CreateCommunitySchema),
  })

  const onSubmit = async (data: CreateCommunityInput) => {
    setIsLoading(true)
    try {
      const result = await actionCreateCommunity(data)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Community created successfully!")
        router.push(`/r/${result.data?.slug}`)
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h1 className="text-xl font-semibold mb-6">Create a Community</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">r/</span>
            <Input
              {...register("name")}
              className="pl-7"
              placeholder="community_name"
              error={errors.name?.message}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            {...register("description")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            placeholder="Tell us about your community..."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Community
          </Button>
        </div>
      </form>
    </div>
  )
}
