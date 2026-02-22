"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { SubmarineIcon, JetskiIcon, DolphinIcon, TurtleIcon, ClownfishIcon, OctopusIcon } from "@/components/client/adventure-icons"

function OceanScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 50 200" className="absolute right-6 top-[10%] h-48 w-12 animate-pulse opacity-25"><circle cx="20" cy="30" r="6" fill="white" opacity="0.4" /><circle cx="30" cy="60" r="4" fill="white" opacity="0.3" /><circle cx="15" cy="90" r="8" fill="white" opacity="0.25" /><circle cx="35" cy="130" r="5" fill="white" opacity="0.3" /></svg>
      <svg viewBox="0 0 100 120" className="absolute -left-2 bottom-[15%] h-28 w-24 opacity-30"><path d="M20 120 Q20 80 35 60 Q30 40 40 20" fill="none" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" /><path d="M30 120 Q40 70 55 50" fill="none" stroke="#FF8E8E" strokeWidth="5" strokeLinecap="round" /></svg>
    </div>
  )
}

const oceanTheme: AdventureTheme = {
  name: "Ocean", tagline: "Dive into the deep blue", bgImage: "/images/ocean-bg.jpg",
  overlayFrom: "rgba(10,46,77,0.65)", overlayVia: "rgba(0,80,150,0.5)", overlayTo: "rgba(10,46,77,0.7)",
  primaryColor: "#1E90FF", primaryHover: "#1878D6", primaryRing: "#1E90FF44",
  textDark: "#0A2E4D", textMid: "#2A6496", textLight: "#99D4FF",
  pathStroke: "#7EC8E3", pathDash: "#1E90FF", topBarBg: "rgba(180,225,255,0.75)",
  fuelTrack: "#A0D4EE", cardBg: "#E8F4FF",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#1E90FF", lockedNodeColor: "#6A9AB8",
  vehicles: [
    { id: "submarine", label: "Submarine", icon: <SubmarineIcon /> },
    { id: "jetski", label: "Jet Ski", icon: <JetskiIcon /> },
    { id: "dolphin", label: "Dolphin Ride", icon: <DolphinIcon /> },
  ],
  characters: [
    { id: "turtle", label: "Sea Turtle", icon: <TurtleIcon /> },
    { id: "clownfish", label: "Clownfish", icon: <ClownfishIcon /> },
    { id: "octopus", label: "Octopus", icon: <OctopusIcon /> },
  ],
  sceneryElements: <OceanScenery />,
}

export default function OceanPage() { return <AdventureMap theme={oceanTheme} /> }
