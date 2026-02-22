"use client"
import { AdventureMap, type AdventureTheme } from "@/components/client/adventure-map"
import { ClimbingIcon, BikeIcon, YetiIcon, EagleIcon, GoatIcon } from "@/components/client/adventure-icons"

function MountainScenery() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 160 100" className="absolute -left-4 bottom-[10%] h-24 w-40 opacity-25"><path d="M0 100 L40 30 L60 50 L100 10 L140 60 L160 100Z" fill="#4A6274" /><path d="M40 30 L48 42 L32 42Z" fill="white" opacity="0.5" /><path d="M100 10 L110 25 L90 25Z" fill="white" opacity="0.6" /></svg>
      <svg viewBox="0 0 60 100" className="absolute right-0 top-[30%] h-24 w-14 opacity-20"><path d="M30 100 L30 20 Q20 20 20 30 L20 100" fill="#2D5A3A" /><ellipse cx="30" cy="18" rx="14" ry="10" fill="#3A7A4A" /></svg>
    </div>
  )
}

const mountainsTheme: AdventureTheme = {
  name: "Mountains", tagline: "Scale the peaks", bgImage: "/images/mountains-bg.jpg",
  overlayFrom: "rgba(44,62,80,0.6)", overlayVia: "rgba(74,98,116,0.45)", overlayTo: "rgba(44,62,80,0.65)",
  primaryColor: "#7F9BAA", primaryHover: "#6A8696", primaryRing: "#7F9BAA44",
  textDark: "#2C3E50", textMid: "#4A6274", textLight: "#C4DDE8",
  pathStroke: "#A0B8C8", pathDash: "#7F9BAA", topBarBg: "rgba(200,225,240,0.78)",
  fuelTrack: "#B0C8D8", cardBg: "#EEF5FA",
  currentNodeColor: "#FF6B6B", completedNodeColor: "#7F9BAA", lockedNodeColor: "#8A9EAA",
  vehicles: [
    { id: "climb", label: "Climbing", icon: <ClimbingIcon /> },
    { id: "bike", label: "Mountain Bike", icon: <BikeIcon /> },
    { id: "yeti", label: "Yeti", icon: <YetiIcon /> },
  ],
  characters: [
    { id: "eagle", label: "Eagle", icon: <EagleIcon /> },
    { id: "goat", label: "Mountain Goat", icon: <GoatIcon /> },
    { id: "yeti", label: "Yeti", icon: <YetiIcon /> },
  ],
  sceneryElements: <MountainScenery />,
}

export default function MountainsPage() { return <AdventureMap theme={mountainsTheme} /> }
