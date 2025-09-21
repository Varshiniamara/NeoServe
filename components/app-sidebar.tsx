"use client"

import type * as React from "react"
import { BarChart3, Users, Route, Puzzle, Brain, LogOut, Server, Home } from "lucide-react"
import { useDashboard } from "../lib/dashboard-context"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Navigation items with proper data
const navigationItems = [
  {
    id: "dashboard" as const,
    title: "Dashboard",
    icon: Home,
  },
  {
    id: "analytics" as const,
    title: "Analytics",
    icon: BarChart3,
  },
  {
    id: "team-management" as const,
    title: "Team Management",
    icon: Users,
  },
  {
    id: "ticket-router" as const,
    title: "Ticket Router",
    icon: Route,
  },
  {
    id: "integrations" as const,
    title: "Integrations",
    icon: Puzzle,
  },
  {
    id: "ai-insights" as const,
    title: "AI Insights",
    icon: Brain,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeSection, setActiveSection } = useDashboard()

  const handleNavigation = (sectionId: (typeof navigationItems)[0]["id"]) => {
    setActiveSection(sectionId)
  }

  const handleLogout = () => {
    // Simulate logout
    alert("Logging out...")
  }

  return (
    <Sidebar {...props} className="border-r border-gray-800 bg-gray-900">
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-600">
            <Server className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">NeoServe Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.id)}
                    isActive={activeSection === item.id}
                    className="text-gray-300 hover:bg-gray-800 hover:text-white data-[active=true]:bg-gray-800 data-[active=true]:text-white cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout button */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-red-900 hover:text-red-200 cursor-pointer mt-4"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
