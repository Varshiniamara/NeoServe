"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Upload,
  Send,
  ArrowLeft,
  Users,
  Clock,
  AlertCircle,
  HelpCircle,
  Star,
  Loader2,
  Bot,
  User,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  actions?: string[]
  suggestions?: string[]
  category?: string
  confidence?: number
  timestamp?: string
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm here to help you. What can I assist you with today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState("en")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          category: "general",
          context: {
            role: "employee",
            name: "User", // You can get this from user context
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || data.error || "I'm sorry, I couldn't process your request.",
        actions: data.actions || [],
        suggestions: data.suggestions || [],
        category: data.category,
        confidence: data.confidence,
        timestamp: data.timestamp,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleActionClick = (action: string) => {
    // You can implement specific actions here
    console.log("Action clicked:", action)
    setInput(`Help me with: ${action}`)
  }

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating > 0) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setRating(0)
        setFeedback("")
      }, 3000)
    }
  }

  const tickets = [
    {
      id: "TK-2024-001",
      title: "Login Issues",
      status: "In Progress",
      time: "2 hours ago",
      statusColor: "bg-yellow-500",
    },
    {
      id: "TK-2024-002",
      title: "Password Reset",
      status: "Resolved",
      time: "1 day ago",
      statusColor: "bg-green-500",
    },
    {
      id: "TK-2024-003",
      title: "Account Access",
      status: "Pending",
      time: "3 days ago",
      statusColor: "bg-orange-500",
    },
  ]

  const faqs = [
    {
      question: "How do I reset my password?",
      category: "Account",
      categoryColor: "bg-blue-500",
    },
    {
      question: "How to update billing information?",
      category: "Billing",
      categoryColor: "bg-green-500",
    },
    {
      question: "How to contact technical support?",
      category: "Support",
      categoryColor: "bg-purple-500",
    },
    {
      question: "How to cancel my subscription?",
      category: "Account",
      categoryColor: "bg-blue-500",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NS</span>
                </div>
                <h1 className="text-xl font-semibold">NeoServe Support</h1>
              </div>
            </div>
            <Link
              href="/dashboard/admin"
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Support Team View</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* AI Support Chat */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">AI Support Chat</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Get instant help in your preferred language
                </CardDescription>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-slate-400">Language:</span>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="es">🇪🇸 Español</SelectItem>
                      <SelectItem value="fr">🇫🇷 Français</SelectItem>
                      <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                      <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                      <SelectItem value="pt">🇵🇹 Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="h-80 overflow-y-auto space-y-4 p-4 bg-slate-900 rounded-lg">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-3">
                      <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-start space-x-2 max-w-[85%]">
                          {message.role === "assistant" && (
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-lg whitespace-pre-wrap ${
                              message.role === "user" ? "bg-green-600 text-white" : "bg-slate-700 text-slate-100"
                            }`}
                          >
                            {message.content}

                            {/* Show confidence and category for assistant messages */}
                            {message.role === "assistant" && message.confidence && (
                              <div className="mt-2 pt-2 border-t border-slate-600">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                                  {message.category && (
                                    <Badge variant="outline" className="text-xs">
                                      {message.category.replace("_", " ")}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          {message.role === "user" && (
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Show actions for assistant messages */}
                      {message.role === "assistant" && message.actions && message.actions.length > 0 && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] ml-8">
                            <div className="flex flex-wrap gap-2">
                              {message.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleActionClick(action)}
                                  className="text-xs border-slate-600 text-slate-300 hover:text-white hover:bg-slate-600"
                                >
                                  {action}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Show suggestions for assistant messages */}
                      {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] ml-8">
                            <div className="flex items-center gap-1 mb-2">
                              <Lightbulb className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs text-slate-400">Suggestions:</span>
                            </div>
                            <div className="space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block text-left text-xs text-blue-400 hover:text-blue-300 hover:underline"
                                >
                                  • {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-slate-700 text-slate-100 p-3 rounded-lg flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Thinking...
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="border-slate-600 text-slate-400 hover:text-white"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Rating Section */}
            <Card className="bg-slate-800 border-slate-700">
              {submitted ? (
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Thank you for your feedback!</h3>
                    <p className="text-slate-400 text-sm">Your rating helps us improve our service.</p>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <CardTitle className="text-white">Rate Your Experience</CardTitle>
                    </div>
                    <CardDescription className="text-slate-400">Help us improve our service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRatingSubmit} className="space-y-4">
                      <div>
                        <p className="text-slate-300 text-sm mb-2">Rating:</p>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="p-1 transition-colors"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-slate-500"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Optional: Tell us about your experience..."
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />

                      <Button
                        type="submit"
                        disabled={rating === 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Rating
                      </Button>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Track Tickets */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  <CardTitle className="text-white">Track Tickets</CardTitle>
                </div>
                <CardDescription className="text-slate-400">Check the status of your support requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{ticket.id}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${ticket.statusColor}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{ticket.title}</p>
                    <div className="flex items-center space-x-1 text-slate-400 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{ticket.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <CardTitle className="text-white">Frequently Asked</CardTitle>
                </div>
                <CardDescription className="text-slate-400">Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(faq.question)}
                    className="w-full bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm">{faq.question}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${faq.categoryColor}`}>
                        {faq.category}
                      </span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
