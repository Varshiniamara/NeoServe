"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function TicketRouterSection() {
  const [tickets, setTickets] = useState([
    {
      id: "TK-001",
      title: "Login issues with 2FA",
      priority: "High",
      assignee: "Sarah Johnson",
      status: "In Progress",
      created: "2 hours ago",
    },
    {
      id: "TK-002",
      title: "Payment processing error",
      priority: "Critical",
      assignee: "Mike Chen",
      status: "Open",
      created: "1 hour ago",
    },
    {
      id: "TK-003",
      title: "Feature request: Dark mode",
      priority: "Low",
      assignee: "Emily Davis",
      status: "Resolved",
      created: "4 hours ago",
    },
    {
      id: "TK-004",
      title: "Account deletion request",
      priority: "Medium",
      assignee: "Alex Rodriguez",
      status: "Pending",
      created: "30 minutes ago",
    },
    {
      id: "TK-005",
      title: "API integration help",
      priority: "High",
      assignee: "Lisa Wang",
      status: "In Progress",
      created: "3 hours ago",
    },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: '',
    assignee: '',
    priority: '',
    status: 'Open'
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-900 text-red-300"
      case "High":
        return "bg-orange-900 text-orange-300"
      case "Medium":
        return "bg-yellow-900 text-yellow-300"
      case "Low":
        return "bg-green-900 text-green-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-900 text-blue-300"
      case "In Progress":
        return "bg-purple-900 text-purple-300"
      case "Pending":
        return "bg-yellow-900 text-yellow-300"
      case "Resolved":
        return "bg-green-900 text-green-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const handleCreateTicket = async () => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      })

      if (response.ok) {
        setDialogOpen(false)
        setNewTicket({
          title: '',
          assignee: '',
          priority: '',
          status: 'Open'
        })
        // You can add a toast notification here for success
      } else {
        // Handle error
        console.error('Failed to create ticket')
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  // Dynamic ticket stats
  const openTickets = tickets.filter(t => t.status === "Open").length
  const inProgressTickets = tickets.filter(t => t.status === "In Progress").length
  const pendingTickets = tickets.filter(t => t.status === "Pending").length
  const resolvedTodayTickets = tickets.filter(t => t.status === "Resolved").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Ticket Router</h2>
          <p className="text-gray-400">Manage and route support tickets efficiently</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Create Ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Title" value={newTicket.title} onChange={e => setNewTicket({ ...newTicket, title: e.target.value })} />
              <Input placeholder="Assignee" value={newTicket.assignee} onChange={e => setNewTicket({ ...newTicket, assignee: e.target.value })} />
              <Input placeholder="Priority" value={newTicket.priority} onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })} />
              <Input placeholder="Status" value={newTicket.status} onChange={e => setNewTicket({ ...newTicket, status: e.target.value })} />
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTicket} disabled={!newTicket.title || !newTicket.assignee}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Routing Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{openTickets}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{inProgressTickets}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{pendingTickets}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{resolvedTodayTickets}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 rounded bg-gray-800">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-white font-medium">{ticket.id}</p>
                    <p className="text-sm text-gray-400">{ticket.created}</p>
                  </div>
                  <div>
                    <p className="text-white">{ticket.title}</p>
                    <p className="text-sm text-gray-400">Assigned to {ticket.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                  <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
