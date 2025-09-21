import { NextResponse } from "next/server"

const mockEmotionData = [
  { date: "2024-01-15", mood: 7, user: "john.doe" },
  { date: "2024-01-14", mood: 8, user: "john.doe" },
  { date: "2024-01-13", mood: 6, user: "john.doe" },
  { date: "2024-01-12", mood: 9, user: "john.doe" },
  { date: "2024-01-11", mood: 7, user: "john.doe" },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const user = searchParams.get("user")

  if (user) {
    const userMoods = mockEmotionData.filter((entry) => entry.user === user)
    return NextResponse.json(userMoods)
  }

  return NextResponse.json(mockEmotionData)
}

export async function POST(request: Request) {
  const { mood, user, sentiment } = await request.json()

  const newEntry = {
    date: new Date().toISOString().split("T")[0],
    mood: mood,
    user: user,
    sentiment: sentiment,
    timestamp: new Date().toISOString(),
  }

  mockEmotionData.unshift(newEntry)

  // Keep only last 30 entries
  if (mockEmotionData.length > 30) {
    mockEmotionData.splice(30)
  }

  return NextResponse.json(newEntry, { status: 201 })
}
