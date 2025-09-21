"use client"

import { BarChart3, Users, Route, Puzzle, Brain, LogOut, Server, Home } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

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

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Team Management",
    url: "/dashboard/admin/team-management",
    icon: Users,
  },
  {
    title: "Ticket Router",
    url: "/dashboard/admin/ticket-router",
    icon: Route,
  },
  {
    title: "Integrations",
    url: "/dashboard/admin/integrations",
    icon: Puzzle,
  },
  {
    title: "AI Insights",
    url: "/dashboard/admin/ai-insights",
    icon: Brain,
  },
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  const handleLogout = () => {
    // Clear any stored auth data with safety check
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole")
      localStorage.removeItem("userName")
    }
    router.push("/")
  }

  return (
    <Sidebar className="border-r border-slate-700 bg-slate-900">
      <SidebarHeader className="border-b border-slate-700 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-600">
            <Server className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">NeoServe Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.url)}
                    isActive={pathname === item.url}
                    className="text-slate-300 hover:bg-slate-800 hover:text-white data-[active=true]:bg-slate-800 data-[active=true]:text-white cursor-pointer"
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
                  className="text-slate-300 hover:bg-red-900 hover:text-red-200 cursor-pointer mt-4"
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
