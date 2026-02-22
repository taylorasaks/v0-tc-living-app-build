"use client"

import { useState } from "react"
import {
  Camera, ArrowLeft, Mic, Pause, Flame, Wind,
  Brain, Trash2, Gem, AlertTriangle, ChevronUp, Star, Lock,
  Shirt, Palette, Zap, BookOpen, Map, Ghost, Trophy, Sparkles
} from "lucide-react"

/* -- XP currency per adventure (matches home page) -- */
const xpCurrencies: Record<string, { name: string; emoji: string; color: string }> = {
  Jungle:     { name: "Bananas",    emoji: "\u{1F34C}", color: "#FFD700" },
  Savannah:   { name: "Acorns",     emoji: "\u{1F330}", color: "#D4872C" },
  Ocean:      { name: "Sea Shells", emoji: "\u{1F41A}", color: "#1E90FF" },
  Desert:     { name: "Scarabs",    emoji: "\u{1FAB2}", color: "#E8A435" },
  Mountains:  { name: "Crystals",   emoji: "\u{1F48E}", color: "#7F9BAA" },
  Antarctica: { name: "Snowflakes", emoji: "\u{2744}\u{FE0F}",  color: "#89CFF0" },
  Volcano:    { name: "Embers",     emoji: "\u{1F525}", color: "#E84535" },
  City:       { name: "Tokens",     emoji: "\u{1FA99}", color: "#8080FF" },
  Atlantis:   { name: "Pearls",     emoji: "\u{1FAE7}", color: "#00CED1" },
}
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/* -- Exported Types -- */
export interface VehicleOption { id: string; label: string; icon: React.ReactNode }
export interface CharacterOption { id: string; label: string; icon: React.ReactNode }
export interface AdventureTheme {
  name: string; tagline: string; bgImage: string
  overlayFrom: string; overlayVia: string; overlayTo: string
  primaryColor: string; primaryHover: string; primaryRing: string
  textDark: string; textMid: string; textLight: string
  pathStroke: string; pathDash: string; topBarBg: string; fuelTrack: string; cardBg: string
  currentNodeColor: string; completedNodeColor: string; lockedNodeColor: string
  vehicles: VehicleOption[]; characters: CharacterOption[]
  sceneryElements: React.ReactNode
  forkOptions?: { name: string; href: string; color: string }[]
}

/* -- Real-life task pools for mix-and-match across adventures -- */
const questPool = [
  { icon: "cart", title: "Make Your Bed", description: "Start your day with one completed task. Make your bed neatly.", reflection: "How did it feel to start your day with something already done?" },
  { icon: "cart", title: "Put 5 Items Back in Place", description: "Find 5 things out of place and return them where they belong.", reflection: "Did tidying up your space change how you feel inside?" },
  { icon: "health", title: "Go for a 5-Minute Walk", description: "Step outside and walk for at least 5 minutes. Fresh air helps.", reflection: "What did you notice outside that you usually miss?" },
  { icon: "cart", title: "Take Out the Trash", description: "Gather any trash around your space and take it out.", reflection: "Is there anything else in your life you are ready to let go of?" },
  { icon: "cart", title: "Do a Load of Laundry", description: "Wash, dry, or fold one load of laundry today.", reflection: "How does taking care of small things help you feel more in control?" },
  { icon: "health", title: "Sit Outside for 3 Minutes", description: "Go outside, sit down, and just breathe for 3 minutes.", reflection: "What came to mind while you were sitting quietly?" },
  { icon: "bill", title: "Pay One Bill", description: "Choose one bill and pay it or set up a payment reminder.", reflection: "How does handling one responsibility change your stress level?" },
  { icon: "cart", title: "Reply to One Important Message", description: "Check your messages and reply to one you have been putting off.", reflection: "What was holding you back from replying, and how do you feel now?" },
  { icon: "health", title: "Schedule an Appointment", description: "Call or book one appointment you have been avoiding.", reflection: "What made this appointment feel hard to schedule?" },
  { icon: "cart", title: "Organize a Drawer", description: "Pick one drawer and organize it. Remove what you do not need.", reflection: "Does organizing your space help organize your thoughts too?" },
  { icon: "cook", title: "Complete 2 Small Tasks Today", description: "Pick 2 quick tasks from your to-do list and finish them.", reflection: "Which task felt easier and which felt harder? Why?" },
  { icon: "budget", title: "Break a Big Task into 3 Steps", description: "Take one overwhelming task and write out 3 small steps for it.", reflection: "Does the big task feel more manageable now that it is broken down?" },
]

const roadblockPool = [
  { icon: "brain", title: "Label One Emotion Today", description: "Pause and name exactly what you are feeling right now.", type: "thought" as const },
  { icon: "brain", title: "Replace One Negative Thought", description: "Catch a negative thought and rewrite it as something balanced.", type: "thought" as const },
  { icon: "wind", title: "Drop One Worry in the Worry Box", description: "Write down a worry and let it go. You can revisit it with your therapist.", type: "roadblock" as const },
  { icon: "brain", title: "Write One Balanced Thought", description: "Take a harsh self-judgment and write a more balanced version.", type: "thought" as const },
]

const triggerPool = [
  { icon: "alert", title: "Pause for 30 Seconds", description: "Before responding, take 30 seconds to breathe and ground yourself." },
  { icon: "alert", title: "Name Your Biggest Stressor", description: "Identify the single biggest source of stress right now and acknowledge it." },
  { icon: "alert", title: "Reflect on One Win", description: "Think of one thing you did well recently. Hold onto that feeling." },
  { icon: "alert", title: "Set Some Reminders", description: "Set 2-3 reminders for things you need to do this week." },
]

/* -- Build adventure steps from pools using a seed based on theme name -- */
function buildAdventureSteps(themeName: string) {
  // Simple hash seed from theme name
  let seed = 0
  for (let i = 0; i < themeName.length; i++) seed += themeName.charCodeAt(i) * (i + 1)

  const pick = <T,>(arr: T[], count: number): T[] => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280
      const j = Math.floor((seed / 233280) * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, count)
  }

  const quests = pick(questPool, 8)
  const roadblocks = pick(roadblockPool, 3 + (seed % 2)) // 3 or 4
  const trigger = pick(triggerPool, 1)[0]

  // Interleave: Q1, Q2, R1, Q3, Q4, R2, Q5, Trigger, Q6, R3, Q7, Q8, [R4?], Fork, Treasure
  const steps: { id: number; num: number; label: string; icon: string; title: string; description: string; reflection?: string; type: "task" | "roadblock" | "monster" | "trigger" | "thought" | "fork" | "reward" }[] = []
  let id = 1
  let qIdx = 0
  let rIdx = 0
  let qNum = 0

  // Q1, Q2
  for (let i = 0; i < 2 && qIdx < quests.length; i++) {
    qNum++; steps.push({ id: id++, num: qNum, label: `Quest #${qNum}`, icon: quests[qIdx].icon, title: quests[qIdx].title, description: quests[qIdx].description, reflection: quests[qIdx].reflection, type: "task" }); qIdx++
  }
  // R1
  if (rIdx < roadblocks.length) {
    const rb = roadblocks[rIdx++]
    steps.push({ id: id++, num: 0, label: "Roadblock", icon: rb.icon, title: rb.title, description: rb.description, type: rb.type })
  }
  // Q3, Q4
  for (let i = 0; i < 2 && qIdx < quests.length; i++) {
    qNum++; steps.push({ id: id++, num: qNum, label: `Quest #${qNum}`, icon: quests[qIdx].icon, title: quests[qIdx].title, description: quests[qIdx].description, reflection: quests[qIdx].reflection, type: "task" }); qIdx++
  }
  // R2
  if (rIdx < roadblocks.length) {
    const rb = roadblocks[rIdx++]
    steps.push({ id: id++, num: 0, label: "Roadblock", icon: rb.icon, title: rb.title, description: rb.description, type: rb.type })
  }
  // Q5
  if (qIdx < quests.length) {
    qNum++; steps.push({ id: id++, num: qNum, label: `Quest #${qNum}`, icon: quests[qIdx].icon, title: quests[qIdx].title, description: quests[qIdx].description, reflection: quests[qIdx].reflection, type: "task" }); qIdx++
  }
  // Trigger event
  steps.push({ id: id++, num: 0, label: "Trigger", icon: trigger.icon, title: trigger.title, description: trigger.description, type: "trigger" })
  // Q6
  if (qIdx < quests.length) {
    qNum++; steps.push({ id: id++, num: qNum, label: `Quest #${qNum}`, icon: quests[qIdx].icon, title: quests[qIdx].title, description: quests[qIdx].description, reflection: quests[qIdx].reflection, type: "task" }); qIdx++
  }
  // R3
  if (rIdx < roadblocks.length) {
    const rb = roadblocks[rIdx++]
    steps.push({ id: id++, num: 0, label: "Roadblock", icon: rb.icon, title: rb.title, description: rb.description, type: rb.type })
  }
  // Q7, Q8
  for (let i = 0; i < 2 && qIdx < quests.length; i++) {
    qNum++; steps.push({ id: id++, num: qNum, label: `Quest #${qNum}`, icon: quests[qIdx].icon, title: quests[qIdx].title, description: quests[qIdx].description, reflection: quests[qIdx].reflection, type: "task" }); qIdx++
  }
  // R4 if applicable
  if (rIdx < roadblocks.length) {
    const rb = roadblocks[rIdx++]
    steps.push({ id: id++, num: 0, label: "Roadblock", icon: rb.icon, title: rb.title, description: rb.description, type: rb.type })
  }
  // Fork + Treasure
  steps.push({ id: id++, num: 0, label: "Fork", icon: "fork", title: "Fork in the Road", description: "Choose your next landscape!", type: "fork" })
  steps.push({ id: id++, num: 0, label: "Treasure", icon: "star", title: "Treasure Chest", description: "Collect your reward and reflect.", type: "reward" })

  return steps
}

/* -- Upgrade tiers -- */
const movementTiers = ["Walking", "Car", "Flying"]
const upgradeItems = [
  { id: "dress", label: "Dress Character", icon: Shirt, cost: 50 },
  { id: "emote", label: "Add Emote", icon: Sparkles, cost: 25 },
  { id: "color", label: "Add Color", icon: Palette, cost: 30 },
  { id: "movement", label: "Upgrade Movement", icon: Zap, cost: 80 },
]

/* -- Human characters (shared across all adventures) -- */
const humanCharacters = [
  { id: "explorer", label: "Explorer" }, { id: "captain", label: "Captain" },
  { id: "fairy", label: "Fairy" }, { id: "sorcerist", label: "Sorcerist" },
  { id: "wizard", label: "Wizard" }, { id: "knight", label: "Knight" },
]

/* -- Scary thoughts for monster quest -- */
const scaryThoughts = [
  "I am not good enough", "Nobody likes me", "I always fail", "Something bad will happen", "I am all alone",
]

/* -- Step Icons -- */
function StepIcon({ type, color }: { type: string; color: string }) {
  const props = { className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: color, strokeWidth: 2 }
  switch (type) {
    case "cart": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
    case "health": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    case "bill": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
    case "cook": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>
    case "budget": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
    case "wind": return <Wind className="h-7 w-7" style={{ color }} />
    case "alert": return <AlertTriangle className="h-7 w-7" style={{ color }} />
    case "brain": return <Brain className="h-7 w-7" style={{ color }} />
    case "ghost": return <Ghost className="h-7 w-7" style={{ color }} />
    case "fork": return <ChevronUp className="h-7 w-7 rotate-90" style={{ color }} />
    case "star": return <Star className="h-7 w-7" style={{ color }} />
    default: return null
  }
}

function getNodeColor(stepId: number, cs: number, theme: AdventureTheme) {
  if (stepId < cs) return theme.completedNodeColor
  if (stepId === cs) return theme.currentNodeColor
  return theme.lockedNodeColor
}

function getSpecialRing(type: string) {
  switch (type) {
    case "roadblock": return "#4ECDC4"
    case "trigger": return "#E84535"
    case "thought": return "#9B59B6"
    case "monster": return "#FF6B6B"
    case "fork": return "#FFD700"
    case "reward": return "#FFD700"
    default: return "transparent"
  }
}

/* ===== MAIN COMPONENT ===== */
export function AdventureMap({ theme }: { theme: AdventureTheme }) {
  const steps = buildAdventureSteps(theme.name)
  const currentStep = 3
  const [selectedStep, setSelectedStep] = useState<(typeof steps)[number] | null>(null)
  const [activeTab, setActiveTab] = useState<"map" | "journal">("map")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(theme.vehicles[0]?.id ?? "")
  const [selectedCharacter, setSelectedCharacter] = useState(theme.characters[0]?.id ?? "")
  const [showVehiclePicker, setShowVehiclePicker] = useState(false)
  const [showCharacterPicker, setShowCharacterPicker] = useState(false)
  const [showUpgradeShop, setShowUpgradeShop] = useState(false)
  const [showForkPicker, setShowForkPicker] = useState(false)
  const [showRewardCelebration, setShowRewardCelebration] = useState(false)
  const [thoughtText, setThoughtText] = useState("")
  const [breathCount, setBreathCount] = useState(0)
  const [monsterSize, setMonsterSize] = useState(100) // shrinks as user works through it
  const [movementTier] = useState(0)
  const [triggerActive, setTriggerActive] = useState(false)
  const xp = 240
  const cur = xpCurrencies[theme.name] ?? { name: "XP", emoji: "\u{2B50}", color: "#FFD700" }

  const activeVehicle = theme.vehicles.find((v) => v.id === selectedVehicle) ?? theme.vehicles[0]
  const activeCharacter = theme.characters.find((c) => c.id === selectedCharacter) ?? theme.characters[0]

  function handleStepClick(step: (typeof steps)[number]) {
    if (step.id > currentStep) return
    if (step.type === "fork") { setShowForkPicker(true); return }
    if (step.type === "reward") { setShowRewardCelebration(true); return }
    if (step.type === "trigger") setTriggerActive(true)
    setSelectedStep(step)
  }

  const forkOptions = theme.forkOptions ?? [
    { name: "Jungle", href: "/jungle", color: "#2E8B57" },
    { name: "Savannah", href: "/savannah", color: "#D4872C" },
    { name: "Ocean", href: "/ocean", color: "#1E90FF" },
    { name: "Desert", href: "/desert", color: "#E8A435" },
    { name: "Mountains", href: "/mountains", color: "#7F9BAA" },
    { name: "Antarctica", href: "/antarctica", color: "#89CFF0" },
    { name: "Volcano", href: "/volcano", color: "#E84535" },
    { name: "City", href: "/city", color: "#8080FF" },
    { name: "Atlantis", href: "/atlantis", color: "#00CED1" },
  ]

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${theme.bgImage})` }} aria-hidden="true" />
      <div className="fixed inset-0" aria-hidden="true" style={{ background: `linear-gradient(to bottom, ${theme.overlayFrom}, ${theme.overlayVia}, ${theme.overlayTo})` }} />

      {/* Snowstorm trigger effect */}
      {triggerActive && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {/* Darkened sky */}
          <div className="absolute inset-0 bg-[#1a1030]/60 animate-pulse" style={{ animationDuration: "3s" }} />
          {/* Snow particles */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                opacity: 0.5 + Math.random() * 0.5,
                animation: `snowfall ${2 + Math.random() * 4}s linear ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
          {/* Wind streaks */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`w${i}`}
              className="absolute h-px bg-white/30"
              style={{
                width: `${30 + Math.random() * 60}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: "rotate(-25deg)",
                animation: `windStreak ${1 + Math.random() * 2}s linear ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
          {/* Warning banner */}
          <div className="absolute inset-x-0 top-20 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-[#E84535]/90 px-5 py-2.5 shadow-2xl backdrop-blur-sm animate-bounce" style={{ animationDuration: "2s" }}>
              <AlertTriangle className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white">Storm Approaching!</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        {/* -- Top Bar -- */}
        <header className="flex shrink-0 items-center gap-3 px-4 pt-4 pb-2">
          <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-transform hover:scale-105" aria-label="Back to home">
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>
          <div className="flex flex-1 flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-white drop-shadow-md">{theme.name} Adventure</h1>
            <p className="text-xs font-semibold drop-shadow-sm" style={{ color: theme.textLight }}>{theme.tagline}</p>
          </div>
          <button onClick={() => setShowUpgradeShop(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-md" aria-label="Upgrade shop">
            <Zap className="h-4 w-4 text-[#FFD700]" />
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md" style={{ borderLeft: `2px solid ${cur.color}` }}>
            <span className="text-sm leading-none">{cur.emoji}</span>
            <span className="text-sm font-bold" style={{ color: cur.color }}>{xp}</span>
          </div>
        </header>

        {/* -- Main -- */}
        <main className="flex min-h-0 flex-1 flex-col">
          {activeTab === "map" ? (
            <div className="relative flex min-h-0 flex-1 flex-col">
              {/* Vehicle/Character Bar */}
              <div className="sticky top-0 z-10 mx-4 mt-2 flex flex-col gap-2 rounded-2xl px-4 py-3 backdrop-blur-md" style={{ backgroundColor: theme.topBarBg }}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowVehiclePicker(true)} className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-black/5" style={{ backgroundColor: `${theme.primaryColor}15` }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${theme.primaryColor}30` }}>{activeVehicle?.icon}</div>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.textMid }}>Vehicle</span>
                      <span className="text-xs font-bold" style={{ color: theme.textDark }}>{activeVehicle?.label}</span>
                    </div>
                  </button>
                  <button onClick={() => setShowCharacterPicker(true)} className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-black/5" style={{ backgroundColor: `${theme.primaryColor}15` }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${theme.primaryColor}30` }}>{activeCharacter?.icon}</div>
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
                  <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 320 2600" preserveAspectRatio="none" fill="none" aria-hidden="true">
                    <path d="M160 2580 C160 2490, 80 2430, 80 2340 C80 2250, 240 2190, 240 2100 C240 2010, 80 1950, 80 1860 C80 1770, 240 1710, 240 1620 C240 1530, 80 1470, 80 1380 C80 1290, 240 1230, 240 1140 C240 1050, 80 990, 80 900 C80 810, 240 750, 240 660 C240 570, 80 510, 80 420 C80 330, 240 270, 240 180 C240 90, 160 30, 160 10" stroke={theme.pathStroke} strokeWidth="60" strokeLinecap="round" opacity="0.3" />
                    <path d="M160 2580 C160 2490, 80 2430, 80 2340 C80 2250, 240 2190, 240 2100 C240 2010, 80 1950, 80 1860 C80 1770, 240 1710, 240 1620 C240 1530, 80 1470, 80 1380 C80 1290, 240 1230, 240 1140 C240 1050, 80 990, 80 900 C80 810, 240 750, 240 660 C240 570, 80 510, 80 420 C80 330, 240 270, 240 180 C240 90, 160 30, 160 10" stroke={theme.pathDash} strokeWidth="8" strokeLinecap="round" strokeDasharray="12 8" opacity="0.5" />
                  </svg>

                  {/* Repetition tracker label */}
                  <div className="relative z-10 mb-2 rounded-full bg-black/20 px-4 py-1 backdrop-blur-md">
                    <span className="text-xs font-bold text-white">Repetition #1</span>
                  </div>

                  {[...steps].reverse().map((step, index) => {
                    const isCompleted = step.id < currentStep
                    const isCurrent = step.id === currentStep
                    const isLocked = step.id > currentStep
                    const xOffset = index % 2 === 0 ? -40 : 40
                    const nodeColor = getNodeColor(step.id, currentStep, theme)
                    const isSpecial = step.type !== "task"

                    return (
                      <div key={step.id} className="relative z-10 flex w-full items-center justify-center py-6" style={{ transform: `translateX(${xOffset}px)` }}>
                        <button
                          onClick={() => handleStepClick(step)}
                          disabled={isLocked}
                          className={`flex h-20 w-20 flex-col items-center justify-center rounded-full transition-all ${isLocked ? "cursor-not-allowed opacity-50" : ""} ${isCurrent ? "animate-pulse" : ""} ${isSpecial && !isLocked ? "ring-2 ring-offset-2 ring-offset-transparent" : ""}`}
                          style={{
                            backgroundColor: nodeColor,
                            boxShadow: isCurrent ? `0 0 0 6px ${nodeColor}44, 0 0 30px ${nodeColor}33` : isCompleted ? `0 0 0 4px ${nodeColor}33` : "0 4px 12px rgba(0,0,0,.12)",
                            ringColor: isSpecial && !isLocked ? getSpecialRing(step.type) : "transparent",
                          }}
                          aria-label={`${step.title} - ${isCompleted ? "completed" : isCurrent ? "current" : "locked"}`}
                        >
                          {isCompleted ? (
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          ) : (
                            <StepIcon type={step.icon} color={isLocked ? "#999" : "white"} />
                          )}
                          <span className={`mt-0.5 text-[9px] font-bold leading-tight ${isLocked ? "text-[#999]" : "text-white"}`}>{step.label}</span>
                        </button>
                        {!isLocked && (
                          <span className={`absolute text-xs font-bold text-white drop-shadow-md ${index % 2 === 0 ? "left-[60%]" : "right-[60%]"}`}>{step.title}</span>
                        )}
                      </div>
                    )
                  })}

                  {/* Vehicle + Character at current position */}
                  <div className="relative z-10 mt-4 flex flex-col items-center gap-3 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${theme.primaryColor}33`, boxShadow: `0 0 20px ${theme.primaryColor}22` }}>{activeVehicle?.icon}</div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${theme.primaryColor}33`, boxShadow: `0 0 20px ${theme.primaryColor}22` }}>{activeCharacter?.icon}</div>
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-md">You are here!</span>
                  </div>
                </div>
              </div>

              {/* -- Task Quest Modal -- */}
              <Dialog open={!!selectedStep && selectedStep.type === "task"} onOpenChange={() => setSelectedStep(null)}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-8 text-center" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${theme.primaryColor}22` }}>
                      {selectedStep && <StepIcon type={selectedStep.icon} color={theme.primaryColor} />}
                    </div>
                    <DialogTitle className="text-2xl font-bold" style={{ color: theme.textDark }}>{selectedStep?.title}</DialogTitle>
                    <DialogDescription className="text-base leading-relaxed" style={{ color: theme.textMid }}>{selectedStep?.description}</DialogDescription>
                  </DialogHeader>
                  <Button size="lg" className="mt-6 w-full rounded-2xl py-6 text-lg font-bold text-white" style={{ backgroundColor: theme.primaryColor }}>
                    <Camera className="mr-2 h-5 w-5" /> Upload Photo to Complete
                  </Button>
                </DialogContent>
              </Dialog>

              {/* -- Roadblock Modal -- */}
              <Dialog open={!!selectedStep && selectedStep.type === "roadblock"} onOpenChange={() => { setSelectedStep(null); setBreathCount(0) }}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6 text-center" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4ECDC4]/20"><Wind className="h-8 w-8 text-[#4ECDC4]" /></div>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>{selectedStep?.title}</DialogTitle>
                    <DialogDescription className="text-sm" style={{ color: theme.textMid }}>{selectedStep?.description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col items-center gap-3">
                    <div className={`flex h-28 w-28 items-center justify-center rounded-full transition-all duration-1000 ${breathCount % 2 === 0 ? "scale-100 bg-[#4ECDC4]/20" : "scale-125 bg-[#4ECDC4]/40"}`}>
                      <span className="text-lg font-bold text-[#4ECDC4]">{breathCount % 2 === 0 ? "Breathe In" : "Breathe Out"}</span>
                    </div>
                    <Button onClick={() => setBreathCount((c) => c + 1)} className="rounded-xl bg-[#4ECDC4] text-white hover:bg-[#3DBDB5]">
                      <Wind className="mr-2 h-4 w-4" /> {breathCount < 6 ? `Next (${breathCount}/6)` : "Done!"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Scary Monster Modal -- */}
              <Dialog open={!!selectedStep && selectedStep.type === "monster"} onOpenChange={() => { setSelectedStep(null); setMonsterSize(100) }}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#4A1A1A] bg-[#1A1014] p-6 text-center">
                  <DialogHeader className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF6B6B]/20"><Ghost className="h-8 w-8 text-[#FF6B6B]" /></div>
                    <DialogTitle className="text-xl font-bold text-white">Scary Monster</DialogTitle>
                    <DialogDescription className="text-sm text-[#CCA0A0]">A scary thought appeared! Shrink it by facing it head-on.</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="transition-all duration-500" style={{ transform: `scale(${monsterSize / 100})` }}>
                      <Ghost className="h-24 w-24 text-[#FF6B6B]" style={{ opacity: monsterSize / 100 }} />
                    </div>
                    <p className="text-sm text-[#CCA0A0]">Pick a thought and reframe it:</p>
                    <div className="flex flex-col gap-2 w-full">
                      {scaryThoughts.map((thought) => (
                        <button key={thought} onClick={() => setMonsterSize((s) => Math.max(10, s - 20))} className="rounded-xl bg-[#2A1A1A] p-3 text-sm text-white text-left transition-transform hover:scale-[1.02] active:scale-[0.98]">
                          {thought}
                        </button>
                      ))}
                    </div>
                    {monsterSize <= 20 && (
                      <div className="flex flex-col items-center gap-2">
                        <Sparkles className="h-8 w-8 text-[#FFD700]" />
                        <p className="text-sm font-bold text-[#FFD700]">You defeated the scary monster!</p>
                        <p className="text-xs text-[#CCA0A0]">+25 {cur.name} earned</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Trigger Modal (with snowstorm) -- */}
              <Dialog open={!!selectedStep && selectedStep.type === "trigger"} onOpenChange={() => { setSelectedStep(null); setTriggerActive(false) }}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#4A1A1A] bg-[#1A1014] p-6 text-center">
                  <DialogHeader className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E84535]/20"><AlertTriangle className="h-8 w-8 text-[#E84535]" /></div>
                    <DialogTitle className="text-xl font-bold text-white">{selectedStep?.title}</DialogTitle>
                    <DialogDescription className="text-sm text-[#CCA0A0]">{selectedStep?.description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col gap-2">
                    {["Deep Breathing", "Call a Safe Person", "Ground Yourself (5-4-3-2-1)", "Move Your Body"].map((skill) => (
                      <button key={skill} onClick={() => { setSelectedStep(null); setTriggerActive(false) }} className="rounded-xl bg-[#2A1A1A] p-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">{skill}</button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Thought Sorter Modal -- */}
              <Dialog open={!!selectedStep && selectedStep.type === "thought"} onOpenChange={() => { setSelectedStep(null); setThoughtText("") }}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>{selectedStep?.title}</DialogTitle>
                    <DialogDescription className="text-sm" style={{ color: theme.textMid }}>{selectedStep?.description}</DialogDescription>
                  </DialogHeader>
                  <textarea value={thoughtText} onChange={(e) => setThoughtText(e.target.value)} placeholder="Write a thought..." className="mt-3 min-h-20 w-full rounded-xl border-0 bg-black/5 p-4 text-sm focus:outline-none focus:ring-2" style={{ color: theme.textDark }} />
                  <div className="mt-3 flex gap-3">
                    <Button onClick={() => setThoughtText("")} variant="outline" className="flex-1 rounded-xl border-[#E84535]/40 text-[#E84535] hover:bg-[#E84535]/10"><Trash2 className="mr-2 h-4 w-4" /> Trash</Button>
                    <Button onClick={() => setThoughtText("")} className="flex-1 rounded-xl text-white" style={{ backgroundColor: theme.primaryColor }}><Gem className="mr-2 h-4 w-4" /> Treasure</Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Reward Celebration Modal -- */}
              <Dialog open={showRewardCelebration} onOpenChange={setShowRewardCelebration}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-8 text-center" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader className="flex flex-col items-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/20">
                      <Trophy className="h-10 w-10 text-[#FFD700]" />
                    </div>
                    <DialogTitle className="text-2xl font-bold" style={{ color: theme.textDark }}>Treasure Chest!</DialogTitle>
                    <DialogDescription className="text-base" style={{ color: theme.textMid }}>Amazing work! You completed this section of your adventure.</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2"><span className="text-3xl">{cur.emoji}</span><span className="text-3xl font-bold" style={{ color: cur.color }}>+50 {cur.name}</span></div>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {["Great job completing your quests!", "You faced fears and won!", "Your consistency is impressive!", "Keep this momentum going!"].map((msg) => (
                        <span key={msg} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>{msg}</span>
                      ))}
                    </div>
                    <Button onClick={() => setShowRewardCelebration(false)} className="mt-4 w-full rounded-2xl py-4 text-base font-bold text-white" style={{ backgroundColor: theme.primaryColor }}>
                      <Sparkles className="mr-2 h-5 w-5" /> Continue Adventure
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Fork Picker -- */}
              <Dialog open={showForkPicker} onOpenChange={setShowForkPicker}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>Fork in the Road</DialogTitle>
                    <DialogDescription style={{ color: theme.textMid }}>Choose your next landscape!</DialogDescription>
                  </DialogHeader>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {forkOptions.map((opt) => (
                      <Link key={opt.name} href={opt.href} className="flex flex-col items-center gap-2 rounded-2xl p-3 transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: `${opt.color}15` }}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${opt.color}30` }}>
                          <Map className="h-5 w-5" style={{ color: opt.color }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: theme.textDark }}>{opt.name}</span>
                      </Link>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Vehicle Picker -- */}
              <Dialog open={showVehiclePicker} onOpenChange={setShowVehiclePicker}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>Choose Your Vehicle</DialogTitle>
                    <DialogDescription style={{ color: theme.textMid }}>How will you travel?</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {theme.vehicles.map((v) => (
                      <button key={v.id} onClick={() => { setSelectedVehicle(v.id); setShowVehiclePicker(false) }} className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${selectedVehicle === v.id ? "ring-2 scale-105" : "hover:scale-105"}`} style={{ backgroundColor: selectedVehicle === v.id ? `${theme.primaryColor}22` : `${theme.primaryColor}08`, ringColor: selectedVehicle === v.id ? theme.primaryColor : "transparent" }}>
                        <div className="flex h-12 w-12 items-center justify-center">{v.icon}</div>
                        <span className="text-xs font-bold" style={{ color: theme.textDark }}>{v.label}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Character Picker (animals + humans) -- */}
              <Dialog open={showCharacterPicker} onOpenChange={setShowCharacterPicker}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>Choose Your Companion</DialogTitle>
                    <DialogDescription style={{ color: theme.textMid }}>Animals or human characters!</DialogDescription>
                  </DialogHeader>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest" style={{ color: theme.textMid }}>Animal Companions</p>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {theme.characters.map((c) => (
                      <button key={c.id} onClick={() => { setSelectedCharacter(c.id); setShowCharacterPicker(false) }} className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${selectedCharacter === c.id ? "ring-2 scale-105" : "hover:scale-105"}`} style={{ backgroundColor: selectedCharacter === c.id ? `${theme.primaryColor}22` : `${theme.primaryColor}08`, ringColor: selectedCharacter === c.id ? theme.primaryColor : "transparent" }}>
                        <div className="flex h-10 w-10 items-center justify-center">{c.icon}</div>
                        <span className="text-[10px] font-bold" style={{ color: theme.textDark }}>{c.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: theme.textMid }}>Human Characters</p>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {humanCharacters.map((c) => (
                      <button key={c.id} onClick={() => { setSelectedCharacter(c.id); setShowCharacterPicker(false) }} className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${selectedCharacter === c.id ? "ring-2 scale-105" : "hover:scale-105"}`} style={{ backgroundColor: selectedCharacter === c.id ? `${theme.primaryColor}22` : `${theme.primaryColor}08`, ringColor: selectedCharacter === c.id ? theme.primaryColor : "transparent" }}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold" style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}>{c.label.charAt(0)}</div>
                        <span className="text-[10px] font-bold" style={{ color: theme.textDark }}>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* -- Upgrade Shop -- */}
              <Dialog open={showUpgradeShop} onOpenChange={setShowUpgradeShop}>
                <DialogContent className="mx-auto max-w-sm rounded-3xl border-0 p-6" style={{ backgroundColor: theme.cardBg }}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold" style={{ color: theme.textDark }}>Upgrade Shop</DialogTitle>
                    <DialogDescription style={{ color: theme.textMid }}>Spend {cur.name} on upgrades!</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col gap-2">
                    {upgradeItems.map((u) => (
                      <button key={u.id} className="flex items-center gap-3 rounded-2xl p-4 text-left transition-transform hover:scale-[1.01]" style={{ backgroundColor: `${theme.primaryColor}10` }}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${theme.primaryColor}22` }}>
                          <u.icon className="h-5 w-5" style={{ color: theme.primaryColor }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold" style={{ color: theme.textDark }}>{u.label}</p>
                        </div>
                        <div className="flex items-center gap-1"><span className="text-sm">{cur.emoji}</span><span className="text-sm font-bold" style={{ color: cur.color }}>{u.cost}</span></div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest" style={{ color: theme.textMid }}>Movement Tiers</p>
                  <div className="mt-2 flex gap-2">
                    {movementTiers.map((t, i) => (
                      <div key={t} className={`flex-1 rounded-xl p-3 text-center text-xs font-bold ${i === movementTier ? "text-white" : ""}`} style={{ backgroundColor: i === movementTier ? theme.primaryColor : `${theme.primaryColor}10`, color: i === movementTier ? "white" : theme.textMid }}>{t}</div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            /* -- Journal Tab -- */
            <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 py-8">
              <section className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold text-white drop-shadow-md">{"Today's Journal"}</h2>
                <p className="mt-1 text-sm" style={{ color: theme.textLight }}>Reflect on your journey so far.</p>
              </section>
              <div className="mb-8 w-full max-w-sm rounded-3xl px-7 py-8 text-center backdrop-blur-md" style={{ backgroundColor: `${theme.cardBg}dd` }}>
                <p className="text-lg font-bold leading-relaxed" style={{ color: theme.textDark }}>What are you excited for today?</p>
              </div>
              <div className="mb-6 flex flex-col items-center gap-3">
                <button
                  onMouseDown={() => setIsRecording(true)} onMouseUp={() => setIsRecording(false)} onMouseLeave={() => setIsRecording(false)}
                  onTouchStart={() => setIsRecording(true)} onTouchEnd={() => setIsRecording(false)}
                  className="flex h-20 w-20 items-center justify-center rounded-full transition-all"
                  style={{ backgroundColor: isRecording ? "#FF6B6B" : theme.primaryColor, transform: isRecording ? "scale(1.1)" : "scale(1)", boxShadow: isRecording ? "0 0 0 8px rgba(255,107,107,0.25)" : `0 4px 20px ${theme.primaryColor}44` }}
                  aria-label="Hold to record"
                >
                  {isRecording ? <Pause className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
                </button>
                <span className="text-sm font-semibold" style={{ color: theme.textLight }}>{isRecording ? "Recording..." : "Hold to record"}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full bg-black/15 px-4 py-2 backdrop-blur-md">
                  <Flame className="h-4 w-4 text-[#FF6B35]" />
                  <span className="text-sm font-bold text-white">5 day streak</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* -- Bottom Tab Bar -- */}
        <nav className="flex shrink-0 backdrop-blur-md" style={{ backgroundColor: "rgba(0,0,0,0.4)", borderTop: `1px solid ${theme.primaryColor}33` }} aria-label="Main navigation">
          <button onClick={() => setActiveTab("map")} className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors" style={{ color: activeTab === "map" ? theme.primaryColor : "rgba(255,255,255,0.45)" }} aria-current={activeTab === "map" ? "page" : undefined}>
            <Map className="h-6 w-6" /><span className="text-xs font-bold">My Map</span>
          </button>
          <button onClick={() => setActiveTab("journal")} className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors" style={{ color: activeTab === "journal" ? "#FF9F43" : "rgba(255,255,255,0.45)" }} aria-current={activeTab === "journal" ? "page" : undefined}>
            <BookOpen className="h-6 w-6" /><span className="text-xs font-bold">Journal</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
