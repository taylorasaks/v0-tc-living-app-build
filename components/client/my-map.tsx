"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 1, label: "Step 1", emoji: "🛒", title: "Go Get Groceries", description: "Head to the store and pick up what you need for the week." },
  { id: 2, label: "Step 2", emoji: "💊", title: "Health Check-Up", description: "Visit your doctor or go to your health appointment." },
  { id: 3, label: "Step 3", emoji: "💸", title: "Pay Your Bills", description: "Make sure your bills are paid on time this month." },
  { id: 4, label: "Step 4", emoji: "🛒", title: "Meal Prep", description: "Cook some food ahead of time so you eat well all week." },
  { id: 5, label: "Step 5", emoji: "💊", title: "Pick Up Medicine", description: "Go to the pharmacy and grab your prescriptions." },
  { id: 6, label: "Step 6", emoji: "💸", title: "Budget Review", description: "Look at your spending and see how you are doing." },
]

const currentStep = 2

export function MyMap() {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null)
  const fuelLevel = 65

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#e0f7f3] via-[#d4f1ec] to-[#c8eae4]">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-[#e0f7f3]/90 px-5 py-4 backdrop-blur-sm">
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs font-bold tracking-wide text-[#2d6a5e]">FUEL</span>
          <Progress value={fuelLevel} className="h-4 rounded-full bg-[#b8ddd5]" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#d4f1ec] px-3 py-1.5">
          <span className="text-lg">🧊</span>
          <span className="text-sm font-bold text-[#2d6a5e]">Freezes: 2</span>
        </div>
      </div>

      {/* Scrollable Path */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-4">
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
              stroke="#8CD4C8"
              strokeWidth="60"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d="M160 880 C160 830, 80 780, 80 720 C80 660, 240 620, 240 560 C240 500, 80 460, 80 400 C80 340, 240 300, 240 240 C240 180, 80 140, 80 80 C80 40, 160 20, 160 0"
              stroke="#5BBFB3"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="12 8"
              opacity="0.6"
            />
          </svg>

          {/* Fork in the Road - Choose Your Adventure */}
          <div className="relative z-10 mb-8 mt-4 flex w-full flex-col items-center gap-3">
            <span className="mb-1 text-sm font-bold tracking-wide text-[#2d6a5e]">CHOOSE YOUR ADVENTURE</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/savannah"
                className="flex h-24 w-28 flex-col items-center justify-center gap-1 rounded-2xl bg-[#FFD93D] shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-3xl">{"\u{1F992}"}</span>
                <span className="text-sm font-bold text-[#5a4a00]">Savannah</span>
              </Link>
              <Link
                href="/ocean"
                className="flex h-24 w-28 flex-col items-center justify-center gap-1 rounded-2xl bg-[#6BC5E8] shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-3xl">{"\u{1F422}"}</span>
                <span className="text-sm font-bold text-[#1a4a5e]">Ocean</span>
              </Link>
              <Link
                href="/jungle"
                className="flex h-24 w-28 flex-col items-center justify-center gap-1 rounded-2xl bg-[#4ADE80] shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-3xl">{"\u{1F412}"}</span>
                <span className="text-sm font-bold text-[#1a4a2a]">Jungle</span>
              </Link>
            </div>
          </div>

          {/* Steps - rendered top to bottom (6 down to 1) */}
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
                    isCompleted
                      ? "bg-[#4ECDC4] text-white ring-4 ring-[#4ECDC4]/30"
                      : isCurrent
                        ? "bg-[#FF6B6B] text-white ring-4 ring-[#FF6B6B]/30 animate-pulse"
                        : "bg-[#d4d4d4] text-[#888] cursor-not-allowed opacity-60"
                  }`}
                >
                  <span className="text-xl">{isCompleted ? "✅" : step.emoji}</span>
                  <span className="mt-0.5 text-xs font-bold">{step.label}</span>
                </button>
              </div>
            )
          })}

          {/* Moto - at the bottom */}
          <div className="relative z-10 mt-4 flex flex-col items-center gap-1 pb-4">
            <span className="text-4xl">🚗</span>
            <span className="text-xs font-bold text-[#2d6a5e]">You are here!</span>
          </div>
        </div>
      </div>

      {/* Step Modal */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 bg-white p-8 text-center">
          <DialogHeader className="flex flex-col items-center gap-2">
            <span className="text-6xl">{selectedStep?.emoji}</span>
            <DialogTitle className="text-2xl font-bold text-[#2d6a5e]">
              {selectedStep?.title}
            </DialogTitle>
            <DialogDescription className="text-base text-[#5a7a74]">
              {selectedStep?.description}
            </DialogDescription>
          </DialogHeader>
          <Button
            size="lg"
            className="mt-6 w-full rounded-2xl bg-[#4ECDC4] py-6 text-lg font-bold text-white hover:bg-[#3dbdb5]"
          >
            <Camera className="mr-2 h-5 w-5" />
            Upload Photo to Complete
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
