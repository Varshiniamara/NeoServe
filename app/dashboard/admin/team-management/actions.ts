"use server"

import { revalidatePath } from "next/cache"

export interface TeamMember {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: string
  avatar: string
  phone: string
  joinDate: string
  ticketsResolved: number
}

// In a real app, this would be stored in a database
let teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@neoserve.com",
    role: "Team Lead",
    department: "Customer Support",
    status: "Active",
    avatar: "SJ",
    phone: "+1 (555) 123-4567",
    joinDate: "Jan 2023",
    ticketsResolved: 1247,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@neoserve.com",
    role: "Senior Agent",
    department: "Technical Support",
    status: "Active",
    avatar: "MC",
    phone: "+1 (555) 234-5678",
    joinDate: "Mar 2023",
    ticketsResolved: 892,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@neoserve.com",
    role: "Support Agent",
    department: "Customer Support",
    status: "Away",
    avatar: "ER",
    phone: "+1 (555) 345-6789",
    joinDate: "Jun 2023",
    ticketsResolved: 634,
  },
]

export async function addTeamMember(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const department = formData.get("department") as string
    const phone = formData.get("phone") as string

    // Basic validation
    if (!name || !email || !role || !department) {
      throw new Error("Missing required fields")
    }

    // Check if email already exists
    if (teamMembers.some((member) => member.email === email)) {
      throw new Error("Email already exists")
    }

    // Generate avatar initials
    const avatar = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    // Create new member
    const newMember: TeamMember = {
      id: Math.max(...teamMembers.map((m) => m.id), 0) + 1,
      name,
      email,
      role,
      department,
      status: "Active",
      avatar,
      phone: phone || "",
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      ticketsResolved: 0,
    }

    teamMembers.push(newMember)
    revalidatePath("/dashboard/admin/team-management")
    return { success: true, member: newMember }
  } catch (error) {
    console.error("Error adding team member:", error)
    throw error
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return teamMembers
}

export async function deleteTeamMember(memberId: number) {
  try {
    const initialLength = teamMembers.length
    teamMembers = teamMembers.filter((member) => member.id !== memberId)

    if (teamMembers.length === initialLength) {
      throw new Error("Member not found")
    }

    revalidatePath("/dashboard/admin/team-management")
    return { success: true }
  } catch (error) {
    console.error("Error deleting team member:", error)
    throw error
  }
}
