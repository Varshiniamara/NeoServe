"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AIInsightsSection() {
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [aiConfig, setAiConfig] = useState({
    automationThreshold: 80,
    confidenceThreshold: 90,
    responseTimeTarget: 2,
    costLimit: 1000
  })

  const handleConfigureAI = async () => {
    try {
      const response = await fetch('/api/ai/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aiConfig),
      })

      if (response.ok) {
        setConfigDialogOpen(false)
        // You can add a toast notification here for success
      } else {
        console.error('Failed to configure AI settings')
      }
    } catch (error) {
      console.error('Error configuring AI:', error)
    }
  }

  const suggestions = [
    {
      id: 1,
      title: "Route ticket TK-001 to Level 2 support",
      confidence: 95,
      status: "Applied",
      time: "10:30 AM",
      impact: "High",
    },
    {
      id: 2,
      title: "Escalate customer complaint CC-045",
      confidence: 87,
      status: "Pending",
      time: "11:15 AM",
      impact: "Medium",
    },
    {
      id: 3,
      title: "Auto-resolve password reset PR-123",
      confidence: 99,
      status: "Applied",
      time: "12:00 PM",
      impact: "Low",
    },
    {
      id: 4,
      title: "Assign billing query BQ-089 to finance team",
      confidence: 92,
      status: "Applied",
      time: "12:15 PM",
      impact: "Medium",
    },
    {
      id: 5,
      title: "Flag potential fraud case FR-456",
      confidence: 78,
      status: "Review",
      time: "1:30 PM",
      impact: "High",
    },
  ]

  const insights = [
    { metric: "Automation Rate", value: "67%", trend: "+5.2%", description: "Tickets resolved automatically" },
    { metric: "Prediction Accuracy", value: "94.3%", trend: "+2.1%", description: "AI routing accuracy" },
    { metric: "Response Time", value: "1.8min", trend: "-0.4min", description: "Average AI response time" },
    { metric: "Cost Savings", value: "$12.4k", trend: "+$2.1k", description: "Monthly savings from AI" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-green-900 text-green-300"
      case "Pending":
        return "bg-yellow-900 text-yellow-300"
      case "Review":
        return "bg-blue-900 text-blue-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-900 text-red-300"
      case "Medium":
        return "bg-orange-900 text-orange-300"
      case "Low":
        return "bg-green-900 text-green-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Insights</h2>
          <p className="text-gray-400">AI-powered recommendations and analytics</p>
        </div>
        <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Configure AI</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure AI Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Automation Threshold (%)</Label>
                <Input 
                  type="number" 
                  value={aiConfig.automationThreshold}
                  onChange={(e) => setAiConfig({...aiConfig, automationThreshold: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Confidence Threshold (%)</Label>
                <Input 
                  type="number" 
                  value={aiConfig.confidenceThreshold}
                  onChange={(e) => setAiConfig({...aiConfig, confidenceThreshold: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Response Time Target (minutes)</Label>
                <Input 
                  type="number" 
                  value={aiConfig.responseTimeTarget}
                  onChange={(e) => setAiConfig({...aiConfig, responseTimeTarget: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Cost Limit ($)</Label>
                <Input 
                  type="number" 
                  value={aiConfig.costLimit}
                  onChange={(e) => setAiConfig({...aiConfig, costLimit: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleConfigureAI}>Save Configuration</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* AI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight) => (
          <Card key={insight.metric} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{insight.metric}</CardTitle>
              <div className="text-xs text-green-400">{insight.trend}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{insight.value}</div>
              <p className="text-xs text-gray-400">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent AI Suggestions</CardTitle>
          <p className="text-sm text-gray-400">AI-powered recommendations for ticket management</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between p-4 rounded bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-gray-400">#{suggestion.id}</div>
                  <div>
                    <p className="text-white font-medium">{suggestion.title}</p>
                    <p className="text-sm text-gray-400">
                      {suggestion.time} • {suggestion.confidence}% confidence
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getImpactColor(suggestion.impact)}>
                    {suggestion.impact}
                  </Badge>
                  <Badge variant="secondary" className={getStatusColor(suggestion.status)}>
                    {suggestion.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">AI Performance Trends</CardTitle>
          <p className="text-sm text-gray-400">Weekly performance metrics</p>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            AI Performance Chart - Accuracy, Response Time, and Automation Rate over time
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
