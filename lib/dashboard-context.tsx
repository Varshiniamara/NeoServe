"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type DashboardSection = "dashboard" | "analytics" | "team-management" | "ticket-router" | "integrations" | "ai-insights"

interface DashboardContextType {
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <DashboardContext.Provider
      value={{
        activeSection,
        setActiveSection,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
