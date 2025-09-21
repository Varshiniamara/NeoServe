import { NextResponse } from "next/server"

// Mock tickets data for testing
const mockTickets = [
  {
    id: "TK-001",
    title: "Login Issues with Mobile App",
    description: "Customer unable to login to mobile application after recent update",
    status: "in_progress",
    priority: "high",
    category: "Technical",
    assignedTo: "john.doe",
    customer: "Alice Johnson",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T14:20:00Z",
  },
  {
    id: "TK-002",
    title: "Email Configuration Help",
    description: "Need assistance setting up email forwarding for support tickets",
    status: "resolved",
    priority: "medium",
    category: "Configuration",
    assignedTo: "john.doe",
    customer: "Bob Smith",
    created_at: "2024-01-14T09:15:00Z",
    updated_at: "2024-01-14T16:45:00Z",
  },
  {
    id: "TK-003",
    title: "Software Installation Request",
    description: "Request for installing new project management software",
    status: "pending",
    priority: "low",
    category: "Request",
    assignedTo: "jane.smith",
    customer: "Carol Davis",
    created_at: "2024-01-13T14:20:00Z",
    updated_at: "2024-01-13T14:20:00Z",
  },
  {
    id: "TK-004",
    title: "Database Performance Issues",
    description: "Slow query performance affecting user experience",
    status: "in_progress",
    priority: "urgent",
    category: "Technical",
    assignedTo: "john.doe",
    customer: "David Wilson",
    created_at: "2024-01-12T08:45:00Z",
    updated_at: "2024-01-15T09:30:00Z",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const assignedTo = searchParams.get("assignedTo")
    const status = searchParams.get("status")

    let filteredTickets = mockTickets

    if (assignedTo) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.assignedTo === assignedTo)
    }

    if (status) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === status)
    }

    return NextResponse.json(filteredTickets)
  } catch (error) {
    console.error("Tickets API error:", error)
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, priority = "medium", category, customer } = body

    const newTicket = {
      id: `TK-${String(mockTickets.length + 1).padStart(3, "0")}`,
      title,
      description,
      priority,
      category,
      status: "pending",
      assignedTo: null,
      customer,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockTickets.push(newTicket)

    return NextResponse.json(newTicket, { status: 201 })
  } catch (error) {
    console.error("Create ticket error:", error)
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const ticketIndex = mockTickets.findIndex((ticket) => ticket.id === id)

    if (ticketIndex === -1) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    mockTickets[ticketIndex] = {
      ...mockTickets[ticketIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json(mockTickets[ticketIndex])
  } catch (error) {
    console.error("Update ticket error:", error)
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}
