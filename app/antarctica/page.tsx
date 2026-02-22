"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { SnowmobileIcon, IceSlidingIcon, PenguinIcon, PolarBearIcon, SealIcon } from "@/components/client/adventure-icons"

function AntarcticaScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 200 60" className="absolute bottom-[20%] left-0 h-14 w-full opacity-20"><path d="M0 60 Q50 20 100 40 Q150 10 200 60Z" fill="white" /></svg>
      <svg viewBox="0 0 60 80" className="absolute right-4 top-[15%] h-20 w-14 opacity-25"><rect x="20" y="20" width="20" height="40" rx="6" fill="#89CFF0" opacity="0.4" /><rect x="16" y="10" width="28" height="16" rx="4" fill="#89CFF0" opacity="0.3" /></svg>
    </div>
  )
}

const antarcticaTheme: AdventureTheme = {
  name: "Antarctica", tagline: "Brave the frozen frontier", bgImage: "/images/antarctica-bg.jpg",
  overlayFrom: "rgba(27,58,75,0.6)", overlayVia: "rgba(64,104,130,0.45)", overlayTo: "rgba(27,58,75,0.65)",
  primaryColor: "#89CFF0", primaryHover: "#6BB5E0", primaryRing: "#89CFF044",
  textDark: "#1B3A4B", textMid: "#406882", textLight: "#D4EFFF",
  pathStroke: "#B0DFFF", pathDash: "#89CFF0", topBarBg: "rgba(210,240,255,0.78)",
  fuelTrack: "#C0E0F8", cardBg: "#F0F8FF",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#89CFF0", lockedNodeColor: "#8AABB8",
  vehicles: [
    { id: "snowmobile", label: "Snowmobile", icon: <SnowmobileIcon /> },
    { id: "slide", label: "Ice Sliding", icon: <IceSlidingIcon /> },
    { id: "penguin", label: "Penguin Ride", icon: <PenguinIcon /> },
  ],
  characters: [
    { id: "penguin", label: "Penguin", icon: <PenguinIcon /> },
    { id: "polarbear", label: "Polar Bear", icon: <PolarBearIcon /> },
    { id: "seal", label: "Seal", icon: <SealIcon /> },
  ],
  sceneryElements: <AntarcticaScenery />,
}

export default function AntarcticaPage() { return <AdventureMap theme={antarcticaTheme} /> }
