"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smile, TrendingUp, TrendingDown, ArrowLeft, Heart, Brain, Activity, Target, Award } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface MoodEntry {
  id: string
  date: string
  mood: number
  energy: number
  stress: number
  productivity: number
  notes: string
  tags: string[]
}

export default function MoodTrackerPage() {
  const [currentMood, setCurrentMood] = useState([7])
  const [currentEnergy, setCurrentEnergy] = useState([6])
  const [currentStress, setCurrentStress] = useState([4])
  const [currentProductivity, setCurrentProductivity] = useState([7])
  const [notes, setNotes] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [timeRange, setTimeRange] = useState("7d")

  const moodEmojis = {
    1: "😢",
    2: "😟",
    3: "😕",
    4: "😐",
    5: "🙂",
    6: "😊",
    7: "😄",
    8: "😁",
    9: "🤩",
    10: "🥳",
  }

  const availableTags = [
    "productive",
    "stressed",
    "motivated",
    "tired",
    "focused",
    "overwhelmed",
    "creative",
    "collaborative",
    "learning",
    "challenging",
  ]

  // Mock data for mood history
  useEffect(() => {
    const mockEntries: MoodEntry[] = [
      {
        id: "1",
        date: "2024-01-15",
        mood: 8,
        energy: 7,
        stress: 3,
        productivity: 8,
        notes: "Great day! Completed all my tasks and helped a colleague.",
        tags: ["productive", "motivated"],
      },
      {
        id: "2",
        date: "2024-01-14",
        mood: 6,
        energy: 5,
        stress: 6,
        productivity: 6,
        notes: "Busy day with lots of meetings. Felt a bit overwhelmed.",
        tags: ["overwhelmed", "tired"],
      },
      {
        id: "3",
        date: "2024-01-13",
        mood: 7,
        energy: 8,
        stress: 2,
        productivity: 9,
        notes: "Excellent focus today. Solved a complex technical issue.",
        tags: ["focused", "creative"],
      },
      {
        id: "4",
        date: "2024-01-12",
        mood: 5,
        energy: 4,
        stress: 7,
        productivity: 4,
        notes: "Challenging day with difficult customer escalations.",
        tags: ["stressed", "challenging"],
      },
      {
        id: "5",
        date: "2024-01-11",
        mood: 9,
        energy: 9,
        stress: 1,
        productivity: 9,
        notes: "Amazing team collaboration on the new project launch!",
        tags: ["collaborative", "motivated"],
      },
      {
        id: "6",
        date: "2024-01-10",
        mood: 6,
        energy: 6,
        stress: 5,
        productivity: 7,
        notes: "Regular day, steady progress on ongoing tasks.",
        tags: ["productive"],
      },
      {
        id: "7",
        date: "2024-01-09",
        mood: 7,
        energy: 7,
        stress: 3,
        productivity: 8,
        notes: "Good learning day, attended useful training session.",
        tags: ["learning", "motivated"],
      },
    ]
    setMoodEntries(mockEntries)
  }, [])

  const saveMoodEntry = async () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      mood: currentMood[0],
      energy: currentEnergy[0],
      stress: currentStress[0],
      productivity: currentProductivity[0],
      notes,
      tags: selectedTags,
    }

    setMoodEntries((prev) => [newEntry, ...prev])

    // Reset form
    setNotes("")
    setSelectedTags([])

    // Show success message (you could use a toast here)
    alert("Mood entry saved successfully!")
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0
    return (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length).toFixed(1)
  }

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return "stable"
    const recent = moodEntries.slice(0, 3).reduce((sum, entry) => sum + entry.mood, 0) / 3
    const older = moodEntries.slice(3, 6).reduce((sum, entry) => sum + entry.mood, 0) / 3
    return recent > older ? "improving" : recent < older ? "declining" : "stable"
  }

  const chartData = moodEntries
    .slice(0, 7)
    .reverse()
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      mood: entry.mood,
      energy: entry.energy,
      stress: entry.stress,
      productivity: entry.productivity,
    }))

  const getMoodEmoji = (mood: number) => {
    return moodEmojis[Math.round(mood) as keyof typeof moodEmojis] || "😐"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/employee" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <Smile className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mood Tracker</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Entry</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Today's Entry */}
          <TabsContent value="today" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Mood Entry Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>How are you feeling today?</span>
                  </CardTitle>
                  <CardDescription>Track your mood, energy, and productivity levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mood */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Mood</label>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getMoodEmoji(currentMood[0])}</span>
                        <span className="text-sm font-medium">{currentMood[0]}/10</span>
                      </div>
                    </div>
                    <Slider
                      value={currentMood}
                      onValueChange={setCurrentMood}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Energy */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium flex items-center space-x-1">
                        <Activity className="h-4 w-4" />
                        <span>Energy Level</span>
                      </label>
                      <span className="text-sm font-medium">{currentEnergy[0]}/10</span>
                    </div>
                    <Slider
                      value={currentEnergy}
                      onValueChange={setCurrentEnergy}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Stress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium flex items-center space-x-1">
                        <Brain className="h-4 w-4" />
                        <span>Stress Level</span>
                      </label>
                      <span className="text-sm font-medium">{currentStress[0]}/10</span>
                    </div>
                    <Slider
                      value={currentStress}
                      onValueChange={setCurrentStress}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Productivity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>Productivity</span>
                      </label>
                      <span className="text-sm font-medium">{currentProductivity[0]}/10</span>
                    </div>
                    <Slider
                      value={currentProductivity}
                      onValueChange={setCurrentProductivity}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">How would you describe today?</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Notes (optional)</label>
                    <Textarea
                      placeholder="How was your day? Any specific events or feelings you'd like to note?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button onClick={saveMoodEntry} className="w-full">
                    Save Today's Entry
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Mood Summary</CardTitle>
                    <CardDescription>Overview of your recent wellbeing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{getAverageMood()}</div>
                        <div className="text-sm text-blue-600">Average Mood</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="flex items-center justify-center space-x-1">
                          {getMoodTrend() === "improving" ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : getMoodTrend() === "declining" ? (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          ) : (
                            <Activity className="h-5 w-5 text-gray-600" />
                          )}
                          <span className="text-sm capitalize text-green-600">{getMoodTrend()}</span>
                        </div>
                        <div className="text-sm text-green-600">Trend</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {moodEntries.slice(0, 5).map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                            <div>
                              <div className="text-sm font-medium">
                                {new Date(entry.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="text-xs text-gray-500">Mood: {entry.mood}/10</div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {entry.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Mood History</h2>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {moodEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        <div>
                          <div className="font-medium">
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            Mood: {entry.mood}/10 • Energy: {entry.energy}/10 • Stress: {entry.stress}/10 •
                            Productivity: {entry.productivity}/10
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {entry.notes && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{entry.notes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mood Trends</CardTitle>
                  <CardDescription>Your mood patterns over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wellbeing Overview</CardTitle>
                  <CardDescription>Average levels across different metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1, 10]} />
                      <Tooltip />
                      <Bar dataKey="energy" fill="#10b981" />
                      <Bar dataKey="productivity" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Insights & Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Mood Pattern</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Your mood tends to be higher on days when you feel more productive. Consider identifying what
                    factors contribute to your productive days.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Positive Trend</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Your overall mood trend is improving! Keep up the good work with your wellness tracking.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Stress Management</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Consider stress management techniques on days when your stress levels are above 6. Regular breaks
                    and mindfulness can help.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
