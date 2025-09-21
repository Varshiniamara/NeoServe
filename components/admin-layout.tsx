import type React from "react"
import Link from "next/link"
import { BarChart3, Users, Ticket, Settings, Brain, LogOut, Zap } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

async function logoutAction() {
  "use server"
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
  const { redirect } = await import("next/navigation")
  redirect("/auth/admin/login")
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const navigationItems = [
    { href: "/dashboard/admin", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/admin/team-management", icon: Users, label: "Team Management" },
    { href: "/dashboard/admin/ticket-router", icon: Ticket, label: "Ticket Router" },
    { href: "/dashboard/admin/integrations", icon: Settings, label: "Integrations" },
    { href: "/dashboard/admin/ai-insights", icon: Brain, label: "AI Insights" },
  ]

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">NeoServe Admin</h1>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 px-4">
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-slate-400">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
