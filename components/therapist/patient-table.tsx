"use client"

import { useState } from "react"
import { Eye, Send, Package, Snowflake, Brain, BookOpen, Trophy, ChefHat, Dumbbell, Ghost, Map, AlertTriangle, Camera, Zap, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const patients = [
  { id: 1, name: "Alex Rivera", landscape: "Jungle", fuel: 75, fuelUploads: 12, realLifeTasks: 8, streak: 12, lastActive: "Today", quest: "Quest #3", repetition: 2, freezesUsed: 0, freezesTotal: 1, worries: ["Worried about job interview", "Family stress"], journalEntries: 24, thoughtSorts: 8, monstersDefeated: 3, recipesCooked: 6, coins: 410, leaderboardRank: 1, workouts: 15, modulesCompleted: ["Deep Breathing", "Grounding (5-4-3-2-1)", "Positive Self-Talk"], triggerEvents: 1, imageProofs: 8, completionRate: 87, solutionBoxMsgs: 12 },
  { id: 2, name: "Jordan Lee", landscape: "Ocean", fuel: 45, fuelUploads: 5, realLifeTasks: 3, streak: 5, lastActive: "Yesterday", quest: "Quest #2", repetition: 1, freezesUsed: 1, freezesTotal: 1, worries: ["Feeling overwhelmed at school"], journalEntries: 10, thoughtSorts: 3, monstersDefeated: 1, recipesCooked: 2, coins: 310, leaderboardRank: 2, workouts: 6, modulesCompleted: ["Deep Breathing"], triggerEvents: 3, imageProofs: 4, completionRate: 62, solutionBoxMsgs: 5 },
  { id: 3, name: "Sam Nguyen", landscape: "Savannah", fuel: 90, fuelUploads: 22, realLifeTasks: 15, streak: 21, lastActive: "Today", quest: "Quest #5", repetition: 3, freezesUsed: 0, freezesTotal: 1, worries: [], journalEntries: 42, thoughtSorts: 15, monstersDefeated: 5, recipesCooked: 14, coins: 240, leaderboardRank: 3, workouts: 28, modulesCompleted: ["Deep Breathing", "Self-Advocacy", "Positive Self-Talk", "Thought Sorting", "Grounding (5-4-3-2-1)", "Schedule the Joy"], triggerEvents: 0, imageProofs: 22, completionRate: 95, solutionBoxMsgs: 28 },
  { id: 4, name: "Taylor Brooks", landscape: "Desert", fuel: 30, fuelUploads: 2, realLifeTasks: 1, streak: 2, lastActive: "3 days ago", quest: "Quest #1", repetition: 1, freezesUsed: 1, freezesTotal: 1, worries: ["Rent is due", "Can not sleep"], journalEntries: 4, thoughtSorts: 1, monstersDefeated: 0, recipesCooked: 1, coins: 120, leaderboardRank: 5, workouts: 2, modulesCompleted: [], triggerEvents: 5, imageProofs: 1, completionRate: 28, solutionBoxMsgs: 2 },
  { id: 5, name: "Morgan Chen", landscape: "Mountains", fuel: 60, fuelUploads: 10, realLifeTasks: 7, streak: 8, lastActive: "Today", quest: "Quest #4", repetition: 2, freezesUsed: 0, freezesTotal: 1, worries: ["Health anxiety"], journalEntries: 18, thoughtSorts: 6, monstersDefeated: 2, recipesCooked: 5, coins: 195, leaderboardRank: 4, workouts: 12, modulesCompleted: ["Deep Breathing", "Meditation Break", "Stretch & Move"], triggerEvents: 2, imageProofs: 10, completionRate: 74, solutionBoxMsgs: 9 },
]

const modules = [
  "Deep Breathing", "Self-Advocacy", "Positive Self-Talk",
  "Thought Sorting (Trash or Treasure)", "Grounding (5-4-3-2-1)",
  "Schedule the Joy", "Fear Facing (Scary Monster)", "Worry Box Review",
  "Stretch & Move", "Scavenger Hunt", "Meditation Break", "Milestone Check-In",
  "Recipe Challenge", "Movement Challenge", "Friend Connection",
]

const roadblockWords = [
  "I am not good enough", "Nobody cares", "I always fail",
  "Things never get better", "I am alone",
]

const landscapeColors: Record<string, string> = {
  Jungle: "bg-[#E8F8EC] text-[#0A3A1A]",
  Savannah: "bg-[#FEF3C7] text-[#92400E]",
  Ocean: "bg-[#DBEAFE] text-[#1E40AF]",
  Desert: "bg-[#FFF8E8] text-[#8B6A14]",
  Mountains: "bg-[#EEF5FA] text-[#2C3E50]",
  Antarctica: "bg-[#F0F8FF] text-[#1B3A4B]",
  Volcano: "bg-[#FFF0EE] text-[#8B2020]",
  City: "bg-[#F0F0FF] text-[#3A3A5E]",
  Atlantis: "bg-[#F0FFFE] text-[#0D2B3E]",
}

export function PatientTable() {
  const [assignModalPatient, setAssignModalPatient] = useState<typeof patients[0] | null>(null)
  const [viewPatient, setViewPatient] = useState<typeof patients[0] | null>(null)
  const [worryPatient, setWorryPatient] = useState<typeof patients[0] | null>(null)
  const [selectedModule, setSelectedModule] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  function handleSend() {
    setAssignModalPatient(null); setSelectedModule(""); setNotes(""); setSelectedWords([])
  }

  function toggleWord(word: string) {
    setSelectedWords((prev) => prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word])
  }

  return (
    <>
      <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-[#e2e8f0] hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Patient</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Landscape</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Quest / Rep</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Fuel Uploads</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Real Life Tasks</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Streak</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Rank</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Worries</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Active</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.id} className="border-[#e2e8f0]">
                <TableCell className="font-medium text-[#1a2b4a]">{p.name}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${landscapeColors[p.landscape] ?? "bg-gray-100 text-gray-800"}`}>{p.landscape}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#1a2b4a]">{p.quest}</span>
                    <span className="text-xs text-[#8a96aa]">Rep #{p.repetition}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Camera className="h-3.5 w-3.5 text-[#D4872C]" />
                    <span className="text-sm text-[#1a2b4a]">{p.fuelUploads} uploads</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-[#2E8B57]" />
                    <span className="text-sm text-[#1a2b4a]">{p.realLifeTasks} tasks</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#1a2b4a]">{p.streak}d</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5 text-[#FFD700]" />
                    <span className="text-sm font-bold text-[#1a2b4a]">#{p.leaderboardRank}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {p.worries.length > 0 ? (
                    <button onClick={() => setWorryPatient(p)} className="flex items-center gap-1 rounded-full bg-[#FFF3E0] px-2.5 py-0.5 text-xs font-bold text-[#E65100] transition-colors hover:bg-[#FFE0B2]">
                      <Package className="h-3 w-3" /> {p.worries.length}
                    </button>
                  ) : <span className="text-xs text-[#8a96aa]">None</span>}
                </TableCell>
                <TableCell className="text-sm text-[#6b7b94]">{p.lastActive}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="sm" className="border-[#dde3eb] text-[#4a7cca] hover:bg-[#edf3fb]" onClick={() => setViewPatient(p)}><Eye className="mr-1 h-3.5 w-3.5" /> View</Button>
                    <Button size="sm" className="bg-[#1a2b4a] text-white hover:bg-[#243658]" onClick={() => setAssignModalPatient(p)}><Send className="mr-1 h-3.5 w-3.5" /> Assign</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* -- View Patient Progress (expanded) -- */}
      <Dialog open={!!viewPatient} onOpenChange={() => setViewPatient(null)}>
        <DialogContent className="max-w-lg border-[#dde3eb] bg-white font-mono">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.name} - Progress</DialogTitle>
            <DialogDescription className="text-sm text-[#6b7b94]">Full patient overview</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-3">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="modules" className="flex-1">Modules</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
              <TabsTrigger value="journal" className="flex-1">Journal</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Landscape</p>
                  <p className="mt-1 text-base font-bold text-[#1a2b4a]">{viewPatient?.landscape}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Quest</p>
                  <p className="mt-1 text-base font-bold text-[#1a2b4a]">{viewPatient?.quest}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Repetition</p>
                  <p className="mt-1 text-base font-bold text-[#1a2b4a]">#{viewPatient?.repetition}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Fuel</p>
                  <Progress value={viewPatient?.fuel ?? 0} className="mt-1.5 h-2.5 bg-[#e2e8f0]" />
                  <p className="mt-1 text-xs text-[#6b7b94]">{viewPatient?.fuel}%</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Streak</p>
                  <p className="mt-1 text-base font-bold text-[#FF6B35]">{viewPatient?.streak}d</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Coins / Rank</p>
                  <p className="mt-1 text-base font-bold text-[#FFD700]">{viewPatient?.coins} (#{viewPatient?.leaderboardRank})</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Freezes</p>
                  <p className="mt-1 text-base font-bold text-[#1a2b4a]">{viewPatient?.freezesUsed}/{viewPatient?.freezesTotal}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Worries</p>
                  <p className="mt-1 text-base font-bold text-[#E65100]">{viewPatient?.worries.length}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#8a96aa]">Monsters</p>
                  <p className="mt-1 text-base font-bold text-[#FF6B6B]">{viewPatient?.monstersDefeated}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="modules" className="mt-4 flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8a96aa]">Module Roadmap</p>
              <div className="flex flex-col gap-2">
                {modules.map((m) => {
                  const done = viewPatient?.modulesCompleted.includes(m)
                  return (
                    <div key={m} className={`flex items-center gap-3 rounded-xl p-3 ${done ? "bg-[#E8F8EC]" : "bg-[#f9fafb]"}`}>
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${done ? "bg-[#2E8B57]" : "bg-[#e2e8f0]"}`}>
                        {done ? <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : <span className="text-[10px] text-[#8a96aa]">-</span>}
                      </div>
                      <span className={`text-sm ${done ? "font-bold text-[#0A3A1A]" : "text-[#6b7b94]"}`}>{m}</span>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <ChefHat className="h-5 w-5 text-[#2E8B57]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Recipes Cooked</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.recipesCooked}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <Dumbbell className="h-5 w-5 text-[#FF6B35]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Workouts</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.workouts}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <Ghost className="h-5 w-5 text-[#FF6B6B]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Monsters Beaten</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.monstersDefeated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <Brain className="h-5 w-5 text-[#9B59B6]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Thought Sorts</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.thoughtSorts}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <AlertTriangle className="h-5 w-5 text-[#E84535]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Trigger Events</p>
                    <p className="text-lg font-bold text-[#E84535]">{viewPatient?.triggerEvents}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <Camera className="h-5 w-5 text-[#D4872C]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Image Proofs</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.imageProofs}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <Zap className="h-5 w-5 text-[#FFD700]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Completion Rate</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.completionRate}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                  <Snowflake className="h-5 w-5 text-[#89CFF0]" />
                  <div>
                    <p className="text-xs text-[#8a96aa]">Freezes Used</p>
                    <p className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.freezesUsed}/{viewPatient?.freezesTotal}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-4">
                <Map className="h-5 w-5 text-[#4a7cca]" />
                <div>
                  <p className="text-xs text-[#8a96aa]">Current Map Progress</p>
                  <p className="text-sm text-[#1a2b4a]">{viewPatient?.landscape} - {viewPatient?.quest} (Repetition #{viewPatient?.repetition})</p>
                </div>
              </div>
              {/* Trigger Events Warning */}
              {(viewPatient?.triggerEvents ?? 0) >= 3 && (
                <div className="flex items-center gap-3 rounded-xl bg-[#FFF0EE] p-4">
                  <AlertTriangle className="h-5 w-5 text-[#E84535]" />
                  <div>
                    <p className="text-xs font-bold text-[#8B2020]">High Trigger Activity</p>
                    <p className="text-xs text-[#6b7b94]">This patient has had {viewPatient?.triggerEvents} trigger events. Consider reviewing during next session.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="journal" className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-[#f9fafb] p-4">
                <BookOpen className="h-5 w-5 text-[#4a7cca]" />
                <p className="text-sm text-[#1a2b4a]"><strong>{viewPatient?.journalEntries}</strong> voice journal entries</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#f9fafb] p-4">
                <Camera className="h-5 w-5 text-[#D4872C]" />
                <p className="text-sm text-[#1a2b4a]"><strong>{viewPatient?.imageProofs}</strong> image proofs uploaded</p>
              </div>
  <div className="flex items-center gap-2 rounded-xl bg-[#f0f9f4] p-4">
    <Bot className="h-5 w-5 text-[#4ECDC4]" />
    <p className="text-sm text-[#1a2b4a]"><strong>{viewPatient?.solutionBoxMsgs}</strong> Solution Box messages</p>
  </div>
  <p className="mt-1 text-xs text-[#8a96aa]">Voice journals, image proofs, and Solution Box transcripts are available for review in the full patient record.</p>
  </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* -- Worry Box Review -- */}
      <Dialog open={!!worryPatient} onOpenChange={() => setWorryPatient(null)}>
        <DialogContent className="max-w-md border-[#dde3eb] bg-white font-mono">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-[#1a2b4a]"><Package className="h-5 w-5 text-[#E65100]" /> {worryPatient?.name}{"'"}s Worry Box</DialogTitle>
            <DialogDescription className="text-sm text-[#6b7b94]">Review together during your session.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {worryPatient?.worries.map((w, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-[#FFF8E1] p-4">
                <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#E65100]" />
                <p className="text-sm text-[#5A3200]">{w}</p>
              </div>
            ))}
            {worryPatient?.worries.length === 0 && <p className="text-center text-sm text-[#8a96aa]">No worries submitted yet.</p>}
          </div>
        </DialogContent>
      </Dialog>

      {/* -- Assign Quest / Module Modal -- */}
      <Dialog open={!!assignModalPatient} onOpenChange={() => setAssignModalPatient(null)}>
        <DialogContent className="max-w-md border-[#dde3eb] bg-white font-mono">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#1a2b4a]">Assign Module / Quest</DialogTitle>
            <DialogDescription className="text-sm text-[#6b7b94]">Assign to {assignModalPatient?.name}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 py-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-[#3a4a64]">Select Module</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="border-[#dde3eb] bg-[#f9fafb] text-[#1a2b4a]"><SelectValue placeholder="Choose a module..." /></SelectTrigger>
                <SelectContent>{modules.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            {selectedModule === "Thought Sorting (Trash or Treasure)" && (
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold text-[#3a4a64]">Select Roadblock Words</Label>
                <p className="text-xs text-[#8a96aa]">Choose words from previous sessions.</p>
                <div className="flex flex-wrap gap-2">
                  {roadblockWords.map((w) => (
                    <button key={w} onClick={() => toggleWord(w)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${selectedWords.includes(w) ? "bg-[#9B59B6] text-white" : "bg-[#f0f0f5] text-[#3a4a64] hover:bg-[#e0e0ea]"}`}>{w}</button>
                  ))}
                </div>
              </div>
            )}

            {selectedModule === "Fear Facing (Scary Monster)" && (
              <div className="rounded-xl bg-[#FFF0EE] p-4">
                <p className="text-xs font-bold text-[#8B2020]">Scary Monster Module</p>
                <p className="mt-1 text-xs text-[#6b7b94]">Patient will face a shrinking monster. They tap scary thoughts to shrink it. Helps make fear less intimidating.</p>
              </div>
            )}

            <div className="flex items-center justify-between rounded-xl bg-[#f9fafb] p-4">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-[#89CFF0]" />
                <span className="text-sm font-semibold text-[#3a4a64]">Grant Extra Freeze</span>
              </div>
              <Button variant="outline" size="sm" className="border-[#89CFF0] text-[#406882] hover:bg-[#F0F8FF]"><Snowflake className="mr-1 h-3 w-3" /> Grant</Button>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-[#3a4a64]">Therapist Notes</Label>
              <Textarea placeholder="Add notes..." value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-24 border-[#dde3eb] bg-[#f9fafb] text-[#1a2b4a] placeholder:text-[#b0bac9]" />
            </div>
            <Button onClick={handleSend} className="w-full bg-[#1a2b4a] text-white hover:bg-[#243658]"><Send className="mr-2 h-4 w-4" /> Send to Patient</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
