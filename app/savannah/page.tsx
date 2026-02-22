"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { CamelIcon, DesertMarauderIcon, ScorpionIcon, GiraffeIcon, LionIcon, ZebraIcon } from "@/components/client/adventure-icons"

function SavannahScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 100 140" className="absolute -left-4 top-[15%] h-32 w-28 opacity-35"><rect x="45" y="60" width="10" height="80" fill="#8B6914" /><ellipse cx="50" cy="50" rx="42" ry="22" fill="#5B8C3A" /></svg>
      <svg viewBox="0 0 100 140" className="absolute -right-2 top-[40%] h-28 w-24 opacity-30"><rect x="45" y="60" width="10" height="80" fill="#8B6914" /><ellipse cx="50" cy="50" rx="38" ry="20" fill="#5B8C3A" /></svg>
    </div>
  )
}

const savannahTheme: AdventureTheme = {
  name: "Savannah", tagline: "Roam the golden plains", bgImage: "/images/savannah-bg.jpg",
  overlayFrom: "rgba(90,50,0,0.6)", overlayVia: "rgba(139,105,20,0.5)", overlayTo: "rgba(90,50,0,0.65)",
  primaryColor: "#D4872C", primaryHover: "#B8711E", primaryRing: "#D4872C44",
  textDark: "#5A3200", textMid: "#8B6914", textLight: "#FFD699",
  pathStroke: "#E8C56A", pathDash: "#D4872C", topBarBg: "rgba(255,235,180,0.78)",
  fuelTrack: "#E8D5A0", cardBg: "#FFF8E8",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#D4872C", lockedNodeColor: "#BFA87A",
  vehicles: [
    { id: "camel", label: "Camel", icon: <CamelIcon /> },
    { id: "marauder", label: "Sand Cruiser", icon: <DesertMarauderIcon /> },
    { id: "scorpion", label: "Scorpion", icon: <ScorpionIcon /> },
  ],
  characters: [
    { id: "giraffe", label: "Giraffe", icon: <GiraffeIcon /> },
    { id: "lion", label: "Lion", icon: <LionIcon /> },
    { id: "zebra", label: "Zebra", icon: <ZebraIcon /> },
  ],
  sceneryElements: <SavannahScenery />,
}

export default function SavannahPage() { return <AdventureMap theme={savannahTheme} /> }
