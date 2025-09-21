"use client"

import { AppSidebar } from "./components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardProvider, useDashboard } from "./lib/dashboard-context"

// Import all sections
import { DashboardSection } from "./components/admin/sections/dashboard-section"
import { AnalyticsSection } from "./components/admin/sections/analytics-section"
import { TeamManagementSection } from "./components/admin/sections/team-management-section"
import { TicketRouterSection } from "./components/admin/sections/ticket-router-section"
import { IntegrationsSection } from "./components/admin/sections/integrations-section"
import { AIInsightsSection } from "./components/admin/sections/ai-insights-section"

function DashboardContent() {
  const { activeSection } = useDashboard()

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return { title: "Admin Dashboard", subtitle: "Platform overview and management" }
      case "analytics":
        return { title: "Analytics", subtitle: "Detailed performance metrics and insights" }
      case "team-management":
        return { title: "Team Management", subtitle: "Monitor team performance and availability" }
      case "ticket-router":
        return { title: "Ticket Router", subtitle: "Manage and route support tickets efficiently" }
      case "integrations":
        return { title: "Integrations", subtitle: "Connect and manage external services" }
      case "ai-insights":
        return { title: "AI Insights", subtitle: "AI-powered recommendations and analytics" }
      default:
        return { title: "Admin Dashboard", subtitle: "Platform overview and management" }
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "analytics":
        return <AnalyticsSection />
      case "team-management":
        return <TeamManagementSection />
      case "ticket-router":
        return <TicketRouterSection />
      case "integrations":
        return <IntegrationsSection />
      case "ai-insights":
        return <AIInsightsSection />
      default:
        return <DashboardSection />
    }
  }

  const { title, subtitle } = getSectionTitle()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gray-950">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-900 px-4">
          <SidebarTrigger className="text-white hover:bg-gray-800" />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{renderSection()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
