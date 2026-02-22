"use client"

import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"

/* ─── Ocean Vehicles ─── */
function SubmarineIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="18" ry="10" fill="#FFD700" />
      <ellipse cx="24" cy="26" rx="14" ry="7" fill="#FFE44D" />
      <circle cx="18" cy="26" r="4" fill="#87CEEB" opacity="0.6" />
      <circle cx="28" cy="26" r="4" fill="#87CEEB" opacity="0.6" />
      <rect x="22" y="16" width="4" height="8" rx="2" fill="#FFD700" />
      <circle cx="24" cy="14" r="3" fill="#FFD700" />
      <circle cx="24" cy="14" r="1.5" fill="#87CEEB" opacity="0.5" />
      <path d="M6 28 L12 26" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 28 L10 30" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function JetskiIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <path d="M8 30 Q8 24 16 22 L36 22 Q42 24 42 30Z" fill="#1E90FF" />
      <rect x="18" y="16" width="16" height="8" rx="3" fill="#2196F3" />
      <rect x="22" y="18" width="4" height="4" rx="1" fill="#87CEEB" opacity="0.5" />
      <rect x="28" y="18" width="4" height="4" rx="1" fill="#87CEEB" opacity="0.5" />
      <path d="M8 30 Q4 30 2 34" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M42 28 Q44 30 46 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <rect x="14" y="14" width="6" height="4" rx="2" fill="#0D47A1" />
    </svg>
  )
}

function DolphinRideIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <path d="M8 28 Q12 18 24 16 Q36 14 42 20 Q44 24 40 28 Q36 32 24 34 Q12 36 8 28Z" fill="#6BAED6" />
      <circle cx="14" cy="24" r="2" fill="white" />
      <circle cx="14.5" cy="24" r="1" fill="#0A2E4D" />
      <path d="M10 28 Q8 30 6 28" fill="none" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 22 Q44 18 42 14" fill="none" stroke="#6BAED6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 34 Q24 38 20 40" fill="none" stroke="#6BAED6" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 34 Q26 38 30 40" fill="none" stroke="#6BAED6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Ocean Characters ─── */
function TurtleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="14" ry="10" fill="#2E8B57" />
      <ellipse cx="24" cy="27" rx="10" ry="7" fill="#3CB371" />
      <path d="M18 22 L24 18 L30 22" fill="none" stroke="#228B22" strokeWidth="1.5" />
      <path d="M16 27 L24 22 L32 27" fill="none" stroke="#228B22" strokeWidth="1.5" />
      <circle cx="24" cy="16" r="7" fill="#66CDAA" />
      <circle cx="21" cy="14" r="2" fill="white" />
      <circle cx="27" cy="14" r="2" fill="white" />
      <circle cx="21.5" cy="14" r="1" fill="#0A2E4D" />
      <circle cx="27.5" cy="14" r="1" fill="#0A2E4D" />
      <path d="M22 18 Q24 20 26 18" fill="none" stroke="#0A2E4D" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="12" cy="26" rx="5" ry="3" fill="#66CDAA" transform="rotate(-30 12 26)" />
      <ellipse cx="36" cy="26" rx="5" ry="3" fill="#66CDAA" transform="rotate(30 36 26)" />
    </svg>
  )
}

function ClownfishIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="24" rx="16" ry="10" fill="#FF6347" />
      <rect x="14" y="15" width="3" height="18" rx="1.5" fill="white" opacity="0.7" />
      <rect x="23" y="16" width="3" height="16" rx="1.5" fill="white" opacity="0.7" />
      <circle cx="34" cy="21" r="3" fill="white" />
      <circle cx="35" cy="21" r="1.5" fill="#0A2E4D" />
      <path d="M8 18 Q4 24 8 30" fill="#FF6347" stroke="#FF6347" strokeWidth="1.5" />
      <path d="M24 14 Q24 8 28 6" fill="none" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 34 Q24 40 28 42" fill="none" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function OctopusIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <ellipse cx="24" cy="18" rx="12" ry="10" fill="#9B59B6" />
      <circle cx="20" cy="16" r="3" fill="white" />
      <circle cx="28" cy="16" r="3" fill="white" />
      <circle cx="20.5" cy="16" r="1.5" fill="#1a1a1a" />
      <circle cx="28.5" cy="16" r="1.5" fill="#1a1a1a" />
      <path d="M22 22 Q24 24 26 22" fill="none" stroke="#6C3483" strokeWidth="1" strokeLinecap="round" />
      <path d="M14 26 Q10 34 8 40" fill="none" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 28 Q16 36 14 42" fill="none" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 28 Q22 36 20 44" fill="none" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 28 Q26 36 28 44" fill="none" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 28 Q32 36 34 42" fill="none" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 26 Q38 34 40 40" fill="none" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Ocean Scenery ─── */
function OceanScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 50 200" className="absolute right-6 top-[10%] h-48 w-12 animate-pulse opacity-25">
        <circle cx="20" cy="30" r="6" fill="white" opacity="0.4" />
        <circle cx="30" cy="60" r="4" fill="white" opacity="0.3" />
        <circle cx="15" cy="90" r="8" fill="white" opacity="0.25" />
        <circle cx="35" cy="130" r="5" fill="white" opacity="0.3" />
        <circle cx="22" cy="170" r="7" fill="white" opacity="0.2" />
      </svg>
      <svg viewBox="0 0 50 200" className="absolute left-4 top-[30%] h-40 w-10 opacity-20">
        <circle cx="25" cy="40" r="5" fill="white" opacity="0.35" />
        <circle cx="15" cy="80" r="7" fill="white" opacity="0.25" />
        <circle cx="30" cy="140" r="4" fill="white" opacity="0.3" />
      </svg>
      <svg viewBox="0 0 100 120" className="absolute -left-2 bottom-[15%] h-28 w-24 opacity-30">
        <path d="M20 120 Q20 80 35 60 Q30 40 40 20" fill="none" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" />
        <path d="M30 120 Q40 70 55 50 Q50 30 60 10" fill="none" stroke="#FF8E8E" strokeWidth="5" strokeLinecap="round" />
        <circle cx="40" cy="18" r="6" fill="#FF6B6B" opacity="0.5" />
        <circle cx="60" cy="8" r="5" fill="#FF8E8E" opacity="0.4" />
      </svg>
      <svg viewBox="0 0 100 120" className="absolute -right-2 bottom-[30%] h-24 w-22 opacity-25">
        <path d="M80 120 Q70 80 60 60 Q65 30 50 10" fill="none" stroke="#FFB347" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 120 Q60 75 50 55 Q55 25 45 5" fill="none" stroke="#FFA07A" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 60 40" className="absolute right-8 top-[50%] h-10 w-14 opacity-30">
        <ellipse cx="30" cy="20" rx="22" ry="13" fill="#FF6347" />
        <rect x="18" y="8" width="4" height="24" rx="2" fill="white" opacity="0.6" />
        <rect x="30" y="10" width="4" height="20" rx="2" fill="white" opacity="0.6" />
        <circle cx="40" cy="17" r="3" fill="white" />
        <circle cx="41" cy="17" r="1.5" fill="#0A2E4D" />
      </svg>
      <svg viewBox="0 0 50 70" className="absolute left-6 top-[65%] h-16 w-12 opacity-20">
        <ellipse cx="25" cy="22" rx="18" ry="16" fill="#DDA0DD" opacity="0.6" />
        <path d="M10 30 Q12 50 14 60" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.5" />
        <path d="M18 32 Q20 55 22 65" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.4" />
        <path d="M28 32 Q30 55 32 65" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.4" />
        <path d="M36 30 Q38 50 40 60" fill="none" stroke="#DDA0DD" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  )
}

const oceanTheme: AdventureTheme = {
  name: "Ocean",
  tagline: "Dive into the deep blue",
  bgImage: "/images/ocean-bg.jpg",
  overlayFrom: "rgba(10,46,77,0.65)",
  overlayVia: "rgba(0,80,150,0.5)",
  overlayTo: "rgba(10,46,77,0.7)",
  primaryColor: "#1E90FF",
  primaryHover: "#1878D6",
  primaryRing: "#1E90FF44",
  textDark: "#0A2E4D",
  textMid: "#2A6496",
  textLight: "#99D4FF",
  pathStroke: "#7EC8E3",
  pathDash: "#1E90FF",
  topBarBg: "rgba(180,225,255,0.75)",
  fuelTrack: "#A0D4EE",
  cardBg: "#E8F4FF",
  currentNodeColor: "#FF6B6B",
  completedNodeColor: "#1E90FF",
  lockedNodeColor: "#6A9AB8",
  vehicles: [
    { id: "submarine", label: "Submarine", icon: <SubmarineIcon /> },
    { id: "jetski", label: "Jet Ski", icon: <JetskiIcon /> },
    { id: "dolphin", label: "Dolphin Ride", icon: <DolphinRideIcon /> },
  ],
  characters: [
    { id: "turtle", label: "Sea Turtle", icon: <TurtleIcon /> },
    { id: "clownfish", label: "Clownfish", icon: <ClownfishIcon /> },
    { id: "octopus", label: "Octopus", icon: <OctopusIcon /> },
  ],
  sceneryElements: <OceanScenery />,
}

export default function OceanPage() {
  return <AdventureMap theme={oceanTheme} />
}
