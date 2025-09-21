import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET() {
  try {
    const { data: integrations, error } = await supabaseServer
      .from("integrations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch integrations:", error)
      return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 })
    }

    return NextResponse.json(integrations || [])
  } catch (error) {
    console.error("Integrations fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const integration = await request.json()
    
    // Validate required fields
    if (!integration.name || !integration.type || !integration.apiKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Store the integration in the database
    const { data, error } = await supabaseServer
      .from("integrations")
      .insert({
        name: integration.name,
        type: integration.type,
        api_key: integration.apiKey,
        webhook_url: integration.webhookUrl,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error("Failed to create integration:", error)
      return NextResponse.json({ error: "Failed to create integration" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Integration creation error:", error)
    return NextResponse.json({ error: "Failed to create integration" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json()
    
    const { data, error } = await supabaseServer
      .from("integrations")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Failed to update integration:", error)
      return NextResponse.json({ error: "Failed to update integration" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Integration update error:", error)
    return NextResponse.json({ error: "Failed to update integration" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    
    const { error } = await supabaseServer
      .from("integrations")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Failed to delete integration:", error)
      return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 })
    }

    return NextResponse.json({ message: "Integration deleted successfully" })
  } catch (error) {
    console.error("Integration deletion error:", error)
    return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 })
  }
} 