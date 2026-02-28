import crypto from "node:crypto"
import { cookies } from "next/headers"
import { createSession as insertSession, deleteSession, findUserBySession } from "@/lib/db"

const SESSION_COOKIE = "aq_session"
const SESSION_DAYS = 14

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string) {
  const [salt, originalHash] = stored.split(":")
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"))
}

export function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()
  const id = insertSession(userId, expiresAt)

  return { id, expiresAt }
}

export async function setSessionCookie(sessionId: string, expiresAt: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, sessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (sessionId) {
    deleteSession(sessionId)
  }
  cookieStore.delete(SESSION_COOKIE)
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value

  if (!sessionId) {
    return null
  }

  const now = new Date().toISOString()
  const row = findUserBySession(sessionId, now)

  if (!row) {
    cookieStore.delete(SESSION_COOKIE)
    return null
  }

  return row
}

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("UNAUTHORIZED")
  }

  return user
}
