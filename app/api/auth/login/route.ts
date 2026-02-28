import { NextResponse } from "next/server"
import { createSession, setSessionCookie, verifyPassword } from "@/lib/auth"
import { findUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  const body = await request.json()
  const email = String(body.email ?? "").trim().toLowerCase()
  const password = String(body.password ?? "")

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const user = findUserByEmail(email)

  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
  }

  const session = createSession(user.id)
  await setSessionCookie(session.id, session.expiresAt)

  return NextResponse.json({
    ok: true,
    user: { id: user.id, email, role: user.role, displayName: user.display_name },
  })
}
