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
    <div className="w-full max-w-2xl bg-background p-6 rounded-lg border border-border shadow-sm">
      <h1 className="text-xl font-semibold mb-6">Create a Community</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Name
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <Input
              {...register("name")}
              placeholder="community_name"
              error={errors.name?.message}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Description (Optional)
          </label>
          <textarea
            {...register("description")}
            className="w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
