"use server"

import { revalidatePath } from "next/cache"

export interface Ticket {
  id: string
  title: string
  customer: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  assignedTo: string
  department: string
  created: string
  category: string
  description?: string
}

// In a real app, this would be stored in a database
const tickets: Ticket[] = [
  {
    id: "TK-001",
    title: "Login issues with mobile app",
    customer: "John Smith",
    priority: "High",
    status: "Open",
    assignedTo: "Sarah Johnson",
    department: "Technical Support",
    created: "2 hours ago",
    category: "Authentication",
    description: "User unable to login to mobile app after recent update",
  },
  {
    id: "TK-002",
    title: "Billing inquiry for premium plan",
    customer: "Alice Brown",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Michael Chen",
    department: "Customer Support",
    created: "4 hours ago",
    category: "Billing",
    description: "Customer wants to upgrade to premium plan",
  },
]

export async function addTicket(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const customer = formData.get("customer") as string
    const priority = formData.get("priority") as "Low" | "Medium" | "High" | "Critical"
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const assignedTo = formData.get("assignedTo") as string

    // Basic validation
    if (!title || !customer || !priority || !category) {
      throw new Error("Missing required fields")
    }

    // Generate ticket ID
    const ticketNumber = String(tickets.length + 1).padStart(3, "0")
    const ticketId = `TK-${ticketNumber}`

    // Determine department based on category
    let department = "Customer Support"
    if (category === "Authentication" || category === "Technical Issue") {
      department = "Technical Support"
    } else if (category === "Feature Request") {
      department = "Product"
    }

    const newTicket: Ticket = {
      id: ticketId,
      title,
      customer,
      priority,
      status: "Open",
      assignedTo: assignedTo || "Unassigned",
      department,
      created: "Just now",
      category,
      description,
    }

    tickets.unshift(newTicket)
    revalidatePath("/dashboard/admin/ticket-router")
    return { success: true, ticket: newTicket }
  } catch (error) {
    console.error("Error adding ticket:", error)
    throw error
  }
}

export async function getTickets(): Promise<Ticket[]> {
  return tickets
}
