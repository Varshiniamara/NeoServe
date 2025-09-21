import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

interface HealthCheck {
  service: string
  status: "healthy" | "degraded" | "unhealthy"
  responseTime: number
  details?: string
}

export async function GET() {
  const startTime = Date.now()
  const checks: HealthCheck[] = []

  // Database health check
  try {
    const dbStart = Date.now()
    const { data, error } = await supabaseServer.from("users").select("count").limit(1)
    const dbTime = Date.now() - dbStart

    checks.push({
      service: "database",
      status: error ? "unhealthy" : dbTime > 1000 ? "degraded" : "healthy",
      responseTime: dbTime,
      details: error?.message,
    })
  } catch (error) {
    checks.push({
      service: "database",
      status: "unhealthy",
      responseTime: Date.now() - startTime,
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // AI Service health check
  try {
    const aiStart = Date.now()
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      signal: AbortSignal.timeout(5000),
    })
    const aiTime = Date.now() - aiStart

    checks.push({
      service: "ai_service",
      status: response.ok ? (aiTime > 2000 ? "degraded" : "healthy") : "unhealthy",
      responseTime: aiTime,
      details: response.ok ? undefined : `HTTP ${response.status}`,
    })
  } catch (error) {
    checks.push({
      service: "ai_service",
      status: "unhealthy",
      responseTime: Date.now() - startTime,
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Memory and system checks
  const memoryUsage = process.memoryUsage()
  checks.push({
    service: "memory",
    status: memoryUsage.heapUsed > 500 * 1024 * 1024 ? "degraded" : "healthy", // 500MB threshold
    responseTime: 0,
    details: `Heap: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
  })

  const overallStatus = checks.some((c) => c.status === "unhealthy")
    ? "unhealthy"
    : checks.some((c) => c.status === "degraded")
      ? "degraded"
      : "healthy"

  const totalTime = Date.now() - startTime

  return NextResponse.json(
    {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: totalTime,
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      checks,
    },
    {
      status: overallStatus === "healthy" ? 200 : overallStatus === "degraded" ? 200 : 503,
    },
  )
}
