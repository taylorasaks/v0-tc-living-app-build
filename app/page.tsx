"use client"

import { useState, useEffect, useRef } from "react"
import {
  Flame, Mic, ChevronRight, MapPin,
  Wind, Camera, Package, Lock,
  CalendarCheck, Sparkles, Heart, Brain,
  Trash2, Gem, Trophy, Users, Dumbbell, ChefHat, Bell,
  MessageCircle, Send, Footprints, PersonStanding, Star,
  Music, Image, PenLine, Zap, Smile, Palette, BookOpen,
  HandMetal, Shield, Bike, BrainCircuit, Gauge, HeartHandshake,
  UtensilsCrossed, Clock, Check, ArrowLeft, Phone, Pencil,
  Puzzle, Eye, Gamepad2, Megaphone, User, Leaf, Salad,
  CircleAlert, ListChecks, Search, Bot, ChevronDown,
  ChevronUp, Timer, Compass, Lightbulb, Droplets, X
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  desert:     { name: "Scarabs",    icon: <svg viewBox="0 0 20 20" className="inline-block h-5 w-5"><ellipse cx="10" cy="11" rx="7" ry="6" fill="#E8A435"/><circle cx="10" cy="6" r="4" fill="#D4872C"/><path d="M6 5 Q4 2 2 3" stroke="#D4872C" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M14 5 Q16 2 18 3" stroke="#D4872C" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>, color: "#E8A435" },
  mountains:  { name: "Crystals",   icon: <span className="text-lg leading-none">{"💎"}</span>, color: "#7F9BAA" },
  antarctica: { name: "Snowflakes", icon: <span className="text-lg leading-none">{"❄️"}</span>, color: "#89CFF0" },
  volcano:    { name: "Embers",     icon: <span className="text-lg leading-none">{"🔥"}</span>, color: "#E84535" },
  city:       { name: "Tokens",     icon: <svg viewBox="0 0 20 20" className="inline-block h-5 w-5"><circle cx="10" cy="10" r="8" fill="#FFD700"/><circle cx="10" cy="10" r="6" fill="#FFC107"/><text x="10" y="14" textAnchor="middle" fontSize="10" fill="#8B6914" fontWeight="bold">T</text></svg>, color: "#8080FF" },
  atlantis:   { name: "Pearls",     icon: <svg viewBox="0 0 20 20" className="inline-block h-5 w-5"><circle cx="10" cy="10" r="7" fill="#E8E8E8"/><circle cx="10" cy="10" r="5" fill="#F5F5F5"/><ellipse cx="8" cy="8" rx="2" ry="1.5" fill="white" opacity="0.8"/></svg>, color: "#00CED1" },
}

/* ------------------------------------------------------------------ */
/*  Time-based question cycling                                        */
/* ------------------------------------------------------------------ */
const morningQs = [
  "What matters today?",
  "One thing I will finish is...",
  "How do I feel right now?",
  "What is one thing you want to accomplish today?",
]
const afternoonQs = [
  "How was your morning?",
  "What have you done so far today?",
  "What are your plans today?",
  "What is something kind you did for yourself?",
]
const eveningQs = [
  "What did I complete?",
  "What felt hard?",
  "What helped me today?",
  "What is one thing you are grateful for?",
]

/* ------------------------------------------------------------------ */
/*  Stress word detection                                               */
/* ------------------------------------------------------------------ */
const stressWords = ["stressed", "anxious", "panic", "overwhelmed", "scared", "afraid", "worried", "nervous", "can't breathe", "freaking out", "tense", "dread"]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function detectStress(text: string): boolean {
  const lower = text.toLowerCase()
  return stressWords.some((w) => lower.includes(w))
}

/* ------------------------------------------------------------------ */
/*  Scavenger Hunt items                                                */
/* ------------------------------------------------------------------ */
const scavengerItems = [
  { id: "blue", prompt: "Find something blue", xp: 10 },
  { id: "organized", prompt: "Find something organized", xp: 10 },
  { id: "calm", prompt: "Find something calm", xp: 10 },
  { id: "nature", prompt: "Find something from nature", xp: 10 },
  { id: "smile", prompt: "Find something that makes you smile", xp: 15 },
]

/* ------------------------------------------------------------------ */
/*  Profile Config                                                      */
/* ------------------------------------------------------------------ */
const dietOptions = [
  { id: "meat", label: "Meat", icon: UtensilsCrossed },
  { id: "plant", label: "Plant", icon: Leaf },
  { id: "both", label: "Both", icon: Salad },
]

const healthGoals = [
  { id: "energy", label: "Energy" },
  { id: "routine", label: "Routine" },
  { id: "mood", label: "Mood" },
]

const activityLevels = [
  { id: "mild", label: "Mild" },
  { id: "moderate", label: "Moderate" },
  { id: "active", label: "Active" },
]

const personalStruggles = [
  { id: "starting", label: "Starting tasks" },
  { id: "overthinking", label: "Overthinking" },
  { id: "avoiding", label: "Avoiding hard things" },
  { id: "forgetting", label: "Forgetting" },
  { id: "overwhelmed", label: "Feeling overwhelmed" },
]

function getTimeGreeting() {
  const h = new Date().getHours()
  // Greeting is always "Good Morning" per design
  const period = h < 12 ? "morning" as const : h < 17 ? "afternoon" as const : "evening" as const
  return { greeting: "Good Morning", period }
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

/* -- Joy activities with emoji -- */
const joyActivities = [
  { label: "Go for a walk", emoji: "\uD83D\uDEB6" },
  { label: "Cook something fun", emoji: "\uD83C\uDF73" },
  { label: "Call a friend", emoji: "\uD83D\uDCDE" },
  { label: "Read a book", emoji: "\uD83D\uDCDA" },
]

/* -- Roadblock Skills (for Adventure tab) -- */
const roadblockSkills = [
  { id: "breathing", label: "Deep Breathing", emoji: "\uD83C\uDF2C\uFE0F", desc: "Blow away the boulder", instructions: "Close your eyes. Breathe in slowly for 4 seconds through your nose. Hold for 4 seconds. Breathe out slowly for 6 seconds through your mouth. Repeat 5 times. Imagine the boulder crumbling with each exhale." },
  { id: "stretch", label: "Stretch Break", emoji: "\uD83C\uDF3F", desc: "Stretch through the vines", instructions: "Stand up and reach both arms above your head. Hold for 10 seconds. Slowly bend to the left, hold 10 seconds, then to the right. Roll your shoulders forward 5 times, then backward 5 times. Touch your toes and hold for 15 seconds." },
  { id: "hydration", label: "Hydration Check", emoji: "\uD83D\uDCA7", desc: "Wash the boulder away", instructions: "Go get a full glass of water right now. Drink it slowly, taking small sips. Notice the temperature and the feeling as you hydrate. Set a reminder to drink another glass in 1 hour. Your body needs water to think clearly!" },
  { id: "thought-sorter", label: "Thought Sorter", emoji: "\uD83E\uDDE0", desc: "Sort helpful vs unhelpful thoughts", instructions: "Write down the thought bothering you. Ask yourself: Is this thought based on facts or feelings? Would I say this to a friend? What is a more balanced way to think about this? Trash the unhelpful version and keep the balanced one." },
]

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
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [journalUnlocked, setJournalUnlocked] = useState(false)
  const [showFuelModal, setShowFuelModal] = useState(false)
  const [fuelStep, setFuelStep] = useState<"choice" | "already-ate" | "not-yet">("choice")
  const [fuelDone, setFuelDone] = useState(false)
  const [fuelLevel, setFuelLevel] = useState(0)
  const [fuelAnimating, setFuelAnimating] = useState(false)
  const [characterGlowing, setCharacterGlowing] = useState(false)
  const fuelAnimRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [showWorryBox, setShowWorryBox] = useState(false)
  const [showRoadblock, setShowRoadblock] = useState<typeof roadblocks[0] | null>(null)
  const [showThoughtSorter, setShowThoughtSorter] = useState(false)
  const [showMilestone, setShowMilestone] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showMovement, setShowMovement] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [showBoostModal, setShowBoostModal] = useState<typeof boostCategories[0] | null>(null)
  const [completedBoosts, setCompletedBoosts] = useState<string[]>([])
  const [worryText, setWorryText] = useState("")
  const [thoughtText, setThoughtText] = useState("")
  // section state replaced by activeTab below
  const [activeAdventure] = useState("jungle")
  const [showReflection, setShowReflection] = useState<{ title: string; message: string } | null>(null)
  const reflectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)


  /* -- 3-tab nav (Check-In / Adventure / Profile) -- */
  const [activeTab, setActiveTab] = useState<"checkin" | "journey" | "profile">("checkin")

  /* -- Schedule the Joy state -- */
  const [showJoyCalendar, setShowJoyCalendar] = useState(false)
  const [joyActivity, setJoyActivity] = useState("")
  const [joyDate, setJoyDate] = useState("")
  const [joyTime, setJoyTime] = useState("")
  const [scheduledJoys, setScheduledJoys] = useState<{ activity: string; emoji: string; date: string; time: string }[]>([])

  /* -- Leaderboard encouragement state -- */
  const [showEncouragement, setShowEncouragement] = useState<string | null>(null)
  const [encourageMsg, setEncourageMsg] = useState("")

  /* -- Roadblock Skills modal (Adventure tab) -- */
  const [showRoadblockSkill, setShowRoadblockSkill] = useState<{ id: string; label: string; emoji: string; desc: string; instructions: string } | null>(null)

  /* -- Landscape dropdown -- */
  const [showLandscapeDropdown, setShowLandscapeDropdown] = useState(false)

  /* -- My Day auto-log -- */
  const [myDayLog, setMyDayLog] = useState<{ time: string; label: string }[]>([])

  /* -- Scavenger Hunt -- */
  const [completedScavenger, setCompletedScavenger] = useState<string[]>([])

  /* -- Stress detection / breathing offer -- */
  const [showStressBreathing, setShowStressBreathing] = useState(false)
  const [stressBreathCount, setStressBreathCount] = useState(0)

  /* -- Self-efficacy popup -- */
  const [showSelfEfficacy, setShowSelfEfficacy] = useState(false)
  const [tasksCompletedThisWeek] = useState(6)

  /* -- Solution Box (AI therapist chat) -- */
  const [showSolutionBox, setShowSolutionBox] = useState(false)
  const [solutionMessages, setSolutionMessages] = useState<{ role: "user" | "ai"; text: string; time: string }[]>([
    { role: "ai", text: "Hi there. I am your Solution Guide. Tell me what is on your mind, and we will work through it together.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ])
  const [solutionInput, setSolutionInput] = useState("")

  /* -- Breathing countdown for roadblock -- */
  const [breathPhase, setBreathPhase] = useState<"idle" | "in" | "out" | "done">("idle")
  const [breathTimer, setBreathTimer] = useState(0)
  const [breathRound, setBreathRound] = useState(0)
  const breathIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* -- Voice journal 60s timer -- */
  const [recordSeconds, setRecordSeconds] = useState(0)
  const recordIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* -- My Day expand -- */
  const [myDayExpanded, setMyDayExpanded] = useState(false)

  /* -- Profile state -- */
  const [profileDiet, setProfileDiet] = useState("both")
  const [profileGoals, setProfileGoals] = useState<string[]>(["routine"])
  const [profileStomach, setProfileStomach] = useState(false)
  const [profileActivity, setProfileActivity] = useState("moderate")
  const [profileStruggles, setProfileStruggles] = useState<string[]>(["starting"])

  function triggerReflection() {
    const r = getRandomReflection()
    setShowReflection(r)
    if (reflectionTimerRef.current) clearTimeout(reflectionTimerRef.current)
    reflectionTimerRef.current = setTimeout(() => setShowReflection(null), 3500)
  }

  const xp = 240
  const streak = 5
  const currency = xpCurrencies[activeAdventure] ?? xpCurrencies.jungle
  const [question, setQuestion] = useState("")

  // Hydrate time-dependent values on client only to avoid SSR mismatch
  useEffect(() => {
    setQuestion(getTodayQuestion())
  }, [])

  /* -- Journal prompt picker -- */
  const journalPrompts = [
    "What are your plans today?",
    "What is one thing you want to accomplish today?",
    "What matters most to you right now?",
    "How are you really feeling in this moment?",
    "Describe one thing you are proud of recently.",
    "What is one challenge you want to work through?",
    "Who is someone you are grateful for and why?",
    "What would make today a great day?",
  ]
  const [showJournalPicker, setShowJournalPicker] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState("")

  function addToMyDay(label: string) {
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setMyDayLog((prev) => [...prev, { time, label }])
  }

  function triggerFuelAnimation() {
    setFuelAnimating(true)
    setCharacterGlowing(true)
    setFuelLevel(0)
    // Animate fuel from 0 to 100 over ~2.5s
    let level = 0
    if (fuelAnimRef.current) clearInterval(fuelAnimRef.current)
    fuelAnimRef.current = setInterval(() => {
      level += 2
      if (level >= 100) {
        level = 100
        if (fuelAnimRef.current) clearInterval(fuelAnimRef.current)
        // Keep glow for another second then navigate to adventure
        setTimeout(() => {
          setFuelAnimating(false)
          setCharacterGlowing(false)
          // Auto-navigate to the active adventure
          router.push(`/${activeAdventure}`)
        }, 1200)
      }
      setFuelLevel(level)
    }, 50)
  }

  const RECORD_MIN = 30
  const RECORD_MAX = 60
  const recordingFinishedRef = useRef(false)

  function finishRecording() {
    if (recordingFinishedRef.current) return
    recordingFinishedRef.current = true
    if (recordIntervalRef.current) { clearInterval(recordIntervalRef.current); recordIntervalRef.current = null }
    setIsRecording(false)
    setRecordSeconds(0)
    setJournalUnlocked(true)
    addToMyDay("Voice journal completed")
    triggerReflection()
    if (Math.random() < 0.3) setShowStressBreathing(true)
    if (!showSelfEfficacy && myDayLog.length > 0 && myDayLog.length % 3 === 0) {
      setShowSelfEfficacy(true)
      setTimeout(() => setShowSelfEfficacy(false), 4000)
    }
  }

  function startRecording() {
    if (journalUnlocked || isRecording) return
    recordingFinishedRef.current = false
    setRecordSeconds(0)
    setIsRecording(true)
  }

  useEffect(() => {
    if (!isRecording) {
      if (recordIntervalRef.current) { clearInterval(recordIntervalRef.current); recordIntervalRef.current = null }
      return
    }
    const startTime = Date.now()
    recordIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      if (elapsed >= RECORD_MAX) {
        finishRecording()
        return
      }
      setRecordSeconds(elapsed)
    }, 250)
    return () => {
      if (recordIntervalRef.current) { clearInterval(recordIntervalRef.current); recordIntervalRef.current = null }
    }
  }, [isRecording])

  /* -- Solution Box send -- */
  const aiReplies = [
    "That sounds really tough. Can you tell me more about what triggered that feeling?",
    "You are doing something brave by putting it into words. What would you say to a friend going through this?",
    "I hear you. What is one small thing you could do right now to take care of yourself?",
    "That is a valid feeling. Sometimes naming it is the first step. How intense is it from 1 to 10?",
    "Let us break that down. What part of it feels the heaviest right now?",
    "You are showing real self-awareness. What has helped you cope with something similar before?",
    "I am proud of you for sharing. Would it help to try a breathing exercise before we continue?",
  ]

  function sendSolutionMessage() {
    if (!solutionInput.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const userMsg = { role: "user" as const, text: solutionInput.trim(), time: now }
    setSolutionMessages((prev) => [...prev, userMsg])
    setSolutionInput("")
    addToMyDay(`Solution Box: sent message`)
    // Simulate AI reply after short delay
    setTimeout(() => {
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)]
      const aiTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setSolutionMessages((prev) => [...prev, { role: "ai", text: reply, time: aiTime }])
    }, 1200)
  }

  /* -- Breathing countdown logic for roadblock -- */
  function startBreathingExercise() {
    setBreathPhase("in")
    setBreathTimer(5)
    setBreathRound(1)

    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)

    let phase: "in" | "out" = "in"
    let timer = 5
    let round = 1

    breathIntervalRef.current = setInterval(() => {
      timer -= 1
      if (timer <= 0) {
        if (phase === "in") {
          if (round >= 3) {
            // Switch to out phase
            phase = "out"
            round = 1
            timer = 8
            setBreathPhase("out")
            setBreathRound(1)
            setBreathTimer(8)
            return
          }
          round += 1
          timer = 5
          setBreathRound(round)
          setBreathTimer(5)
          return
        }
        if (phase === "out") {
          if (round >= 3) {
            // Done
            if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
            setBreathPhase("done")
            setBreathTimer(0)
            addToMyDay("Breathing roadblock completed")
            triggerReflection()
            return
          }
          round += 1
          timer = 8
          setBreathRound(round)
          setBreathTimer(8)
          return
        }
      }
      setBreathTimer(timer)
    }, 1000)
  }

  useEffect(() => {
    return () => { if (breathIntervalRef.current) clearInterval(breathIntervalRef.current) }
  }, [])

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

      {/* -- no top tab switcher; bottom nav is used instead -- */}

      {/* -- Scrollable Content -- */}
      <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pb-24">
        {activeTab === "checkin" ? (
          <>
            {/* -- Greeting -- */}
            <section className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-white text-balance">Welcome to Adventure Quest</h1>
              <p className="mt-1 text-base text-[#8AA8C7]">
                {journalUnlocked ? "Journal unlocked. Your quest awaits." : "Unlock your quest with your voice."}
              </p>
            </section>

            {/* -- Voice Journal Card (30s min / 60s max) -- */}
            <section className="rounded-3xl bg-[#13263A] p-6">
              <div className="mb-1 flex items-center justify-between">
                <button
                  onClick={() => !journalUnlocked && !isRecording && setShowJournalPicker(true)}
                  className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF] transition-colors hover:text-[#8AA8C7]"
                >
                  {"Today's Journal"} {!journalUnlocked && !isRecording && <ChevronDown className="ml-1 inline h-3 w-3" />}
                </button>
                {journalUnlocked ? (
                  <span className="rounded-full bg-[#2E8B57]/20 px-3 py-1 text-xs font-bold text-[#A8E6B0]">Unlocked</span>
                ) : isRecording ? (
                  <span className="flex items-center gap-1 rounded-full bg-[#FF6B6B]/15 px-3 py-1 text-xs font-bold text-[#FF6B6B]">
                    <span className="relative mr-1 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B6B] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B6B]" />
                    </span>
                    REC
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-[#1A2D42] px-3 py-1 text-xs font-bold text-[#5A8AAF]">
                    <Timer className="h-3 w-3" /> 30s min / 60s max
                  </span>
                )}
              </div>
              <button
                onClick={() => !journalUnlocked && !isRecording && setShowJournalPicker(true)}
                className="mb-5 w-full text-left text-lg font-bold leading-relaxed text-white transition-colors hover:text-[#A8E6B0]"
              >
                {selectedPrompt || question || "Tap to choose a journal prompt"}
              </button>
              {(() => {
                const pct = Math.min(recordSeconds / RECORD_MAX, 1)
                const circumference = 2 * Math.PI * 48         // ~301.6
                const reachedMin = recordSeconds >= RECORD_MIN
                const ringColor = reachedMin ? "#2E8B57" : "#FF6B6B"
                return (
                  <div className="flex flex-col items-center gap-4">
                    {/* Mic button with circular progress ring */}
                    <div className="relative flex items-center justify-center" style={{ width: 108, height: 108 }}>
                      {/* SVG ring -- always rendered so layout is stable */}
                      <svg className="pointer-events-none absolute inset-0" width="108" height="108" viewBox="0 0 108 108">
                        {/* track */}
                        <circle cx="54" cy="54" r="48" fill="none" stroke={isRecording ? "#2A3E55" : "transparent"} strokeWidth="4" />
                        {/* progress arc */}
                        {isRecording && (
                          <circle cx="54" cy="54" r="48" fill="none"
                            stroke={ringColor}
                            strokeWidth="4"
                            strokeDasharray={`${pct * circumference} ${circumference}`}
                            strokeLinecap="round"
                            transform="rotate(-90 54 54)"
                            style={{ transition: "stroke-dasharray 0.3s linear, stroke 0.3s ease" }}
                          />
                        )}
                        {/* 30-s tick mark (halfway notch) */}
                        {isRecording && (
                          <line x1="54" y1="6" x2="54" y2="12"
                            stroke="#5A8AAF" strokeWidth="2" strokeLinecap="round"
                            transform="rotate(180 54 54)" opacity="0.5"
                          />
                        )}
                      </svg>

                      <button
                        onClick={() => { if (!isRecording && !journalUnlocked) startRecording() }}
                        disabled={journalUnlocked || isRecording}
                        className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full transition-all ${journalUnlocked ? "bg-[#2E8B57]/30 opacity-60" : isRecording ? "scale-105 bg-[#FF6B6B]" : "bg-[#2E8B57] hover:bg-[#24734A] active:scale-95"}`}
                        style={{
                          boxShadow: isRecording
                            ? `0 0 0 6px ${ringColor}40, 0 0 20px ${ringColor}30`
                            : "0 4px 20px rgba(46,139,87,0.35)",
                        }}
                        aria-label={isRecording ? "Recording in progress" : "Tap to start recording your voice journal"}
                      >
                        {journalUnlocked
                          ? <Check className="h-8 w-8 text-[#2E8B57]" />
                          : <Mic className={`h-8 w-8 text-white ${isRecording ? "animate-pulse" : ""}`} />}
                      </button>
                    </div>

                    {/* Timer readout + horizontal bar */}
                    {isRecording ? (
                      <div className="flex w-full flex-col items-center gap-2">
                        {/* Large elapsed counter */}
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold tabular-nums text-white">{recordSeconds}</span>
                          <span className="text-base font-semibold text-[#5A8AAF]">/ {RECORD_MAX}s</span>
                        </div>

                        {/* Horizontal progress bar */}
                        <div className="relative h-2.5 w-full max-w-[260px] overflow-hidden rounded-full bg-[#1A2D42]">
                          {/* 30-s marker line */}
                          <div className="absolute top-0 z-10 h-full w-0.5 rounded-full bg-white/30" style={{ left: `${(RECORD_MIN / RECORD_MAX) * 100}%` }} />
                          {/* fill */}
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct * 100}%`,
                              backgroundColor: ringColor,
                              transition: "width 0.3s linear, background-color 0.3s ease",
                            }}
                          />
                        </div>

                        {/* Contextual label */}
                        <span className="text-sm font-medium" style={{ color: reachedMin ? "#A8E6B0" : "#8AA8C7" }}>
                          {reachedMin
                            ? "Minimum reached -- press Done whenever you're ready"
                            : `${RECORD_MIN - recordSeconds}s left until you can finish`}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-[#5A8AAF]">
                        {journalUnlocked ? "Journal recorded" : "Tap to record"}
                      </span>
                    )}

                    {/* Done button -- appears only after RECORD_MIN */}
                    {isRecording && reachedMin && (
                      <button
                        onClick={() => finishRecording()}
                        className="flex items-center gap-2 rounded-2xl bg-[#2E8B57] px-10 py-3.5 text-base font-bold text-white transition-all hover:bg-[#24734A] active:scale-95"
                        style={{ boxShadow: "0 4px 20px rgba(46,139,87,0.45)" }}
                      >
                        <Check className="h-5 w-5" /> Done
                      </button>
                    )}
                  </div>
                )
              })()}
            </section>

            {/* -- My Day (expandable auto-log of ALL completed tasks) -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <button
                onClick={() => setMyDayExpanded((prev) => !prev)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">My Day</h2>
                  {myDayLog.length > 0 && (
                    <span className="rounded-full bg-[#2E8B57]/20 px-2 py-0.5 text-[10px] font-bold text-[#A8E6B0]">{myDayLog.length} logged</span>
                  )}
                </div>
                {myDayLog.length > 0 ? (
                  myDayExpanded ? <ChevronUp className="h-4 w-4 text-[#5A8AAF]" /> : <ChevronDown className="h-4 w-4 text-[#5A8AAF]" />
                ) : (
                  <ListChecks className="h-4 w-4 text-[#5A8AAF]" />
                )}
              </button>
              {myDayLog.length === 0 ? (
                <p className="mt-2 text-sm text-[#8AA8C7]">Complete activities to see your progress here. Everything is logged with timestamps.</p>
              ) : !myDayExpanded ? (
                <p className="mt-2 text-sm text-[#8AA8C7]">
                  Last: <span className="text-white">{myDayLog[myDayLog.length - 1].label}</span>
                  <span className="ml-2 text-xs text-[#5A8AAF]">{myDayLog[myDayLog.length - 1].time}</span>
                </p>
              ) : (
                <div className="mt-3 flex flex-col gap-1.5">
                  {myDayLog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-[#1A2D42] p-3">
                      <span className="mt-0.5 shrink-0 text-xs font-bold text-[#5A8AAF]">{entry.time}</span>
                      <div className="flex flex-1 items-start gap-2">
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2E8B57]" />
                        <span className="text-sm leading-relaxed text-white">{entry.label}</span>
                      </div>
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2E8B57]" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* -- Worry Box -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4872C]/15">
                  <span className="text-2xl leading-none">{"\uD83D\uDCE6"}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white">Worry Box</h2>
                  <p className="text-sm text-[#8AA8C7]">Lock a worry away for your therapist</p>
                </div>
                <button
                  onClick={() => setShowWorryBox(true)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2E8B57] transition-transform hover:scale-105 active:scale-95"
                  style={{ boxShadow: "0 4px 16px rgba(46,139,87,0.35)" }}
                  aria-label="Record a worry"
                >
                  <Mic className="h-5 w-5 text-white" />
                </button>
              </div>
            </section>

            {/* -- Solution Box -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFD700]/15">
                  <span className="text-2xl leading-none">{"\uD83D\uDCA1"}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white">Solution Box</h2>
                  <p className="text-sm text-[#8AA8C7]">{"What's one small thing you can do about it?"}</p>
                </div>
                <button
                  onClick={() => setShowSolutionBox(true)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4ECDC4] transition-transform hover:scale-105 active:scale-95"
                  style={{ boxShadow: "0 4px 16px rgba(78,205,196,0.35)" }}
                  aria-label="Record a solution"
                >
                  <Mic className="h-5 w-5 text-white" />
                </button>
              </div>
            </section>

            {/* -- Scavenger Hunt (Optional XP) -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Scavenger Hunt</h2>
                <div className="flex items-center gap-1 rounded-full px-3 py-1" style={{ backgroundColor: `${currency.color}15` }}>
                  <Search className="h-3.5 w-3.5" style={{ color: currency.color }} />
                  <span className="text-xs font-bold" style={{ color: currency.color }}>
                    {completedScavenger.length}/{scavengerItems.length}
                  </span>
                </div>
              </div>
              <p className="mb-3 text-sm text-[#8AA8C7]">Find items around you and upload a photo to earn bonus XP.</p>
              <div className="flex flex-col gap-2">
                {scavengerItems.map((item) => {
                  const done = completedScavenger.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (!done) {
                          setCompletedScavenger((prev) => [...prev, item.id])
                          addToMyDay(`Scavenger: ${item.prompt}`)
                          triggerReflection()
                        }
                      }}
                      className={`flex items-center gap-3 rounded-2xl p-4 text-left transition-all ${done ? "bg-[#2E8B57]/15 ring-1 ring-[#2E8B57]/30" : "bg-[#1A2D42] hover:scale-[1.01] active:scale-[0.99]"}`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: done ? "#2E8B5722" : "#D4872C22" }}>
                        {done ? <Check className="h-5 w-5 text-[#2E8B57]" /> : <Camera className="h-5 w-5 text-[#D4872C]" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${done ? "text-[#A8E6B0]" : "text-white"}`}>{item.prompt}</p>
                        <p className="text-xs text-[#8AA8C7]">Take a photo to prove it!</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${done ? "bg-[#2E8B57]/20 text-[#A8E6B0]" : "bg-[#FFD700]/15 text-[#FFD700]"}`}>
                        {done ? "Done" : `+${item.xp}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* -- Schedule the Joy (with Calendar) -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Schedule the Joy</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Choose one enjoyable activity and pick a date & time. Completion earns XP.</p>
              <div className="grid grid-cols-2 gap-2">
                {joyActivities.map((act) => (
                  <button
                    key={act.label}
                    onClick={() => {
                      setJoyActivity(act.label)
                      setJoyDate("")
                      setJoyTime("")
                      setShowJoyCalendar(true)
                    }}
                    className="flex items-center gap-2 rounded-xl bg-[#1A2D42] px-3 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <span className="text-lg leading-none">{act.emoji}</span>
                    {act.label}
                  </button>
                ))}
              </div>
            </section>

            {/* -- Boosts (Only 3-5 visible per day per doc) -- */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Boosts</h2>
                <span className="rounded-full bg-[#FFD700]/10 px-3 py-1 text-[10px] font-bold text-[#FFD700]">
                  {completedBoosts.length}/5 done
                </span>
              </div>
              <p className="mb-3 text-sm text-[#8AA8C7]">Tap a boost for a quick XP activity. 5 boosts available today.</p>
              <div className="grid grid-cols-3 gap-2">
                {boostCategories.slice(new Date().getDate() % 7, (new Date().getDate() % 7) + 5).map((boost) => {
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

          </>
        ) : activeTab === "journey" ? (
          /* -- Adventure Tab (formerly Journey) -- */
          <>
            <section className="text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-white text-balance">Your Adventure</h1>
              <p className="mt-1 text-sm text-[#8AA8C7]">Fuel up, pick your landscape, and move.</p>
            </section>

            {/* Fuel Gauge + Character */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Fuel Gauge</h2>
                {fuelDone && !fuelAnimating && (
                  <span className="flex items-center gap-1 rounded-full bg-[#2E8B57]/20 px-3 py-1 text-xs font-bold text-[#A8E6B0]">
                    <Check className="h-3 w-3" /> Full
                  </span>
                )}
              </div>

              {/* Character + Gauge visual */}
              <div className="relative mb-4 flex flex-col items-center gap-4">
                {/* Character avatar */}
                <div
                  className="relative flex h-24 w-24 items-center justify-center rounded-full transition-all duration-700"
                  style={{
                    backgroundColor: characterGlowing ? "rgba(255, 215, 0, 0.25)" : "rgba(26, 45, 66, 1)",
                    boxShadow: characterGlowing
                      ? "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.25), 0 0 90px rgba(46, 139, 87, 0.2)"
                      : "0 4px 20px rgba(0,0,0,0.2)",
                    transform: characterGlowing ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {/* Food absorption particles */}
                  {fuelAnimating && (
                    <>
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <div
                          key={deg}
                          className="absolute h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: "#FFD700",
                            top: "50%",
                            left: "50%",
                            animation: `absorbParticle 1.5s ease-in ${deg / 360}s infinite`,
                            transform: `rotate(${deg}deg) translateY(-50px)`,
                          }}
                        />
                      ))}
                    </>
                  )}
                  {/* Character icon */}
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-700 ${characterGlowing ? "bg-[#FFD700]/30" : "bg-[#2E8B57]/20"}`}>
                    <PersonStanding className={`h-10 w-10 transition-colors duration-700 ${characterGlowing ? "text-[#FFD700]" : "text-[#2E8B57]"}`} />
                  </div>
                  {/* Glow ring */}
                  {characterGlowing && (
                    <div className="absolute -inset-3 rounded-full border-2 border-[#FFD700]/40 animate-ping" style={{ animationDuration: "2s" }} />
                  )}
                </div>

                {/* Fuel gauge bar */}
                <div className="w-full">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#5A8AAF]">Fuel Level</span>
                    <span className={`text-sm font-extrabold tabular-nums transition-colors duration-300 ${fuelLevel >= 100 ? "text-[#2E8B57]" : fuelLevel > 0 ? "text-[#FFD700]" : "text-[#5A8AAF]"}`}>
                      {fuelLevel}%
                    </span>
                  </div>
                  <div className="h-5 w-full overflow-hidden rounded-full bg-[#1A2D42]">
                    <div
                      className="relative h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${fuelLevel}%`,
                        background: fuelLevel >= 100
                          ? "linear-gradient(90deg, #2E8B57, #4ECDC4)"
                          : fuelLevel > 50
                            ? "linear-gradient(90deg, #D4872C, #FFD700)"
                            : fuelLevel > 0
                              ? "linear-gradient(90deg, #E84535, #D4872C)"
                              : "transparent",
                      }}
                    >
                      {/* Shimmer effect while animating */}
                      {fuelAnimating && (
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                          <div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                              animation: "shimmer 1s ease-in-out infinite",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Marker ticks */}
                  <div className="mt-1 flex justify-between px-0.5">
                    {[0, 25, 50, 75, 100].map((tick) => (
                      <span key={tick} className="text-[9px] tabular-nums text-[#5A8AAF]">{tick}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action area */}
              {!fuelDone ? (
                <button
                  onClick={() => { setFuelStep("choice"); setShowFuelModal(true) }}
                  className="group flex w-full items-center gap-4 rounded-2xl bg-[#1A2D42] p-5 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4872C]/15 transition-transform group-hover:scale-110">
                    <Camera className="h-7 w-7 text-[#D4872C]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-base font-bold text-white">Upload Food Photo</p>
                    <p className="text-xs text-[#8AA8C7]">Take a photo to fill your fuel gauge</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#5A8AAF]" />
                </button>
              ) : !fuelAnimating ? (
                <div className="flex items-center gap-3 rounded-2xl bg-[#2E8B57]/10 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E8B57]/20">
                    <Check className="h-6 w-6 text-[#2E8B57]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#A8E6B0]">Fully fueled!</p>
                    <p className="text-xs text-[#8AA8C7]">+15 {currency.name} earned</p>
                  </div>
                  <button
                    onClick={() => { setFuelDone(false); setFuelLevel(0); setFuelStep("choice"); setShowFuelModal(true) }}
                    className="rounded-lg bg-[#1A2D42] px-3 py-1.5 text-xs font-bold text-[#8AA8C7] transition-colors hover:bg-[#243B55]"
                  >
                    Re-fuel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="h-2 w-2 rounded-full bg-[#FFD700] animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="h-2 w-2 rounded-full bg-[#FFD700] animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <div className="h-2 w-2 rounded-full bg-[#FFD700] animate-bounce" style={{ animationDelay: "0.3s" }} />
                  <span className="ml-2 text-sm font-bold text-[#FFD700]">Absorbing fuel...</span>
                </div>
              )}
            </section>

            {/* Adventures - Compact Dropdown */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Adventures</h2>
              <div className="relative">
                <button
                  onClick={() => setShowLandscapeDropdown(!showLandscapeDropdown)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-[#1A2D42] p-4 transition-all hover:bg-[#243B55]"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${adventures.find(a => a.id === activeAdventure)?.iconBg ?? "bg-[#2E8B57]"}`}>
                    <LandscapeIcon id={activeAdventure} />
                  </div>
                  <div className="flex flex-1 flex-col text-left">
                    <span className="text-base font-bold text-white">{adventures.find(a => a.id === activeAdventure)?.name ?? "Jungle"}</span>
                    <span className="text-xs text-[#8AA8C7]">{adventures.find(a => a.id === activeAdventure)?.tagline ?? ""}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-[#5A8AAF] transition-transform ${showLandscapeDropdown ? "rotate-180" : ""}`} />
                </button>
                {showLandscapeDropdown && (
                  <div className="absolute inset-x-0 top-full z-20 mt-2 flex max-h-64 flex-col gap-1 overflow-y-auto rounded-2xl bg-[#1A2D42] p-2 shadow-xl ring-1 ring-[#2A3E55]">
                    {adventures.map((adv) => {
                      const advCurrency = xpCurrencies[adv.id]
                      return (
                        <Link
                          key={adv.id}
                          href={adv.href}
                          onClick={() => setShowLandscapeDropdown(false)}
                          className={`flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-[#243B55] ${adv.id === activeAdventure ? "bg-[#2E8B57]/15 ring-1 ring-[#2E8B57]/30" : ""}`}
                        >
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${adv.iconBg}`}>
                            <LandscapeIcon id={adv.id} />
                          </div>
                          <span className="flex-1 text-sm font-bold text-white">{adv.name}</span>
                          {advCurrency && (
                            <div className="flex items-center gap-1">
                              {advCurrency.icon}
                            </div>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Movement */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Movement & Exercise</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Outdoor walks earn chips. Indoor workouts are character-led. Movement contributes to fuel.</p>
              <Button onClick={() => setShowMovement(true)} className="w-full rounded-xl bg-[#FF6B35] text-white hover:bg-[#E05A28]">
                <Dumbbell className="mr-2 h-4 w-4" /> Start Moving
              </Button>
            </section>

            {/* Roadblock Skills - 2x2 Grid */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Roadblock Skills</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Practice your coping skills.</p>
              <div className="grid grid-cols-2 gap-3">
                {roadblockSkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setShowRoadblockSkill(skill)}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-[#1A2D42] p-4 text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-3xl leading-none">{skill.emoji}</span>
                    <p className="text-sm font-bold text-white">{skill.label}</p>
                    <p className="text-xs text-[#8AA8C7]">{skill.desc}</p>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* -- Profile Tab -- */
          <>
            <section className="text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-white text-balance">Your Profile</h1>
              <p className="mt-1 text-sm text-[#8AA8C7]">Personalize your experience.</p>
            </section>

            {/* Upcoming Joy */}
            {scheduledJoys.length > 0 && (
              <section className="rounded-3xl bg-[#13263A] p-5">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Upcoming Joy</h2>
                <div className="flex flex-col gap-2">
                  {scheduledJoys.map((joy, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl bg-[#1A2D42] p-4">
                      <span className="text-2xl leading-none">{joy.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{joy.activity}</p>
                        <p className="text-xs text-[#8AA8C7]">{joy.date} at {joy.time}</p>
                      </div>
                      <CalendarCheck className="h-4 w-4 text-[#2E8B57]" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Health Preferences */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Health Preferences</h2>

              {/* Diet */}
              <div className="mb-5">
                <p className="mb-2 text-sm font-bold text-white">Diet</p>
                <div className="flex gap-2">
                  {dietOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setProfileDiet(opt.id)}
                      className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 transition-all ${profileDiet === opt.id ? "bg-[#2E8B57]/20 ring-2 ring-[#2E8B57]" : "bg-[#1A2D42] hover:scale-[1.02]"}`}
                    >
                      <opt.icon className={`h-6 w-6 ${profileDiet === opt.id ? "text-[#A8E6B0]" : "text-[#5A8AAF]"}`} />
                      <span className={`text-xs font-bold ${profileDiet === opt.id ? "text-[#A8E6B0]" : "text-white"}`}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Goals */}
              <div className="mb-5">
                <p className="mb-2 text-sm font-bold text-white">Health Goals</p>
                <div className="flex flex-wrap gap-2">
                  {healthGoals.map((goal) => {
                    const selected = profileGoals.includes(goal.id)
                    return (
                      <button
                        key={goal.id}
                        onClick={() => setProfileGoals((prev) => selected ? prev.filter((g) => g !== goal.id) : [...prev, goal.id])}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${selected ? "bg-[#2E8B57] text-white" : "bg-[#1A2D42] text-[#8AA8C7] hover:bg-[#243B55]"}`}
                      >
                        {goal.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Stomach Sensitivity */}
              <div className="mb-5">
                <p className="mb-2 text-sm font-bold text-white">Stomach Sensitivity</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProfileStomach(true)}
                    className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${profileStomach ? "bg-[#D4872C]/20 ring-2 ring-[#D4872C] text-[#FFD699]" : "bg-[#1A2D42] text-[#8AA8C7]"}`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setProfileStomach(false)}
                    className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${!profileStomach ? "bg-[#2E8B57]/20 ring-2 ring-[#2E8B57] text-[#A8E6B0]" : "bg-[#1A2D42] text-[#8AA8C7]"}`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <p className="mb-2 text-sm font-bold text-white">Activity Level</p>
                <div className="flex gap-2">
                  {activityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setProfileActivity(level.id)}
                      className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${profileActivity === level.id ? "bg-[#FF6B35]/20 ring-2 ring-[#FF6B35] text-[#FF6B35]" : "bg-[#1A2D42] text-[#8AA8C7]"}`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Personal Struggles */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Personal Struggles</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">{"\"I struggle most with:\""} This personalizes your quest difficulty, prompt tone, and roadblocks.</p>
              <div className="flex flex-col gap-2">
                {personalStruggles.map((s) => {
                  const selected = profileStruggles.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => setProfileStruggles((prev) => selected ? prev.filter((x) => x !== s.id) : [...prev, s.id])}
                      className={`flex items-center gap-3 rounded-2xl p-4 text-left transition-all ${selected ? "bg-[#2E8B57]/15 ring-1 ring-[#2E8B57]/40" : "bg-[#1A2D42] hover:scale-[1.01]"}`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-[#2E8B57]/20" : "bg-[#E84535]/15"}`}>
                        {selected ? <Check className="h-5 w-5 text-[#2E8B57]" /> : <CircleAlert className="h-5 w-5 text-[#E84535]" />}
                      </div>
                      <span className={`text-sm font-bold ${selected ? "text-[#A8E6B0]" : "text-white"}`}>{s.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Reminders */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Reminders</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Max 3 reminders per day. Choose your frequency.</p>
              <div className="flex flex-col gap-2">
                {[
                  { time: "Morning", label: "Start your check-in", active: true },
                  { time: "Midday", label: "Have you completed today's quest?", active: true },
                  { time: "Evening", label: "Review your day", active: true },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-[#1A2D42] p-4">
                    <Bell className="h-4 w-4 text-[#FF9F43]" />
                    <span className="w-16 text-xs font-bold text-[#FF9F43]">{r.time}</span>
                    <span className="flex-1 text-sm text-white">{r.label}</span>
                    <div className={`h-3 w-3 rounded-full ${r.active ? "bg-[#2E8B57]" : "bg-[#5A8AAF]"}`} />
                  </div>
                ))}
              </div>
            </section>

            {/* Find Your Ikigai */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Find Your Ikigai</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Long-term planning. Discover hobbies, readings, podcasts, and outdoor activities.</p>
              <div className="flex flex-wrap gap-2">
                {["Hobbies", "Readings", "Podcasts", "Outdoors"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#1A2D42] px-4 py-2 text-sm font-bold text-[#A8E6B0]">{tag}</span>
                ))}
              </div>
            </section>

            {/* Milestone Check-In */}
            <section className="rounded-3xl bg-[#13263A] p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Milestone Check-In</h2>
              <p className="mb-3 text-sm text-[#8AA8C7]">Weekly and monthly reflections to stay on track.</p>
              <Button onClick={() => setShowMilestone(true)} variant="outline" className="w-full rounded-xl border-[#FFD700]/40 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10">
                <CalendarCheck className="mr-2 h-4 w-4" /> Check In
              </Button>
            </section>
          </>
        )}
      </main>

      {/* ---- Bottom Tab Navigation (3 tabs per doc) ---- */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-[#1A2D42] bg-[#0C1B2A]/95 backdrop-blur-md" aria-label="Main navigation">
        <button
          onClick={() => setActiveTab("checkin")}
          className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
          style={{ color: activeTab === "checkin" ? "#2E8B57" : "#5A8AAF" }}
          aria-current={activeTab === "checkin" ? "page" : undefined}
        >
          <Mic className="h-5 w-5" />
          <span className="text-[10px] font-bold">Check-In</span>
        </button>
        <button
          onClick={() => setActiveTab("journey")}
          className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
          style={{ color: activeTab === "journey" ? "#FFD700" : "#5A8AAF" }}
          aria-current={activeTab === "journey" ? "page" : undefined}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Adventure</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
          style={{ color: activeTab === "profile" ? "#FF9F43" : "#5A8AAF" }}
          aria-current={activeTab === "profile" ? "page" : undefined}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>

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
                <Button onClick={() => { setFuelDone(true); setShowFuelModal(false); setFuelStep("choice"); setActiveTab("journey"); addToMyDay("Fuel: logged a meal"); triggerFuelAnimation(); triggerReflection() }} className="w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]">
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
                    <button key={s.name} onClick={() => { setFuelDone(true); setShowFuelModal(false); setFuelStep("choice"); setActiveTab("journey"); addToMyDay(`Fuel: chose ${s.name}`); triggerFuelAnimation(); triggerReflection() }} className="flex items-start gap-3 rounded-2xl bg-[#1A2D42] p-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99]">
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

      {/* Journal Prompt Picker */}
      <Dialog open={showJournalPicker} onOpenChange={setShowJournalPicker}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">Choose a Journal Prompt</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Pick a prompt to guide your journal entry, or start with a free entry.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => { setSelectedPrompt(""); setShowJournalPicker(false) }}
              className="flex items-center gap-3 rounded-2xl bg-[#2E8B57]/15 p-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] ring-1 ring-[#2E8B57]/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2E8B57]/20">
                <PenLine className="h-5 w-5 text-[#2E8B57]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#A8E6B0]">Free Journal Entry</p>
                <p className="text-xs text-[#8AA8C7]">Say whatever is on your mind</p>
              </div>
            </button>
            {journalPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => { setSelectedPrompt(prompt); setShowJournalPicker(false) }}
                className={`flex items-center gap-3 rounded-2xl p-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] ${selectedPrompt === prompt ? "bg-[#2E8B57]/15 ring-1 ring-[#2E8B57]/30" : "bg-[#1A2D42]"}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5A8AAF]/15">
                  <MessageCircle className="h-5 w-5 text-[#5A8AAF]" />
                </div>
                <p className="text-sm font-bold text-white">{prompt}</p>
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
            <DialogDescription className="text-sm text-[#8AA8C7]">Write it down and lock it away. Open it with your therapist.</DialogDescription>
          </DialogHeader>
          <textarea value={worryText} onChange={(e) => setWorryText(e.target.value)} placeholder="What is worrying you?" className="mt-3 min-h-28 w-full rounded-xl border-0 bg-[#1A2D42] p-4 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]" />
          <Button onClick={() => { addToMyDay("Worry Box: locked away a worry"); setWorryText(""); setShowWorryBox(false); triggerReflection() }} className="mt-3 w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"><Lock className="mr-2 h-4 w-4" /> Lock it Away</Button>
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
            <div className="mt-4 flex flex-col items-center gap-4">
              {breathPhase === "idle" ? (
                <>
                  <p className="text-sm text-[#8AA8C7]">Breathe in for 5 seconds (3 times), then breathe out for 8 seconds (3 times).</p>
                  <Button onClick={startBreathingExercise} className="rounded-xl bg-[#4ECDC4] text-white hover:bg-[#3DBDB5]">
                    <Wind className="mr-2 h-4 w-4" /> Start Breathing
                  </Button>
                </>
              ) : breathPhase === "done" ? (
                <>
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#2E8B57]/20">
                    <Check className="h-12 w-12 text-[#2E8B57]" />
                  </div>
                  <p className="text-lg font-bold text-[#A8E6B0]">Exercise Complete</p>
                  <Button onClick={() => { setBreathPhase("idle"); setShowRoadblock(null) }} className="rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]">
                    <Check className="mr-2 h-4 w-4" /> Done
                  </Button>
                </>
              ) : (
                <>
                  <div className={`flex h-32 w-32 items-center justify-center rounded-full transition-all duration-1000 ${breathPhase === "in" ? "scale-110 bg-[#4ECDC4]/30" : "scale-90 bg-[#1E90FF]/30"}`}>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-3xl font-extrabold tabular-nums" style={{ color: breathPhase === "in" ? "#4ECDC4" : "#1E90FF" }}>{breathTimer}</span>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: breathPhase === "in" ? "#4ECDC4" : "#1E90FF" }}>
                        {breathPhase === "in" ? "Breathe In" : "Breathe Out"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8AA8C7]">
                    <span className="font-bold text-white">Round {breathRound}/3</span>
                    <span>({breathPhase === "in" ? "5s inhale" : "8s exhale"})</span>
                  </div>
                  {/* Progress dots */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-[#4ECDC4]">IN</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((r) => (
                          <div key={r} className={`h-2.5 w-2.5 rounded-full ${breathPhase === "in" && r <= breathRound ? "bg-[#4ECDC4]" : breathPhase === "out" ? "bg-[#4ECDC4]" : "bg-[#1A2D42]"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-[#1E90FF]">OUT</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((r) => (
                          <div key={r} className={`h-2.5 w-2.5 rounded-full ${breathPhase === "out" && r <= breathRound ? "bg-[#1E90FF]" : "bg-[#1A2D42]"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
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
              <Button onClick={() => { setShowRoadblock(null); addToMyDay("Roadblock: drank water"); triggerReflection() }} className="rounded-xl bg-[#1E90FF] text-white hover:bg-[#1878D6]"><Heart className="mr-2 h-4 w-4" /> Done!</Button>
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
            <Button onClick={() => { setThoughtText(""); addToMyDay("Thought Sorter: trashed a thought"); triggerReflection() }} variant="outline" className="flex-1 rounded-xl border-[#E84535]/40 text-[#E84535] hover:bg-[#E84535]/10"><Trash2 className="mr-2 h-4 w-4" /> Trash It</Button>
            <Button onClick={() => { setThoughtText(""); addToMyDay("Thought Sorter: kept a thought"); triggerReflection() }} className="flex-1 rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"><Gem className="mr-2 h-4 w-4" /> Keep It</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule the Joy - Calendar Modal */}
      <Dialog open={showJoyCalendar} onOpenChange={setShowJoyCalendar}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Schedule: {joyActivity}</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Pick a date and time for your joyful activity.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Date</label>
              <input
                type="date"
                value={joyDate}
                onChange={(e) => setJoyDate(e.target.value)}
                className="w-full rounded-xl border-0 bg-[#1A2D42] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57] [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#5A8AAF]">Time</label>
              <input
                type="time"
                value={joyTime}
                onChange={(e) => setJoyTime(e.target.value)}
                className="w-full rounded-xl border-0 bg-[#1A2D42] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57] [color-scheme:dark]"
              />
            </div>
            <Button
              disabled={!joyDate || !joyTime}
              onClick={() => {
                const matchedActivity = joyActivities.find(a => a.label === joyActivity)
                const formatted = new Date(joyDate + "T" + joyTime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                setScheduledJoys((prev) => [...prev, {
                  activity: joyActivity,
                  emoji: matchedActivity?.emoji ?? "",
                  date: formatted,
                  time: joyTime,
                }])
                addToMyDay(`Scheduled joy: ${joyActivity} on ${formatted} at ${joyTime}`)
                triggerReflection()
                setShowJoyCalendar(false)
              }}
              className="w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A] disabled:opacity-40"
            >
              <CalendarCheck className="mr-2 h-4 w-4" /> Schedule Activity
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Roadblock Skill Modal */}
      <Dialog open={!!showRoadblockSkill} onOpenChange={() => setShowRoadblockSkill(null)}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6 text-center">
          {showRoadblockSkill && (
            <>
              <DialogHeader className="flex flex-col items-center gap-3">
                <span className="text-5xl leading-none">{showRoadblockSkill.emoji}</span>
                <DialogTitle className="text-xl font-bold text-white">{showRoadblockSkill.label}</DialogTitle>
                <DialogDescription className="text-sm text-[#8AA8C7]">{showRoadblockSkill.desc}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 rounded-2xl bg-[#1A2D42] p-5 text-left">
                <p className="text-sm leading-relaxed text-white">{showRoadblockSkill.instructions}</p>
              </div>
              <Button
                onClick={() => {
                  addToMyDay(`Roadblock skill: ${showRoadblockSkill.label}`)
                  triggerReflection()
                  setShowRoadblockSkill(null)
                }}
                className="mt-4 w-full rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"
              >
                <Check className="mr-2 h-4 w-4" /> Done
              </Button>
            </>
          )}
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

      {/* Leaderboard Modal */}
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
                  <button
                    onClick={() => setShowEncouragement(showEncouragement === p.name ? null : p.name)}
                    className="rounded-full bg-[#2E8B57]/20 p-1.5 transition-colors hover:bg-[#2E8B57]/30"
                    aria-label={`Send message to ${p.name}`}
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-[#A8E6B0]" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* Encouragement Popover */}
          {showEncouragement && (
            <div className="mt-3 rounded-2xl bg-[#1A2D42] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-[#5A8AAF]">Send to {showEncouragement}</span>
                <button onClick={() => setShowEncouragement(null)} className="text-[#5A8AAF] hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {quickMessages.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      addToMyDay(`Sent "${m}" to ${showEncouragement}`)
                      triggerReflection()
                      setShowEncouragement(null)
                    }}
                    className="rounded-full bg-[#0C1B2A] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#2E8B57]/20"
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={encourageMsg}
                  onChange={(e) => setEncourageMsg(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 rounded-xl border-0 bg-[#0C1B2A] px-4 py-2.5 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                />
                <Button
                  onClick={() => {
                    if (encourageMsg.trim()) {
                      addToMyDay(`Sent message to ${showEncouragement}`)
                      triggerReflection()
                    }
                    setEncourageMsg("")
                    setShowEncouragement(null)
                  }}
                  className="rounded-xl bg-[#2E8B57] text-white hover:bg-[#24734A]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
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
                onClick={() => { setCompletedBoosts((prev) => [...prev, showBoostModal.id]); addToMyDay(`Boost: ${showBoostModal.label}`); setShowBoostModal(null); triggerReflection() }}
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
          <Button onClick={() => { setShowRecipes(false); addToMyDay("Recipes: uploaded meal photo"); triggerReflection() }} className="mt-3 w-full rounded-xl bg-[#D4872C] text-white hover:bg-[#B8711E]"><Camera className="mr-2 h-4 w-4" /> Upload Meal Photo</Button>
        </DialogContent>
      </Dialog>

      {/* Solution Box Chat Modal */}
      <Dialog open={showSolutionBox} onOpenChange={setShowSolutionBox}>
        <DialogContent className="mx-auto flex max-w-sm flex-col rounded-3xl border-[#2A3E55] bg-[#13263A] p-0" style={{ height: "80vh", maxHeight: "600px" }}>
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#1A2D42] px-5 pt-5 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ECDC4]/20">
              <Bot className="h-5 w-5 text-[#4ECDC4]" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-white">Solution Guide</DialogTitle>
              <DialogDescription className="text-xs text-[#5A8AAF]">Monitored by your therapist</DialogDescription>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
            {solutionMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-[#2E8B57] text-white" : "bg-[#1A2D42] text-white"}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`mt-1 text-[10px] ${msg.role === "user" ? "text-white/50" : "text-[#5A8AAF]"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t border-[#1A2D42] px-5 py-4">
            <input
              value={solutionInput}
              onChange={(e) => setSolutionInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendSolutionMessage() }}
              placeholder="Type your thoughts..."
              className="flex-1 rounded-xl border-0 bg-[#1A2D42] px-4 py-3 text-sm text-white placeholder:text-[#5A8AAF] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
            />
            <Button onClick={sendSolutionMessage} className="rounded-xl bg-[#4ECDC4] text-white hover:bg-[#3DBDB5]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reminders Modal */}
      <Dialog open={showReminders} onOpenChange={setShowReminders}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white"><Bell className="h-5 w-5 text-[#FF9F43]" /> Reminders</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">Max 3 per day. User chooses reminder frequency.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {[
              { time: "Morning", label: "Start your check-in.", active: true },
              { time: "Midday", label: "Have you completed today's quest?", active: true },
              { time: "Evening", label: "Review your day.", active: true },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-[#1A2D42] p-4">
                <Bell className="h-4 w-4 text-[#FF9F43]" />
                <span className="w-16 text-xs font-bold text-[#FF9F43]">{r.time}</span>
                <span className="flex-1 text-sm text-white">{r.label}</span>
                <div className={`h-3 w-3 rounded-full ${r.active ? "bg-[#2E8B57]" : "bg-[#5A8AAF]"}`} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-[#5A8AAF]">Tap a reminder to toggle on/off. Max 3 active.</p>
        </DialogContent>
      </Dialog>

      {/* ---- Stress-Detected Breathing Ritual ---- */}
      <Dialog open={showStressBreathing} onOpenChange={setShowStressBreathing}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl border-[#2A3E55] bg-[#13263A] p-6 text-center">
          <DialogHeader className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4ECDC4]/20">
              <Wind className="h-8 w-8 text-[#4ECDC4]" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">Stress Detected</DialogTitle>
            <DialogDescription className="text-sm text-[#8AA8C7]">
              We noticed some stress in your check-in. Take a quick breathing break before your quest.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className={`flex h-28 w-28 items-center justify-center rounded-full transition-all duration-1000 ${stressBreathCount % 2 === 0 ? "scale-100 bg-[#4ECDC4]/20" : "scale-125 bg-[#4ECDC4]/40"}`}>
              <span className="text-lg font-bold text-[#4ECDC4]">{stressBreathCount % 2 === 0 ? "Breathe In" : "Breathe Out"}</span>
            </div>
            <Button
              onClick={() => {
                setStressBreathCount((c) => c + 1)
                if (stressBreathCount >= 5) {
                  setShowStressBreathing(false)
                  setStressBreathCount(0)
                  addToMyDay("Breathing ritual completed")
                  triggerReflection()
                }
              }}
              className="rounded-xl bg-[#4ECDC4] text-white hover:bg-[#3DBDB5]"
            >
              <Wind className="mr-2 h-4 w-4" /> {stressBreathCount === 0 ? "Start Breathing" : stressBreathCount >= 5 ? "Done!" : `Next (${stressBreathCount}/6)`}
            </Button>
            <button onClick={() => { setShowStressBreathing(false); setStressBreathCount(0) }} className="text-xs text-[#5A8AAF] hover:text-white">
              Skip for now
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- Self-Efficacy Progress Popup (per doc: private progress tracker) ---- */}
      {showSelfEfficacy && (
        <div className="pointer-events-none fixed inset-0 z-[99] flex items-start justify-center pt-24">
          <button
            onClick={() => setShowSelfEfficacy(false)}
            className="pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-500 flex items-center gap-3 rounded-2xl bg-[#1A2D42] px-6 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)] ring-1 ring-[#2E8B57]/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E8B57]/20">
              <ListChecks className="h-6 w-6 text-[#2E8B57]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">You completed {tasksCompletedThisWeek} adult tasks this week.</p>
              <p className="text-xs text-[#8AA8C7]">Keep building. Every step counts.</p>
            </div>
          </button>
        </div>
      )}

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
