"use client"

import { FormEvent, useEffect, useState } from "react"

type Entry = {
  id: string
  prompt: string
  content: string
  mood: string | null
  created_at: string
}

export function JournalForm() {
  const [prompt, setPrompt] = useState("What are you excited for today?")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [entries, setEntries] = useState<Entry[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function loadEntries() {
    const response = await fetch("/api/journal", { cache: "no-store" })
    if (!response.ok) return
    const data = await response.json()
    setEntries(data.entries ?? [])
  }

  useEffect(() => {
    loadEntries()
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const response = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, content, mood }),
    })

    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage(data.error ?? "Could not save journal entry")
      return
    }

    setContent("")
    setMood("")
    setMessage("Saved!")
    await loadEntries()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-4">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Prompt"
        />

        <textarea
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-28 w-full rounded border px-3 py-2"
          placeholder="Write your entry"
        />

        <input
          value={mood}
          onChange={(event) => setMood(event.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Mood (optional)"
        />

        <button disabled={loading} className="rounded bg-black px-4 py-2 text-white disabled:opacity-50">
          {loading ? "Saving..." : "Save journal entry"}
        </button>

        {message ? <p className="text-sm text-zinc-700">{message}</p> : null}
      </form>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Recent entries</h2>
        {entries.length === 0 ? <p className="text-sm text-zinc-500">No entries yet.</p> : null}
        {entries.map((entry) => (
          <article key={entry.id} className="rounded border p-3">
            <p className="text-xs text-zinc-500">{new Date(entry.created_at).toLocaleString()}</p>
            <p className="font-medium">{entry.prompt}</p>
            <p>{entry.content}</p>
            {entry.mood ? <p className="text-sm text-zinc-600">Mood: {entry.mood}</p> : null}
          </article>
        ))}
      </section>
    </div>
  )
}
