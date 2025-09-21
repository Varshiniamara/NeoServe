import { NextResponse } from "next/server"

const mockAnalytics = {
  sla: {
    current: 92.5,
    target: 95.0,
    trend: "+2.1%",
    weeklyData: [
      { day: "Mon", value: 95 },
      { day: "Tue", value: 87 },
      { day: "Wed", value: 92 },
      { day: "Thu", value: 89 },
      { day: "Fri", value: 94 },
      { day: "Sat", value: 96 },
      { day: "Sun", value: 91 },
    ],
  },
  csat: {
    current: 4.6,
    target: 4.5,
    trend: "+0.2",
    monthlyData: [
      { month: "Jan", value: 4.2 },
      { month: "Feb", value: 4.5 },
      { month: "Mar", value: 4.1 },
      { month: "Apr", value: 4.7 },
      { month: "May", value: 4.6 },
      { month: "Jun", value: 4.8 },
    ],
  },
  resolutionTime: {
    current: 2.4,
    target: 3.0,
    trend: "-0.3h",
    unit: "hours",
  },
  activeTickets: {
    total: 47,
    highPriority: 12,
    mediumPriority: 23,
    lowPriority: 12,
  },
  teamPerformance: [
    { name: "John Doe", resolved: 45, rating: 4.8 },
    { name: "Jane Smith", resolved: 67, rating: 4.9 },
    { name: "Mike Johnson", resolved: 32, rating: 4.6 },
    { name: "Sarah Wilson", resolved: 54, rating: 4.7 },
  ],
}

export async function GET() {
  return NextResponse.json(mockAnalytics)
}
