import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"
import { supabaseServer } from "@/lib/supabase-server"

const routingSchema = z.object({
  category: z.enum(["technical", "billing", "account", "general"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  department: z.string(),
  suggestedAgent: z.string().optional(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  estimatedResolutionTime: z.string(),
  requiredSkills: z.array(z.string()),
})

export async function POST(request: Request) {
  try {
    const { title, description, customerHistory } = await request.json()

    // Get available agents and their specialties
    const { data: agents } = await supabaseServer
      .from("users")
      .select("id, name, department, specialties, current_workload")
      .eq("role", "employee")
      .eq("status", "active")

    const agentInfo =
      agents
        ?.map(
          (agent) =>
            `${agent.name} (${agent.department}) - Specialties: ${agent.specialties?.join(", ") || "General"} - Workload: ${agent.current_workload || 0}`,
        )
        .join("\n") || "No agents available"

    const { object: routing } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: `You are an AI ticket routing specialist. Analyze support tickets and determine the best routing strategy.

Available agents:
${agentInfo}

Consider:
- Ticket content and complexity
- Customer history and priority status
- Agent specialties and current workload
- Urgency indicators in the message
- Required skills and expertise

Provide detailed reasoning for your routing decision.`,
      prompt: `Analyze this support ticket:

Title: ${title}
Description: ${description}
Customer History: ${customerHistory || "New customer"}

Route this ticket appropriately.`,
      schema: routingSchema,
    })

    // Find the best agent based on AI recommendation
    let assignedAgent = null
    if (routing.suggestedAgent && agents) {
      assignedAgent = agents.find(
        (agent) =>
          agent.name.toLowerCase().includes(routing.suggestedAgent!.toLowerCase()) ||
          agent.department.toLowerCase() === routing.department.toLowerCase(),
      )
    }

    // If no specific agent found, find best available in department
    if (!assignedAgent && agents) {
      assignedAgent = agents
        .filter((agent) => agent.department.toLowerCase() === routing.department.toLowerCase())
        .sort((a, b) => (a.current_workload || 0) - (b.current_workload || 0))[0]
    }

    // Create notification for assigned agent
    if (assignedAgent) {
      await supabaseServer.from("notifications").insert({
        user_id: assignedAgent.id,
        title: "New Ticket Assigned",
        message: `You've been assigned a ${routing.priority} priority ${routing.category} ticket: "${title}"`,
        type: routing.priority === "urgent" ? "error" : routing.priority === "high" ? "warning" : "info",
      })
    }

    return NextResponse.json({
      routing,
      assignedAgent: assignedAgent
        ? {
            id: assignedAgent.id,
            name: assignedAgent.name,
            department: assignedAgent.department,
          }
        : null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI routing error:", error)
    return NextResponse.json({ error: "Failed to route ticket" }, { status: 500 })
  }
}
