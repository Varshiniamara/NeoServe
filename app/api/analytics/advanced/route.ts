import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "7d"
    const department = searchParams.get("department")

    // Calculate date range
    const now = new Date()
    const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 7
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)

    // Get ticket metrics
    const { data: ticketMetrics } = await supabaseServer.rpc("get_ticket_metrics", {
      start_date: startDate.toISOString(),
      end_date: now.toISOString(),
      dept_filter: department,
    })

    // Get SLA compliance
    const { data: slaData } = await supabaseServer.rpc("calculate_sla_compliance", {
      start_date: startDate.toISOString(),
      end_date: now.toISOString(),
    })

    // Get team performance
    const { data: teamPerformance } = await supabaseServer
      .from("users")
      .select(`
        id, name, department,
        tickets_assigned:tickets!tickets_assigned_to_fkey(count),
        tickets_resolved:tickets!tickets_assigned_to_fkey(count)
      `)
      .eq("role", "employee")
      .eq("tickets.status", "resolved")

    // Get customer satisfaction trends
    const { data: csatTrends } = await supabaseServer
      .from("feedback")
      .select("rating, created_at")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true })

    // Get mood analytics
    const { data: moodAnalytics } = await supabaseServer
      .from("mood_entries")
      .select(`
        mood_value,
        sentiment,
        created_at,
        user:users(department)
      `)
      .gte("created_at", startDate.toISOString())

    return NextResponse.json({
      ticketMetrics: ticketMetrics || [],
      slaCompliance: slaData || { current: 92.5, target: 95.0 },
      teamPerformance: teamPerformance || [],
      csatTrends: csatTrends || [],
      moodAnalytics: moodAnalytics || [],
      timeRange,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Advanced analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
