"use client"

import { useState } from "react"
import { Camera, Map, BookOpen, ArrowLeft } from "lucide-react"
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
  pathStroke: string
  pathDash: string
  topBarBg: string
  fuelTrack: string
  freezeBg: string
  cardBg: string
  tabActiveBg: string
  tabInactiveBg: string
  currentNodeColor: string
  completedNodeColor: string
  lockedNodeColor: string
  character: React.ReactNode
  sceneryElements: React.ReactNode
}

const steps = [
  { id: 1, label: "Step 1", emoji: "\u{1F6D2}", title: "Go Get Groceries", description: "Head to the store and pick up what you need for the week." },
  { id: 2, label: "Step 2", emoji: "\u{1F48A}", title: "Health Check-Up", description: "Visit your doctor or go to your health appointment." },
  { id: 3, label: "Step 3", emoji: "\u{1F4B8}", title: "Pay Your Bills", description: "Make sure your bills are paid on time this month." },
  { id: 4, label: "Step 4", emoji: "\u{1F6D2}", title: "Meal Prep", description: "Cook some food ahead of time so you eat well all week." },
  { id: 5, label: "Step 5", emoji: "\u{1F48A}", title: "Pick Up Medicine", description: "Go to the pharmacy and grab your prescriptions." },
  { id: 6, label: "Step 6", emoji: "\u{1F4B8}", title: "Budget Review", description: "Look at your spending and see how you are doing." },
]

const currentStep = 2

export function AdventureMap({ theme }: { theme: AdventureTheme }) {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null)
  const [activeTab, setActiveTab] = useState<"map" | "journal">("map")
  const [isRecording, setIsRecording] = useState(false)
  const fuelLevel = 65

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${theme.bgImage})` }}
      />
      {/* Overlay for readability */}
      <div
        className="fixed inset-0"
        style={{
          background: `linear-gradient(to bottom, ${theme.overlayFrom}, ${theme.overlayVia}, ${theme.overlayTo})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Adventure Name Banner */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-105"
            style={{ backgroundColor: `${theme.primaryColor}33` }}
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" style={{ color: theme.textDark }} />
          </Link>
          <div className="flex flex-1 flex-col">
            <h1
              className="text-2xl font-extrabold tracking-tight drop-shadow-md"
              style={{ color: theme.textDark }}
            >
              {theme.name} Adventure
            </h1>
            <p
              className="text-sm font-semibold drop-shadow-sm"
              style={{ color: theme.textMid }}
            >
              {theme.tagline}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex min-h-0 flex-1 flex-col">
          {activeTab === "map" ? (
            <div className="relative flex min-h-0 flex-1 flex-col">
              {/* Top Bar */}
              <div
                className="sticky top-0 z-10 mx-4 mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md"
                style={{ backgroundColor: theme.topBarBg }}
              >
                <div className="flex flex-1 flex-col gap-1">
                  <span
                    className="text-xs font-bold tracking-wide"
                    style={{ color: theme.textDark }}
                  >
                    FUEL
                  </span>
                  <Progress
                    value={fuelLevel}
                    className="h-4 rounded-full"
                    style={{ backgroundColor: theme.fuelTrack }}
                  />
                </div>
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{ backgroundColor: theme.freezeBg }}
                >
                  <span className="text-lg">{"\u{1F9CA}"}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: theme.textDark }}
                  >
                    Freezes: 2
                  </span>
                </div>
              </div>

              {/* Scrollable Path */}
              <div className="flex-1 overflow-y-auto px-4 pb-32 pt-4">
                {/* Scenery decorations */}
                {theme.sceneryElements}

                <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
                  {/* SVG River Path */}
                  <svg
                    className="absolute left-0 top-0 h-full w-full"
                    viewBox="0 0 320 900"
                    preserveAspectRatio="none"
                    fill="none"
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
                      opacity="0.6"
                    />
                  </svg>

                  {/* Steps */}
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
                          className={`flex h-20 w-20 flex-col items-center justify-center rounded-full shadow-lg transition-all ${
                            isLocked ? "cursor-not-allowed opacity-60" : ""
                          } ${isCurrent ? "animate-pulse" : ""}`}
                          style={{
                            backgroundColor: isCompleted
                              ? theme.completedNodeColor
                              : isCurrent
                                ? theme.currentNodeColor
                                : theme.lockedNodeColor,
                            color: isLocked ? "#888" : "#fff",
                            boxShadow: isCurrent
                              ? `0 0 0 6px ${theme.currentNodeColor}55`
                              : isCompleted
                                ? `0 0 0 6px ${theme.completedNodeColor}44`
                                : "0 4px 12px rgba(0,0,0,.15)",
                          }}
                        >
                          <span className="text-xl">
                            {isCompleted ? "\u2705" : step.emoji}
                          </span>
                          <span className="mt-0.5 text-xs font-bold">
                            {step.label}
                          </span>
                        </button>
                      </div>
                    )
                  })}

                  {/* Character at bottom */}
                  <div className="relative z-10 mt-4 flex flex-col items-center gap-2 pb-4">
                    {theme.character}
                    <span
                      className="text-sm font-bold drop-shadow-sm"
                      style={{ color: theme.textDark }}
                    >
                      You are here!
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Modal */}
              <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-8 text-center" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader className="flex flex-col items-center gap-2">
                    <span className="text-6xl">{selectedStep?.emoji}</span>
                    <DialogTitle
                      className="text-2xl font-bold"
                      style={{ color: theme.textDark }}
                    >
                      {selectedStep?.title}
                    </DialogTitle>
                    <DialogDescription
                      className="text-base"
                      style={{ color: theme.textMid }}
                    >
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
            </div>
          ) : (
            /* Journal Tab */
            <div className="flex min-h-0 flex-1 flex-col items-center px-6 py-8">
              <div className="mb-8 text-center">
                <h1
                  className="text-3xl font-bold drop-shadow-md"
                  style={{ color: theme.textDark }}
                >
                  {"Good Morning! \u{1F305}"}
                </h1>
                <p
                  className="mt-1 text-base"
                  style={{ color: theme.textMid }}
                >
                  {"Let's check in with yourself today."}
                </p>
              </div>
              <div
                className="mb-10 w-full max-w-sm rounded-3xl px-8 py-10 text-center shadow-lg backdrop-blur-md"
                style={{ backgroundColor: `${theme.cardBg}cc` }}
              >
                <span className="mb-4 block text-5xl">{"\u{1F60A}"}</span>
                <h2
                  className="text-xl font-bold leading-relaxed"
                  style={{ color: theme.textDark }}
                >
                  What are you excited for today?
                </h2>
              </div>
              <div className="mb-8 flex flex-col items-center gap-3">
                <button
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => setIsRecording(false)}
                  onMouseLeave={() => setIsRecording(false)}
                  onTouchStart={() => setIsRecording(true)}
                  onTouchEnd={() => setIsRecording(false)}
                  className="flex h-24 w-24 items-center justify-center rounded-full shadow-xl transition-all"
                  style={{
                    backgroundColor: isRecording ? "#FF6B6B" : theme.primaryColor,
                    transform: isRecording ? "scale(1.1)" : "scale(1)",
                    boxShadow: isRecording
                      ? "0 0 0 8px rgba(255,107,107,.3)"
                      : `0 0 0 0px transparent`,
                  }}
                  aria-label="Hold to record"
                >
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <span
                  className="text-sm font-bold"
                  style={{ color: theme.textMid }}
                >
                  {isRecording ? "Recording... \u{1F399}\u{FE0F}" : "Hold to Record \u{1F399}\u{FE0F}"}
                </span>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-6 py-3 shadow-md backdrop-blur-md"
                style={{ backgroundColor: `${theme.cardBg}b3` }}
              >
                <span className="text-2xl">{"\u{1F525}"}</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: theme.textDark }}
                >
                  5 Day Streak!
                </span>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Tab Bar */}
        <nav
          className="flex shrink-0 backdrop-blur-md"
          style={{
            backgroundColor: `${theme.cardBg}dd`,
            borderTop: `1px solid ${theme.primaryColor}33`,
          }}
          aria-label="Main navigation"
        >
          <button
            onClick={() => setActiveTab("map")}
            className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
            style={{
              color: activeTab === "map" ? theme.primaryColor : "#a0a0a0",
            }}
            aria-current={activeTab === "map" ? "page" : undefined}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs font-bold">My Map</span>
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
            style={{
              color: activeTab === "journal" ? "#FF9F43" : "#a0a0a0",
            }}
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
