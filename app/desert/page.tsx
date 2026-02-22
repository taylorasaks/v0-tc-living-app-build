"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { ATVIcon, SandboardIcon, ScorpionCharIcon, FoxIcon, HawkIcon, CamelIcon } from "@/components/client/adventure-icons"

function DesertScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 120 80" className="absolute -left-2 top-[20%] h-20 w-28 opacity-30"><path d="M0 80 Q30 30 60 50 Q90 20 120 80Z" fill="#DAA520" opacity="0.4" /></svg>
      <svg viewBox="0 0 60 120" className="absolute right-2 top-[45%] h-28 w-14 opacity-25"><path d="M30 120 L30 40" stroke="#2D7A3A" strokeWidth="5" strokeLinecap="round" /><path d="M30 60 Q20 50 24 40" stroke="#2D7A3A" strokeWidth="3" strokeLinecap="round" /><path d="M30 70 Q40 60 36 50" stroke="#2D7A3A" strokeWidth="3" strokeLinecap="round" /></svg>
    </div>
  )
}

const desertTheme: AdventureTheme = {
  name: "Desert", tagline: "Cross the shifting sands", bgImage: "/images/desert-bg.jpg",
  overlayFrom: "rgba(107,58,0,0.6)", overlayVia: "rgba(166,107,43,0.45)", overlayTo: "rgba(107,58,0,0.65)",
  primaryColor: "#E8A435", primaryHover: "#C88A20", primaryRing: "#E8A43544",
  textDark: "#5A3200", textMid: "#8B6A14", textLight: "#FFE0A0",
  pathStroke: "#E8D08A", pathDash: "#E8A435", topBarBg: "rgba(255,240,200,0.78)",
  fuelTrack: "#E8D5A0", cardBg: "#FFFBE8",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#E8A435", lockedNodeColor: "#BFA87A",
  vehicles: [
    { id: "camel", label: "Camel", icon: <CamelIcon /> },
    { id: "atv", label: "Desert ATV", icon: <ATVIcon /> },
    { id: "sandboard", label: "Sandboard", icon: <SandboardIcon /> },
  ],
  characters: [
    { id: "scorpion", label: "Scorpion", icon: <ScorpionCharIcon /> },
    { id: "fox", label: "Desert Fox", icon: <FoxIcon /> },
    { id: "hawk", label: "Hawk", icon: <HawkIcon /> },
  ],
  sceneryElements: <DesertScenery />,
}

export default function DesertPage() { return <AdventureMap theme={desertTheme} /> }
