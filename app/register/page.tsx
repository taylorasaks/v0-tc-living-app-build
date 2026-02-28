"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function RegisterPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"patient" | "therapist">("patient")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, email, password, role }),
    })

    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setError(data.error ?? "Sign up failed")
      return
    }

    router.push("/journal")
    router.refresh()
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-4 px-6">
      <h1 className="text-3xl font-semibold">Create account</h1>
      <p className="text-sm text-zinc-600">Patient + therapist accounts are now supported.</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Display name (optional)"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="you@example.com"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="At least 8 characters"
        />

        <select
          value={role}
          onChange={(event) => setRole(event.target.value as "patient" | "therapist")}
          className="w-full rounded border px-3 py-2"
        >
          <option value="patient">Patient</option>
          <option value="therapist">Therapist</option>
        </select>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button disabled={loading} className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50">
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-zinc-600">
        Already have an account? <Link className="underline" href="/login">Log in</Link>
      </p>
    </main>
  )
}
