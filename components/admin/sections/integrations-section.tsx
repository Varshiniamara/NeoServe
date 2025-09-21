"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function IntegrationsSection() {
  const [integrations, setIntegrations] = useState([
    {
      name: "Slack",
      description: "Team notifications and alerts",
      icon: "S",
      color: "bg-purple-600",
      enabled: true,
      status: "Connected",
    },
    {
      name: "Jira",
      description: "Issue tracking and project management",
      icon: "J",
      color: "bg-blue-600",
      enabled: false,
      status: "Disconnected",
    },
    {
      name: "Outlook",
      description: "Email integration and notifications",
      icon: "O",
      color: "bg-orange-600",
      enabled: true,
      status: "Connected",
    },
    {
      name: "Zendesk",
      description: "Customer support platform",
      icon: "Z",
      color: "bg-green-600",
      enabled: true,
      status: "Connected",
    },
    {
      name: "GitHub",
      description: "Code repository and issue tracking",
      icon: "G",
      color: "bg-gray-600",
      enabled: false,
      status: "Disconnected",
    },
    {
      name: "Discord",
      description: "Community and team communication",
      icon: "D",
      color: "bg-indigo-600",
      enabled: true,
      status: "Connected",
    },
  ])
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: '',
    apiKey: '',
    webhookUrl: ''
  })

  const handleAddIntegration = async () => {
    try {
      const response = await fetch('/api/integrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIntegration),
      })

      if (response.ok) {
        setAddDialogOpen(false)
        setNewIntegration({
          name: '',
          type: '',
          apiKey: '',
          webhookUrl: ''
        })
        // You can add a toast notification here for success
      } else {
        console.error('Failed to add integration')
      }
    } catch (error) {
      console.error('Error adding integration:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Integrations</h2>
          <p className="text-gray-400">Connect and manage external services</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Add Integration</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Integration Name</Label>
                <Input 
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                  placeholder="e.g., Slack, Jira, etc."
                />
              </div>
              <div className="space-y-2">
                <Label>Integration Type</Label>
                <Input 
                  value={newIntegration.type}
                  onChange={(e) => setNewIntegration({...newIntegration, type: e.target.value})}
                  placeholder="e.g., chat, project management, etc."
                />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input 
                  type="password"
                  value={newIntegration.apiKey}
                  onChange={(e) => setNewIntegration({...newIntegration, apiKey: e.target.value})}
                  placeholder="Enter API key"
                />
              </div>
              <div className="space-y-2">
                <Label>Webhook URL (Optional)</Label>
                <Input 
                  value={newIntegration.webhookUrl}
                  onChange={(e) => setNewIntegration({...newIntegration, webhookUrl: e.target.value})}
                  placeholder="Enter webhook URL"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleAddIntegration}>Add Integration</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Integration Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">6</div>
            <p className="text-xs text-blue-400">4 active, 2 inactive</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Data Synced Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1.2k</div>
            <p className="text-xs text-green-400">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">847</div>
            <p className="text-xs text-gray-400">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Available Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 rounded bg-gray-800">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded ${integration.color} flex items-center justify-center text-white font-bold`}
                  >
                    {integration.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{integration.name}</p>
                    <p className="text-sm text-gray-400">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className={integration.enabled ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}
                  >
                    {integration.status}
                  </Badge>
                  <Switch defaultChecked={integration.enabled} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
