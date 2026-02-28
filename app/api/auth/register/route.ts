export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { hashPassword, createSession, setSessionCookie } from "@/lib/auth"
import { findUserByEmail, createUser } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password, role, displayName } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const validRoles = ["patient", "therapist"] as const
    const userRole = validRoles.includes(role) ? role : "patient"

    const existing = findUserByEmail(email)

    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const passwordHash = hashPassword(password)
    const userId = createUser({
      email,
      passwordHash,
      role: userRole,
      displayName: displayName || null,
    })

    const session = createSession(userId)
    await setSessionCookie(session.id, session.expiresAt)

    return NextResponse.json({
      ok: true,
      user: {
        id: userId,
        email,
        role: userRole,
        displayName: displayName || null,
      },
    })
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
