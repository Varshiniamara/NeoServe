// Custom analytics tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    if (typeof window !== "undefined") {
      // Only log in development for now
      if (process.env.NODE_ENV === "development") {
        console.log(`Event: ${eventName}`, properties)
      }

      // Add Vercel Analytics when available
      // @ts-ignore
      if (window.va && typeof window.va === "function") {
        // @ts-ignore
        window.va("track", eventName, properties)
      }
    }
  } catch (error) {
    // Silently fail to prevent breaking the app
    console.warn("Event tracking error:", error)
  }
}

// Performance monitoring
export const trackPerformance = (metricName: string, value: number, unit = "ms") => {
  try {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.mark(`${metricName}-${value}`)
      trackEvent("performance_metric", {
        metric: metricName,
        value,
        unit,
        timestamp: Date.now(),
      })
    }
  } catch (error) {
    console.warn("Performance tracking error:", error)
  }
}

// Error tracking
export const trackError = (error: Error, context?: Record<string, any>) => {
  try {
    console.error("Application Error:", error, context)

    trackEvent("error_occurred", {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.href : "server",
    })
  } catch (trackingError) {
    console.warn("Error tracking failed:", trackingError)
  }
}

// User interaction tracking
export const trackUserAction = (action: string, component: string, metadata?: Record<string, any>) => {
  try {
    trackEvent("user_action", {
      action,
      component,
      ...metadata,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.warn("User action tracking error:", error)
  }
}
