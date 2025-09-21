"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Ticket, Clock, Smile, Send, Bot, BookOpen, TrendingUp, LogOut, Lightbulb } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function EmployeeDashboard() {
  const [userName, setUserName] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message:
        "Hello! I'm your AI assistant. I can help you with tickets, mood tracking, password resets, technical issues, and more. What can I help you with today?",
    },
  ])
  const [moodValue, setMoodValue] = useState([7])
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [quickActions, setQuickActions] = useState<string[]>([])
  const router = useRouter()

  // Authentication check
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuth || userRole !== "employee") {
      router.push("/login/employee")
      return
    }

    // If authenticated, load user data
    const name = localStorage.getItem("userName") || "Employee"
    setUserName(name)
    setIsLoading(false)

    // Load mock tickets
    fetch("/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data.filter((t: any) => t.assignedTo === name)))
      .catch(() => {})
  }, [router])

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return

    const newMessage = { type: "user", message: chatMessage }
    setChatHistory((prev) => [...prev, newMessage])
    setChatMessage("")
    setIsChatLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: chatMessage,
          category: "general",
          context: {
            role: "employee",
            name: userName,
            ticketsAssigned: tickets.length,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setChatHistory((prev) => [...prev, { type: "bot", message: data.response }])

        // Set quick actions if available
        if (data.actions && data.actions.length > 0) {
          setQuickActions(data.actions)
        }
      } else {
        setChatHistory((prev) => [
          ...prev,
          { type: "bot", message: data.response || "Sorry, I'm having trouble right now. Please try again." },
        ])
      }
    } catch (error) {
      console.error("Chat error:", error)
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", message: "Sorry, I'm having trouble connecting. Please try again in a moment." },
      ])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    setChatMessage(`How do I ${action.toLowerCase()}?`)
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  const getMoodEmoji = (value: number) => {
    if (value <= 3) return "😢"
    if (value <= 5) return "😐"
    if (value <= 7) return "🙂"
    return "😊"
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="font-semibold">NeoServe</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/employee">
                    <TrendingUp className="h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/employee/my-tickets">
                    <Ticket className="h-4 w-4" />
                    My Tickets
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/employee/knowledge-base">
                    <BookOpen className="h-4 w-4" />
                    Knowledge Base
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/employee/mood-tracker">
                    <Smile className="h-4 w-4" />
                    Mood Tracker
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {userName}!</h1>
                <p className="text-gray-600 dark:text-gray-400">Here's your dashboard overview</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 high priority</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
                  <Smile className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getMoodEmoji(moodValue[0])}</div>
                  <p className="text-xs text-muted-foreground">Feeling good</p>
                </CardContent>
              </Card>
            </div>

            {/* AI Chat Assistant */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>AI Assistant</span>
                </CardTitle>
                <CardDescription>Get instant help with tickets, passwords, technical issues, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg whitespace-pre-line ${
                            chat.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  {quickActions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <Lightbulb className="h-3 w-3" />
                        <span>Quick Actions:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action)}
                            className="text-xs"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything... (try: 'reset password', 'help with tickets', 'mood tracking')"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={isChatLoading}
                    />
                    <Button onClick={handleSendMessage} disabled={isChatLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mood Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smile className="h-5 w-5" />
                  <span>Mood Tracker</span>
                </CardTitle>
                <CardDescription>How are you feeling today?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{getMoodEmoji(moodValue[0])}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mood: {moodValue[0]}/10</p>
                </div>
                <Slider value={moodValue} onValueChange={setMoodValue} max={10} min={1} step={1} className="w-full" />
                <Button className="w-full" size="sm">
                  Save Mood
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tickets */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Your latest support requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "TK-001", title: "Login Issues", status: "In Progress", priority: "High" },
                    { id: "TK-002", title: "Email Configuration", status: "Resolved", priority: "Medium" },
                    { id: "TK-003", title: "Software Installation", status: "Pending", priority: "Low" },
                  ].map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Ticket className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-gray-500">{ticket.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            ticket.priority === "High"
                              ? "destructive"
                              : ticket.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge variant={ticket.status === "Resolved" ? "default" : "outline"}>{ticket.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

