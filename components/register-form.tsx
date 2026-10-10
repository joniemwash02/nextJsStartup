
"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!name) {
      toast.error("Name is required")
      return
    }

    if (!email) {
      toast.error("Email is required")
      return
    }

    if (!password) {
      toast.error("Password is required")
      return
    }

    const { data, error } = await authClient.signUp.email({
        name,
        email, // user email address
        password, // user password -> min 8 characters by default
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onResponse: (ctx) => {
            //hide loading
        },
       
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
         onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
});

  

  
  }

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          autoComplete="name"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          minLength={8}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Register"}
      </button>
    </form>
  )
}
