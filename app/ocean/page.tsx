"use client"

import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"

/* ---------- Ocean scenery SVGs ---------- */
function OceanCharacter() {
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 drop-shadow-lg" aria-label="Friendly sea turtle guide">
      {/* Shell */}
      <ellipse cx="60" cy="68" rx="34" ry="26" fill="#2E8B57" />
      <ellipse cx="60" cy="66" rx="28" ry="20" fill="#3CB371" />
      {/* Shell pattern */}
      <path d="M48 56 L60 48 L72 56" fill="none" stroke="#228B22" strokeWidth="2" />
      <path d="M44 66 L60 56 L76 66" fill="none" stroke="#228B22" strokeWidth="2" />
      <path d="M48 76 L60 66 L72 76" fill="none" stroke="#228B22" strokeWidth="2" />
      {/* Head */}
      <circle cx="60" cy="38" r="16" fill="#66CDAA" />
      {/* Eyes */}
      <circle cx="53" cy="35" r="4" fill="white" />
      <circle cx="67" cy="35" r="4" fill="white" />
      <circle cx="54" cy="35" r="2.5" fill="#1a3a4a" />
      <circle cx="68" cy="35" r="2.5" fill="#1a3a4a" />
      <circle cx="55" cy="34" r="1" fill="white" />
      <circle cx="69" cy="34" r="1" fill="white" />
      {/* Smile */}
      <path d="M54 42 Q60 48 66 42" fill="none" stroke="#1a3a4a" strokeWidth="2" strokeLinecap="round" />
      {/* Flippers */}
      <ellipse cx="28" cy="62" rx="12" ry="6" fill="#66CDAA" transform="rotate(-30 28 62)" />
      <ellipse cx="92" cy="62" rx="12" ry="6" fill="#66CDAA" transform="rotate(30 92 62)" />
      {/* Back flippers */}
      <ellipse cx="38" cy="90" rx="8" ry="5" fill="#66CDAA" transform="rotate(20 38 90)" />
      <ellipse cx="82" cy="90" rx="8" ry="5" fill="#66CDAA" transform="rotate(-20 82 90)" />
    </svg>
  )
}

function OceanScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Bubbles */}
      <svg viewBox="0 0 50 200" className="absolute right-6 top-[10%] h-48 w-12 animate-pulse opacity-30">
        <circle cx="20" cy="30" r="6" fill="white" opacity="0.5" />
        <circle cx="30" cy="60" r="4" fill="white" opacity="0.4" />
        <circle cx="15" cy="90" r="8" fill="white" opacity="0.3" />
        <circle cx="35" cy="130" r="5" fill="white" opacity="0.35" />
        <circle cx="22" cy="170" r="7" fill="white" opacity="0.25" />
      </svg>
      <svg viewBox="0 0 50 200" className="absolute left-4 top-[30%] h-40 w-10 opacity-25">
        <circle cx="25" cy="40" r="5" fill="white" opacity="0.4" />
        <circle cx="15" cy="80" r="7" fill="white" opacity="0.3" />
        <circle cx="30" cy="140" r="4" fill="white" opacity="0.35" />
      </svg>
      {/* Coral left */}
      <svg viewBox="0 0 100 120" className="absolute -left-2 bottom-[15%] h-28 w-24 opacity-35">
        <path d="M20 120 Q20 80 35 60 Q30 40 40 20" fill="none" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" />
        <path d="M30 120 Q40 70 55 50 Q50 30 60 10" fill="none" stroke="#FF8E8E" strokeWidth="5" strokeLinecap="round" />
        <circle cx="40" cy="18" r="6" fill="#FF6B6B" opacity="0.6" />
        <circle cx="60" cy="8" r="5" fill="#FF8E8E" opacity="0.5" />
      </svg>
      {/* Coral right */}
      <svg viewBox="0 0 100 120" className="absolute -right-2 bottom-[30%] h-24 w-22 opacity-30">
        <path d="M80 120 Q70 80 60 60 Q65 30 50 10" fill="none" stroke="#FFB347" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 120 Q60 75 50 55 Q55 25 45 5" fill="none" stroke="#FFA07A" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {/* Clownfish */}
      <svg viewBox="0 0 60 40" className="absolute right-8 top-[50%] h-10 w-14 opacity-35">
        <ellipse cx="30" cy="20" rx="22" ry="13" fill="#FF6347" />
        <rect x="18" y="8" width="4" height="24" rx="2" fill="white" opacity="0.7" />
        <rect x="30" y="10" width="4" height="20" rx="2" fill="white" opacity="0.7" />
        <circle cx="40" cy="17" r="3" fill="white" />
        <circle cx="41" cy="17" r="1.5" fill="#1a3a4a" />
        {/* Tail */}
        <path d="M8 14 Q2 20 8 26" fill="#FF6347" stroke="#FF6347" strokeWidth="2" />
      </svg>
      {/* Jellyfish */}
      <svg viewBox="0 0 50 70" className="absolute left-6 top-[65%] h-16 w-12 opacity-25">
        <ellipse cx="25" cy="22" rx="18" ry="16" fill="#DDA0DD" opacity="0.7" />
        <path d="M10 30 Q12 50 14 60" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.6" />
        <path d="M18 32 Q20 55 22 65" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.5" />
        <path d="M28 32 Q30 55 32 65" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.5" />
        <path d="M36 30 Q38 50 40 60" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.6" />
      </svg>
    </div>
  )
}

const oceanTheme: AdventureTheme = {
  name: "Ocean",
  tagline: "Dive into the deep blue",
  bgImage: "/images/ocean-bg.jpg",
  overlayFrom: "rgba(0,100,180,0.5)",
  overlayVia: "rgba(0,80,150,0.4)",
  overlayTo: "rgba(0,60,120,0.6)",
  primaryColor: "#1E90FF",
  primaryHover: "#1878D6",
  primaryRing: "#1E90FF55",
  textDark: "#0A2E4D",
  textMid: "#2A6496",
  pathStroke: "#7EC8E3",
  pathDash: "#1E90FF",
  topBarBg: "rgba(180,225,255,0.7)",
  fuelTrack: "#A0D4EE",
  freezeBg: "rgba(200,235,255,0.8)",
  cardBg: "#E8F4FF",
  tabActiveBg: "#1E90FF",
  tabInactiveBg: "#a0a0a0",
  currentNodeColor: "#FF6B6B",
  completedNodeColor: "#1E90FF",
  lockedNodeColor: "#A0C4DA",
  character: <OceanCharacter />,
  sceneryElements: <OceanScenery />,
}

export default function OceanPage() {
  return <AdventureMap theme={oceanTheme} />
}
