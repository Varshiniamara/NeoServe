"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Users,
  Bot,
  ArrowLeft,
  Send,
  Settings,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function SupportTeamView() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [aiSuggestion, setAiSuggestion] = useState("")

  const conversations = [
    {
      id: 1,
      customer: "John Smith",
      status: "active",
      sentiment: "neutral",
      lastMessage: "I'm having trouble logging into my account",
      time: "2 min ago",
      messages: [
        { type: "customer", message: "I'm having trouble logging into my account", time: "2 min ago" },
        {
          type: "agent",
          message: "I'd be happy to help you with that. Can you tell me what error message you're seeing?",
          time: "1 min ago",
        },
      ],
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      status: "waiting",
      sentiment: "frustrated",
      lastMessage: "This is the third time I'm contacting support about billing",
      time: "5 min ago",
      messages: [
        { type: "customer", message: "This is the third time I'm contacting support about billing", time: "5 min ago" },
        { type: "customer", message: "I was charged twice for the same service", time: "4 min ago" },
      ],
    },
    {
      id: 3,
      customer: "Mike Davis",
      status: "resolved",
      sentiment: "positive",
      lastMessage: "Thank you so much for your help!",
      time: "15 min ago",
      messages: [
        { type: "customer", message: "I need help setting up my new account", time: "20 min ago" },
        { type: "agent", message: "I'll walk you through the setup process step by step", time: "18 min ago" },
        { type: "customer", message: "Thank you so much for your help!", time: "15 min ago" },
      ],
    },
  ]

  const aiSuggestions = [
    "Based on the login issue, I recommend asking for the specific error code and checking if they're using the correct email format.",
    "For billing disputes, escalate to the billing team and offer a temporary credit while investigating.",
    "The customer seems satisfied. Consider sending a follow-up survey to gather feedback.",
  ]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "neutral":
        return "text-yellow-600"
      case "frustrated":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <CheckCircle className="h-4 w-4" />
      case "neutral":
        return <Clock className="h-4 w-4" />
      case "frustrated":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/support" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Support
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Support Team Dashboard</h1>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Live Conversations</CardTitle>
              <CardDescription>Active customer chats</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conv, index) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(index)}
                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedConversation === index ? "bg-blue-50 dark:bg-blue-950 border-r-2 border-blue-600" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{conv.customer}</span>
                      <div className={`flex items-center space-x-1 ${getSentimentColor(conv.sentiment)}`}>
                        {getSentimentIcon(conv.sentiment)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{conv.time}</span>
                      <Badge
                        variant={
                          conv.status === "active" ? "default" : conv.status === "waiting" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {conv.status}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>{conversations[selectedConversation]?.customer}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <span>Sentiment:</span>
                    <div
                      className={`flex items-center space-x-1 ${getSentimentColor(conversations[selectedConversation]?.sentiment)}`}
                    >
                      {getSentimentIcon(conversations[selectedConversation]?.sentiment)}
                      <span className="capitalize text-sm">{conversations[selectedConversation]?.sentiment}</span>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="outline">{conversations[selectedConversation]?.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Messages */}
                <div className="h-80 overflow-y-auto border rounded-lg p-4 space-y-3">
                  {conversations[selectedConversation]?.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === "agent" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          message.type === "agent"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Interface */}
                <div className="border rounded-lg p-4 space-y-3">
                  <Textarea
                    placeholder="Type your response..."
                    value={aiSuggestion}
                    onChange={(e) => setAiSuggestion(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Bot className="h-4 w-4 mr-2" />
                      Use AI Suggestion
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions & Tools */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>AI Assistant</span>
              </CardTitle>
              <CardDescription>Smart suggestions for this conversation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Suggested Response:</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {aiSuggestions[selectedConversation] || aiSuggestions[0]}
                </p>
                <Button size="sm" className="mt-2 w-full">
                  Use This Suggestion
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Quick Actions</h4>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Escalate to Manager
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Transfer to Specialist
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Resolved
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Customer Info</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Plan:</span> Premium
                  </p>
                  <p>
                    <span className="font-medium">Since:</span> Jan 2024
                  </p>
                  <p>
                    <span className="font-medium">Tickets:</span> 3 total
                  </p>
                  <p>
                    <span className="font-medium">Last Contact:</span> 2 weeks ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Routing Settings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Smart Ticket Routing</CardTitle>
            <CardDescription>AI-powered automatic ticket assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Technical Issues</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Auto-route to Level 1 Support</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Billing Queries</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Auto-route to Finance Team</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Account Issues</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Auto-route to Account Specialists</p>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
