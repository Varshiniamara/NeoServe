import { NextResponse } from "next/server"

const mockUsers = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "employee",
    department: "Engineering",
    joinDate: "2023-06-15",
    status: "active",
    mood: 7,
    ticketsAssigned: 12,
    ticketsResolved: 45,
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "employee",
    department: "Support",
    joinDate: "2023-03-20",
    status: "active",
    mood: 8,
    ticketsAssigned: 8,
    ticketsResolved: 67,
  },
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@company.com",
    role: "admin",
    department: "IT",
    joinDate: "2022-01-10",
    status: "active",
    mood: 6,
    ticketsAssigned: 0,
    ticketsResolved: 0,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")

  if (role) {
    const filteredUsers = mockUsers.filter((user) => user.role === role)
    return NextResponse.json(filteredUsers)
  }

  return NextResponse.json(mockUsers)
}
