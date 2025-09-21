"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Ticket,
  Search,
  Plus,
  Clock,
  User,
  MessageSquare,
  ArrowLeft,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import AddTicketModal from "@/components/add-ticket-modal"

interface TicketData {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "resolved"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  customer: string
  created_at: string
  updated_at: string
  comments: Array<{
    id: string
    author: string
    message: string
    timestamp: string
  }>
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null)
  const [newComment, setNewComment] = useState("")
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockTickets: TicketData[] = [
      {
        id: "TK-001",
        title: "Login Issues with Mobile App",
        description: "Customer unable to login to mobile application after recent update",
        status: "in_progress",
        priority: "high",
        category: "Technical",
        customer: "Alice Johnson",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-15T14:20:00Z",
        comments: [
          {
            id: "1",
            author: "John Doe",
            message: "Started investigating the issue. Checking server logs.",
            timestamp: "2024-01-15T11:00:00Z",
          },
          {
            id: "2",
            author: "Alice Johnson",
            message: "The error occurs specifically when trying to login with Google SSO.",
            timestamp: "2024-01-15T12:30:00Z",
          },
        ],
      },
      {
        id: "TK-002",
        title: "Email Configuration Help",
        description: "Need assistance setting up email forwarding for support tickets",
        status: "resolved",
        priority: "medium",
        category: "Configuration",
        customer: "Bob Smith",
        created_at: "2024-01-14T09:15:00Z",
        updated_at: "2024-01-14T16:45:00Z",
        comments: [
          {
            id: "3",
            author: "John Doe",
            message: "Configured email forwarding as requested. Please test and confirm.",
            timestamp: "2024-01-14T15:30:00Z",
          },
          {
            id: "4",
            author: "Bob Smith",
            message: "Working perfectly! Thank you for the quick resolution.",
            timestamp: "2024-01-14T16:45:00Z",
          },
        ],
      },
      {
        id: "TK-003",
        title: "Software Installation Request",
        description: "Request for installing new project management software",
        status: "pending",
        priority: "low",
        category: "Request",
        customer: "Carol Davis",
        created_at: "2024-01-13T14:20:00Z",
        updated_at: "2024-01-13T14:20:00Z",
        comments: [],
      },
      {
        id: "TK-004",
        title: "Database Performance Issues",
        description: "Slow query performance affecting user experience",
        status: "in_progress",
        priority: "urgent",
        category: "Technical",
        customer: "David Wilson",
        created_at: "2024-01-12T08:45:00Z",
        updated_at: "2024-01-15T09:30:00Z",
        comments: [
          {
            id: "5",
            author: "John Doe",
            message: "Identified the problematic queries. Working on optimization.",
            timestamp: "2024-01-12T10:15:00Z",
          },
        ],
      },
    ]

    setTimeout(() => {
      setTickets(mockTickets)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus as any } : ticket)),
    )
  }

  const addComment = (ticketId: string) => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: "John Doe", // Current user
      message: newComment,
      timestamp: new Date().toISOString(),
    }

    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, comments: [...ticket.comments, comment] } : ticket)),
    )

    setNewComment("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Ticket className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/employee" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <Ticket className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Tickets</h1>
              </div>
            </div>
            <Button onClick={() => setIsAddTicketModalOpen(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Ticket</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {filteredTickets.length} ticket{filteredTickets.length !== 1 ? "s" : ""}
              </h2>
            </div>

            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTicket?.id === ticket.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                      {getStatusIcon(ticket.status)}
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </div>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{ticket.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{ticket.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{ticket.customer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{ticket.comments.length} comments</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(ticket.updated_at)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTickets.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tickets found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Ticket Details */}
          <div className="lg:col-span-1">
            {selectedTicket ? (
              <Card className="sticky top-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{selectedTicket.id}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedTicket.status)}
                      <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription>{selectedTicket.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTicket.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Customer:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTicket.customer}</p>
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p className="text-gray-600 dark:text-gray-400">{formatDate(selectedTicket.created_at)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Updated:</span>
                      <p className="text-gray-600 dark:text-gray-400">{formatDate(selectedTicket.updated_at)}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <Select
                      value={selectedTicket.status}
                      onValueChange={(value) => updateTicketStatus(selectedTicket.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Comments ({selectedTicket.comments.length})</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedTicket.comments.map((comment) => (
                        <div key={comment.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{comment.message}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <Button
                        onClick={() => addComment(selectedTicket.id)}
                        disabled={!newComment.trim()}
                        size="sm"
                        className="w-full"
                      >
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a ticket</h3>
                  <p className="text-gray-500">Choose a ticket from the list to view details and add comments.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <AddTicketModal isOpen={isAddTicketModalOpen} onClose={() => setIsAddTicketModalOpen(false)} />
    </div>
  )
}
