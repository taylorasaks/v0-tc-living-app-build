"use client"

import { useState } from "react"
import { Camera, Map, BookOpen, ArrowLeft, Coins, Mic, Pause, Flame } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

/* ─── Vehicle / Character option types ─── */
export interface VehicleOption {
  id: string
  label: string
  icon: React.ReactNode
}

export interface CharacterOption {
  id: string
  label: string
  icon: React.ReactNode
}

/* ─── Theme interface ─── */
export interface AdventureTheme {
  name: string
  tagline: string
  bgImage: string
  overlayFrom: string
  overlayVia: string
  overlayTo: string
  primaryColor: string
  primaryHover: string
  primaryRing: string
  textDark: string
  textMid: string
  textLight: string
  pathStroke: string
  pathDash: string
  topBarBg: string
  fuelTrack: string
  cardBg: string
  currentNodeColor: string
  completedNodeColor: string
  lockedNodeColor: string
  vehicles: VehicleOption[]
  characters: CharacterOption[]
  sceneryElements: React.ReactNode
}

/* ─── Quest steps ─── */
const steps = [
  { id: 1, label: "Step 1", icon: "cart", title: "Go Get Groceries", description: "Head to the store and pick up what you need for the week." },
  { id: 2, label: "Step 2", icon: "health", title: "Health Check-Up", description: "Visit your doctor or go to your health appointment." },
  { id: 3, label: "Step 3", icon: "bill", title: "Pay Your Bills", description: "Make sure your bills are paid on time this month." },
  { id: 4, label: "Step 4", icon: "cook", title: "Meal Prep", description: "Cook some food ahead of time so you eat well all week." },
  { id: 5, label: "Step 5", icon: "med", title: "Pick Up Medicine", description: "Go to the pharmacy and grab your prescriptions." },
  { id: 6, label: "Step 6", icon: "budget", title: "Budget Review", description: "Look at your spending and see how you are doing." },
]

function StepIcon({ type, color }: { type: string; color: string }) {
  const props = { className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: color, strokeWidth: 2 }
  switch (type) {
    case "cart":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
    case "health":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    case "bill":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
    case "cook":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>
    case "med":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 5.276A1.125 1.125 0 0120.12 22H3.88a1.125 1.125 0 01-1.082-1.424L4.2 15.3" /></svg>
    case "budget":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
    default:
      return null
  }
}

const currentStep = 2

export function AdventureMap({ theme }: { theme: AdventureTheme }) {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null)
  const [activeTab, setActiveTab] = useState<"map" | "journal">("map")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(theme.vehicles[0]?.id ?? "")
  const [selectedCharacter, setSelectedCharacter] = useState(theme.characters[0]?.id ?? "")
  const [showVehiclePicker, setShowVehiclePicker] = useState(false)
  const [showCharacterPicker, setShowCharacterPicker] = useState(false)
  const fuelLevel = 65
  const coins = 240

  const activeVehicle = theme.vehicles.find((v) => v.id === selectedVehicle) ?? theme.vehicles[0]
  const activeCharacter = theme.characters.find((c) => c.id === selectedCharacter) ?? theme.characters[0]

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${theme.bgImage})` }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom, ${theme.overlayFrom}, ${theme.overlayVia}, ${theme.overlayTo})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top Bar */}
        <header className="flex shrink-0 items-center gap-3 px-4 pt-4 pb-2">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-transform hover:scale-105"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>

          {/* Adventure Title */}
          <div className="flex flex-1 flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-white drop-shadow-md">
              {theme.name} Adventure
            </h1>
            <p className="text-xs font-semibold drop-shadow-sm" style={{ color: theme.textLight }}>
              {theme.tagline}
            </p>
          </div>

          {/* Currency */}
          <div className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md">
            <Coins className="h-4 w-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-[#FFD700]">{coins}</span>
          </div>
        </header>

        {/* Main */}
        <main className="flex min-h-0 flex-1 flex-col">
          {activeTab === "map" ? (
            <div className="relative flex min-h-0 flex-1 flex-col">
              {/* Fuel + Vehicle/Character Bar */}
              <div
                className="sticky top-0 z-10 mx-4 mt-2 flex flex-col gap-2 rounded-2xl px-4 py-3 backdrop-blur-md"
                style={{ backgroundColor: theme.topBarBg }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: theme.textDark }}>
                      Fuel
                    </span>
                    <Progress
                      value={fuelLevel}
                      className="h-3.5 rounded-full"
                      style={{ backgroundColor: theme.fuelTrack }}
                    />
                  </div>
                </div>

                {/* Vehicle + Character selectors */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowVehiclePicker(true)}
                    className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-black/5"
                    style={{ backgroundColor: `${theme.primaryColor}15` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${theme.primaryColor}30` }}>
                      {activeVehicle?.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.textMid }}>Vehicle</span>
                      <span className="text-xs font-bold" style={{ color: theme.textDark }}>{activeVehicle?.label}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setShowCharacterPicker(true)}
                    className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-black/5"
                    style={{ backgroundColor: `${theme.primaryColor}15` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${theme.primaryColor}30` }}>
                      {activeCharacter?.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.textMid }}>Companion</span>
                      <span className="text-xs font-bold" style={{ color: theme.textDark }}>{activeCharacter?.label}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Scrollable Path */}
              <div className="flex-1 overflow-y-auto px-4 pb-32 pt-4">
                {theme.sceneryElements}
                <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
                  {/* SVG Path */}
                  <svg
                    className="absolute left-0 top-0 h-full w-full"
                    viewBox="0 0 320 900"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M160 880 C160 830, 80 780, 80 720 C80 660, 240 620, 240 560 C240 500, 80 460, 80 400 C80 340, 240 300, 240 240 C240 180, 80 140, 80 80 C80 40, 160 20, 160 0"
                      stroke={theme.pathStroke}
                      strokeWidth="60"
                      strokeLinecap="round"
                      opacity="0.3"
                    />
                    <path
                      d="M160 880 C160 830, 80 780, 80 720 C80 660, 240 620, 240 560 C240 500, 80 460, 80 400 C80 340, 240 300, 240 240 C240 180, 80 140, 80 80 C80 40, 160 20, 160 0"
                      stroke={theme.pathDash}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="12 8"
                      opacity="0.5"
                    />
                  </svg>

                  {/* Step Nodes */}
                  {[...steps].reverse().map((step, index) => {
                    const isCompleted = step.id < currentStep
                    const isCurrent = step.id === currentStep
                    const isLocked = step.id > currentStep
                    const xOffset = index % 2 === 0 ? -40 : 40

                    return (
                      <div
                        key={step.id}
                        className="relative z-10 flex w-full items-center justify-center py-6"
                        style={{ transform: `translateX(${xOffset}px)` }}
                      >
                        <button
                          onClick={() => !isLocked && setSelectedStep(step)}
                          disabled={isLocked}
                          className={`flex h-20 w-20 flex-col items-center justify-center rounded-full transition-all ${
                            isLocked ? "cursor-not-allowed opacity-50" : ""
                          } ${isCurrent ? "animate-pulse" : ""}`}
                          style={{
                            backgroundColor: isCompleted
                              ? theme.completedNodeColor
                              : isCurrent
                                ? theme.currentNodeColor
                                : theme.lockedNodeColor,
                            boxShadow: isCurrent
                              ? `0 0 0 6px ${theme.currentNodeColor}44, 0 0 30px ${theme.currentNodeColor}33`
                              : isCompleted
                                ? `0 0 0 4px ${theme.completedNodeColor}33`
                                : "0 4px 12px rgba(0,0,0,.12)",
                          }}
                          aria-label={`${step.title} - ${isCompleted ? "completed" : isCurrent ? "current step" : "locked"}`}
                        >
                          {isCompleted ? (
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <StepIcon type={step.icon} color={isLocked ? "#999" : "white"} />
                          )}
                          <span className={`mt-0.5 text-[10px] font-bold ${isLocked ? "text-[#999]" : "text-white"}`}>
                            {step.label}
                          </span>
                        </button>
                      </div>
                    )
                  })}

                  {/* Vehicle + Character at current position */}
                  <div className="relative z-10 mt-4 flex flex-col items-center gap-3 pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${theme.primaryColor}33`, boxShadow: `0 0 20px ${theme.primaryColor}22` }}
                      >
                        {activeVehicle?.icon}
                      </div>
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${theme.primaryColor}33`, boxShadow: `0 0 20px ${theme.primaryColor}22` }}
                      >
                        {activeCharacter?.icon}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-md">
                      You are here!
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Modal */}
              <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-8 text-center" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader className="flex flex-col items-center gap-3">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${theme.primaryColor}22` }}
                    >
                      {selectedStep && <StepIcon type={selectedStep.icon} color={theme.primaryColor} />}
                    </div>
                    <DialogTitle className="text-2xl font-bold" style={{ color: theme.textDark }}>
                      {selectedStep?.title}
                    </DialogTitle>
                    <DialogDescription className="text-base leading-relaxed" style={{ color: theme.textMid }}>
                      {selectedStep?.description}
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    size="lg"
                    className="mt-6 w-full rounded-2xl py-6 text-lg font-bold text-white"
                    style={{ backgroundColor: theme.primaryColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.primaryHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.primaryColor)}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Upload Photo to Complete
                  </Button>
                </DialogContent>
              </Dialog>

              {/* Vehicle Picker */}
              <Dialog open={showVehiclePicker} onOpenChange={setShowVehiclePicker}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>Choose Your Vehicle</DialogTitle>
                    <DialogDescription style={{ color: theme.textMid }}>How will you travel the path?</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {theme.vehicles.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedVehicle(v.id); setShowVehiclePicker(false) }}
                        className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
                          selectedVehicle === v.id ? "ring-2 scale-105" : "hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: selectedVehicle === v.id ? `${theme.primaryColor}22` : `${theme.primaryColor}08`,
                          ringColor: selectedVehicle === v.id ? theme.primaryColor : "transparent",
                        }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center">
                          {v.icon}
                        </div>
                        <span className="text-xs font-bold" style={{ color: theme.textDark }}>{v.label}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Character Picker */}
              <Dialog open={showCharacterPicker} onOpenChange={setShowCharacterPicker}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>Choose Your Companion</DialogTitle>
                    <DialogDescription style={{ color: theme.textMid }}>Who will join you on your adventure?</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {theme.characters.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCharacter(c.id); setShowCharacterPicker(false) }}
                        className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
                          selectedCharacter === c.id ? "ring-2 scale-105" : "hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: selectedCharacter === c.id ? `${theme.primaryColor}22` : `${theme.primaryColor}08`,
                          ringColor: selectedCharacter === c.id ? theme.primaryColor : "transparent",
                        }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center">
                          {c.icon}
                        </div>
                        <span className="text-xs font-bold" style={{ color: theme.textDark }}>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            /* Journal Tab */
            <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 py-8">
              <section className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
                  {"Today's Journal"}
                </h2>
                <p className="mt-1 text-sm" style={{ color: theme.textLight }}>
                  {"Reflect on your journey so far."}
                </p>
              </section>

              <div
                className="mb-8 w-full max-w-sm rounded-3xl px-7 py-8 text-center backdrop-blur-md"
                style={{ backgroundColor: `${theme.cardBg}dd` }}
              >
                <p className="text-lg font-bold leading-relaxed" style={{ color: theme.textDark }}>
                  What are you excited for today?
                </p>
              </div>

              <div className="mb-6 flex flex-col items-center gap-3">
                <button
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => setIsRecording(false)}
                  onMouseLeave={() => setIsRecording(false)}
                  onTouchStart={() => setIsRecording(true)}
                  onTouchEnd={() => setIsRecording(false)}
                  className="flex h-20 w-20 items-center justify-center rounded-full transition-all"
                  style={{
                    backgroundColor: isRecording ? "#FF6B6B" : theme.primaryColor,
                    transform: isRecording ? "scale(1.1)" : "scale(1)",
                    boxShadow: isRecording
                      ? "0 0 0 8px rgba(255,107,107,0.25), 0 0 24px rgba(255,107,107,0.3)"
                      : `0 0 0 0 transparent, 0 4px 20px ${theme.primaryColor}44`,
                  }}
                  aria-label="Hold to record"
                >
                  {isRecording ? <Pause className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
                </button>
                <span className="text-sm font-semibold" style={{ color: theme.textLight }}>
                  {isRecording ? "Recording..." : "Hold to record"}
                </span>
              </div>

              {/* Streak + Pause info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full bg-black/15 px-4 py-2 backdrop-blur-md">
                  <Flame className="h-4 w-4 text-[#FF6B35]" />
                  <span className="text-sm font-bold text-white">5 day streak</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-black/15 px-4 py-2 backdrop-blur-md">
                  <Pause className="h-4 w-4 text-[#6BC5E8]" />
                  <span className="text-sm font-bold text-white">2 pauses</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Tab Bar */}
        <nav
          className="flex shrink-0 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            borderTop: `1px solid ${theme.primaryColor}33`,
          }}
          aria-label="Main navigation"
        >
          <button
            onClick={() => setActiveTab("map")}
            className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
            style={{ color: activeTab === "map" ? theme.primaryColor : "rgba(255,255,255,0.45)" }}
            aria-current={activeTab === "map" ? "page" : undefined}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs font-bold">My Map</span>
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
            style={{ color: activeTab === "journal" ? "#FF9F43" : "rgba(255,255,255,0.45)" }}
            aria-current={activeTab === "journal" ? "page" : undefined}
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs font-bold">Journal</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
