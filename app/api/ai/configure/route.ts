import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const config = await request.json()
    
    // Store the configuration in the database
    const { error } = await supabaseServer
      .from("ai_configurations")
      .upsert({
        id: 1, // We'll use a single row for global configuration
        automation_threshold: config.automationThreshold,
        confidence_threshold: config.confidenceThreshold,
        response_time_target: config.responseTimeTarget,
        cost_limit: config.costLimit,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error("Failed to save AI configuration:", error)
      return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 })
    }

    return NextResponse.json({ 
      message: "AI configuration updated successfully",
      config 
    })
  } catch (error) {
    console.error("AI configuration error:", error)
    return NextResponse.json({ error: "Failed to update AI configuration" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("ai_configurations")
      .select("*")
      .eq("id", 1)
      .single()

    if (error) {
      console.error("Failed to fetch AI configuration:", error)
      return NextResponse.json({ error: "Failed to fetch configuration" }, { status: 500 })
    }

    return NextResponse.json(data || {
      automation_threshold: 80,
      confidence_threshold: 90,
      response_time_target: 2,
      cost_limit: 1000
    })
  } catch (error) {
    console.error("AI configuration fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch AI configuration" }, { status: 500 })
  }
} 