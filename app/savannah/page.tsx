"use client"

import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"

/* ─── Savannah Vehicles ─── */
function CamelIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="14" ry="8" fill="#D4A45A" />
      <ellipse cx="24" cy="24" rx="4" ry="6" fill="#E8B84B" />
      <rect x="11" y="32" width="4" height="12" rx="2" fill="#C19A3B" />
      <rect x="20" y="32" width="4" height="12" rx="2" fill="#C19A3B" />
      <rect x="28" y="32" width="4" height="12" rx="2" fill="#C19A3B" />
      <rect x="35" y="32" width="4" height="12" rx="2" fill="#C19A3B" />
      <circle cx="12" cy="16" r="6" fill="#D4A45A" />
      <path d="M12 22 Q12 26 14 28" fill="none" stroke="#D4A45A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.5" fill="#3D2B1F" />
      <ellipse cx="12" cy="18" rx="1.5" ry="1" fill="#3D2B1F" />
      <path d="M8 12 L6 8" stroke="#D4A45A" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 12 L18 8" stroke="#D4A45A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function DesertMarauderIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <rect x="8" y="20" width="32" height="14" rx="4" fill="#8B6914" />
      <rect x="12" y="16" width="24" height="8" rx="3" fill="#A0802A" />
      <rect x="16" y="18" width="6" height="4" rx="1" fill="#FFD699" opacity="0.4" />
      <rect x="26" y="18" width="6" height="4" rx="1" fill="#FFD699" opacity="0.4" />
      <circle cx="14" cy="36" r="5" fill="#333" />
      <circle cx="14" cy="36" r="2.5" fill="#555" />
      <circle cx="34" cy="36" r="5" fill="#333" />
      <circle cx="34" cy="36" r="2.5" fill="#555" />
      <rect x="4" y="24" width="6" height="2" rx="1" fill="#E8B84B" />
      <rect x="38" y="24" width="6" height="2" rx="1" fill="#E8B84B" />
      <path d="M20 14 L24 8 L28 14" fill="none" stroke="#C19A3B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ScorpionIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="32" rx="10" ry="6" fill="#8B4513" />
      <circle cx="24" cy="24" r="6" fill="#A0522D" />
      <circle cx="21" cy="22" r="1.5" fill="#1a1a1a" />
      <circle cx="27" cy="22" r="1.5" fill="#1a1a1a" />
      <path d="M14 30 Q6 28 4 22" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M34 30 Q42 28 44 22" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="4" cy="21" r="2" fill="#A0522D" />
      <circle cx="44" cy="21" r="2" fill="#A0522D" />
      <path d="M24 38 Q24 44 20 46 Q18 44 20 40" fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="40" r="1.5" fill="#C0392B" />
    </svg>
  )
}

/* ─── Savannah Characters ─── */
function GiraffeCharIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <rect x="21" y="14" width="6" height="20" rx="3" fill="#E8B84B" />
      <circle cx="24" cy="10" r="7" fill="#E8B84B" />
      <circle cx="21" cy="8" r="1.5" fill="#3D2B1F" />
      <circle cx="27" cy="8" r="1.5" fill="#3D2B1F" />
      <rect x="22" y="4" width="2" height="4" fill="#C19A3B" />
      <rect x="25" y="5" width="2" height="3" fill="#C19A3B" />
      <circle cx="22" cy="20" r="2" fill="#C19A3B" />
      <circle cx="26" cy="26" r="2" fill="#C19A3B" />
      <rect x="18" y="34" width="3.5" height="10" rx="1.5" fill="#E8B84B" />
      <rect x="26.5" y="34" width="3.5" height="10" rx="1.5" fill="#E8B84B" />
      <path d="M20 13 Q24 16 28 13" fill="none" stroke="#3D2B1F" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function LionIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="24" r="16" fill="#D4872C" />
      <circle cx="24" cy="26" r="12" fill="#E8B84B" />
      <circle cx="20" cy="22" r="2.5" fill="white" />
      <circle cx="28" cy="22" r="2.5" fill="white" />
      <circle cx="20.5" cy="22" r="1.5" fill="#3D2B1F" />
      <circle cx="28.5" cy="22" r="1.5" fill="#3D2B1F" />
      <ellipse cx="24" cy="28" rx="4" ry="2.5" fill="#D2A679" />
      <circle cx="24" cy="27" r="1.2" fill="#3D2B1F" />
      <path d="M20 31 Q24 35 28 31" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ZebraCharIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="14" ry="10" fill="white" />
      <rect x="12" y="34" width="4" height="10" rx="2" fill="white" />
      <rect x="32" y="34" width="4" height="10" rx="2" fill="white" />
      <rect x="16" y="22" width="3" height="14" rx="1" fill="#333" transform="rotate(-5 17 28)" />
      <rect x="22" y="20" width="3" height="16" rx="1" fill="#333" />
      <rect x="28" y="22" width="3" height="14" rx="1" fill="#333" transform="rotate(5 29 28)" />
      <circle cx="34" cy="20" r="7" fill="white" />
      <circle cx="36" cy="18" r="2" fill="#333" />
      <path d="M32 16 L30 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M36" y="16" fill="none" />
    </svg>
  )
}

/* ─── Savannah Scenery ─── */
function SavannahScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 100 140" className="absolute -left-4 top-[15%] h-32 w-28 opacity-35">
        <rect x="45" y="60" width="10" height="80" fill="#8B6914" />
        <ellipse cx="50" cy="50" rx="42" ry="22" fill="#5B8C3A" />
        <ellipse cx="50" cy="45" rx="36" ry="18" fill="#6BA34A" />
      </svg>
      <svg viewBox="0 0 100 140" className="absolute -right-2 top-[40%] h-28 w-24 opacity-30">
        <rect x="45" y="60" width="10" height="80" fill="#8B6914" />
        <ellipse cx="50" cy="50" rx="38" ry="20" fill="#5B8C3A" />
      </svg>
      <svg viewBox="0 0 80 160" className="absolute right-2 top-[60%] h-36 w-20 opacity-25">
        <rect x="35" y="40" width="12" height="80" rx="6" fill="#E8B84B" />
        <circle cx="41" cy="32" r="14" fill="#E8B84B" />
        <circle cx="36" cy="29" r="2" fill="#333" />
        <circle cx="46" cy="29" r="2" fill="#333" />
        <circle cx="38" cy="55" r="3" fill="#C19A3B" />
        <circle cx="44" cy="68" r="3" fill="#C19A3B" />
        <circle cx="36" cy="80" r="3" fill="#C19A3B" />
        <rect x="33" y="118" width="5" height="30" fill="#E8B84B" />
        <rect x="44" y="118" width="5" height="30" fill="#E8B84B" />
      </svg>
      <svg viewBox="0 0 80 80" className="absolute left-4 top-[78%] h-20 w-20 opacity-20">
        <ellipse cx="40" cy="40" rx="24" ry="16" fill="#fff" />
        <rect x="24" y="50" width="5" height="18" fill="#fff" />
        <rect x="50" y="50" width="5" height="18" fill="#fff" />
        <circle cx="58" cy="32" r="8" fill="#fff" />
        <circle cx="61" cy="30" r="2" fill="#333" />
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
  overlayFrom: "rgba(90,50,0,0.6)",
  overlayVia: "rgba(139,105,20,0.5)",
  overlayTo: "rgba(90,50,0,0.65)",
  primaryColor: "#D4872C",
  primaryHover: "#B8711E",
  primaryRing: "#D4872C44",
  textDark: "#5A3200",
  textMid: "#8B6914",
  textLight: "#FFD699",
  pathStroke: "#E8C56A",
  pathDash: "#D4872C",
  topBarBg: "rgba(255,235,180,0.78)",
  fuelTrack: "#E8D5A0",
  cardBg: "#FFF8E8",
  currentNodeColor: "#FF6B6B",
  completedNodeColor: "#D4872C",
  lockedNodeColor: "#BFA87A",
  vehicles: [
    { id: "camel", label: "Camel", icon: <CamelIcon /> },
    { id: "marauder", label: "Sand Cruiser", icon: <DesertMarauderIcon /> },
    { id: "scorpion", label: "Scorpion", icon: <ScorpionIcon /> },
  ],
  characters: [
    { id: "giraffe", label: "Giraffe", icon: <GiraffeCharIcon /> },
    { id: "lion", label: "Lion", icon: <LionIcon /> },
    { id: "zebra", label: "Zebra", icon: <ZebraCharIcon /> },
  ],
  sceneryElements: <SavannahScenery />,
}

export default function SavannahPage() {
  return <AdventureMap theme={savannahTheme} />
}
