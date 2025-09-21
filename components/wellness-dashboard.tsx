"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, TrendingUp, TrendingDown, AlertTriangle, Users, RefreshCw } from "lucide-react"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface WellnessMetrics {
  averageMood: number
  moodTrend: "improving" | "declining" | "stable"
  totalEntries: number
  riskEmployees: Array<{
    name: string
    averageMood: number
    entries: number
  }>
  moodDistribution: {
    low: number
    medium: number
    high: number
  }
}

interface WellnessDashboardProps {
  className?: string
}

export function WellnessDashboard({ className }: WellnessDashboardProps) {
  const [metrics, setMetrics] = useState<WellnessMetrics | null>(null)
  const [insights, setInsights] = useState<string>("")
  const [department, setDepartment] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<string>("7d")
  const [loading, setLoading] = useState(false)

  const fetchWellnessData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        timeRange,
        ...(department !== "all" && { department }),
      })

      const response = await fetch(`/api/wellness/team-insights?${params}`)
      const data = await response.json()

      setMetrics(data.metrics)
      setInsights(data.insights)
    } catch (error) {
      console.error("Failed to fetch wellness data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWellnessData()
  }, [department, timeRange])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600"
      case "declining":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return "text-green-600"
    if (mood >= 5) return "text-yellow-600"
    return "text-red-600"
  }

  const pieData = metrics
    ? [
        { name: "High (8-10)", value: metrics.moodDistribution.high, color: "#10b981" },
        { name: "Medium (5-7)", value: metrics.moodDistribution.medium, color: "#f59e0b" },
        { name: "Low (1-4)", value: metrics.moodDistribution.low, color: "#ef4444" },
      ]
    : []

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

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

        <Button onClick={fetchWellnessData} disabled={loading} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics ? getMoodColor(metrics.averageMood) : ""}`}>
              {metrics ? `${metrics.averageMood}/10` : "--"}
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {metrics && getTrendIcon(metrics.moodTrend)}
              <span className={metrics ? getTrendColor(metrics.moodTrend) : ""}>
                {metrics ? metrics.moodTrend : "--"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalEntries || 0}</div>
            <p className="text-xs text-muted-foreground">Mood check-ins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Employees</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics?.riskEmployees.length || 0}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Mood %</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics ? Math.round((metrics.moodDistribution.high / metrics.totalEntries) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Feeling great</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>How your team is feeling</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Wellness Insights</CardTitle>
            <CardDescription>Recommendations for team wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {insights || "Loading insights..."}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Employees */}
      {metrics && metrics.riskEmployees.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Employees Needing Attention</span>
            </CardTitle>
            <CardDescription>Team members with consistently low mood scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.riskEmployees.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.entries} recent entries</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{employee.averageMood.toFixed(1)}/10</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
