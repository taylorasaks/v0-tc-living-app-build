# AdventureQuest (Prototype)

AdventureQuest is a patient-facing quest app that reinforces real-world habits between therapy sessions using photo proof and guided journaling. A therapist dashboard provides visibility into engagement patterns and progress.

## Demo
- YouTube Demo: https://youtu.be/lyKYuuccy1M

## Tech
- Next.js + TypeScript
- pnpm
- v0-generated UI components

## Phase 1 (Current Scope)
### Patient app
- Daily quests
- Photo completion (proof)
- Journal prompt + entries
- Companion / fuel feedback (prototype)

### Therapist dashboard
- Client engagement overview
- Recent submissions
- Streak/inactivity indicators
- Therapist notes (prototype)

## Phase 2 MVP plan (proposed)
1. **Data + identity foundation**
   - Add local SQLite-backed persistence.
   - Add `users`, `sessions`, and `journal_entries` tables.
   - Add password hashing and cookie-based sessions.
2. **Account flows**
   - Implement register/login/logout endpoints.
   - Support role selection (`patient` or `therapist`) during registration.
   - Gate patient journal routes behind auth.
3. **Patient journaling as first persisted feature**
   - Build authenticated journal page.
   - Save entries to DB and list recent entries.
4. **Quest completion with photo upload**
   - Create `quest_submissions` table and storage metadata.
   - Add upload endpoint (signed URL or multipart).
   - Attach photo proof + optional note to a quest completion event.
5. **Therapist visibility + RBAC**
   - Add therapist-patient relationship table.
   - Add therapist-only endpoints for viewing assigned patient progress.
6. **Security + reliability hardening**
   - Add CSRF guard for mutable routes.
   - Add request validation + rate limits for auth endpoints.
   - Add audit/event log table for key actions.

## Phase 2 status: first slice implemented
- Auth API (`/api/auth/register`, `/api/auth/login`, `/api/auth/logout`)
- Basic DB schema and file-backed SQLite database (`data/app.db`)
- Authenticated journal API (`/api/journal`) and `/journal` UI for saving entries
- Basic `/login` + `/register` pages

## Run locally
```bash
pnpm install
pnpm dev
```

## Notes

This repository is an early-stage prototype intended for testing and feedback.

It is not production-ready and does not yet include HIPAA-compliant infrastructure.
