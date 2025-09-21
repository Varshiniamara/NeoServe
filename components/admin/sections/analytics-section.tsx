"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AnalyticsSection() {
  const analyticsData = [
    { metric: "Total Tickets", value: "1,247", change: "+12.5%", trend: "up" },
    { metric: "Resolution Rate", value: "94.2%", change: "+2.1%", trend: "up" },
    { metric: "First Response Time", value: "1.2h", change: "-0.3h", trend: "down" },
    { metric: "Customer Satisfaction", value: "4.7/5", change: "+0.1", trend: "up" },
  ]

  const topIssues = [
    { issue: "Login Problems", count: 45, severity: "High" },
    { issue: "Payment Issues", count: 32, severity: "Critical" },
    { issue: "Feature Requests", count: 28, severity: "Medium" },
    { issue: "Bug Reports", count: 23, severity: "High" },
    { issue: "Account Setup", count: 19, severity: "Low" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-400">Detailed performance metrics and insights</p>
      </div>

      {/* Analytics Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item) => (
          <Card key={item.metric} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{item.metric}</CardTitle>
              <div className={`text-xs ${item.trend === "up" ? "text-green-400" : "text-orange-400"}`}>
                {item.change}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Issues */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Top Issues This Week</CardTitle>
          <p className="text-sm text-gray-400">Most reported problems by customers</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topIssues.map((issue, index) => (
              <div key={issue.issue} className="flex items-center justify-between p-3 rounded bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                  <div>
                    <p className="text-white font-medium">{issue.issue}</p>
                    <p className="text-sm text-gray-400">{issue.count} reports</p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    issue.severity === "Critical"
                      ? "bg-red-900 text-red-300"
                      : issue.severity === "High"
                        ? "bg-orange-900 text-orange-300"
                        : issue.severity === "Medium"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-green-900 text-green-300"
                  }
                >
                  {issue.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
