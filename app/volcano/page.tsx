"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { DragonIcon, LavaBoatIcon, FireSuitIcon, PhoenixIcon, LizardIcon } from "@/components/client/adventure-icons"

function VolcanoScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 160 100" className="absolute -left-4 bottom-[15%] h-24 w-40 opacity-25"><path d="M0 100 L60 20 L80 40 L100 10 L160 100Z" fill="#8B2020" /><path d="M95 10 Q100 2 105 10" fill="#FF6347" opacity="0.6" /></svg>
      <svg viewBox="0 0 40 80" className="absolute right-2 top-[40%] h-20 w-10 opacity-20"><path d="M20 0 Q10 20 15 40 Q8 60 20 80" fill="none" stroke="#FF6347" strokeWidth="3" opacity="0.5" /><circle cx="20" cy="10" r="4" fill="#FFD700" opacity="0.3" /></svg>
    </div>
  )
}

const volcanoTheme: AdventureTheme = {
  name: "Volcano", tagline: "Navigate the lava lands", bgImage: "/images/volcano-bg.jpg",
  overlayFrom: "rgba(74,14,14,0.65)", overlayVia: "rgba(139,32,32,0.5)", overlayTo: "rgba(74,14,14,0.7)",
  primaryColor: "#E84535", primaryHover: "#C83525", primaryRing: "#E8453544",
  textDark: "#4A0E0E", textMid: "#8B2020", textLight: "#FFBAB3",
  pathStroke: "#E89080", pathDash: "#E84535", topBarBg: "rgba(255,210,200,0.78)",
  fuelTrack: "#E8B0A0", cardBg: "#FFF0EE",
  currentNodeColor: "#FFD700", completedNodeColor: "#E84535", lockedNodeColor: "#A06060",
  vehicles: [
    { id: "dragon", label: "Dragon", icon: <DragonIcon /> },
    { id: "lavaboat", label: "Lava Boat", icon: <LavaBoatIcon /> },
    { id: "firesuit", label: "Fire Suit", icon: <FireSuitIcon /> },
  ],
  characters: [
    { id: "phoenix", label: "Phoenix", icon: <PhoenixIcon /> },
    { id: "dragon", label: "Dragon", icon: <DragonIcon /> },
    { id: "lizard", label: "Fire Lizard", icon: <LizardIcon /> },
  ],
  sceneryElements: <VolcanoScenery />,
}

export default function VolcanoPage() { return <AdventureMap theme={volcanoTheme} /> }
