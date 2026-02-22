"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { MiniSubIcon, SeahorseRideIcon, MantaRayIcon, MerfolkIcon, AngelfishIcon, GlowJellyfishIcon } from "@/components/client/adventure-icons"

function AtlantisScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 80 160" className="absolute -left-2 top-[15%] h-40 w-20 opacity-25"><path d="M30 160 L30 60 Q20 40 30 20 L40 0" fill="none" stroke="#00CED1" strokeWidth="3" opacity="0.4" /><circle cx="30" cy="60" r="6" fill="#A0F0F0" opacity="0.3" /><circle cx="40" cy="100" r="4" fill="#A0F0F0" opacity="0.2" /></svg>
      <svg viewBox="0 0 100 80" className="absolute right-0 bottom-[20%] h-20 w-24 opacity-20"><path d="M20 80 L35 30 L50 20 L65 30 L80 80Z" fill="#00CED1" opacity="0.3" /><circle cx="50" cy="18" r="5" fill="#A0F0F0" opacity="0.4" /></svg>
    </div>
  )
}

const atlantisTheme: AdventureTheme = {
  name: "Atlantis", tagline: "Discover the lost city", bgImage: "/images/atlantis-bg.jpg",
  overlayFrom: "rgba(13,43,62,0.65)", overlayVia: "rgba(26,80,96,0.5)", overlayTo: "rgba(13,43,62,0.7)",
  primaryColor: "#00CED1", primaryHover: "#00B0B3", primaryRing: "#00CED144",
  textDark: "#0D2B3E", textMid: "#1A5060", textLight: "#A0F0F0",
  pathStroke: "#80E0E0", pathDash: "#00CED1", topBarBg: "rgba(200,250,250,0.78)",
  fuelTrack: "#A0E8E8", cardBg: "#F0FFFE",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#00CED1", lockedNodeColor: "#6A9E9E",
  vehicles: [
    { id: "minisub", label: "Mini Sub", icon: <MiniSubIcon /> },
    { id: "seahorse", label: "Seahorse Ride", icon: <SeahorseRideIcon /> },
    { id: "mantaray", label: "Manta Ray", icon: <MantaRayIcon /> },
  ],
  characters: [
    { id: "merfolk", label: "Merfolk", icon: <MerfolkIcon /> },
    { id: "angelfish", label: "Angelfish", icon: <AngelfishIcon /> },
    { id: "jellyfish", label: "Glow Jellyfish", icon: <GlowJellyfishIcon /> },
  ],
  sceneryElements: <AtlantisScenery />,
}

export default function AtlantisPage() { return <AdventureMap theme={atlantisTheme} /> }
