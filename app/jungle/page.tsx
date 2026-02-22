"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { JeepIcon, VineSwingIcon, WalkingIcon, MonkeyIcon, BirdIcon, JaguarIcon } from "@/components/client/adventure-icons"

function JungleScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 60 300" className="absolute -left-1 top-0 h-72 w-14 opacity-40"><path d="M30 0 Q20 60 35 120 Q15 180 30 240 Q20 270 25 300" fill="none" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" /><ellipse cx="22" cy="80" rx="10" ry="5" fill="#3A9E4A" transform="rotate(-30 22 80)" /><ellipse cx="38" cy="140" rx="10" ry="5" fill="#3A9E4A" transform="rotate(20 38 140)" /></svg>
      <svg viewBox="0 0 60 280" className="absolute -right-1 top-[5%] h-64 w-14 opacity-35"><path d="M30 0 Q40 50 25 110 Q45 170 30 230" fill="none" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" /><ellipse cx="38" cy="70" rx="10" ry="5" fill="#3A9E4A" transform="rotate(25 38 70)" /></svg>
    </div>
  )
}

const jungleTheme: AdventureTheme = {
  name: "Jungle", tagline: "Swing through the canopy", bgImage: "/images/jungle-bg.jpg",
  overlayFrom: "rgba(10,58,26,0.65)", overlayVia: "rgba(20,80,36,0.55)", overlayTo: "rgba(10,58,26,0.7)",
  primaryColor: "#2E8B57", primaryHover: "#246D45", primaryRing: "#2E8B5744",
  textDark: "#0A3A1A", textMid: "#2D6A3A", textLight: "#A8E6B0",
  pathStroke: "#7ECB8A", pathDash: "#2E8B57", topBarBg: "rgba(180,235,190,0.75)",
  fuelTrack: "#A0D8AA", cardBg: "#E8F8EC",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#2E8B57", lockedNodeColor: "#6B9E78",
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

export default function JunglePage() { return <AdventureMap theme={jungleTheme} /> }
