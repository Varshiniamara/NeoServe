import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Settings, CheckCircle, XCircle } from "lucide-react"

export default async function IntegrationsPage() {
  // Check authentication
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (!session || session.value !== "authenticated") {
    redirect("/auth/admin/login")
  }

  const integrations = [
    {
      id: 1,
      name: "Slack",
      description: "Team notifications and alerts",
      category: "Communication",
      status: "Connected",
      icon: "S",
      color: "bg-purple-500",
      lastSync: "2 minutes ago",
    },
    {
      id: 2,
      name: "Jira",
      description: "Issue tracking and project management",
      category: "Project Management",
      status: "Disconnected",
      icon: "J",
      color: "bg-blue-500",
      lastSync: "Never",
    },
    {
      id: 3,
      name: "Outlook",
      description: "Email integration and calendar sync",
      category: "Email",
      status: "Connected",
      icon: "O",
      color: "bg-orange-500",
      lastSync: "5 minutes ago",
    },
    {
      id: 4,
      name: "Salesforce",
      description: "CRM integration and customer data",
      category: "CRM",
      status: "Connected",
      icon: "SF",
      color: "bg-blue-600",
      lastSync: "1 hour ago",
    },
  ]

  const connectedIntegrations = integrations.filter((i) => i.status === "Connected").length
  const disconnectedIntegrations = integrations.filter((i) => i.status === "Disconnected").length

  return (
    <AdminLayout title="Integrations" description="Manage external service connections and APIs">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Integrations</p>
              <p className="text-2xl font-bold text-white">{integrations.length}</p>
            </div>
            <Settings className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Connected</p>
              <p className="text-2xl font-bold text-green-400">{connectedIntegrations}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Issues</p>
              <p className="text-2xl font-bold text-red-400">{disconnectedIntegrations}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">API Calls Today</p>
              <p className="text-2xl font-bold text-purple-400">12.4K</p>
            </div>
            <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-xs font-bold">API</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Available Integrations</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div key={integration.id} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold">{integration.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{integration.name}</h3>
                      <p className="text-slate-400 text-sm">{integration.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        integration.status === "Connected" ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-medium ${
                        integration.status === "Connected" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {integration.status}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-4">{integration.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span>Last sync: {integration.lastSync}</span>
                </div>

                <div className="flex space-x-2">
                  {integration.status === "Connected" ? (
                    <>
                      <button className="flex-1 bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded text-sm transition-colors">
                        Configure
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

