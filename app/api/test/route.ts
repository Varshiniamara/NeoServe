import { NextResponse } from "next/server"

export async function GET() {
  const testResults = []

  // Test Chat API
  try {
    const chatResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Test message",
        category: "general",
      }),
    })

    testResults.push({
      api: "Chat API",
      status: chatResponse.ok ? "success" : "error",
      statusCode: chatResponse.status,
    })
  } catch (error) {
    testResults.push({
      api: "Chat API",
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test Tickets API
  try {
    const ticketsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/tickets`)

    testResults.push({
      api: "Tickets API",
      status: ticketsResponse.ok ? "success" : "error",
      statusCode: ticketsResponse.status,
    })
  } catch (error) {
    testResults.push({
      api: "Tickets API",
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test Emotion API
  try {
    const emotionResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/emotion`)

    testResults.push({
      api: "Emotion API",
      status: emotionResponse.ok ? "success" : "error",
      statusCode: emotionResponse.status,
    })
  } catch (error) {
    testResults.push({
      api: "Emotion API",
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    results: testResults,
    summary: {
      total: testResults.length,
      passed: testResults.filter((r) => r.status === "success").length,
      failed: testResults.filter((r) => r.status === "error").length,
    },
  })
}
