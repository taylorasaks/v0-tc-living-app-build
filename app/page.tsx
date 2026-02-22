"use client"

import { useState, useEffect, useRef } from "react"
import {
  Flame, Mic, Pause, ChevronRight, MapPin,
  Wind, Camera, Package, Lock,
  CalendarCheck, Sparkles, Heart, Brain,
  Trash2, Gem, Trophy, Users, Dumbbell, ChefHat, Bell,
  MessageCircle, Send, Footprints, PersonStanding, Star,
  Music, Image, PenLine, Zap, Smile, Palette, BookOpen,
  HandMetal, Shield, Bike, BrainCircuit, Gauge, HeartHandshake,
  UtensilsCrossed, Clock, Check, ArrowLeft, Phone, Pencil,
  Puzzle, Eye, Gamepad2, Megaphone
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"

/* ------------------------------------------------------------------ */
/*  XP Currency per adventure                                          */
/* ------------------------------------------------------------------ */
const xpCurrencies: Record<string, { name: string; icon: React.ReactNode; color: string }> = {
  jungle:     { name: "Bananas",    icon: <span className="text-lg leading-none">{"🍌"}</span>, color: "#FFD700" },
  savannah:   { name: "Acorns",     icon: <span className="text-lg leading-none">{"🌰"}</span>, color: "#D4872C" },
  ocean:      { name: "Sea Shells", icon: <span className="text-lg leading-none">{"🐚"}</span>, color: "#1E90FF" },
  desert:     { name: "Scarabs",    icon: <span className="text-lg leading-none">{"🪲"}</span>, color: "#E8A435" },
  mountains:  { name: "Crystals",   icon: <span className="text-lg leading-none">{"💎"}</span>, color: "#7F9BAA" },
  antarctica: { name: "Snowflakes", icon: <span className="text-lg leading-none">{"❄️"}</span>, color: "#89CFF0" },
  volcano:    { name: "Embers",     icon: <span className="text-lg leading-none">{"🔥"}</span>, color: "#E84535" },
  city:       { name: "Tokens",     icon: <span className="text-lg leading-none">{"🪙"}</span>, color: "#8080FF" },
  atlantis:   { name: "Pearls",     icon: <span className="text-lg leading-none">{"🫧"}</span>, color: "#00CED1" },
}

/* ------------------------------------------------------------------ */
/*  Time-based question cycling                                        */
/* ------------------------------------------------------------------ */
const morningQs = [
  "What are you excited for today?",
  "What is for breakfast?",
  "How did you sleep last night?",
  "What is one thing you want to accomplish today?",
]
const afternoonQs = [
  "How was your morning?",
  "What have you done so far today?",
  "Did you drink enough water?",
  "What is something kind you did for yourself?",
]
const eveningQs = [
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
  const qs = period === "morning" ? morningQs : period === "afternoon" ? afternoonQs : eveningQs
  return qs[day % qs.length]
}

/* ------------------------------------------------------------------ */
/*  Adventures config                                                   */
/* ------------------------------------------------------------------ */
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

/* -- Landscape icon SVGs -- */
function LandscapeIcon({ id }: { id: string }) {
  const s = "h-7 w-7"
  switch (id) {
    case "jungle": return <svg viewBox="0 0 32 32" className={s}><path d="M16 2C12 8 8 10 8 16c0 6 4 14 8 14s8-8 8-14c0-6-4-8-8-14z" fill="#2E8B57"/><path d="M16 8c-2 4-4 5-4 8s2 8 4 8 4-5 4-8-2-4-4-8z" fill="#A8E6B0"/></svg>
    case "savannah": return <svg viewBox="0 0 32 32" className={s}><rect x="14" y="8" width="4" height="16" rx="2" fill="#D4872C"/><ellipse cx="16" cy="8" rx="10" ry="5" fill="#D4872C"/><ellipse cx="16" cy="7" rx="7" ry="3.5" fill="#E8B84B"/></svg>
    case "ocean": return <svg viewBox="0 0 32 32" className={s}><path d="M2 16 Q8 10 16 16 Q24 22 30 16" fill="none" stroke="#1E90FF" strokeWidth="3"/><path d="M2 22 Q8 16 16 22 Q24 28 30 22" fill="none" stroke="#1E90FF" strokeWidth="2" opacity=".5"/></svg>
    case "desert": return <svg viewBox="0 0 32 32" className={s}><path d="M4 28 Q10 12 16 16 Q22 20 28 6" fill="none" stroke="#E8A435" strokeWidth="3"/><circle cx="26" cy="6" r="4" fill="#FFD700"/></svg>
    case "mountains": return <svg viewBox="0 0 32 32" className={s}><path d="M2 28 L12 8 L16 14 L22 4 L30 28Z" fill="#7F9BAA"/><path d="M12 8 L14 12 L10 12Z" fill="white"/><path d="M22 4 L25 10 L19 10Z" fill="white"/></svg>
    case "antarctica": return <svg viewBox="0 0 32 32" className={s}><ellipse cx="16" cy="22" rx="14" ry="8" fill="#89CFF0"/><ellipse cx="16" cy="20" rx="10" ry="6" fill="white"/></svg>
    case "volcano": return <svg viewBox="0 0 32 32" className={s}><path d="M4 28 L14 8 L18 8 L28 28Z" fill="#8B2020"/><path d="M14 8 Q16 2 18 8" fill="#E84535"/></svg>
    case "city": return <svg viewBox="0 0 32 32" className={s}><rect x="4" y="14" width="6" height="14" fill="#8080FF"/><rect x="12" y="8" width="8" height="20" fill="#6060DD"/><rect x="22" y="12" width="6" height="16" fill="#8080FF"/><rect x="14" y="10" width="2" height="2" fill="#FFD700"/></svg>
    case "atlantis": return <svg viewBox="0 0 32 32" className={s}><path d="M8 28 L12 14 L16 10 L20 14 L24 28Z" fill="#00CED1" opacity=".6"/><circle cx="16" cy="10" r="3" fill="#00CED1"/></svg>
    default: return null
  }
}

/* -- Meal suggestions by time of day -- */
function getMealSuggestions() {
  const h = new Date().getHours()
  if (h < 11)
    return {
      mealTime: "Breakfast",
      suggestions: [
        { name: "Oatmeal & Berries", desc: "Warm oats topped with fresh berries, honey, and walnuts", tag: "Quick" },
        { name: "Eggs & Toast", desc: "Scrambled or fried eggs with whole-grain toast and avocado", tag: "Protein" },
        { name: "Smoothie Bowl", desc: "Banana, spinach, peanut butter blended thick with toppings", tag: "Fresh" },
        { name: "Yogurt Parfait", desc: "Greek yogurt layered with granola and fruit", tag: "Light" },
      ],
    }
  if (h < 15)
    return {
      mealTime: "Lunch",
      suggestions: [
        { name: "Chicken Wrap", desc: "Grilled chicken, lettuce, tomato, and dressing in a tortilla", tag: "Filling" },
        { name: "Veggie Stir-Fry", desc: "Mixed vegetables, rice, soy sauce, and sesame oil", tag: "Quick" },
        { name: "Soup & Sandwich", desc: "Tomato soup with a grilled cheese sandwich", tag: "Comfort" },
        { name: "Grain Bowl", desc: "Quinoa, roasted veggies, chickpeas, and tahini dressing", tag: "Healthy" },
      ],
    }
  return {
    mealTime: "Dinner",
    suggestions: [
      { name: "Pasta & Veggies", desc: "Whole wheat pasta with roasted vegetables and olive oil", tag: "Comfort" },
      { name: "Baked Salmon", desc: "Salmon fillet with roasted sweet potato and greens", tag: "Protein" },
      { name: "Taco Night", desc: "Seasoned ground turkey, lettuce, cheese, and salsa in shells", tag: "Fun" },
      { name: "Stir-Fry Noodles", desc: "Rice noodles with veggies, tofu or chicken, and soy sauce", tag: "Quick" },
    ],
  }
}

/* -- Roadblock exercises -- */
const roadblocks = [
  { id: "breathe", label: "Time to Breathe", desc: "Blow away the boulder with deep breaths", icon: Wind, color: "#4ECDC4" },
  { id: "stretch", label: "Time to Stretch", desc: "Stretch your way around the boulder", icon: HeartHandshake, color: "#FF9F43" },
  { id: "water", label: "Drink Water", desc: "Wash the boulder away with hydration", icon: Heart, color: "#1E90FF" },
]

/* -- Meditation characters -- */
const meditationCharacters = [
  { id: "explorer", label: "Explorer", color: "#2E8B57" },
  { id: "fairy", label: "Fairy", color: "#DDA0DD" },
  { id: "wizard", label: "Wizard", color: "#8080FF" },
  { id: "knight", label: "Knight", color: "#7F9BAA" },
  { id: "captain", label: "Captain", color: "#1E90FF" },
  { id: "sorcerist", label: "Sorcerist", color: "#E84535" },
]

/* -- Leaderboard mock data (with adventure & themed XP) -- */
const leaderboard = [
  { name: "You",       xp: 240, rank: 3, adventure: "jungle" },
  { name: "Alex R.",   xp: 410, rank: 1, adventure: "ocean" },
  { name: "Jordan L.", xp: 310, rank: 2, adventure: "desert" },
  { name: "Sam N.",    xp: 195, rank: 4, adventure: "savannah" },
  { name: "Taylor B.", xp: 120, rank: 5, adventure: "antarctica" },
]

/* -- Premade emotes/messages -- */
const quickMessages = ["Way to go!", "Keep it up!", "You inspire me!", "Almost there!", "Stay strong!"]

/* -- Extra XP opportunities -- */
const extraXpItems = [
  { id: "journal", label: "Journal Entry", desc: "+10 XP per entry", xp: 10, icon: PenLine, color: "#2E8B57" },
  { id: "sing", label: "Sing a Song", desc: "+15 XP record yourself singing", xp: 15, icon: Music, color: "#DDA0DD" },
  { id: "long-journal", label: "Extra / Longer Entry", desc: "+20 XP for 2+ min recording", xp: 20, icon: BookOpen, color: "#1E90FF" },
  { id: "images", label: "Images Uploaded", desc: "+5 XP per photo today", xp: 5, icon: Image, color: "#D4872C" },
  { id: "social", label: "Socialization", desc: "+10 XP send a preset message", xp: 10, icon: MessageCircle, color: "#FFD700" },
]

/* -- Boost categories (each is an XP activity with prompt + photo) -- */
const boostCategories = [
  { id: "body",          label: "Body",           icon: HeartHandshake, color: "#FF6B35",
    prompts: ["Do 10 jumping jacks", "Hold a plank for 20 seconds", "Stretch for 5 minutes", "Do a quick yoga pose"] },
  { id: "joy",           label: "Joy",            icon: Smile,          color: "#FFD700",
    prompts: ["Dance to your favorite song", "Watch something that makes you laugh", "Smile at yourself in the mirror"] },
  { id: "creativity",    label: "Creativity",     icon: Palette,        color: "#DDA0DD",
    prompts: ["Draw something and take a photo", "Write a short poem", "Build something with what you have around you"] },
  { id: "brain",         label: "Brain",          icon: Brain,          color: "#1E90FF",
    prompts: ["Solve a riddle", "Name 5 countries in 10 seconds", "Count backwards from 100 by 7s", "Do a word search"] },
  { id: "life",          label: "Life",           icon: Star,           color: "#2E8B57",
    prompts: ["Organize one drawer", "Write down 3 goals", "Plan tomorrow morning tonight"] },
  { id: "social",        label: "Social",         icon: Users,          color: "#FF9F43",
    prompts: ["Call someone you care about", "Send a kind text message", "Say hi to a stranger", "Compliment someone today"] },
  { id: "confidence",    label: "Confidence",     icon: Shield,         color: "#E84535",
    prompts: ["Say 3 things you like about yourself", "Try something new today", "Stand tall for 2 minutes (power pose)"] },
  { id: "movement",      label: "Movement",       icon: Bike,           color: "#FF6B35",
    prompts: ["Walk around the block", "Do 20 squats", "Go up and down stairs 3 times", "Dance for 3 minutes"] },
  { id: "creative",      label: "Creative",       icon: Sparkles,       color: "#CD7F32",
    prompts: ["Take a photo of something beautiful", "Doodle for 5 minutes", "Make up a story about an animal"] },
  { id: "skills",        label: "Skills",         icon: HandMetal,      color: "#8080FF",
    prompts: ["Tie a new knot", "Learn a new word", "Practice a skill for 5 minutes"] },
  { id: "exec-function", label: "Exec Function",  icon: BrainCircuit,   color: "#7F9BAA",
    prompts: ["Make a to-do list for today", "Set 3 timers for tasks", "Prioritize your top 3 tasks"] },
  { id: "regulation",    label: "Regulation",     icon: Gauge,          color: "#9B59B6",
    prompts: ["Rate your mood 1-10", "Do box breathing (4-4-4-4)", "Name the emotion you are feeling right now"] },
]

/* -- Positive reflections pool -- */
const positiveReflections = [
  { title: "Amazing work!", message: "Every step you take is building a stronger, brighter you." },
  { title: "You did it!", message: "That took real courage. Be proud of yourself right now." },
  { title: "Way to show up!", message: "Showing up is the hardest part, and you nailed it." },
  { title: "Keep going!", message: "You are proving to yourself that you can do hard things." },
  { title: "Incredible!", message: "Small wins add up to big change. This matters." },
  { title: "Proud of you!", message: "You are taking care of yourself, and that is powerful." },
  { title: "You are growing!", message: "Every task you complete is a seed planted for your future." },
  { title: "Brilliant!", message: "Your effort today is shaping a better tomorrow." },
  { title: "Well done!", message: "You chose to move forward instead of standing still." },
  { title: "Look at you go!", message: "Consistency is your superpower. Keep stacking these wins." },
  { title: "That was brave!", message: "Facing your day head-on takes strength. You have it." },
  { title: "Unstoppable!", message: "Nothing can slow you down when you show up like this." },
]

function getRandomReflection() {
  return positiveReflections[Math.floor(Math.random() * positiveReflections.length)]
}

/* -- Workout routines -- */
const outdoorActivities = [
  { label: "Collective Walk", desc: "Walk 20 min and earn chips", icon: Footprints, reward: "walking chips" },
  { label: "Outdoor Jog", desc: "Jog around the block", icon: PersonStanding, reward: "movement XP" },
]
const indoorWorkouts = [
  { label: "Explorer Workout", desc: "Follow along with Explorer", char: "Explorer" },
  { label: "Knight Strength", desc: "Bodyweight moves with Knight", char: "Knight" },
  { label: "Fairy Stretch", desc: "Gentle stretching with Fairy", char: "Fairy" },
]

/* -- Recipes / Fuel -- */
const recipes = [
  { id: "smoothie", name: "Power Smoothie", desc: "Banana, spinach, peanut butter, oat milk", difficulty: "Easy" },
  { id: "stirfry", name: "Quick Stir-Fry", desc: "Veggies, rice, soy sauce, sesame oil", difficulty: "Easy" },
  { id: "omelette", name: "Veggie Omelette", desc: "Eggs, peppers, onions, cheese", difficulty: "Easy" },
  { id: "wrap", name: "Chicken Wrap", desc: "Grilled chicken, lettuce, tomato, tortilla", difficulty: "Medium" },
]

/* ================================================================== */
/*  HomePage Component                                                  */
/* ================================================================== */
export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [journalUnlocked, setJournalUnlocked] = useState(false)
  const [showFuelModal, setShowFuelModal] = useState(false)
  const [fuelStep, setFuelStep] = useState<"choice" | "already-ate" | "not-yet">("choice")
  const [fuelDone, setFuelDone] = useState(false)
  const [showWorryBox, setShowWorryBox] = useState(false)
  const [showRoadblock, setShowRoadblock] = useState<typeof roadblocks[0] | null>(null)
  const [showThoughtSorter, setShowThoughtSorter] = useState(false)
  const [showMeditation, setShowMeditation] = useState(false)
  const [showMilestone, setShowMilestone] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showMovement, setShowMovement] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [completedXp, setCompletedXp] = useState<string[]>([])
  const [showBoostModal, setShowBoostModal] = useState<typeof boostCategories[0] | null>(null)
  const [completedBoosts, setCompletedBoosts] = useState<string[]>([])
  const [selectedMedChar, setSelectedMedChar] = useState(meditationCharacters[0].id)
  const [worryText, setWorryText] = useState("")
  const [thoughtText, setThoughtText] = useState("")
  const [breathCount, setBreathCount] = useState(0)
  const [section, setSection] = useState<"home" | "adventures">("home")
  const [friendMsg, setFriendMsg] = useState("")
  const [activeAdventure] = useState("jungle")
  const [showReflection, setShowReflection] = useState<{ title: string; message: string } | null>(null)
  const reflectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function triggerReflection() {
    const r = getRandomReflection()
    setShowReflection(r)
    if (reflectionTimerRef.current) clearTimeout(reflectionTimerRef.current)
    reflectionTimerRef.current = setTimeout(() => setShowReflection(null), 3500)
  }

  const xp = 240
  const streak = 5
  const currency = xpCurrencies[activeAdventure] ?? xpCurrencies.jungle
  const { greeting } = getTimeGreeting()
  const question = getTodayQuestion()

  useEffect(() => {
    if (isRecording) {
      recordTimerRef.current = setTimeout(() => {
        setIsRecording(false)
        setJournalUnlocked(true)
        triggerReflection()
      }, 2000)
    } else if (recordTimerRef.current) {
      clearTimeout(recordTimerRef.current)
    }
    return () => { if (recordTimerRef.current) clearTimeout(recordTimerRef.current) }
  }, [isRecording])

  return (
    <div className="flex h-dvh flex-col bg-[#0C1B2A]">
      {/* -- Top Bar -- */}
      <header className="flex shrink-0 items-center justify-between px-5 pt-5 pb-2">
        {/* Adventure-themed currency */}
        <div className="flex items-center gap-2 rounded-full bg-[#1A2D42] px-4 py-2" style={{ borderLeft: `3px solid ${currency.color}` }}>
          {currency.icon}
          <span className="text-base font-bold" style={{ color: currency.color }}>{xp}</span>
          <span className="text-[10px] font-semibold text-[#5A8AAF]">{currency.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowLeaderboard(true)} className="flex items-center gap-1.5 rounded-full bg-[#1A2D42] px-3 py-2 transition-colors hover:bg-[#243B55]" aria-label="Leaderboard">
            <Trophy className="h-4 w-4 text-[#FFD700]" />
            <span className="text-xs font-bold text-[#FFD700]">{"#3"}</span>
          </button>
          <div className="flex items-center gap-2 rounded-full bg-[#1A2D42] px-3 py-2">
            <Flame className="h-4 w-4 text-[#FF6B35]" />
            <span className="text-sm font-bold text-[#FF6B35]">{streak}d</span>
          </div>
        </div>
      </header>

      {/* -- Tab switcher -- */}
      <div className="flex shrink-0 items-center gap-1 px-5 pt-1 pb-3">
        <button onClick={() => setSection("home")} className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${section === "home" ? "bg-[#2E8B57] text-white" : "bg-[#1A2D42] text-[#5A8AAF]"}`}>
          Journal
        </button>
        <button onClick={() => setSection("adventures")} className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${section === "adventures" ? "bg-[#2E8B57] text-white" : "bg-[#1A2D42] text-[#5A8AAF]"}`}>
          Adventures
        </button>
      </div>

      {/* -- Scrollable Content -- */}
      <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pb-6">
        {section === "home" ? (
          <>
            {/* -- Greeting -- */}
            <section className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-white text-balance">{greeting}, Explorer</h1>
              <p className="mt-1 text-base text-[#8AA8C7]">
                {journalUnlocked ? "Journal unlocked. Your quest awaits." : "Unlock your quest with your voice."}
              </p>
            </section>

            {/* -- Voice Journal Card -- */}
            <section className="rounded-3xl bg-[#13263A] p-6">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">{"Today's Journal"}</h2>
                {journalUnlocked && <span className="rounded-full bg-[#2E8B57]/20 px-3 py-1 text-xs font-bold text-[#A8E6B0]">Unlocked</span>}
              </div>
              <p className="mb-5 text-lg font-bold leading-relaxed text-white">{question}</p>
              <div className="flex flex-col items-center gap-3">
                <button
                  onMouseDown={() => setIsRecording(true)} onMouseUp={() => setIsRecording(false)} onMouseLeave={() => setIsRecording(false)}
                  onTouchStart={() => setIsRecording(true)} onTouchEnd={() => setIsRecording(false)}
                  className={`flex h-20 w-20 items-center justify-center rounded-full transition-all ${isRecording ? "scale-110 bg-[#FF6B6B]" : "bg-[#2E8B57] hover:bg-[#24734A]"}`}
                  style={{ boxShadow: isRecording ? "0 0 0 8px rgba(255,107,107,0.25), 0 0 24px rgba(255,107,107,0.3)" : "0 4px 20px rgba(46,139,87,0.35)" }}
                  aria-label="Hold to record your voice journal"
                >
                  {isRecording ? <Pause className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
                </button>
                <span className="text-sm font-semibold text-[#5A8AAF]">{isRecording ? "Recording..." : "Hold to record"}</span>
              </div>
            </section>

            {/* -- Worry Box (moved above Extra XP) -- */}
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

            {/* -- Extra XP -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Extra XP</h2>
                <div className="flex items-center gap-1 rounded-full px-3 py-1" style={{ backgroundColor: `${currency.color}15` }}>
                  <Zap className="h-3.5 w-3.5" style={{ color: currency.color }} />
                  <span className="text-xs font-bold" style={{ color: currency.color }}>
                    {completedXp.reduce((sum, id) => sum + (extraXpItems.find(x => x.id === id)?.xp ?? 0), 0)} {currency.name}
                  </span>
                </div>
              </div>
              <p className="mb-3 text-sm text-[#8AA8C7]">Earn bonus {currency.name} through extra activities beyond your daily quest.</p>
              <div className="flex flex-col gap-2">
                {extraXpItems.map((item) => {
                  const done = completedXp.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => { if (!done) { setCompletedXp((prev) => [...prev, item.id]); triggerReflection() } }}
                      className={`flex items-center gap-3 rounded-2xl p-4 text-left transition-all ${done ? "bg-[#2E8B57]/15 ring-1 ring-[#2E8B57]/30" : "bg-[#1A2D42] hover:scale-[1.01] active:scale-[0.99]"}`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: done ? "#2E8B5722" : `${item.color}22` }}>
                        {done ? <Star className="h-5 w-5 text-[#2E8B57]" /> : <item.icon className="h-5 w-5" style={{ color: item.color }} />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${done ? "text-[#A8E6B0]" : "text-white"}`}>{item.label}</p>
                        <p className="text-xs text-[#8AA8C7]">{item.desc}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${done ? "bg-[#2E8B57]/20 text-[#A8E6B0]" : "bg-[#FFD700]/15 text-[#FFD700]"}`}>
                        {done ? "Done" : `+${item.xp}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* -- Boosts (interactive XP activities with prompts + photo upload) -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Boosts</h2>
                <span className="rounded-full bg-[#FFD700]/10 px-3 py-1 text-[10px] font-bold text-[#FFD700]">
                  {completedBoosts.length}/{boostCategories.length} done
                </span>
              </div>
              <p className="mb-3 text-sm text-[#8AA8C7]">Tap a boost for a quick XP activity. Complete the prompt and upload a photo.</p>
              <div className="grid grid-cols-4 gap-2">
                {boostCategories.map((boost) => {
                  const done = completedBoosts.includes(boost.id)
                  return (
                    <button
                      key={boost.id}
                      onClick={() => { if (!done) setShowBoostModal(boost) }}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-all ${done ? "ring-2 ring-[#2E8B57]/50" : "hover:scale-105"}`}
                      style={{ backgroundColor: done ? "#2E8B5722" : "#1A2D42" }}
                    >
                      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: done ? "#2E8B5733" : `${boost.color}22` }}>
                        {done
                          ? <Check className="h-4 w-4 text-[#2E8B57]" />
                          : <boost.icon className="h-4 w-4" style={{ color: boost.color }} />
                        }
                      </div>
                      <span className={`text-[10px] font-bold leading-tight text-center ${done ? "text-[#A8E6B0]" : "text-white"}`}>{boost.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* -- Fuel Check -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Fuel Check</h2>
                {fuelDone && (
                  <span className="flex items-center gap-1 rounded-full bg-[#2E8B57]/20 px-3 py-1 text-xs font-bold text-[#A8E6B0]">
                    <Check className="h-3 w-3" /> Fueled
                  </span>
                )}
              </div>
              <p className="mb-4 text-sm text-[#8AA8C7]">
                {fuelDone ? "Great job fueling up today!" : "Have you eaten today? Tap below to check in."}
              </p>
              {!fuelDone ? (
                <button
                  onClick={() => { setFuelStep("choice"); setShowFuelModal(true) }}
                  className="group flex w-full flex-col items-center gap-3 rounded-2xl bg-[#1A2D42] p-6 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D4872C]/15 transition-transform group-hover:scale-110">
                    <UtensilsCrossed className="h-10 w-10 text-[#D4872C]" />
                  </div>
                  <span className="text-base font-bold text-white">Add Fuel</span>
                  <span className="text-xs text-[#8AA8C7]">Log a meal or get suggestions</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl bg-[#2E8B57]/10 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E8B57]/20">
                    <Check className="h-6 w-6 text-[#2E8B57]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#A8E6B0]">Fuel logged for today</p>
                    <p className="text-xs text-[#8AA8C7]">+15 {currency.name} earned</p>
                  </div>
                  <button
                    onClick={() => { setFuelStep("choice"); setShowFuelModal(true) }}
                    className="rounded-lg bg-[#1A2D42] px-3 py-1.5 text-xs font-bold text-[#8AA8C7] transition-colors hover:bg-[#243B55]"
                  >
                    Log again
                  </button>
                </div>
              )}
            </section>

            {/* -- Today's Quest -- */}
            {journalUnlocked && (
              <section className="rounded-3xl bg-[#13263A] p-5">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">{"Today's Quest"}</h2>
                <div className="mb-3 rounded-2xl bg-[#1A2D42] p-4">
                  <p className="mb-1 text-sm font-bold text-[#FFD700]">Riddle of the Day</p>
                  <p className="text-base leading-relaxed text-white">{"I have cities but no houses, forests but no trees, and water but no fish. What am I?"}</p>
                  <p className="mt-2 text-xs text-[#5A8AAF]">Answer: A map! Now begin your quest.</p>
                </div>
                <Link href="/jungle" className="flex items-center justify-center gap-2 rounded-xl bg-[#2E8B57] px-4 py-3 font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <MapPin className="h-5 w-5" /> Go to My Map
                </Link>
              </section>
            )}

            {/* -- Movement & Exercise -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Movement & Exercise</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Outdoor walks earn chips. Indoor workouts are character-led.</p>
              <Button onClick={() => setShowMovement(true)} className="w-full rounded-xl bg-[#FF6B35] text-white hover:bg-[#E05A28]">
                <Dumbbell className="mr-2 h-4 w-4" /> Start Moving
              </Button>
            </section>

            {/* -- Recipes & Fuel Cooking -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Fuel: Recipes</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Make your own recipes. Want to eat your hard work or try a meal kit?</p>
              <Button onClick={() => setShowRecipes(true)} variant="outline" className="w-full rounded-xl border-[#2E8B57]/40 bg-transparent text-[#A8E6B0] hover:bg-[#2E8B57]/10">
                <ChefHat className="mr-2 h-4 w-4" /> Browse Recipes
              </Button>
            </section>

            {/* -- Roadblock Skills -- */}
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

            {/* -- Meditation -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Meditation Break</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Choose a character and take a guided breathing break.</p>
              <Button onClick={() => setShowMeditation(true)} variant="outline" className="w-full rounded-xl border-[#DDA0DD]/40 bg-transparent text-[#DDA0DD] hover:bg-[#DDA0DD]/10">
                <Sparkles className="mr-2 h-4 w-4" /> Meditate
              </Button>
            </section>

            {/* -- Milestone Check-In -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Milestone Check-In</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Weekly and monthly reflections to stay on track.</p>
              <Button onClick={() => setShowMilestone(true)} variant="outline" className="w-full rounded-xl border-[#FFD700]/40 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10">
                <CalendarCheck className="mr-2 h-4 w-4" /> Check In
              </Button>
            </section>

            {/* Schedule the Joy */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Schedule the Joy</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Pick a fun activity, schedule it, and take a photo when you do it.</p>
              <div className="grid grid-cols-2 gap-2">
                {["Go for a walk", "Cook something fun", "Call a friend", "Read a book"].map((act) => (
                  <button key={act} className="rounded-xl bg-[#1A2D42] px-3 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95">{act}</button>
                ))}
              </div>
            </section>

            {/* Find Your Ikigai */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Find Your Ikigai</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">End-of-month exploration. Discover hobbies, readings, podcasts, and outdoor activities.</p>
              <div className="flex flex-wrap gap-2">
                {["Hobbies", "Readings", "Podcasts", "Outdoors"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#1A2D42] px-3 py-1.5 text-xs font-bold text-[#A8E6B0]">{tag}</span>
                ))}
              </div>
            </section>

            {/* -- Reminders -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Reminders</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Stay on track with scheduled prompts and task reminders.</p>
              <Button onClick={() => setShowReminders(true)} variant="outline" className="w-full rounded-xl border-[#FF9F43]/40 bg-transparent text-[#FF9F43] hover:bg-[#FF9F43]/10">
                <Bell className="mr-2 h-4 w-4" /> View Reminders
              </Button>
            </section>
          </>
        ) : (
          /* -- Adventures Grid -- */
          <>
            <section className="text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-white text-balance">Choose Your Adventure</h1>
              <p className="mt-1 text-sm text-[#8AA8C7]">Each landscape is a new world to explore.</p>
            </section>
            <section className="flex flex-col gap-3">
              {adventures.map((adv) => {
                const advCurrency = xpCurrencies[adv.id]
                return (
                  <Link key={adv.id} href={adv.href} className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${adv.gradient} border ${adv.border} p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]`}>
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${adv.iconBg}`}>
                      <LandscapeIcon id={adv.id} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-base font-bold text-white">{adv.name}</span>
                      <span className={`text-sm ${adv.textColor}`}>{adv.tagline}</span>
                    </div>
                    {advCurrency && (
                      <div className="flex items-center gap-1">
                        {advCurrency.icon}
                        <span className="text-xs font-bold" style={{ color: advCurrency.color }}>{advCurrency.name}</span>
                      </div>
                    )}
                    <ChevronRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1" />
                  </Link>
                )
              })}
            </section>
          </>
        )}
      </main>

      {/* ---- MODALS ---- */}

      {/* Fuel Modal -- multi-step */}
      <Dialog open={showFuelModal} onOpenChange={(open) => { setShowFuelModal(open); if (!open) setFuelStep("choice") }}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          {fuelStep === "choice" && (
            <>
              <DialogHeader className="flex flex-col items-center gap-3">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#D4872C]/15">
                  <Camera className="h-12 w-12 text-[#D4872C]" />
                </div>
                <DialogTitle className="text-xl font-bold text-white">Have You Eaten?</DialogTitle>
                <DialogDescription className="text-center text-sm text-[#8AA8C7]">Fueling your body is part of the adventure. Let us know how your eating is going today.</DialogDescription>
              </DialogHeader>
              <div className="mt-5 flex flex-col gap-3">
                <button onClick={() => setFuelStep("already-ate")} className="flex items-center gap-4 rounded-2xl bg-[#2E8B57]/15 p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99] ring-1 ring-[#2E8B57]/30">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2E8B57]/20"><Check className="h-7 w-7 text-[#2E8B57]" /></div>
                  <div>
                    <p className="text-base font-bold text-[#A8E6B0]">I already ate</p>
                    <p className="text-sm text-[#8AA8C7]">Record what you had with a photo</p>
                  </div>
                </button>
                <button onClick={() => setFuelStep("not-yet")} className="flex items-center gap-4 rounded-2xl bg-[#D4872C]/10 p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99] ring-1 ring-[#D4872C]/30">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4872C]/20"><Clock className="h-7 w-7 text-[#D4872C]" /></div>
                  <div>
                    <p className="text-base font-bold text-[#FFD699]">{"I haven't eaten yet"}</p>
                    <p className="text-sm text-[#8AA8C7]">Get meal ideas based on the time of day</p>
                  </div>
                </button>
              </div>
            </>
          )}
          {fuelStep === "already-ate" && (
            <>
              <DialogHeader>
                <button onClick={() => setFuelStep("choice")} className="mb-2 flex items-center gap-1 text-sm text-[#5A8AAF] transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Back</button>
                <DialogTitle className="text-xl font-bold text-white">Record Your Meal</DialogTitle>
                <DialogDescription className="text-sm text-[#8AA8C7]">Take a photo of what you ate to log it. You earn +15 {currency.name}.</DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col items-center gap-4">
                <button className="group flex h-40 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#2E8B57]/40 bg-[#1A2D42] transition-all hover:border-[#2E8B57] hover:bg-[#2E8B57]/5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2E8B57]/15 transition-transform group-hover:scale-110"><Camera className="h-8 w-8 text-[#2E8B57]" /></div>
                  <span className="text-sm font-bold text-[#A8E6B0]">Tap to take a photo</span>
                  <span className="text-xs text-[#5A8AAF]">or upload from gallery</span>
                </button>
                <textarea placeholder="What did you eat? (optional)" className="min-h-20 w-full rounded-xl border-0 bg-[#1A2D42] p-4 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]" />
                <Button onClick={() => { setFuelDone(true); setShowFuelModal(false); setFuelStep("choice"); triggerReflection() }} className="w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]">
                  <Check className="mr-2 h-4 w-4" /> Log Meal (+15 {currency.name})
                </Button>
              </div>
            </>
          )}
          {fuelStep === "not-yet" && (() => {
            const { mealTime, suggestions } = getMealSuggestions()
            return (
              <>
                <DialogHeader>
                  <button onClick={() => setFuelStep("choice")} className="mb-2 flex items-center gap-1 text-sm text-[#5A8AAF] transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Back</button>
                  <DialogTitle className="text-xl font-bold text-white"><span className="flex items-center gap-2"><Clock className="h-5 w-5 text-[#D4872C]" />{mealTime} Ideas</span></DialogTitle>
                  <DialogDescription className="text-sm text-[#8AA8C7]">{"It's"} {mealTime.toLowerCase()} time. Here are some ideas to get you fueled up.</DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex flex-col gap-2">
                  {suggestions.map((s) => (
                    <button key={s.name} onClick={() => { setFuelDone(true); setShowFuelModal(false); setFuelStep("choice"); triggerReflection() }} className="flex items-start gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4872C]/15"><UtensilsCrossed className="h-5 w-5 text-[#D4872C]" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{s.name}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#8AA8C7]">{s.desc}</p>
                      </div>
                      <span className="mt-0.5 rounded-full bg-[#D4872C]/15 px-2.5 py-1 text-[10px] font-bold text-[#FFD699]">{s.tag}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-[#5A8AAF]">Tap a meal to log it. You can always take a photo after!</p>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* Worry Box Modal */}
      <Dialog open={showWorryBox} onOpenChange={setShowWorryBox}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Worry Box</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Write it down and lock it away. Open it with your therapist.</DialogDescription>
          </DialogHeader>
          <textarea value={worryText} onChange={(e) => setWorryText(e.target.value)} placeholder="What is worrying you?" className="mt-3 min-h-28 w-full rounded-xl border-0 bg-[#1A2D42] p-4 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]" />
          <Button onClick={() => { setWorryText(""); setShowWorryBox(false); triggerReflection() }} className="mt-3 w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"><Lock className="mr-2 h-4 w-4" /> Lock it Away</Button>
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
              <Button onClick={() => { setBreathCount((c) => c + 1); if (breathCount >= 5) triggerReflection() }} className="rounded-xl bg-[#4ECDC4] text-white hover:bg-[#3DBDB5]"><Wind className="mr-2 h-4 w-4" /> {breathCount === 0 ? "Start" : "Next Breath"} ({breathCount}/6)</Button>
            </div>
          )}
          {showRoadblock?.id === "stretch" && (
            <div className="mt-4 flex flex-col gap-2 text-left">
              {["Reach for the sky", "Touch your toes", "Twist left and right", "Roll your shoulders"].map((s, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl bg-[#1A2D42] p-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF9F43]/20 text-xs font-bold text-[#FF9F43]">{i + 1}</span>
                  <span className="text-sm text-white">{s}</span>
                </div>
              ))}
            </div>
          )}
          {showRoadblock?.id === "water" && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <Heart className="h-16 w-16 text-[#1E90FF]" />
              <p className="text-base font-bold text-white">Go drink a glass of water right now!</p>
              <Button onClick={() => { setShowRoadblock(null); triggerReflection() }} className="rounded-xl bg-[#1E90FF] text-white hover:bg-[#1878D6]"><Heart className="mr-2 h-4 w-4" /> Done!</Button>
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
          <textarea value={thoughtText} onChange={(e) => setThoughtText(e.target.value)} placeholder="Write a thought..." className="mt-3 min-h-20 w-full rounded-xl border-0 bg-[#1A2D42] p-4 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#9B59B6]" />
          <div className="mt-3 flex gap-3">
            <Button onClick={() => { setThoughtText(""); triggerReflection() }} variant="outline" className="flex-1 rounded-xl border-[#E84535]/40 text-[#E84535] hover:bg-[#E84535]/10"><Trash2 className="mr-2 h-4 w-4" /> Trash It</Button>
            <Button onClick={() => { setThoughtText(""); triggerReflection() }} className="flex-1 rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"><Gem className="mr-2 h-4 w-4" /> Keep It</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meditation Modal */}
      <Dialog open={showMeditation} onOpenChange={setShowMeditation}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Meditation Break</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Who do you want to meditate with?</DialogDescription>
          </DialogHeader>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {meditationCharacters.map((c) => (
              <button key={c.id} onClick={() => setSelectedMedChar(c.id)} className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${selectedMedChar === c.id ? "scale-105 ring-2" : "hover:scale-105"}`} style={{ backgroundColor: selectedMedChar === c.id ? `${c.color}22` : "#1A2D42", borderColor: selectedMedChar === c.id ? c.color : "transparent" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${c.color}33` }}><Sparkles className="h-5 w-5" style={{ color: c.color }} /></div>
                <span className="text-[10px] font-bold text-white">{c.label}</span>
              </button>
            ))}
          </div>
          <Button onClick={() => { setShowMeditation(false); triggerReflection() }} className="mt-4 w-full rounded-xl bg-[#DDA0DD] text-[#1A1014] hover:bg-[#CC8FCC]"><Wind className="mr-2 h-4 w-4" /> Begin Breathing</Button>
        </DialogContent>
      </Dialog>

      {/* Milestone Check-In Modal */}
      <Dialog open={showMilestone} onOpenChange={setShowMilestone}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Milestone Check-In</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Reflect on your progress.</DialogDescription>
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
            <Button className="w-full rounded-xl bg-[#FFD700] text-[#1A1014] hover:bg-[#E8C400]"><CalendarCheck className="mr-2 h-4 w-4" /> Set Reminders</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leaderboard + Friend Connection Modal */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white"><Trophy className="h-5 w-5 text-[#FFD700]" /> Leaderboard</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Ranked by XP. See where everyone is on their adventure.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {[...leaderboard].sort((a, b) => a.rank - b.rank).map((p, i) => {
              const pCurrency = xpCurrencies[p.adventure]
              return (
                <div key={p.name} className={`flex items-center gap-3 rounded-2xl p-3 ${p.name === "You" ? "bg-[#2E8B57]/20 ring-1 ring-[#2E8B57]/40" : "bg-[#1A2D42]"}`}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${i === 0 ? "bg-[#FFD700]/20 text-[#FFD700]" : i === 1 ? "bg-[#C0C0C0]/20 text-[#C0C0C0]" : i === 2 ? "bg-[#CD7F32]/20 text-[#CD7F32]" : "bg-[#1A2D42] text-[#5A8AAF]"}`}>
                    {p.rank}
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className={`text-sm font-bold ${p.name === "You" ? "text-[#A8E6B0]" : "text-white"}`}>{p.name}</span>
                    <span className="text-[10px] capitalize text-[#5A8AAF]">{p.adventure} adventure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {pCurrency?.icon}
                    <span className="text-sm font-bold" style={{ color: pCurrency?.color }}>{p.xp}</span>
                  </div>
                  {p.name !== "You" && (
                    <button className="rounded-full bg-[#2E8B57]/20 p-1.5 transition-colors hover:bg-[#2E8B57]/30" aria-label={`Send message to ${p.name}`}>
                      <MessageCircle className="h-3.5 w-3.5 text-[#A8E6B0]" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          {/* Friend Connection integrated here */}
          <div className="mt-4 rounded-2xl bg-[#1A2D42] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#2E8B57]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Friend Connection</span>
            </div>
            <p className="mb-3 text-xs text-[#8AA8C7]">Send encouragement to fellow adventurers.</p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {quickMessages.map((m) => (
                <button key={m} className="rounded-full bg-[#0C1B2A] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#2E8B57]/20">{m}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={friendMsg} onChange={(e) => setFriendMsg(e.target.value)} placeholder="Write a message..." className="flex-1 rounded-xl border-0 bg-[#0C1B2A] px-4 py-2.5 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]" />
              <Button onClick={() => setFriendMsg("")} className="rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Boost Activity Modal */}
      <Dialog open={!!showBoostModal} onOpenChange={() => setShowBoostModal(null)}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          {showBoostModal && (
            <>
              <DialogHeader className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${showBoostModal.color}22` }}>
                  <showBoostModal.icon className="h-8 w-8" style={{ color: showBoostModal.color }} />
                </div>
                <DialogTitle className="text-xl font-bold text-white">{showBoostModal.label} Boost</DialogTitle>
                <DialogDescription className="text-center text-sm text-[#8AA8C7]">Complete one of these prompts and upload a photo for +20 {currency.name}.</DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col gap-2">
                {showBoostModal.prompts.map((prompt, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: `${showBoostModal.color}22`, color: showBoostModal.color }}>{i + 1}</span>
                    <span className="flex-1 text-sm text-white">{prompt}</span>
                  </div>
                ))}
              </div>
              <button className="group mt-4 flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-[#1A2D42] transition-all hover:bg-[#243B55]" style={{ borderColor: `${showBoostModal.color}40` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${showBoostModal.color}15` }}>
                  <Camera className="h-6 w-6" style={{ color: showBoostModal.color }} />
                </div>
                <span className="text-sm font-bold" style={{ color: showBoostModal.color }}>Upload Photo Proof</span>
              </button>
              <Button
                onClick={() => { setCompletedBoosts((prev) => [...prev, showBoostModal.id]); setShowBoostModal(null); triggerReflection() }}
                className="mt-3 w-full rounded-xl text-white"
                style={{ backgroundColor: showBoostModal.color }}
              >
                <Check className="mr-2 h-4 w-4" /> Complete Boost (+20 {currency.name})
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Movement & Exercise Modal */}
      <Dialog open={showMovement} onOpenChange={setShowMovement}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white"><Dumbbell className="h-5 w-5 text-[#FF6B35]" /> Movement</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Outdoor walks earn collectible chips. Indoor workouts are character-led.</DialogDescription>
          </DialogHeader>
          <div className="mt-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF6B35]">Outdoor</p>
            <div className="flex flex-col gap-2">
              {outdoorActivities.map((a) => (
                <button key={a.label} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-transform hover:scale-[1.01]">
                  <a.icon className="h-6 w-6 text-[#FF6B35]" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{a.label}</p>
                    <p className="text-xs text-[#8AA8C7]">{a.desc}</p>
                  </div>
                  <span className="rounded-full bg-[#FF6B35]/15 px-2 py-0.5 text-[10px] font-bold text-[#FF6B35]">{a.reward}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#DDA0DD]">Indoor (Character-Led)</p>
            <div className="flex flex-col gap-2">
              {indoorWorkouts.map((w) => (
                <button key={w.label} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-transform hover:scale-[1.01]">
                  <PersonStanding className="h-6 w-6 text-[#DDA0DD]" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{w.label}</p>
                    <p className="text-xs text-[#8AA8C7]">{w.desc}</p>
                  </div>
                  <span className="rounded-full bg-[#DDA0DD]/15 px-2 py-0.5 text-[10px] font-bold text-[#DDA0DD]">{w.char}</span>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipes Modal */}
      <Dialog open={showRecipes} onOpenChange={setShowRecipes}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white"><ChefHat className="h-5 w-5 text-[#2E8B57]" /> Fuel: Recipes</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Cook a recipe and upload a photo to fuel up. Try meal kits too!</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {recipes.map((r) => (
              <button key={r.id} className="flex items-start gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-transform hover:scale-[1.01]">
                <ChefHat className="mt-0.5 h-5 w-5 shrink-0 text-[#2E8B57]" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{r.name}</p>
                  <p className="text-xs text-[#8AA8C7]">{r.desc}</p>
                </div>
                <span className="rounded-full bg-[#2E8B57]/15 px-2 py-0.5 text-[10px] font-bold text-[#A8E6B0]">{r.difficulty}</span>
              </button>
            ))}
          </div>
          <Button onClick={() => { setShowRecipes(false); triggerReflection() }} className="mt-3 w-full rounded-xl bg-[#D4872C] text-white hover:bg-[#B8711E]"><Camera className="mr-2 h-4 w-4" /> Upload Meal Photo</Button>
        </DialogContent>
      </Dialog>

      {/* Reminders Modal */}
      <Dialog open={showReminders} onOpenChange={setShowReminders}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white"><Bell className="h-5 w-5 text-[#FF9F43]" /> Reminders</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Scheduled prompts to keep you on track.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {[
              { time: "9:00 AM", label: "Morning journal entry", active: true },
              { time: "12:00 PM", label: "Have you completed your task of the day?", active: true },
              { time: "3:00 PM", label: "Afternoon check-in: Water? Stretch?", active: true },
              { time: "6:00 PM", label: "Did you schedule the joy?", active: false },
              { time: "9:00 PM", label: "Evening reflection", active: true },
              { time: "Sunday", label: "End of week: Set up weekly schedule?", active: true },
              { time: "Month End", label: "Find your ikigai", active: true },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-[#1A2D42] p-3">
                <span className="w-16 text-xs font-bold text-[#FF9F43]">{r.time}</span>
                <span className="flex-1 text-sm text-white">{r.label}</span>
                <div className={`h-2.5 w-2.5 rounded-full ${r.active ? "bg-[#2E8B57]" : "bg-[#5A8AAF]"}`} />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Positive Reflection Popup ---- */}
      {showReflection && (
        <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center pb-28">
          <button
            onClick={() => setShowReflection(null)}
            className="pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-500 flex flex-col items-center gap-2 rounded-3xl bg-[#2E8B57] px-8 py-5 text-center shadow-[0_8px_40px_rgba(46,139,87,0.45)]"
          >
            {/* Sparkle ring */}
            <div className="relative mb-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -inset-2 animate-ping rounded-full border-2 border-white/20" style={{ animationDuration: "1.5s" }} />
            </div>
            <p className="text-lg font-extrabold text-white">{showReflection.title}</p>
            <p className="max-w-64 text-sm leading-relaxed text-white/85">{showReflection.message}</p>
            <span className="mt-1 text-xs text-white/50">tap to dismiss</span>
          </button>
        </div>
      )}
    </div>
  )
}
