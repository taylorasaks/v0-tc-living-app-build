export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { verifyPassword, createSession, setSessionCookie } from "@/lib/auth"
import { findUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = findUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const valid = verifyPassword(password, user.password_hash)

    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const session = createSession(user.id)
    await setSessionCookie(session.id, session.expiresAt)

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName: user.display_name,
      },
    })
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
