import { NextResponse } from "next/server"
import { requireUser } from "@/lib/auth"
import { createJournalEntry, listJournalEntries } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const user = await requireUser()
    const body = await request.json()

    const prompt = String(body.prompt ?? "").trim() || "Daily check-in"
    const content = String(body.content ?? "").trim()
    const mood = body.mood ? String(body.mood).trim() : null

    if (!content) {
      return NextResponse.json({ error: "Journal content is required." }, { status: 400 })
    }

    const id = createJournalEntry({ userId: user.id, prompt, content, mood })

    return NextResponse.json({ ok: true, entry: { id, prompt, content, mood } }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function GET() {
  try {
    const user = await requireUser()
    const entries = listJournalEntries(user.id)

    return NextResponse.json({ ok: true, entries })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
