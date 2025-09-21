"use client"

import React from "react"
import { PerformanceMonitor } from "@/lib/performance"

interface PerformanceProviderProps {
  children: React.ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  React.useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    monitor.initCoreWebVitals()
    monitor.initNavigationTiming()
    monitor.initResourceTiming()

    return () => monitor.disconnect()
  }, [])

  return <>{children}</>
}
