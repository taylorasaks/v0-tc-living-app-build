"use client"

import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"

/* ─── Jungle Vehicles ─── */
function JeepIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <rect x="6" y="18" width="36" height="16" rx="4" fill="#5B7A3A" />
      <rect x="10" y="12" width="28" height="10" rx="3" fill="#6B8A4A" />
      <rect x="14" y="14" width="8" height="6" rx="1" fill="#A8D8B0" opacity="0.5" />
      <rect x="26" y="14" width="8" height="6" rx="1" fill="#A8D8B0" opacity="0.5" />
      <circle cx="14" cy="36" r="5" fill="#333" />
      <circle cx="14" cy="36" r="2.5" fill="#666" />
      <circle cx="34" cy="36" r="5" fill="#333" />
      <circle cx="34" cy="36" r="2.5" fill="#666" />
      <rect x="38" y="22" width="6" height="3" rx="1" fill="#FFD700" />
    </svg>
  )
}

function VineSwingIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <path d="M24 4 Q16 16 20 28" fill="none" stroke="#2D7A3A" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="18" cy="10" rx="6" ry="3" fill="#3A9E4A" transform="rotate(-30 18 10)" />
      <ellipse cx="26" cy="18" rx="5" ry="3" fill="#4AAE5A" transform="rotate(20 26 18)" />
      <circle cx="20" cy="32" r="6" fill="#8B5E3C" />
      <circle cx="20" cy="26" r="5" fill="#8B5E3C" />
      <circle cx="20" cy="27" r="3.5" fill="#D2A679" />
      <circle cx="18" cy="26" r="1" fill="#2B1810" />
      <circle cx="22" cy="26" r="1" fill="#2B1810" />
      <path d="M17 30 Q12 28 10 24" fill="none" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function WalkingIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="10" r="5" fill="#D2A679" />
      <path d="M24 15 L24 30" stroke="#6B8A4A" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 20 L16 26" stroke="#6B8A4A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 20 L32 26" stroke="#6B8A4A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 30 L18 42" stroke="#5B7A3A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 30 L30 42" stroke="#5B7A3A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="26" r="2" fill="#D2A679" />
      <circle cx="32" cy="26" r="2" fill="#D2A679" />
    </svg>
  )
}

/* ─── Jungle Characters ─── */
function MonkeyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="32" rx="10" ry="8" fill="#8B5E3C" />
      <ellipse cx="24" cy="33" rx="6" ry="5" fill="#D2A679" />
      <circle cx="24" cy="18" r="10" fill="#8B5E3C" />
      <circle cx="24" cy="20" r="7" fill="#D2A679" />
      <circle cx="14" cy="16" r="4" fill="#8B5E3C" />
      <circle cx="14" cy="16" r="2.5" fill="#D2A679" />
      <circle cx="34" cy="16" r="4" fill="#8B5E3C" />
      <circle cx="34" cy="16" r="2.5" fill="#D2A679" />
      <circle cx="21" cy="18" r="1.8" fill="#2B1810" />
      <circle cx="27" cy="18" r="1.8" fill="#2B1810" />
      <path d="M21 23 Q24 26 27 23" fill="none" stroke="#6B3F22" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function BirdIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="10" ry="8" fill="#1a1a1a" />
      <ellipse cx="24" cy="30" rx="6" ry="5" fill="#FFFDE7" />
      <circle cx="24" cy="16" r="8" fill="#1a1a1a" />
      <path d="M32 14 Q42 16 40 20 Q38 23 32 18Z" fill="#FF6B00" />
      <path d="M32 15 Q38 17 36 19" fill="none" stroke="#FFD600" strokeWidth="1.5" />
      <circle cx="28" cy="14" r="2" fill="white" />
      <circle cx="29" cy="14" r="1" fill="#1a1a1a" />
      <path d="M14 26 Q8 20 10 14" fill="none" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 26 Q40 20 38 14" fill="none" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function JaguarIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="30" rx="14" ry="10" fill="#E8B84B" />
      <circle cx="20" cy="28" r="2" fill="#8B5E3C" />
      <circle cx="28" cy="28" r="2" fill="#8B5E3C" />
      <circle cx="24" cy="34" r="1.5" fill="#8B5E3C" />
      <circle cx="30" cy="34" r="1.5" fill="#8B5E3C" />
      <circle cx="24" cy="14" r="10" fill="#E8B84B" />
      <path d="M14 8 L16 14" stroke="#E8B84B" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 8 L32 14" stroke="#E8B84B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="13" r="2.5" fill="white" />
      <circle cx="28" cy="13" r="2.5" fill="white" />
      <circle cx="21" cy="13" r="1.5" fill="#1a3a1a" />
      <circle cx="29" cy="13" r="1.5" fill="#1a3a1a" />
      <ellipse cx="24" cy="18" rx="3" ry="2" fill="#D2A679" />
      <circle cx="24" cy="17.5" r="1" fill="#333" />
      <path d="M20 20 Q24 23 28 20" fill="none" stroke="#8B5E3C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Jungle Scenery ─── */
function JungleScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 60 300" className="absolute -left-1 top-0 h-72 w-14 opacity-40">
        <path d="M30 0 Q20 60 35 120 Q15 180 30 240 Q20 270 25 300" fill="none" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="22" cy="80" rx="10" ry="5" fill="#3A9E4A" transform="rotate(-30 22 80)" />
        <ellipse cx="38" cy="140" rx="10" ry="5" fill="#3A9E4A" transform="rotate(20 38 140)" />
        <ellipse cx="20" cy="210" rx="10" ry="5" fill="#4AAE5A" transform="rotate(-25 20 210)" />
      </svg>
      <svg viewBox="0 0 60 280" className="absolute -right-1 top-[5%] h-64 w-14 opacity-35">
        <path d="M30 0 Q40 50 25 110 Q45 170 30 230 Q40 260 35 280" fill="none" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="38" cy="70" rx="10" ry="5" fill="#3A9E4A" transform="rotate(25 38 70)" />
        <ellipse cx="22" cy="150" rx="10" ry="5" fill="#4AAE5A" transform="rotate(-20 22 150)" />
      </svg>
      <svg viewBox="0 0 120 80" className="absolute -left-4 top-[20%] h-20 w-28 opacity-30">
        <path d="M10 70 Q30 30 60 10 Q40 40 50 70Z" fill="#2D8B3A" />
        <path d="M20 70 Q50 20 90 5 Q60 35 70 70Z" fill="#3AA04A" />
      </svg>
      <svg viewBox="0 0 80 80" className="absolute right-4 top-[55%] h-18 w-18 opacity-25">
        <ellipse cx="40" cy="50" rx="16" ry="20" fill="#1a1a1a" />
        <circle cx="40" cy="28" r="14" fill="#1a1a1a" />
        <ellipse cx="40" cy="55" rx="10" ry="12" fill="#FFFDE7" />
        <path d="M54 26 Q72 28 70 34 Q68 38 54 32Z" fill="#FF6B00" />
        <circle cx="48" cy="24" r="3" fill="white" />
        <circle cx="49" cy="24" r="1.5" fill="#1a1a1a" />
      </svg>
      <svg viewBox="0 0 60 50" className="absolute left-8 top-[72%] h-12 w-14 opacity-20">
        <ellipse cx="30" cy="34" rx="20" ry="14" fill="#32CD32" />
        <circle cx="20" cy="20" r="8" fill="#32CD32" />
        <circle cx="40" cy="20" r="8" fill="#32CD32" />
        <circle cx="20" cy="18" r="4" fill="white" />
        <circle cx="40" cy="18" r="4" fill="white" />
        <circle cx="21" cy="18" r="2" fill="#1a3a1a" />
        <circle cx="41" cy="18" r="2" fill="#1a3a1a" />
      </svg>
    </div>
  )
}

const jungleTheme: AdventureTheme = {
  name: "Jungle",
  tagline: "Swing through the canopy",
  bgImage: "/images/jungle-bg.jpg",
  overlayFrom: "rgba(10,58,26,0.65)",
  overlayVia: "rgba(20,80,36,0.55)",
  overlayTo: "rgba(10,58,26,0.7)",
  primaryColor: "#2E8B57",
  primaryHover: "#246D45",
  primaryRing: "#2E8B5744",
  textDark: "#0A3A1A",
  textMid: "#2D6A3A",
  textLight: "#A8E6B0",
  pathStroke: "#7ECB8A",
  pathDash: "#2E8B57",
  topBarBg: "rgba(180,235,190,0.75)",
  fuelTrack: "#A0D8AA",
  cardBg: "#E8F8EC",
  currentNodeColor: "#FF6B6B",
  completedNodeColor: "#2E8B57",
  lockedNodeColor: "#6B9E78",
  vehicles: [
    { id: "jeep", label: "Jungle Jeep", icon: <JeepIcon /> },
    { id: "vine", label: "Vine Swing", icon: <VineSwingIcon /> },
    { id: "walk", label: "Walking", icon: <WalkingIcon /> },
  ],
  characters: [
    { id: "monkey", label: "Monkey", icon: <MonkeyIcon /> },
    { id: "toucan", label: "Toucan", icon: <BirdIcon /> },
    { id: "jaguar", label: "Jaguar", icon: <JaguarIcon /> },
  ],
  sceneryElements: <JungleScenery />,
}

export default function JunglePage() {
  return <AdventureMap theme={jungleTheme} />
}
