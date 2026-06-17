"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { SignUpSchema, SignUpInput } from "@/lib/validations/auth.schema"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { actionSignUp } from "@/actions/user.actions"
import Link from "next/link"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true)
    try {
      const result = await actionSignUp(data)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Account created! Please sign in.")
        router.push("/sign-in")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-background rounded-xl shadow-lg border border-border">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Join ThreadSpace</h2>
        <p className="mt-2 text-sm text-muted-foreground">Start sharing and engaging today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Username</label>
            <Input
              {...register("username")}
              placeholder="johndoe"
              error={errors.username?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              error={errors.email?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm mt-6">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
          Sign In
        </Link>
      </div>
    </div>
  )
}
