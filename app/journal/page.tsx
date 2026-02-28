import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { JournalForm } from "./journal-form"

export default async function JournalPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 px-6 py-8">
      <h1 className="text-3xl font-semibold">Journal check-in</h1>
      <p className="text-sm text-zinc-600">
        Signed in as {user.email} ({user.role})
      </p>
      <JournalForm />
    </main>
  )
}
