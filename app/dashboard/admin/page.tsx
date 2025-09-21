import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { TrendingUp, Clock, AlertCircle, CheckCircle } from "lucide-react"

export default async function AdminDashboard() {
  // Check authentication
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (!session || session.value !== "authenticated") {
    redirect("/auth/admin/login")
  }

  return (
    <AdminLayout title="Admin Dashboard" description="Platform overview and management">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 text-sm font-medium">SLA Compliance</h3>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-1">92.5%</div>
          <p className="text-xs text-slate-400">+2.1% from last week</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 text-sm font-medium">CSAT Score</h3>
            <CheckCircle className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">4.6/5</div>
          <p className="text-xs text-slate-400">+0.2 from last month</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 text-sm font-medium">Avg Resolution Time</h3>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-orange-400 mb-1">2.4h</div>
          <p className="text-xs text-slate-400">-0.3h improvement</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 text-sm font-medium">Active Tickets</h3>
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400 mb-1">47</div>
          <p className="text-xs text-slate-400">12 high priority</p>
        </div>
      </div>

      {/* Charts and Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* SLA Compliance Trend */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-2">SLA Compliance Trend</h3>
          <p className="text-slate-400 text-sm mb-6">Weekly performance overview</p>
          <div className="h-48 flex items-end justify-between space-x-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={day} className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-green-400 rounded-t" style={{ height: `${Math.random() * 120 + 40}px` }}></div>
                <span className="text-xs text-slate-400">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-2">Customer Satisfaction</h3>
          <p className="text-slate-400 text-sm mb-6">Monthly CSAT scores</p>
          <div className="h-48 flex items-end justify-between space-x-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
              <div key={month} className="flex flex-col items-center space-y-2">
                <div className="w-12 bg-blue-400 rounded-t" style={{ height: `${Math.random() * 100 + 60}px` }}></div>
                <span className="text-xs text-slate-400">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integration Status */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-2">Integration Status</h3>
          <p className="text-slate-400 text-sm mb-6">Manage external service connections</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div>
                  <p className="text-white font-medium">Slack</p>
                  <p className="text-slate-400 text-sm">Team notifications</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">J</span>
                </div>
                <div>
                  <p className="text-white font-medium">Jira</p>
                  <p className="text-slate-400 text-sm">Issue tracking</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Log */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-2">AI Suggestions Log</h3>
          <p className="text-slate-400 text-sm mb-6">Recent AI-powered recommendations</p>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <p className="text-white text-sm">Route ticket TK-001 to Level 2 support</p>
                <p className="text-slate-400 text-xs">10:30 AM</p>
              </div>
              <span className="px-2 py-1 bg-green-600 text-green-100 text-xs rounded">Applied</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <p className="text-white text-sm">Escalate customer complaint CC-045</p>
                <p className="text-slate-400 text-xs">11:15 AM</p>
              </div>
              <span className="px-2 py-1 bg-yellow-600 text-yellow-100 text-xs rounded">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
