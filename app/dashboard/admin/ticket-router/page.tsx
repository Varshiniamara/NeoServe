import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Ticket, Clock, AlertTriangle, CheckCircle, User } from "lucide-react"
import { getTickets } from "./actions"
import AddTicketButton from "./add-ticket-button"

export default async function TicketRouterPage() {
  // Check authentication
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (!session || session.value !== "authenticated") {
    redirect("/auth/admin/login")
  }

  const tickets = await getTickets()
  const openTickets = tickets.filter((t) => t.status === "Open").length
  const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length
  const resolvedToday = tickets.filter((t) => t.status === "Resolved" && t.created.includes("hour")).length

  return (
    <AdminLayout title="Ticket Router" description="Manage ticket routing and assignment rules">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Open Tickets</p>
              <p className="text-2xl font-bold text-red-400">{openTickets}</p>
            </div>
            <Ticket className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-yellow-400">{inProgressTickets}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Resolved Today</p>
              <p className="text-2xl font-bold text-green-400">{resolvedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Avg Resolution</p>
              <p className="text-2xl font-bold text-blue-400">2.4h</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Tickets</h2>
            <AddTicketButton />
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {tickets.slice(0, 6).map((ticket) => (
              <div key={ticket.id} className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{ticket.title}</h3>
                    <p className="text-slate-400 text-sm">
                      #{ticket.id} • {ticket.customer}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.priority === "Critical"
                        ? "bg-red-600 text-red-100"
                        : ticket.priority === "High"
                          ? "bg-red-600 text-red-100"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-600 text-yellow-100"
                            : "bg-green-600 text-green-100"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        ticket.status === "Open"
                          ? "bg-blue-600 text-blue-100"
                          : ticket.status === "In Progress"
                            ? "bg-yellow-600 text-yellow-100"
                            : "bg-green-600 text-green-100"
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <span className="text-slate-400">{ticket.created}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <User className="w-4 h-4" />
                    <span>{ticket.assignedTo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
