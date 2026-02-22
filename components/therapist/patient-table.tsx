"use client"

import { useState } from "react"
import { Eye, Send, Package, Snowflake, Brain, BookOpen } from "lucide-react"
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
  { id: 1, name: "Alex Rivera", landscape: "Jungle", fuel: 75, streak: 12, lastActive: "Today", quest: "Quest 3", freezesUsed: 0, freezesTotal: 1, worries: ["Worried about job interview", "Family stress"], journalEntries: 24, thoughtSorts: 8 },
  { id: 2, name: "Jordan Lee", landscape: "Ocean", fuel: 45, streak: 5, lastActive: "Yesterday", quest: "Quest 2", freezesUsed: 1, freezesTotal: 1, worries: ["Feeling overwhelmed at school"], journalEntries: 10, thoughtSorts: 3 },
  { id: 3, name: "Sam Nguyen", landscape: "Savannah", fuel: 90, streak: 21, lastActive: "Today", quest: "Quest 5", freezesUsed: 0, freezesTotal: 1, worries: [], journalEntries: 42, thoughtSorts: 15 },
  { id: 4, name: "Taylor Brooks", landscape: "Desert", fuel: 30, streak: 2, lastActive: "3 days ago", quest: "Quest 1", freezesUsed: 1, freezesTotal: 1, worries: ["Rent is due", "Can not sleep"], journalEntries: 4, thoughtSorts: 1 },
  { id: 5, name: "Morgan Chen", landscape: "Mountains", fuel: 60, streak: 8, lastActive: "Today", quest: "Quest 4", freezesUsed: 0, freezesTotal: 1, worries: ["Health anxiety"], journalEntries: 18, thoughtSorts: 6 },
]

const modules = [
  "Deep Breathing",
  "Self-Advocacy",
  "Positive Self-Talk",
  "Thought Sorting (Trash or Treasure)",
  "Grounding (5-4-3-2-1)",
  "Schedule the Joy",
  "Fear Facing (Scary Monster)",
  "Worry Box Review",
  "Stretch & Move",
  "Scavenger Hunt",
  "Meditation Break",
  "Milestone Check-In",
]

const roadblockWords = [
  "I am not good enough",
  "Nobody cares",
  "I always fail",
  "Things never get better",
  "I am alone",
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
    setAssignModalPatient(null)
    setSelectedModule("")
    setNotes("")
    setSelectedWords([])
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
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Current Quest</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Fuel</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Streak</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Freezes</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Worries</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Last Active</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#8a96aa]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.id} className="border-[#e2e8f0]">
                <TableCell className="font-medium text-[#1a2b4a]">{p.name}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${landscapeColors[p.landscape] ?? "bg-gray-100 text-gray-800"}`}>
                    {p.landscape}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-[#1a2b4a]">{p.quest}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={p.fuel} className="h-2 w-16 bg-[#e2e8f0]" />
                    <span className="text-xs text-[#6b7b94]">{p.fuel}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#1a2b4a]">{p.streak}d</TableCell>
                <TableCell>
                  <span className={`text-xs font-bold ${p.freezesUsed >= p.freezesTotal ? "text-[#E84535]" : "text-[#2E8B57]"}`}>
                    {p.freezesUsed}/{p.freezesTotal}
                  </span>
                </TableCell>
                <TableCell>
                  {p.worries.length > 0 ? (
                    <button onClick={() => setWorryPatient(p)} className="flex items-center gap-1 rounded-full bg-[#FFF3E0] px-2.5 py-0.5 text-xs font-bold text-[#E65100] transition-colors hover:bg-[#FFE0B2]">
                      <Package className="h-3 w-3" /> {p.worries.length}
                    </button>
                  ) : (
                    <span className="text-xs text-[#8a96aa]">None</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-[#6b7b94]">{p.lastActive}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="sm" className="border-[#dde3eb] text-[#4a7cca] hover:bg-[#edf3fb]" onClick={() => setViewPatient(p)}>
                      <Eye className="mr-1 h-3.5 w-3.5" /> View
                    </Button>
                    <Button size="sm" className="bg-[#1a2b4a] text-white hover:bg-[#243658]" onClick={() => setAssignModalPatient(p)}>
                      <Send className="mr-1 h-3.5 w-3.5" /> Assign
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── View Patient Progress ── */}
      <Dialog open={!!viewPatient} onOpenChange={() => setViewPatient(null)}>
        <DialogContent className="max-w-lg border-[#dde3eb] bg-white font-mono">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#1a2b4a]">{viewPatient?.name} - Progress</DialogTitle>
            <DialogDescription className="text-sm text-[#6b7b94]">Detailed patient overview</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-3">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="journal" className="flex-1">Journal</TabsTrigger>
              <TabsTrigger value="thoughts" className="flex-1">Thoughts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-xs font-bold uppercase text-[#8a96aa]">Landscape</p>
                  <p className="mt-1 text-lg font-bold text-[#1a2b4a]">{viewPatient?.landscape}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-xs font-bold uppercase text-[#8a96aa]">Current Quest</p>
                  <p className="mt-1 text-lg font-bold text-[#1a2b4a]">{viewPatient?.quest}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-xs font-bold uppercase text-[#8a96aa]">Fuel Level</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress value={viewPatient?.fuel ?? 0} className="h-3 flex-1 bg-[#e2e8f0]" />
                    <span className="text-sm font-bold text-[#1a2b4a]">{viewPatient?.fuel}%</span>
                  </div>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-xs font-bold uppercase text-[#8a96aa]">Streak</p>
                  <p className="mt-1 text-lg font-bold text-[#FF6B35]">{viewPatient?.streak} days</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-xs font-bold uppercase text-[#8a96aa]">Freezes Used</p>
                  <p className="mt-1 text-lg font-bold text-[#1a2b4a]">{viewPatient?.freezesUsed}/{viewPatient?.freezesTotal}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-xs font-bold uppercase text-[#8a96aa]">Worry Box</p>
                  <p className="mt-1 text-lg font-bold text-[#E65100]">{viewPatient?.worries.length} items</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="journal" className="mt-4">
              <div className="flex items-center gap-2 rounded-xl bg-[#f9fafb] p-4">
                <BookOpen className="h-5 w-5 text-[#4a7cca]" />
                <p className="text-sm text-[#1a2b4a]"><strong>{viewPatient?.journalEntries}</strong> journal entries recorded</p>
              </div>
              <p className="mt-3 text-xs text-[#8a96aa]">Voice journal entries are available for playback in the full patient record.</p>
            </TabsContent>
            <TabsContent value="thoughts" className="mt-4">
              <div className="flex items-center gap-2 rounded-xl bg-[#f9fafb] p-4">
                <Brain className="h-5 w-5 text-[#9B59B6]" />
                <p className="text-sm text-[#1a2b4a]"><strong>{viewPatient?.thoughtSorts}</strong> thought sorts completed</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* ── Worry Box Review ── */}
      <Dialog open={!!worryPatient} onOpenChange={() => setWorryPatient(null)}>
        <DialogContent className="max-w-md border-[#dde3eb] bg-white font-mono">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-[#1a2b4a]">
              <Package className="h-5 w-5 text-[#E65100]" /> {worryPatient?.name}{"'"}s Worry Box
            </DialogTitle>
            <DialogDescription className="text-sm text-[#6b7b94]">Review these worries together during your session.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-2">
            {worryPatient?.worries.map((w, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-[#FFF8E1] p-4">
                <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#E65100]" />
                <p className="text-sm text-[#5A3200]">{w}</p>
              </div>
            ))}
            {worryPatient?.worries.length === 0 && (
              <p className="text-center text-sm text-[#8a96aa]">No worries submitted yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Assign Quest Modal ── */}
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
                <SelectTrigger className="border-[#dde3eb] bg-[#f9fafb] text-[#1a2b4a]">
                  <SelectValue placeholder="Choose a module..." />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Roadblock word picker for Thought Sorting */}
            {selectedModule === "Thought Sorting (Trash or Treasure)" && (
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold text-[#3a4a64]">Select Roadblock Words</Label>
                <p className="text-xs text-[#8a96aa]">Choose words from previous sessions for the patient to sort.</p>
                <div className="flex flex-wrap gap-2">
                  {roadblockWords.map((w) => (
                    <button key={w} onClick={() => toggleWord(w)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${selectedWords.includes(w) ? "bg-[#9B59B6] text-white" : "bg-[#f0f0f5] text-[#3a4a64] hover:bg-[#e0e0ea]"}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Freeze management */}
            <div className="flex items-center justify-between rounded-xl bg-[#f9fafb] p-4">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-[#89CFF0]" />
                <span className="text-sm font-semibold text-[#3a4a64]">Grant Extra Freeze</span>
              </div>
              <Button variant="outline" size="sm" className="border-[#89CFF0] text-[#406882] hover:bg-[#F0F8FF]">
                <Snowflake className="mr-1 h-3 w-3" /> Grant
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-[#3a4a64]">Therapist Notes</Label>
              <Textarea placeholder="Add notes for this assignment..." value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-24 border-[#dde3eb] bg-[#f9fafb] text-[#1a2b4a] placeholder:text-[#b0bac9]" />
            </div>
            <Button onClick={handleSend} className="w-full bg-[#1a2b4a] text-white hover:bg-[#243658]">
              <Send className="mr-2 h-4 w-4" /> Send to Patient
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
