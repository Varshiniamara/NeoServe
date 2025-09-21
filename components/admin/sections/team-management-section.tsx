"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function TeamManagementSection() {
  const [teamMembers, setTeamMembers] = useState([
    { name: "Sarah Johnson", role: "Senior Support Agent", status: "Online", tickets: 12, rating: 4.9 },
    { name: "Mike Chen", role: "Technical Specialist", status: "Busy", tickets: 8, rating: 4.8 },
    { name: "Emily Davis", role: "Support Agent", status: "Online", tickets: 15, rating: 4.7 },
    { name: "Alex Rodriguez", role: "Team Lead", status: "Away", tickets: 6, rating: 4.9 },
    { name: "Lisa Wang", role: "Support Agent", status: "Online", tickets: 11, rating: 4.6 },
  ])
  const [showModal, setShowModal] = useState(false)
  const [newMember, setNewMember] = useState({ name: "", role: "", status: "Online", tickets: 0, rating: 5 })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-900 text-green-300"
      case "Busy":
        return "bg-red-900 text-red-300"
      case "Away":
        return "bg-yellow-900 text-yellow-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, newMember])
    setShowModal(false)
    setNewMember({ name: "", role: "", status: "Online", tickets: 0, rating: 5 })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Team Management</h2>
          <p className="text-gray-400">Monitor team performance and availability</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowModal(true)}>Add Team Member</Button>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
            <Input placeholder="Role" value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} />
            <Input placeholder="Status" value={newMember.status} onChange={e => setNewMember({ ...newMember, status: e.target.value })} />
            <Input type="number" placeholder="Active Tickets" value={newMember.tickets} onChange={e => setNewMember({ ...newMember, tickets: Number(e.target.value) })} />
            <Input type="number" placeholder="Rating" value={newMember.rating} onChange={e => setNewMember({ ...newMember, rating: Number(e.target.value) })} />
          </div>
          <DialogFooter>
            <Button onClick={handleAddMember} disabled={!newMember.name || !newMember.role}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
            <p className="text-xs text-green-400">3 online, 1 busy, 1 away</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">52</div>
            <p className="text-xs text-blue-400">Average 10.4 per agent</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Team Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.8/5</div>
            <p className="text-xs text-green-400">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center justify-between p-4 rounded bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-white">{member.tickets}</p>
                    <p className="text-xs text-gray-400">Active tickets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-white">{member.rating}</p>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(member.status)}>
                    {member.status}
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
