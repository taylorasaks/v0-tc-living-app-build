"use client"

import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"

/* ---------- Savannah scenery SVGs ---------- */
function SavannahCharacter() {
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 drop-shadow-lg" aria-label="Savannah explorer with binoculars">
      {/* Body */}
      <circle cx="60" cy="80" r="28" fill="#F4A460" />
      {/* Head */}
      <circle cx="60" cy="42" r="22" fill="#FFDAB9" />
      {/* Safari hat */}
      <ellipse cx="60" cy="28" rx="26" ry="8" fill="#C19A6B" />
      <rect x="44" y="20" width="32" height="12" rx="6" fill="#C19A6B" />
      {/* Eyes */}
      <circle cx="52" cy="42" r="3" fill="#3D2B1F" />
      <circle cx="68" cy="42" r="3" fill="#3D2B1F" />
      {/* Smile */}
      <path d="M52 50 Q60 58 68 50" fill="none" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" />
      {/* Binoculars */}
      <rect x="70" y="60" width="20" height="10" rx="5" fill="#555" />
      <circle cx="75" cy="65" r="6" fill="#333" />
      <circle cx="85" cy="65" r="6" fill="#333" />
      <circle cx="75" cy="65" r="3" fill="#88CCFF" opacity="0.6" />
      <circle cx="85" cy="65" r="3" fill="#88CCFF" opacity="0.6" />
    </svg>
  )
}

function SavannahScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Acacia tree left */}
      <svg viewBox="0 0 100 140" className="absolute -left-4 top-[15%] h-32 w-28 opacity-40">
        <rect x="45" y="60" width="10" height="80" fill="#8B6914" />
        <ellipse cx="50" cy="50" rx="42" ry="22" fill="#5B8C3A" />
        <ellipse cx="50" cy="45" rx="36" ry="18" fill="#6BA34A" />
      </svg>
      {/* Acacia tree right */}
      <svg viewBox="0 0 100 140" className="absolute -right-2 top-[40%] h-28 w-24 opacity-35">
        <rect x="45" y="60" width="10" height="80" fill="#8B6914" />
        <ellipse cx="50" cy="50" rx="38" ry="20" fill="#5B8C3A" />
      </svg>
      {/* Giraffe */}
      <svg viewBox="0 0 80 160" className="absolute right-2 top-[60%] h-36 w-20 opacity-30">
        <rect x="35" y="40" width="12" height="80" rx="6" fill="#E8B84B" />
        <circle cx="41" cy="32" r="14" fill="#E8B84B" />
        <circle cx="36" cy="29" r="2" fill="#333" />
        <circle cx="46" cy="29" r="2" fill="#333" />
        <rect x="37" y="10" width="3" height="14" fill="#C19A3B" />
        <rect x="42" y="12" width="3" height="12" fill="#C19A3B" />
        {/* Spots */}
        <circle cx="38" cy="55" r="3" fill="#C19A3B" />
        <circle cx="44" cy="68" r="3" fill="#C19A3B" />
        <circle cx="36" cy="80" r="3" fill="#C19A3B" />
        <circle cx="44" cy="92" r="2.5" fill="#C19A3B" />
        {/* Legs */}
        <rect x="33" y="118" width="5" height="30" fill="#E8B84B" />
        <rect x="44" y="118" width="5" height="30" fill="#E8B84B" />
      </svg>
      {/* Zebra */}
      <svg viewBox="0 0 80 80" className="absolute left-4 top-[75%] h-20 w-20 opacity-25">
        <ellipse cx="40" cy="40" rx="24" ry="16" fill="#fff" />
        <rect x="24" y="50" width="5" height="18" fill="#fff" />
        <rect x="50" y="50" width="5" height="18" fill="#fff" />
        <circle cx="58" cy="32" r="8" fill="#fff" />
        <circle cx="61" cy="30" r="2" fill="#333" />
        {/* Stripes */}
        <rect x="28" y="32" width="3" height="18" rx="1" fill="#333" transform="rotate(-5 29 40)" />
        <rect x="36" y="30" width="3" height="20" rx="1" fill="#333" />
        <rect x="44" y="32" width="3" height="18" rx="1" fill="#333" transform="rotate(5 45 40)" />
      </svg>
    </div>
  )
}

const savannahTheme: AdventureTheme = {
  name: "Savannah",
  tagline: "Roam the golden plains",
  bgImage: "/images/savannah-bg.jpg",
  overlayFrom: "rgba(255,200,80,0.55)",
  overlayVia: "rgba(240,180,60,0.45)",
  overlayTo: "rgba(200,140,40,0.6)",
  primaryColor: "#D4872C",
  primaryHover: "#B8711E",
  primaryRing: "#D4872C55",
  textDark: "#5A3200",
  textMid: "#8B6914",
  pathStroke: "#E8C56A",
  pathDash: "#D4872C",
  topBarBg: "rgba(255,235,180,0.75)",
  fuelTrack: "#E8D5A0",
  freezeBg: "rgba(255,240,200,0.8)",
  cardBg: "#FFF8E8",
  tabActiveBg: "#D4872C",
  tabInactiveBg: "#a0a0a0",
  currentNodeColor: "#FF6B6B",
  completedNodeColor: "#D4872C",
  lockedNodeColor: "#D4C8A0",
  character: <SavannahCharacter />,
  sceneryElements: <SavannahScenery />,
}

export default function SavannahPage() {
  return <AdventureMap theme={savannahTheme} />
}
