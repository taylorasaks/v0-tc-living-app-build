"use client"

import { useState, useEffect, useRef } from "react"
import {
  Coins, Flame, Mic, Pause, Play, ChevronRight, MapPin,
  Droplets, Wind, StretchHorizontal, Camera, Package, Lock,
  CalendarCheck, Sparkles, Heart, Search, AlertTriangle, Brain,
  Trash2, Gem, BookOpen
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"

/* ─── Time-based question cycling ─── */
const morningQuestions = [
  "What are you excited for today?",
  "What is for breakfast?",
  "How did you sleep last night?",
  "What is one thing you want to accomplish today?",
]
const afternoonQuestions = [
  "How was your morning?",
  "What have you done so far today?",
  "Did you drink enough water?",
  "What is something kind you did for yourself?",
]
const eveningQuestions = [
  "How was your day?",
  "What was the best part of today?",
  "What is one thing you are grateful for?",
  "Are you ready to wind down?",
]

function getTimeGreeting() {
  const h = new Date().getHours()
  if (h < 12) return { greeting: "Good Morning", period: "morning" as const }
  if (h < 17) return { greeting: "Good Afternoon", period: "afternoon" as const }
  return { greeting: "Good Evening", period: "evening" as const }
}

function getTodayQuestion() {
  const { period } = getTimeGreeting()
  const day = new Date().getDate()
  const questions = period === "morning" ? morningQuestions : period === "afternoon" ? afternoonQuestions : eveningQuestions
  return questions[day % questions.length]
}

/* ─── Adventures config ─── */
const adventures = [
  { id: "jungle", name: "Jungle", tagline: "Swing through the canopy", href: "/jungle", gradient: "from-[#0D3B1E] to-[#1A5C30]", border: "border-[#2E8B57]/40", iconBg: "bg-[#2E8B57]", textColor: "text-[#A8E6B0]", accent: "#2E8B57" },
  { id: "savannah", name: "Savannah", tagline: "Roam the golden plains", href: "/savannah", gradient: "from-[#5A3200] to-[#8B6914]", border: "border-[#D4872C]/40", iconBg: "bg-[#D4872C]", textColor: "text-[#FFD699]", accent: "#D4872C" },
  { id: "ocean", name: "Ocean", tagline: "Dive into the deep blue", href: "/ocean", gradient: "from-[#0A2E4D] to-[#1A5A8A]", border: "border-[#1E90FF]/40", iconBg: "bg-[#1E90FF]", textColor: "text-[#99D4FF]", accent: "#1E90FF" },
  { id: "desert", name: "Desert", tagline: "Cross the shifting sands", href: "/desert", gradient: "from-[#6B3A00] to-[#A66B2B]", border: "border-[#E8A435]/40", iconBg: "bg-[#E8A435]", textColor: "text-[#FFE0A0]", accent: "#E8A435" },
  { id: "mountains", name: "Mountains", tagline: "Scale the peaks", href: "/mountains", gradient: "from-[#2C3E50] to-[#4A6274]", border: "border-[#7F9BAA]/40", iconBg: "bg-[#7F9BAA]", textColor: "text-[#C4DDE8]", accent: "#7F9BAA" },
  { id: "antarctica", name: "Antarctica", tagline: "Brave the frozen frontier", href: "/antarctica", gradient: "from-[#1B3A4B] to-[#406882]", border: "border-[#89CFF0]/40", iconBg: "bg-[#89CFF0]", textColor: "text-[#D4EFFF]", accent: "#89CFF0" },
  { id: "volcano", name: "Volcano", tagline: "Navigate the lava lands", href: "/volcano", gradient: "from-[#4A0E0E] to-[#8B2020]", border: "border-[#E84535]/40", iconBg: "bg-[#E84535]", textColor: "text-[#FFBAB3]", accent: "#E84535" },
  { id: "city", name: "City", tagline: "Explore the urban jungle", href: "/city", gradient: "from-[#1C1C2E] to-[#3A3A5E]", border: "border-[#8080FF]/40", iconBg: "bg-[#8080FF]", textColor: "text-[#C4C4FF]", accent: "#8080FF" },
  { id: "atlantis", name: "Atlantis", tagline: "Discover the lost city", href: "/atlantis", gradient: "from-[#0D2B3E] to-[#1A5060]", border: "border-[#00CED1]/40", iconBg: "bg-[#00CED1]", textColor: "text-[#A0F0F0]", accent: "#00CED1" },
]

/* ─── Landscape icon SVGs ─── */
function LandscapeIcon({ id }: { id: string }) {
  const size = "h-7 w-7"
  switch (id) {
    case "jungle": return <svg viewBox="0 0 32 32" className={size}><path d="M16 2C12 8 8 10 8 16c0 6 4 14 8 14s8-8 8-14c0-6-4-8-8-14z" fill="#2E8B57"/><path d="M16 8c-2 4-4 5-4 8s2 8 4 8 4-5 4-8-2-4-4-8z" fill="#A8E6B0"/></svg>
    case "savannah": return <svg viewBox="0 0 32 32" className={size}><rect x="14" y="8" width="4" height="16" rx="2" fill="#D4872C"/><ellipse cx="16" cy="8" rx="10" ry="5" fill="#D4872C"/><ellipse cx="16" cy="7" rx="7" ry="3.5" fill="#E8B84B"/></svg>
    case "ocean": return <svg viewBox="0 0 32 32" className={size}><path d="M2 16 Q8 10 16 16 Q24 22 30 16" fill="none" stroke="#1E90FF" strokeWidth="3"/><path d="M2 22 Q8 16 16 22 Q24 28 30 22" fill="none" stroke="#1E90FF" strokeWidth="2" opacity=".5"/></svg>
    case "desert": return <svg viewBox="0 0 32 32" className={size}><path d="M4 28 Q10 12 16 16 Q22 20 28 6" fill="none" stroke="#E8A435" strokeWidth="3"/><circle cx="26" cy="6" r="4" fill="#FFD700"/></svg>
    case "mountains": return <svg viewBox="0 0 32 32" className={size}><path d="M2 28 L12 8 L16 14 L22 4 L30 28Z" fill="#7F9BAA"/><path d="M12 8 L14 12 L10 12Z" fill="white"/><path d="M22 4 L25 10 L19 10Z" fill="white"/></svg>
    case "antarctica": return <svg viewBox="0 0 32 32" className={size}><ellipse cx="16" cy="22" rx="14" ry="8" fill="#89CFF0"/><ellipse cx="16" cy="20" rx="10" ry="6" fill="white"/><circle cx="12" cy="18" r="1" fill="#1B3A4B"/><circle cx="20" cy="18" r="1" fill="#1B3A4B"/></svg>
    case "volcano": return <svg viewBox="0 0 32 32" className={size}><path d="M4 28 L14 8 L18 8 L28 28Z" fill="#8B2020"/><path d="M14 8 Q16 2 18 8" fill="#E84535"/><circle cx="16" cy="4" r="2" fill="#FFD700" opacity=".6"/></svg>
    case "city": return <svg viewBox="0 0 32 32" className={size}><rect x="4" y="14" width="6" height="14" fill="#8080FF"/><rect x="12" y="8" width="8" height="20" fill="#6060DD"/><rect x="22" y="12" width="6" height="16" fill="#8080FF"/><rect x="14" y="10" width="2" height="2" fill="#FFD700"/><rect x="14" y="14" width="2" height="2" fill="#FFD700"/></svg>
    case "atlantis": return <svg viewBox="0 0 32 32" className={size}><path d="M8 28 L12 14 L16 10 L20 14 L24 28Z" fill="#00CED1" opacity=".6"/><circle cx="16" cy="10" r="3" fill="#00CED1"/><path d="M6 24 Q16 18 26 24" fill="none" stroke="#00CED1" strokeWidth="1.5"/></svg>
    default: return null
  }
}

/* ─── Daily Tasks for fuel ─── */
const dailyTasks = [
  { id: "groceries", label: "Get Groceries", icon: "cart" },
  { id: "bills", label: "Pay a Bill", icon: "bill" },
  { id: "meal", label: "Make a Meal", icon: "cook" },
  { id: "bed", label: "Make Your Bed", icon: "bed" },
  { id: "movement", label: "Movement / Walk", icon: "walk" },
  { id: "health", label: "Health Appointment", icon: "health" },
]

/* ─── Roadblock exercises ─── */
const roadblocks = [
  { id: "breathe", label: "Time to Breathe", desc: "Blow away the boulder with deep breaths", icon: Wind, color: "#4ECDC4" },
  { id: "stretch", label: "Time to Stretch", desc: "Stretch your way around the boulder", icon: StretchHorizontal, color: "#FF9F43" },
  { id: "water", label: "Drink Water", desc: "Wash the boulder away with hydration", icon: Droplets, color: "#1E90FF" },
]

/* ─── Meditation characters ─── */
const meditationCharacters = [
  { id: "explorer", label: "Explorer", color: "#2E8B57" },
  { id: "fairy", label: "Fairy", color: "#DDA0DD" },
  { id: "wizard", label: "Wizard", color: "#8080FF" },
  { id: "knight", label: "Knight", color: "#7F9BAA" },
]

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [journalUnlocked, setJournalUnlocked] = useState(false)
  const [showFuelModal, setShowFuelModal] = useState(false)
  const [showWorryBox, setShowWorryBox] = useState(false)
  const [showRoadblock, setShowRoadblock] = useState<typeof roadblocks[0] | null>(null)
  const [showThoughtSorter, setShowThoughtSorter] = useState(false)
  const [showScavengerHunt, setShowScavengerHunt] = useState(false)
  const [showMeditation, setShowMeditation] = useState(false)
  const [showMilestone, setShowMilestone] = useState(false)
  const [showTrigger, setShowTrigger] = useState(false)
  const [selectedMedChar, setSelectedMedChar] = useState(meditationCharacters[0].id)
  const [worryText, setWorryText] = useState("")
  const [thoughtText, setThoughtText] = useState("")
  const [breathCount, setBreathCount] = useState(0)
  const [section, setSection] = useState<"home" | "adventures">("home")
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const coins = 240
  const streak = 5
  const fuelLevel = 65
  const { greeting } = getTimeGreeting()
  const question = getTodayQuestion()
  const activeAdventure = adventures[0]

  // Simulate voice journal unlock after recording for 2s
  useEffect(() => {
    if (isRecording) {
      recordTimerRef.current = setTimeout(() => {
        setIsRecording(false)
        setJournalUnlocked(true)
      }, 2000)
    } else if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current)
    }
    return () => { if (recordTimerRef.current) clearTimeout(recordTimerRef.current) }
  }, [isRecording])

  return (
    <div className="flex h-dvh flex-col bg-[#0C1B2A]">
      {/* ── Top Bar ── */}
      <header className="flex shrink-0 items-center justify-between px-5 pt-5 pb-2">
        <div className="flex items-center gap-2 rounded-full bg-[#1A2D42] px-4 py-2">
          <Coins className="h-5 w-5 text-[#FFD700]" />
          <span className="text-base font-bold text-[#FFD700]">{coins}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#1A2D42] px-4 py-2">
          <Flame className="h-5 w-5 text-[#FF6B35]" />
          <span className="text-base font-bold text-[#FF6B35]">{streak} day streak</span>
        </div>
      </header>

      {/* ── Tab switcher ── */}
      <div className="flex shrink-0 items-center gap-1 px-5 pt-1 pb-3">
        <button
          onClick={() => setSection("home")}
          className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${section === "home" ? "bg-[#2E8B57] text-white" : "bg-[#1A2D42] text-[#5A8AAF]"}`}
        >
          Journal
        </button>
        <button
          onClick={() => setSection("adventures")}
          className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${section === "adventures" ? "bg-[#2E8B57] text-white" : "bg-[#1A2D42] text-[#5A8AAF]"}`}
        >
          Adventures
        </button>
      </div>

      {/* ── Scrollable Content ── */}
      <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pb-6">

        {section === "home" ? (
          <>
            {/* ── Greeting ── */}
            <section className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-white text-balance">
                {greeting}, Explorer
              </h1>
              <p className="mt-1 text-base text-[#8AA8C7]">
                {journalUnlocked ? "Journal unlocked. Your quest awaits." : "Unlock your quest with your voice."}
              </p>
            </section>

            {/* ── Voice Journal Card ── */}
            <section className="rounded-3xl bg-[#13263A] p-6">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">
                  {"Today's Journal"}
                </h2>
                {journalUnlocked && (
                  <span className="rounded-full bg-[#2E8B57]/20 px-3 py-1 text-xs font-bold text-[#A8E6B0]">Unlocked</span>
                )}
              </div>
              <p className="mb-5 text-lg font-bold leading-relaxed text-white">{question}</p>
              <div className="flex flex-col items-center gap-3">
                <button
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => setIsRecording(false)}
                  onMouseLeave={() => setIsRecording(false)}
                  onTouchStart={() => setIsRecording(true)}
                  onTouchEnd={() => setIsRecording(false)}
                  className={`flex h-20 w-20 items-center justify-center rounded-full transition-all ${isRecording ? "scale-110 bg-[#FF6B6B]" : "bg-[#2E8B57] hover:bg-[#24734A]"}`}
                  style={{ boxShadow: isRecording ? "0 0 0 8px rgba(255,107,107,0.25), 0 0 24px rgba(255,107,107,0.3)" : "0 4px 20px rgba(46,139,87,0.35)" }}
                  aria-label="Hold to record your voice journal"
                >
                  {isRecording ? <Pause className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
                </button>
                <span className="text-sm font-semibold text-[#5A8AAF]">
                  {isRecording ? "Recording..." : "Hold to record"}
                </span>
              </div>
            </section>

            {/* ── Fuel Check ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Fuel Level</h2>
                <span className="text-sm font-bold text-[#FFD700]">{fuelLevel}%</span>
              </div>
              <Progress value={fuelLevel} className="mb-3 h-4 rounded-full" />
              <p className="mb-3 text-sm text-[#8AA8C7]">Fuel is low? Complete a real-world task to recharge.</p>
              <Button onClick={() => setShowFuelModal(true)} className="w-full rounded-xl bg-[#D4872C] text-white hover:bg-[#B8711E]">
                <Camera className="mr-2 h-4 w-4" /> Complete a Task (Photo Proof)
              </Button>
            </section>

            {/* ── Today's Quest ── */}
            {journalUnlocked && (
              <section className="rounded-3xl bg-[#13263A] p-5">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">{"Today's Quest"}</h2>
                <div className="mb-3 rounded-2xl bg-[#1A2D42] p-4">
                  <p className="mb-1 text-sm font-bold text-[#FFD700]">Riddle of the Day</p>
                  <p className="text-base leading-relaxed text-white">{"I have cities but no houses, forests but no trees, and water but no fish. What am I?"}</p>
                  <p className="mt-2 text-xs text-[#5A8AAF]">Answer: A map! Now begin your quest on the map.</p>
                </div>
                <Link href="/jungle" className="flex items-center justify-center gap-2 rounded-xl bg-[#2E8B57] px-4 py-3 font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <MapPin className="h-5 w-5" /> Go to My Map
                </Link>
              </section>
            )}

            {/* ── Roadblock Skills ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Roadblock Skills</h2>
              <div className="flex flex-col gap-2">
                {roadblocks.map((rb) => (
                  <button key={rb.id} onClick={() => setShowRoadblock(rb)} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${rb.color}22` }}>
                      <rb.icon className="h-5 w-5" style={{ color: rb.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{rb.label}</p>
                      <p className="text-xs text-[#8AA8C7]">{rb.desc}</p>
                    </div>
                  </button>
                ))}
                <button onClick={() => setShowThoughtSorter(true)} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9B59B6]/20">
                    <Brain className="h-5 w-5 text-[#9B59B6]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Thought Sorter</p>
                    <p className="text-xs text-[#8AA8C7]">Identify negative thoughts: trash or treasure?</p>
                  </div>
                </button>
              </div>
            </section>

            {/* ── Worry Box ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Worry Box</h2>
                <Lock className="h-4 w-4 text-[#5A8AAF]" />
              </div>
              <p className="mb-3 text-sm text-[#8AA8C7]">Put your worries in the box. Open them only with your therapist.</p>
              <Button onClick={() => setShowWorryBox(true)} variant="outline" className="w-full rounded-xl border-[#2E8B57]/40 bg-transparent text-[#A8E6B0] hover:bg-[#2E8B57]/10">
                <Package className="mr-2 h-4 w-4" /> Add a Worry
              </Button>
            </section>

            {/* ── Check-Ins ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Quick Check-Ins</h2>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center gap-2 rounded-2xl bg-[#1A2D42] p-4 transition-transform hover:scale-105 active:scale-95">
                  <Droplets className="h-6 w-6 text-[#1E90FF]" />
                  <span className="text-xs font-bold text-[#8AA8C7]">Water?</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-2xl bg-[#1A2D42] p-4 transition-transform hover:scale-105 active:scale-95">
                  <StretchHorizontal className="h-6 w-6 text-[#FF9F43]" />
                  <span className="text-xs font-bold text-[#8AA8C7]">Stretch?</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-2xl bg-[#1A2D42] p-4 transition-transform hover:scale-105 active:scale-95">
                  <Wind className="h-6 w-6 text-[#4ECDC4]" />
                  <span className="text-xs font-bold text-[#8AA8C7]">Breath?</span>
                </button>
              </div>
            </section>

            {/* ── Scavenger Hunt ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Scavenger Hunt</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Look around you and find something matching the prompt.</p>
              <Button onClick={() => setShowScavengerHunt(true)} className="w-full rounded-xl bg-[#1E90FF] text-white hover:bg-[#1878D6]">
                <Search className="mr-2 h-4 w-4" /> Start Hunt
              </Button>
            </section>

            {/* ── Meditation ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Meditation Break</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Choose a character and take a guided breathing break.</p>
              <Button onClick={() => setShowMeditation(true)} variant="outline" className="w-full rounded-xl border-[#DDA0DD]/40 bg-transparent text-[#DDA0DD] hover:bg-[#DDA0DD]/10">
                <Sparkles className="mr-2 h-4 w-4" /> Meditate
              </Button>
            </section>

            {/* ── Milestone Check-In ── */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Milestone Check-In</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Weekly and monthly reflections to stay on track.</p>
              <Button onClick={() => setShowMilestone(true)} variant="outline" className="w-full rounded-xl border-[#FFD700]/40 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10">
                <CalendarCheck className="mr-2 h-4 w-4" /> Check In
              </Button>
            </section>

            {/* ── The Trigger Alert ── */}
            <section className="rounded-3xl bg-[#1A1014] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF6B6B]">The Trigger</h2>
              <p className="mb-3 text-sm text-[#CCA0A0]">
                Tornado, earthquake, or storm approaching? Use your skills to face it.
              </p>
              <Button onClick={() => setShowTrigger(true)} className="w-full rounded-xl bg-[#E84535] text-white hover:bg-[#C83525]">
                <AlertTriangle className="mr-2 h-4 w-4" /> Face the Trigger
              </Button>
            </section>

            {/* ── Current Adventure Link ── */}
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Current Adventure</h2>
              <Link
                href={activeAdventure.href}
                className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${activeAdventure.gradient} border ${activeAdventure.border} p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${activeAdventure.iconBg}`}>
                  <LandscapeIcon id={activeAdventure.id} />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-extrabold text-white">{activeAdventure.name} Adventure</span>
                  <span className={`text-sm ${activeAdventure.textColor}`}>{activeAdventure.tagline}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/30">
                      <div className="h-full rounded-full" style={{ width: "33%", backgroundColor: activeAdventure.accent }} />
                    </div>
                    <span className="text-xs font-bold text-white/70">Step 2/6</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-white/50" />
              </Link>
            </section>

            {/* Schedule the Joy */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Schedule the Joy</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Pick a fun activity, schedule it, and take a photo when you do it.</p>
              <div className="grid grid-cols-2 gap-2">
                {["Go for a walk", "Cook something fun", "Call a friend", "Read a book"].map((act) => (
                  <button key={act} className="rounded-xl bg-[#1A2D42] px-3 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95">
                    {act}
                  </button>
                ))}
              </div>
            </section>

            {/* Monthly: Find Your Ikigai */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Find Your Ikigai</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">End-of-month exploration. Discover hobbies, readings, podcasts, and outdoor activities.</p>
              <div className="flex flex-wrap gap-2">
                {["Hobbies", "Readings", "Podcasts", "Outdoors"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#1A2D42] px-3 py-1.5 text-xs font-bold text-[#A8E6B0]">{tag}</span>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* ── Adventures Grid ── */
          <>
            <section className="text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-white text-balance">Choose Your Adventure</h1>
              <p className="mt-1 text-sm text-[#8AA8C7]">Each landscape is a new world to explore.</p>
            </section>
            <section className="flex flex-col gap-3">
              {adventures.map((adv) => (
                <Link
                  key={adv.id}
                  href={adv.href}
                  className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${adv.gradient} border ${adv.border} p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${adv.iconBg}`}>
                    <LandscapeIcon id={adv.id} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-base font-bold text-white">{adv.name}</span>
                    <span className={`text-sm ${adv.textColor}`}>{adv.tagline}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </section>
          </>
        )}
      </main>

      {/* ════ MODALS ════ */}

      {/* Fuel Task Modal */}
      <Dialog open={showFuelModal} onOpenChange={setShowFuelModal}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Refuel: Complete a Task</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Complete one of these real-world tasks and upload a photo as proof.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {dailyTasks.map((t) => (
              <button key={t.id} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]">
                <Camera className="h-5 w-5 shrink-0 text-[#D4872C]" />
                <span className="text-sm font-bold text-white">{t.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Worry Box Modal */}
      <Dialog open={showWorryBox} onOpenChange={setShowWorryBox}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Worry Box</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Write it down and lock it away. You and your therapist will open it together.</DialogDescription>
          </DialogHeader>
          <textarea
            value={worryText}
            onChange={(e) => setWorryText(e.target.value)}
            placeholder="What is worrying you?"
            className="mt-3 min-h-28 w-full rounded-xl border-0 bg-[#1A2D42] p-4 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
          />
          <Button onClick={() => { setWorryText(""); setShowWorryBox(false) }} className="mt-3 w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]">
            <Lock className="mr-2 h-4 w-4" /> Lock it Away
          </Button>
        </DialogContent>
      </Dialog>

      {/* Roadblock Modal */}
      <Dialog open={!!showRoadblock} onOpenChange={() => setShowRoadblock(null)}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6 text-center">
          <DialogHeader className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${showRoadblock?.color}22` }}>
              {showRoadblock && <showRoadblock.icon className="h-8 w-8" style={{ color: showRoadblock.color }} />}
            </div>
            <DialogTitle className="text-xl font-bold text-white">{showRoadblock?.label}</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">{showRoadblock?.desc}</DialogDescription>
          </DialogHeader>
          {showRoadblock?.id === "breathe" && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className={`flex h-28 w-28 items-center justify-center rounded-full transition-all duration-1000 ${breathCount % 2 === 0 ? "scale-100 bg-[#4ECDC4]/20" : "scale-125 bg-[#4ECDC4]/40"}`}>
                <span className="text-2xl font-bold text-[#4ECDC4]">{breathCount % 2 === 0 ? "Breathe In" : "Breathe Out"}</span>
              </div>
              <Button onClick={() => setBreathCount((c) => c + 1)} className="rounded-xl bg-[#4ECDC4] text-white hover:bg-[#3DBDB5]">
                <Wind className="mr-2 h-4 w-4" /> {breathCount === 0 ? "Start" : "Next Breath"} ({breathCount}/6)
              </Button>
            </div>
          )}
          {showRoadblock?.id === "stretch" && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <p className="text-sm text-[#8AA8C7]">Follow these stretches for 30 seconds each:</p>
              <div className="flex flex-col gap-2 text-left">
                {["Reach for the sky", "Touch your toes", "Twist left and right", "Roll your shoulders"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-[#1A2D42] p-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF9F43]/20 text-xs font-bold text-[#FF9F43]">{i + 1}</span>
                    <span className="text-sm text-white">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showRoadblock?.id === "water" && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <Droplets className="h-16 w-16 text-[#1E90FF]" />
              <p className="text-base font-bold text-white">Go drink a glass of water right now!</p>
              <Button onClick={() => setShowRoadblock(null)} className="rounded-xl bg-[#1E90FF] text-white hover:bg-[#1878D6]">
                <Heart className="mr-2 h-4 w-4" /> Done!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Thought Sorter Modal */}
      <Dialog open={showThoughtSorter} onOpenChange={setShowThoughtSorter}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Thought Sorter</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Write a thought. Is it junk (trash it) or a gem (keep it)?</DialogDescription>
          </DialogHeader>
          <textarea
            value={thoughtText}
            onChange={(e) => setThoughtText(e.target.value)}
            placeholder="Write a thought..."
            className="mt-3 min-h-20 w-full rounded-xl border-0 bg-[#1A2D42] p-4 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#9B59B6]"
          />
          <div className="mt-3 flex gap-3">
            <Button onClick={() => { setThoughtText(""); }} variant="outline" className="flex-1 rounded-xl border-[#E84535]/40 text-[#E84535] hover:bg-[#E84535]/10">
              <Trash2 className="mr-2 h-4 w-4" /> Trash It
            </Button>
            <Button onClick={() => { setThoughtText(""); }} className="flex-1 rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]">
              <Gem className="mr-2 h-4 w-4" /> Keep It
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scavenger Hunt Modal */}
      <Dialog open={showScavengerHunt} onOpenChange={setShowScavengerHunt}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6 text-center">
          <DialogHeader className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E90FF]/20">
              <Search className="h-8 w-8 text-[#1E90FF]" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">Scavenger Hunt</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Find something BLUE around you and take a photo!</DialogDescription>
          </DialogHeader>
          <Button className="mt-4 w-full rounded-xl bg-[#1E90FF] text-white hover:bg-[#1878D6]">
            <Camera className="mr-2 h-4 w-4" /> Upload Photo
          </Button>
        </DialogContent>
      </Dialog>

      {/* Meditation Modal */}
      <Dialog open={showMeditation} onOpenChange={setShowMeditation}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Meditation Break</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Who do you want to meditate with?</DialogDescription>
          </DialogHeader>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {meditationCharacters.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedMedChar(c.id)}
                className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${selectedMedChar === c.id ? "scale-105 ring-2" : "hover:scale-105"}`}
                style={{
                  backgroundColor: selectedMedChar === c.id ? `${c.color}22` : "#1A2D42",
                  borderColor: selectedMedChar === c.id ? c.color : "transparent",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${c.color}33` }}>
                  <Sparkles className="h-5 w-5" style={{ color: c.color }} />
                </div>
                <span className="text-xs font-bold text-white">{c.label}</span>
              </button>
            ))}
          </div>
          <Button className="mt-4 w-full rounded-xl bg-[#DDA0DD] text-[#1A1014] hover:bg-[#CC8FCC]">
            <Wind className="mr-2 h-4 w-4" /> Begin Breathing Exercise
          </Button>
        </DialogContent>
      </Dialog>

      {/* Milestone Check-In Modal */}
      <Dialog open={showMilestone} onOpenChange={setShowMilestone}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Milestone Check-In</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Reflect on your progress this week.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-3">
            <div className="rounded-xl bg-[#1A2D42] p-4">
              <p className="text-sm font-bold text-[#FFD700]">End of Week</p>
              <p className="mt-1 text-sm text-[#8AA8C7]">Do you want to set up a weekly schedule?</p>
            </div>
            <div className="rounded-xl bg-[#1A2D42] p-4">
              <p className="text-sm font-bold text-[#FFD700]">End of Month</p>
              <p className="mt-1 text-sm text-[#8AA8C7]">Find your ikigai: hobbies, readings, podcasts, outdoors.</p>
            </div>
            <Button className="w-full rounded-xl bg-[#FFD700] text-[#1A1014] hover:bg-[#E8C400]">
              <CalendarCheck className="mr-2 h-4 w-4" /> Set Reminders
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trigger Modal */}
      <Dialog open={showTrigger} onOpenChange={setShowTrigger}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#4A1A1A] bg-[#1A1014] p-6 text-center">
          <DialogHeader className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E84535]/20">
              <AlertTriangle className="h-8 w-8 text-[#E84535]" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">The Trigger</DialogTitle>
            <DialogDescription className="text-sm text-[#CCA0A0]">A storm is approaching. Use your skills to stay grounded.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-2">
            {["Deep Breathing", "Call a Safe Person", "Ground Yourself (5-4-3-2-1)", "Move Your Body"].map((skill) => (
              <button key={skill} className="rounded-xl bg-[#2A1A1A] p-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
                {skill}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
