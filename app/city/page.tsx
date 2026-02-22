"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { CarIcon, SkateboardIcon, SubwayIcon, DogIcon, CatIcon, PigeonIcon } from "@/components/client/adventure-icons"

function CityScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 120 160" className="absolute -left-2 top-[10%] h-40 w-28 opacity-20"><rect x="10" y="40" width="25" height="120" fill="#6060DD" opacity="0.4" /><rect x="45" y="20" width="30" height="140" fill="#8080FF" opacity="0.3" /><rect x="85" y="60" width="25" height="100" fill="#6060DD" opacity="0.4" /><rect x="50" y="30" width="5" height="5" fill="#FFD700" opacity="0.6" /><rect x="50" y="45" width="5" height="5" fill="#FFD700" opacity="0.6" /></svg>
    </div>
  )
}

const cityTheme: AdventureTheme = {
  name: "City", tagline: "Explore the urban jungle", bgImage: "/images/city-bg.jpg",
  overlayFrom: "rgba(28,28,46,0.65)", overlayVia: "rgba(58,58,94,0.5)", overlayTo: "rgba(28,28,46,0.7)",
  primaryColor: "#8080FF", primaryHover: "#6666DD", primaryRing: "#8080FF44",
  textDark: "#1C1C2E", textMid: "#3A3A5E", textLight: "#C4C4FF",
  pathStroke: "#A0A0E0", pathDash: "#8080FF", topBarBg: "rgba(210,210,255,0.78)",
  fuelTrack: "#C0C0E8", cardBg: "#F0F0FF",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#8080FF", lockedNodeColor: "#8A8AAA",
  vehicles: [
    { id: "car", label: "Car", icon: <CarIcon /> },
    { id: "skateboard", label: "Skateboard", icon: <SkateboardIcon /> },
    { id: "subway", label: "Subway", icon: <SubwayIcon /> },
  ],
  characters: [
    { id: "dog", label: "Dog", icon: <DogIcon /> },
    { id: "cat", label: "Cat", icon: <CatIcon /> },
    { id: "pigeon", label: "Pigeon", icon: <PigeonIcon /> },
  ],
  sceneryElements: <CityScenery />,
}

export default function CityPage() { return <AdventureMap theme={cityTheme} /> }
