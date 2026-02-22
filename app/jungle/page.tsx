"use client"

import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"

/* ---------- Jungle scenery SVGs ---------- */
function JungleCharacter() {
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 drop-shadow-lg" aria-label="Friendly jungle monkey guide">
      {/* Body */}
      <ellipse cx="60" cy="82" rx="22" ry="18" fill="#8B5E3C" />
      {/* Belly */}
      <ellipse cx="60" cy="84" rx="14" ry="12" fill="#D2A679" />
      {/* Head */}
      <circle cx="60" cy="46" r="22" fill="#8B5E3C" />
      {/* Face patch */}
      <circle cx="60" cy="50" r="16" fill="#D2A679" />
      {/* Ears */}
      <circle cx="36" cy="40" r="8" fill="#8B5E3C" />
      <circle cx="36" cy="40" r="5" fill="#D2A679" />
      <circle cx="84" cy="40" r="8" fill="#8B5E3C" />
      <circle cx="84" cy="40" r="5" fill="#D2A679" />
      {/* Eyes */}
      <circle cx="52" cy="46" r="4" fill="white" />
      <circle cx="68" cy="46" r="4" fill="white" />
      <circle cx="53" cy="46" r="2.5" fill="#2B1810" />
      <circle cx="69" cy="46" r="2.5" fill="#2B1810" />
      <circle cx="54" cy="45" r="1" fill="white" />
      <circle cx="70" cy="45" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="53" rx="3" ry="2" fill="#6B3F22" />
      {/* Big smile */}
      <path d="M52 58 Q60 66 68 58" fill="none" stroke="#6B3F22" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <path d="M38 78 Q20 70 16 55" fill="none" stroke="#8B5E3C" strokeWidth="8" strokeLinecap="round" />
      <path d="M82 78 Q100 70 104 55" fill="none" stroke="#8B5E3C" strokeWidth="8" strokeLinecap="round" />
      {/* Tail */}
      <path d="M78 95 Q100 90 105 70 Q108 55 100 50" fill="none" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

function JungleScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Hanging vine left */}
      <svg viewBox="0 0 60 300" className="absolute -left-1 top-0 h-72 w-14 opacity-40">
        <path d="M30 0 Q20 60 35 120 Q15 180 30 240 Q20 270 25 300" fill="none" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="22" cy="80" rx="10" ry="5" fill="#3A9E4A" transform="rotate(-30 22 80)" />
        <ellipse cx="38" cy="140" rx="10" ry="5" fill="#3A9E4A" transform="rotate(20 38 140)" />
        <ellipse cx="20" cy="210" rx="10" ry="5" fill="#4AAE5A" transform="rotate(-25 20 210)" />
      </svg>
      {/* Hanging vine right */}
      <svg viewBox="0 0 60 280" className="absolute -right-1 top-[5%] h-64 w-14 opacity-35">
        <path d="M30 0 Q40 50 25 110 Q45 170 30 230 Q40 260 35 280" fill="none" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="38" cy="70" rx="10" ry="5" fill="#3A9E4A" transform="rotate(25 38 70)" />
        <ellipse cx="22" cy="150" rx="10" ry="5" fill="#4AAE5A" transform="rotate(-20 22 150)" />
      </svg>
      {/* Tropical leaves top-left */}
      <svg viewBox="0 0 120 80" className="absolute -left-4 top-[20%] h-20 w-28 opacity-30">
        <path d="M10 70 Q30 30 60 10 Q40 40 50 70Z" fill="#2D8B3A" />
        <path d="M20 70 Q50 20 90 5 Q60 35 70 70Z" fill="#3AA04A" />
        <path d="M60 10 Q60 40 50 70" fill="none" stroke="#1D6B2A" strokeWidth="1.5" />
      </svg>
      {/* Tropical leaves top-right */}
      <svg viewBox="0 0 120 80" className="absolute -right-4 top-[35%] h-18 w-26 opacity-25">
        <path d="M110 70 Q90 30 60 10 Q80 40 70 70Z" fill="#2D8B3A" />
        <path d="M100 70 Q70 20 30 5 Q60 35 50 70Z" fill="#3AA04A" />
      </svg>
      {/* Toucan */}
      <svg viewBox="0 0 80 80" className="absolute right-4 top-[55%] h-18 w-18 opacity-30">
        {/* Body */}
        <ellipse cx="40" cy="50" rx="16" ry="20" fill="#1a1a1a" />
        {/* Head */}
        <circle cx="40" cy="28" r="14" fill="#1a1a1a" />
        {/* White chest */}
        <ellipse cx="40" cy="55" rx="10" ry="12" fill="#FFFDE7" />
        {/* Beak */}
        <path d="M54 26 Q72 28 70 34 Q68 38 54 32Z" fill="#FF6B00" />
        <path d="M54 28 Q68 30 66 33" fill="none" stroke="#FFD600" strokeWidth="2" />
        {/* Eye */}
        <circle cx="48" cy="24" r="3" fill="white" />
        <circle cx="49" cy="24" r="1.5" fill="#1a1a1a" />
      </svg>
      {/* Frog */}
      <svg viewBox="0 0 60 50" className="absolute left-8 top-[72%] h-12 w-14 opacity-25">
        <ellipse cx="30" cy="34" rx="20" ry="14" fill="#32CD32" />
        {/* Eyes on top */}
        <circle cx="20" cy="20" r="8" fill="#32CD32" />
        <circle cx="40" cy="20" r="8" fill="#32CD32" />
        <circle cx="20" cy="18" r="4" fill="white" />
        <circle cx="40" cy="18" r="4" fill="white" />
        <circle cx="21" cy="18" r="2" fill="#1a3a1a" />
        <circle cx="41" cy="18" r="2" fill="#1a3a1a" />
        {/* Mouth */}
        <path d="M20 38 Q30 44 40 38" fill="none" stroke="#1a6a1a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* Butterfly */}
      <svg viewBox="0 0 40 30" className="absolute right-12 top-[85%] h-8 w-10 opacity-30">
        <ellipse cx="20" cy="15" rx="2" ry="8" fill="#333" />
        <ellipse cx="12" cy="10" rx="8" ry="6" fill="#FF69B4" opacity="0.7" transform="rotate(-15 12 10)" />
        <ellipse cx="28" cy="10" rx="8" ry="6" fill="#FF69B4" opacity="0.7" transform="rotate(15 28 10)" />
        <ellipse cx="14" cy="20" rx="6" ry="5" fill="#FFB6C1" opacity="0.6" transform="rotate(-10 14 20)" />
        <ellipse cx="26" cy="20" rx="6" ry="5" fill="#FFB6C1" opacity="0.6" transform="rotate(10 26 20)" />
      </svg>
    </div>
  )
}

const jungleTheme: AdventureTheme = {
  name: "Jungle",
  tagline: "Swing through the canopy",
  bgImage: "/images/jungle-bg.jpg",
  overlayFrom: "rgba(20,80,30,0.5)",
  overlayVia: "rgba(30,100,40,0.4)",
  overlayTo: "rgba(15,70,25,0.6)",
  primaryColor: "#2E8B57",
  primaryHover: "#246D45",
  primaryRing: "#2E8B5755",
  textDark: "#0A3A1A",
  textMid: "#2D6A3A",
  pathStroke: "#7ECB8A",
  pathDash: "#2E8B57",
  topBarBg: "rgba(180,235,190,0.7)",
  fuelTrack: "#A0D8AA",
  freezeBg: "rgba(200,240,210,0.8)",
  cardBg: "#E8F8EC",
  tabActiveBg: "#2E8B57",
  tabInactiveBg: "#a0a0a0",
  currentNodeColor: "#FF6B6B",
  completedNodeColor: "#2E8B57",
  lockedNodeColor: "#A0C8A8",
  character: <JungleCharacter />,
  sceneryElements: <JungleScenery />,
}

export default function JunglePage() {
  return <AdventureMap theme={jungleTheme} />
}
