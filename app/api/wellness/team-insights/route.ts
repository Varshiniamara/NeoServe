import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const timeRange = searchParams.get("timeRange") || "7d"

    const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 7
    const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)

    // Get mood data with user info
    let query = supabaseServer
      .from("mood_entries")
      .select(`
        mood_value,
        sentiment,
        created_at,
        user:users(name, department, role)
      `)
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false })

    if (department) {
      query = query.eq("users.department", department)
    }

    const { data: moodData } = await query

    if (!moodData || moodData.length === 0) {
      return NextResponse.json({
        insights: "No mood data available for analysis",
        metrics: {
          averageMood: 0,
          moodTrend: "stable",
          riskEmployees: [],
          departmentComparison: [],
        },
      })
    }

    // Calculate metrics
    const averageMood = moodData.reduce((sum, entry) => sum + entry.mood_value, 0) / moodData.length
    const recentMoods = moodData.slice(0, Math.floor(moodData.length / 2))
    const olderMoods = moodData.slice(Math.floor(moodData.length / 2))

    const recentAvg = recentMoods.reduce((sum, entry) => sum + entry.mood_value, 0) / recentMoods.length
    const olderAvg = olderMoods.reduce((sum, entry) => sum + entry.mood_value, 0) / olderMoods.length

    const moodTrend = recentAvg > olderAvg + 0.5 ? "improving" : recentAvg < olderAvg - 0.5 ? "declining" : "stable"

    // Identify at-risk employees (consistently low mood)
    const userMoodMap = new Map()
    moodData.forEach((entry) => {
      const userId = entry.user?.name || "Unknown"
      if (!userMoodMap.has(userId)) {
        userMoodMap.set(userId, [])
      }
      userMoodMap.get(userId).push(entry.mood_value)
    })

    const riskEmployees = Array.from(userMoodMap.entries())
      .map(([name, moods]) => ({
        name,
        averageMood: moods.reduce((a: number, b: number) => a + b, 0) / moods.length,
        entries: moods.length,
      }))
      .filter((emp) => emp.averageMood < 5 && emp.entries >= 3)
      .sort((a, b) => a.averageMood - b.averageMood)

    // Generate AI insights
    const moodSummary = `
    Team mood analysis for ${department || "all departments"} over ${timeRange}:
    - Average mood: ${averageMood.toFixed(1)}/10
    - Trend: ${moodTrend}
    - Total entries: ${moodData.length}
    - At-risk employees: ${riskEmployees.length}
    - Low mood entries (≤4): ${moodData.filter((m) => m.mood_value <= 4).length}
    - High mood entries (≥8): ${moodData.filter((m) => m.mood_value >= 8).length}
    `

    const { text: insights } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a workplace wellness analyst. Provide actionable insights about team mood and wellbeing based on the data. Focus on:
      - Overall team health assessment
      - Potential concerns or positive trends
      - Specific recommendations for managers
      - Early warning signs to watch for
      Keep insights professional, constructive, and actionable.`,
      prompt: moodSummary,
      maxTokens: 300,
    })

    return NextResponse.json({
      insights,
      metrics: {
        averageMood: Number(averageMood.toFixed(1)),
        moodTrend,
        totalEntries: moodData.length,
        riskEmployees: riskEmployees.slice(0, 5), // Top 5 at-risk
        moodDistribution: {
          low: moodData.filter((m) => m.mood_value <= 4).length,
          medium: moodData.filter((m) => m.mood_value >= 5 && m.mood_value <= 7).length,
          high: moodData.filter((m) => m.mood_value >= 8).length,
        },
      },
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Wellness insights error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
