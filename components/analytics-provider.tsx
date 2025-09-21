"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { trackEvent } from "@/lib/monitoring"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Simple page load tracking
    if (typeof window !== "undefined") {
      try {
        trackEvent("page_load", {
          url: window.location.href,
          timestamp: Date.now(),
        })
      } catch (error) {
        console.warn("Analytics initialization error:", error)
      }
    }
  }, [])

  // Don't render anything special until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
