import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Brain, Zap, Target, Clock } from "lucide-react"

export default async function AIInsightsPage() {
  // Check authentication
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (!session || session.value !== "authenticated") {
    redirect("/auth/admin/login")
  }

  return (
    <AdminLayout title="AI Insights" description="AI-powered analytics and recommendations">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">AI Accuracy</p>
              <p className="text-2xl font-bold text-green-400">94.2%</p>
            </div>
            <Target className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Insights Generated</p>
              <p className="text-2xl font-bold text-blue-400">127</p>
            </div>
            <Brain className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Actions Applied</p>
              <p className="text-2xl font-bold text-purple-400">89</p>
            </div>
            <Zap className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Time Saved</p>
              <p className="text-2xl font-bold text-orange-400">23.4h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Latest AI Insights</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-blue-600 text-blue-100 px-2 py-1 rounded">Performance</span>
                    <span className="text-xs bg-red-600 text-red-100 px-2 py-1 rounded">High Impact</span>
                  </div>
                  <h3 className="text-white font-medium">Response Time Optimization</h3>
                  <p className="text-slate-300 text-sm mt-1">
                    AI detected 23% improvement opportunity in ticket routing efficiency
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">94%</div>
                  <div className="text-slate-400 text-xs">confidence</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Implement suggested routing rules</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">Pending</span>
                  <span className="text-slate-400 text-xs">2-3 days</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-blue-600 text-blue-100 px-2 py-1 rounded">Customer Satisfaction</span>
                    <span className="text-xs bg-yellow-600 text-yellow-100 px-2 py-1 rounded">Medium Impact</span>
                  </div>
                  <h3 className="text-white font-medium">Proactive Issue Resolution</h3>
                  <p className="text-slate-300 text-sm mt-1">
                    Pattern detected: 67% of billing issues can be auto-resolved
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">87%</div>
                  <div className="text-slate-400 text-xs">confidence</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Enable auto-resolution for billing queries</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">Applied</span>
                  <span className="text-slate-400 text-xs">Immediate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
