type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  userId?: string
  requestId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, userId, requestId } = entry
    const contextStr = context ? JSON.stringify(context) : ""
    const userStr = userId ? `[User: ${userId}]` : ""
    const reqStr = requestId ? `[Req: ${requestId}]` : ""

    return `[${timestamp}] ${level.toUpperCase()} ${userStr}${reqStr} ${message} ${contextStr}`
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, userId?: string, requestId?: string) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      userId,
      requestId,
    }

    const formattedLog = this.formatLog(entry)

    // Console logging
    switch (level) {
      case "debug":
        if (this.isDevelopment) console.debug(formattedLog)
        break
      case "info":
        console.info(formattedLog)
        break
      case "warn":
        console.warn(formattedLog)
        break
      case "error":
        console.error(formattedLog)
        break
    }

    // In production, you would send to external logging service
    if (!this.isDevelopment && level === "error") {
      // Send to external service like DataDog, LogRocket, etc.
      this.sendToExternalService(entry)
    }
  }

  private async sendToExternalService(entry: LogEntry) {
    try {
      // Example: Send to webhook or logging service
      if (process.env.LOGGING_WEBHOOK_URL) {
        await fetch(process.env.LOGGING_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        })
      }
    } catch (error) {
      console.error("Failed to send log to external service:", error)
    }
  }

  debug(message: string, context?: Record<string, any>, userId?: string, requestId?: string) {
    this.log("debug", message, context, userId, requestId)
  }

  info(message: string, context?: Record<string, any>, userId?: string, requestId?: string) {
    this.log("info", message, context, userId, requestId)
  }

  warn(message: string, context?: Record<string, any>, userId?: string, requestId?: string) {
    this.log("warn", message, context, userId, requestId)
  }

  error(message: string, context?: Record<string, any>, userId?: string, requestId?: string) {
    this.log("error", message, context, userId, requestId)
  }

  // Specific logging methods for common scenarios
  apiRequest(method: string, path: string, userId?: string, requestId?: string) {
    this.info(`API Request: ${method} ${path}`, { method, path }, userId, requestId)
  }

  apiResponse(method: string, path: string, status: number, duration: number, userId?: string, requestId?: string) {
    this.info(
      `API Response: ${method} ${path} - ${status} (${duration}ms)`,
      { method, path, status, duration },
      userId,
      requestId,
    )
  }

  userAction(action: string, userId: string, metadata?: Record<string, any>) {
    this.info(`User Action: ${action}`, { action, ...metadata }, userId)
  }

  systemEvent(event: string, metadata?: Record<string, any>) {
    this.info(`System Event: ${event}`, { event, ...metadata })
  }
}

export const logger = new Logger()
