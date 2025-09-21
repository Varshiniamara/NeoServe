"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export function DashboardSection() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">SLA Compliance</CardTitle>
            <div className="text-xs text-green-400">+2.1% from last week</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">92.5%</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">CSAT Score</CardTitle>
            <div className="text-xs text-blue-400">+0.2 from last month</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">4.6/5</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Resolution Time</CardTitle>
            <div className="text-xs text-orange-400">-0.3h improvement</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">2.4h</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Tickets</CardTitle>
            <div className="text-xs text-red-400">12 high priority</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">47</div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status and AI Suggestions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Integration Status</CardTitle>
            <p className="text-sm text-gray-400">Manage external service connections</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  S
                </div>
                <div>
                  <p className="text-white font-medium">Slack</p>
                  <p className="text-sm text-gray-400">Team notifications</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  J
                </div>
                <div>
                  <p className="text-white font-medium">Jira</p>
                  <p className="text-sm text-gray-400">Issue tracking</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center text-white text-sm font-bold">
                  O
                </div>
                <div>
                  <p className="text-white font-medium">Outlook</p>
                  <p className="text-sm text-gray-400">Email integration</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">AI Suggestions Log</CardTitle>
            <p className="text-sm text-gray-400">Recent AI-powered recommendations</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded bg-gray-800">
              <div>
                <p className="text-sm text-white">Route ticket TK-001 to Level 2 support</p>
                <p className="text-xs text-gray-400">10:30 AM</p>
              </div>
              <Badge variant="secondary" className="bg-green-900 text-green-300">
                Applied
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-gray-800">
              <div>
                <p className="text-sm text-white">Escalate customer complaint CC-045</p>
                <p className="text-xs text-gray-400">11:15 AM</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-900 text-yellow-300">
                Pending
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-gray-800">
              <div>
                <p className="text-sm text-white">Auto-resolve password reset PR-123</p>
                <p className="text-xs text-gray-400">12:00 PM</p>
              </div>
              <Badge variant="secondary" className="bg-green-900 text-green-300">
                Applied
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
