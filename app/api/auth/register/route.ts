import { NextResponse } from "next/server"
import { createSession, hashPassword, setSessionCookie } from "@/lib/auth"
import { createUser, findUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  const body = await request.json()
  const email = String(body.email ?? "").trim().toLowerCase()
  const password = String(body.password ?? "")
  const role = body.role === "therapist" ? "therapist" : "patient"
  const displayName = String(body.displayName ?? "").trim() || null

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 })
  }

  const existing = findUserByEmail(email)
  if (existing) {
    return NextResponse.json({ error: "Account already exists." }, { status: 409 })
  }

  const passwordHash = hashPassword(password)
  const userId = createUser({ email, passwordHash, role, displayName })

  const session = createSession(userId)
  await setSessionCookie(session.id, session.expiresAt)

  return NextResponse.json({ ok: true, user: { id: userId, email, role, displayName } }, { status: 201 })
}
