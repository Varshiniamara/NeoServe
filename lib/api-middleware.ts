import { type NextRequest, NextResponse } from "next/server"
import { logger } from "./logger"
import { trackError, trackPerformance } from "./monitoring"

export function withMonitoring(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const startTime = Date.now()
    const requestId = crypto.randomUUID()
    const method = req.method
    const path = req.nextUrl.pathname

    // Log incoming request
    logger.apiRequest(method, path, undefined, requestId)

    try {
      const response = await handler(req)
      const duration = Date.now() - startTime

      // Log successful response
      logger.apiResponse(method, path, response.status, duration, undefined, requestId)

      // Track performance
      trackPerformance(`api_${method.toLowerCase()}_${path.replace(/\//g, "_")}`, duration)

      return response
    } catch (error) {
      const duration = Date.now() - startTime

      // Log error
      logger.error(
        `API Error: ${method} ${path}`,
        {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          duration,
        },
        undefined,
        requestId,
      )

      // Track error
      trackError(error instanceof Error ? error : new Error("Unknown API error"), {
        method,
        path,
        requestId,
        duration,
      })

      return NextResponse.json({ error: "Internal server error", requestId }, { status: 500 })
    }
  }
}
