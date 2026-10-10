
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <p className="text-destructive">
        Unauthorized
      </p>
    )
  }

  return (
    <div className="container mx-auto max-w-screen-lg space-y-8 px-8 py-16">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>
      </div>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  )
}

export default Page
