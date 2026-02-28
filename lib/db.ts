import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const dataDir = path.join(process.cwd(), "data")
const dbPath = path.join(dataDir, "app.db")

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let initialized = false

function esc(value: string | null) {
  if (value === null) return "NULL"
  return `'${value.replaceAll("'", "''")}'`
}

function exec(sql: string) {
  return execFileSync("sqlite3", ["-cmd", ".timeout 5000", dbPath, sql], { stdio: "pipe" })
}

function run(sql: string) {
  ensureSchema()
  exec(sql)
}

function all<T>(sql: string) {
  ensureSchema()
  const out = execFileSync("sqlite3", ["-cmd", ".timeout 5000", "-json", dbPath, sql], { encoding: "utf8" })
  return out.trim() ? (JSON.parse(out) as T[]) : []
}

function ensureSchema() {
  if (initialized) return

  const schemaSql = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('patient', 'therapist')),
      display_name TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      expires_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS journal_entries (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      prompt TEXT NOT NULL,
      content TEXT NOT NULL,
      mood TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
    CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
  `

  let attempt = 0
  while (attempt < 3) {
    try {
      exec(schemaSql)
      initialized = true
      return
    } catch (error) {
      attempt += 1
      if (attempt >= 3) throw error
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100)
    }
  }
}

export type UserRecord = {
  id: string
  email: string
  password_hash: string
  role: "patient" | "therapist"
  display_name: string | null
}

export function findUserByEmail(email: string) {
  return all<UserRecord>(
    `SELECT id, email, password_hash, role, display_name FROM users WHERE email = ${esc(email)} LIMIT 1;`,
  )[0]
}

export function createUser(input: {
  email: string
  passwordHash: string
  role: "patient" | "therapist"
  displayName: string | null
}) {
  const id = crypto.randomUUID()
  run(
    `INSERT INTO users (id, email, password_hash, role, display_name) VALUES (${esc(id)}, ${esc(input.email)}, ${esc(input.passwordHash)}, ${esc(input.role)}, ${esc(input.displayName)});`,
  )
  return id
}

export function createSession(userId: string, expiresAt: string) {
  const id = crypto.randomUUID()
  run(`INSERT INTO sessions (id, user_id, expires_at) VALUES (${esc(id)}, ${esc(userId)}, ${esc(expiresAt)});`)
  return id
}

export function deleteSession(id: string) {
  run(`DELETE FROM sessions WHERE id = ${esc(id)};`)
}

export function findUserBySession(sessionId: string, nowIso: string) {
  return all<Pick<UserRecord, "id" | "email" | "role" | "display_name">>(
    `SELECT u.id, u.email, u.role, u.display_name
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = ${esc(sessionId)} AND s.expires_at > ${esc(nowIso)}
     LIMIT 1;`,
  )[0]
}

export function createJournalEntry(input: {
  userId: string
  prompt: string
  content: string
  mood: string | null
}) {
  const id = crypto.randomUUID()
  run(
    `INSERT INTO journal_entries (id, user_id, prompt, content, mood) VALUES (${esc(id)}, ${esc(input.userId)}, ${esc(input.prompt)}, ${esc(input.content)}, ${esc(input.mood)});`,
  )
  return id
}

export function listJournalEntries(userId: string) {
  return all<{ id: string; prompt: string; content: string; mood: string | null; created_at: string }>(
    `SELECT id, prompt, content, mood, created_at
     FROM journal_entries
     WHERE user_id = ${esc(userId)}
     ORDER BY created_at DESC
     LIMIT 20;`,
  )
}
