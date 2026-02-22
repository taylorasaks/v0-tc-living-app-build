"use client"

import { useState } from "react"
import { Mic, Coins, MapPin, ChevronRight, Flame, Pause, Play } from "lucide-react"
import Link from "next/link"

const adventures = [
  {
    id: "jungle",
    name: "Jungle",
    tagline: "Swing through the canopy",
    href: "/jungle",
    bg: "from-[#0D3B1E] to-[#1A5C30]",
    border: "border-[#2E8B57]",
    iconBg: "bg-[#2E8B57]",
    textColor: "text-[#A8E6B0]",
    accent: "#2E8B57",
  },
  {
    id: "savannah",
    name: "Savannah",
    tagline: "Roam the golden plains",
    href: "/savannah",
    bg: "from-[#5A3200] to-[#8B6914]",
    border: "border-[#D4872C]",
    iconBg: "bg-[#D4872C]",
    textColor: "text-[#FFD699]",
    accent: "#D4872C",
  },
  {
    id: "ocean",
    name: "Ocean",
    tagline: "Dive into the deep blue",
    href: "/ocean",
    bg: "from-[#0A2E4D] to-[#1A5A8A]",
    border: "border-[#1E90FF]",
    iconBg: "bg-[#1E90FF]",
    textColor: "text-[#99D4FF]",
    accent: "#1E90FF",
  },
]

const activeAdventure = adventures[0]

function AdventureIcon({ id }: { id: string }) {
  if (id === "jungle") {
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
        <circle cx="24" cy="28" r="10" fill="#2E8B57" />
        <ellipse cx="24" cy="30" rx="6" ry="5" fill="#A8E6B0" />
        <circle cx="24" cy="18" r="9" fill="#2E8B57" />
        <circle cx="24" cy="20" rx="7" ry="5" fill="#A8E6B0" />
        <circle cx="20" cy="17" r="1.8" fill="#0D3B1E" />
        <circle cx="28" cy="17" r="1.8" fill="#0D3B1E" />
        <path d="M21 22 Q24 25 27 22" fill="none" stroke="#0D3B1E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 26 Q8 22 6 18" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 26 Q40 22 42 18" fill="none" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === "savannah") {
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
        <rect x="21" y="12" width="6" height="24" rx="3" fill="#E8B84B" />
        <circle cx="24" cy="10" r="7" fill="#E8B84B" />
        <circle cx="21" cy="8" r="1.5" fill="#3D2B1F" />
        <circle cx="27" cy="8" r="1.5" fill="#3D2B1F" />
        <rect x="22" y="4" width="2" height="4" fill="#C19A3B" />
        <rect x="25" y="5" width="2" height="3" fill="#C19A3B" />
        <circle cx="22" cy="20" r="2" fill="#C19A3B" />
        <circle cx="26" cy="26" r="2" fill="#C19A3B" />
        <rect x="17" y="36" width="4" height="10" rx="2" fill="#E8B84B" />
        <rect x="27" y="36" width="4" height="10" rx="2" fill="#E8B84B" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="14" ry="10" fill="#2E8B57" />
      <ellipse cx="24" cy="27" rx="10" ry="7" fill="#3CB371" />
      <circle cx="24" cy="16" r="8" fill="#66CDAA" />
      <circle cx="21" cy="14" r="2" fill="white" />
      <circle cx="27" cy="14" r="2" fill="white" />
      <circle cx="21.5" cy="14" r="1" fill="#0A2E4D" />
      <circle cx="27.5" cy="14" r="1" fill="#0A2E4D" />
      <path d="M22 19 Q24 21 26 19" fill="none" stroke="#0A2E4D" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="12" cy="25" rx="5" ry="3" fill="#66CDAA" transform="rotate(-30 12 25)" />
      <ellipse cx="36" cy="25" rx="5" ry="3" fill="#66CDAA" transform="rotate(30 36 25)" />
    </svg>
  )
}

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const coins = 240
  const streak = 5

  return (
    <div className="flex h-dvh flex-col bg-[#0C1B2A]">
      {/* Top Bar - Currency */}
      <header className="flex shrink-0 items-center justify-between px-5 pt-5 pb-2">
        <div className="flex items-center gap-2 rounded-full bg-[#1A2D42] px-4 py-2">
          <Coins className="h-5 w-5 text-[#FFD700]" />
          <span className="text-base font-bold text-[#FFD700]">{coins}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#1A2D42] px-4 py-2">
          <Flame className="h-5 w-5 text-[#FF6B35]" />
          <span className="text-base font-bold text-[#FF6B35]">{streak} day streak</span>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 pt-4 pb-6">
        {/* Greeting */}
        <section className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white text-balance">
            Welcome Back, Explorer
          </h1>
          <p className="mt-1 text-base text-[#8AA8C7]">
            {"What's on your mind today?"}
          </p>
        </section>

        {/* Journal Card */}
        <section className="rounded-3xl bg-[#13263A] p-6">
          <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">
            Today{"'"}s Journal
          </h2>
          <p className="mb-5 text-lg font-bold leading-relaxed text-white">
            What are you excited for today?
          </p>

          {/* Mic Button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
              onMouseLeave={() => setIsRecording(false)}
              onTouchStart={() => setIsRecording(true)}
              onTouchEnd={() => setIsRecording(false)}
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-all ${
                isRecording
                  ? "scale-110 bg-[#FF6B6B]"
                  : "bg-[#2E8B57] hover:bg-[#24734A]"
              }`}
              style={{
                boxShadow: isRecording
                  ? "0 0 0 8px rgba(255,107,107,0.25), 0 0 24px rgba(255,107,107,0.3)"
                  : "0 0 0 0 transparent, 0 4px 20px rgba(46,139,87,0.35)",
              }}
              aria-label="Hold to record"
            >
              {isRecording ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-white" />
              )}
            </button>
            <span className="text-sm font-semibold text-[#5A8AAF]">
              {isRecording ? "Recording..." : "Hold to record"}
            </span>
          </div>

          {/* Freeze / Pause info integrated into journal */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 rounded-full bg-[#1A2D42] px-3 py-1.5">
              <Pause className="h-3.5 w-3.5 text-[#6BC5E8]" />
              <span className="text-xs font-bold text-[#6BC5E8]">2 pauses left</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#1A2D42] px-3 py-1.5">
              <Play className="h-3.5 w-3.5 text-[#A8E6B0]" />
              <span className="text-xs font-bold text-[#A8E6B0]">Quest active</span>
            </div>
          </div>
        </section>

        {/* Active Adventure Summary */}
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">
            Current Adventure
          </h2>
          <Link
            href={activeAdventure.href}
            className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${activeAdventure.bg} border ${activeAdventure.border} p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${activeAdventure.iconBg}`}>
              <AdventureIcon id={activeAdventure.id} />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-lg font-extrabold text-white">{activeAdventure.name} Adventure</span>
              <span className={`text-sm ${activeAdventure.textColor}`}>{activeAdventure.tagline}</span>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/30">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "33%", backgroundColor: activeAdventure.accent }}
                  />
                </div>
                <span className="text-xs font-bold text-white/70">Step 2/6</span>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <MapPin className="h-4 w-4 text-white" />
            </div>
          </Link>
        </section>

        {/* Choose Adventure */}
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">
            All Adventures
          </h2>
          <div className="flex flex-col gap-3">
            {adventures.map((adv) => (
              <Link
                key={adv.id}
                href={adv.href}
                className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${adv.bg} border ${adv.border} p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${adv.iconBg}`}>
                  <AdventureIcon id={adv.id} />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-base font-bold text-white">{adv.name}</span>
                  <span className={`text-sm ${adv.textColor}`}>{adv.tagline}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
