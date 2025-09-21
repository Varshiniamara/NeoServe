"use client"

import React from "react"

import { trackPerformance } from "./monitoring"

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private observers: Map<string, PerformanceObserver> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Monitor Core Web Vitals
  initCoreWebVitals() {
    if (typeof window === "undefined") return

    // Largest Contentful Paint
    this.observeMetric("largest-contentful-paint", (entries) => {
      const lcpEntry = entries[entries.length - 1]
      trackPerformance("lcp", lcpEntry.startTime)
    })

    // First Input Delay
    this.observeMetric("first-input", (entries) => {
      const fidEntry = entries[0]
      trackPerformance("fid", fidEntry.processingStart - fidEntry.startTime)
    })

    // Cumulative Layout Shift
    this.observeMetric("layout-shift", (entries) => {
      let clsValue = 0
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      trackPerformance("cls", clsValue)
    })
  }

  // Monitor navigation timing
  initNavigationTiming() {
    if (typeof window === "undefined") return

    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

      trackPerformance("ttfb", navigation.responseStart - navigation.fetchStart)
      trackPerformance("dom_content_loaded", navigation.domContentLoadedEventEnd - navigation.fetchStart)
      trackPerformance("load_complete", navigation.loadEventEnd - navigation.fetchStart)
    })
  }

  // Monitor resource loading
  initResourceTiming() {
    if (typeof window === "undefined") return

    this.observeMetric("resource", (entries) => {
      entries.forEach((entry) => {
        const resource = entry as PerformanceResourceTiming
        trackPerformance(`resource_${resource.initiatorType}`, resource.duration, {
          name: resource.name,
          size: resource.transferSize,
        })
      })
    })
  }

  private observeMetric(type: string, callback: (entries: PerformanceEntry[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })

      observer.observe({ type, buffered: true })
      this.observers.set(type, observer)
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error)
    }
  }

  // Cleanup observers
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
  }
}

// React performance hooks
export function usePerformanceMonitor() {
  React.useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    monitor.initCoreWebVitals()
    monitor.initNavigationTiming()
    monitor.initResourceTiming()

    return () => monitor.disconnect()
  }, [])
}

// Component performance wrapper
export function withPerformanceMonitoring<T extends object>(Component: React.ComponentType<T>, componentName: string) {
  return function PerformanceWrappedComponent(props: T) {
    React.useEffect(() => {
      const startTime = performance.now()

      return () => {
        const endTime = performance.now()
        trackPerformance(`component_${componentName}`, endTime - startTime)
      }
    }, [])

    return <Component {...props} />
  }
}
