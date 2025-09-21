import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Users, Crown, Shield, User, Edit } from "lucide-react"
import { getTeamMembers } from "./actions"
import AddMemberButton from "./add-member-button"
import DeleteMemberButton from "./delete-member-button"

export default async function TeamManagementPage() {
  // Check authentication
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (!session || session.value !== "authenticated") {
    redirect("/auth/admin/login")
  }

  const teamMembers = await getTeamMembers()
  const activeMembers = teamMembers.filter((member) => member.status === "Active").length
  const totalTicketsResolved = teamMembers.reduce((sum, member) => sum + member.ticketsResolved, 0)
  const avgTicketsPerMember = Math.round(totalTicketsResolved / teamMembers.length)

  return (
    <AdminLayout title="Team Management" description="Manage team members and their roles">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Now</p>
              <p className="text-2xl font-bold text-green-400">{activeMembers}</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Avg Tickets/Member</p>
              <p className="text-2xl font-bold text-orange-400">{avgTicketsPerMember}</p>
            </div>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-xs font-bold">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Team Satisfaction</p>
              <p className="text-2xl font-bold text-purple-400">4.8/5</p>
            </div>
            <div className="text-yellow-400">⭐</div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Team Members</h2>
            <AddMemberButton />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-300 font-medium">Member</th>
                <th className="text-left p-4 text-slate-300 font-medium">Role</th>
                <th className="text-left p-4 text-slate-300 font-medium">Department</th>
                <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                <th className="text-left p-4 text-slate-300 font-medium">Performance</th>
                <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-slate-400 text-sm">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {member.role === "Team Lead" && <Crown className="w-4 h-4 text-yellow-400" />}
                      {member.role === "Senior Agent" && <Shield className="w-4 h-4 text-blue-400" />}
                      {member.role === "Support Agent" && <User className="w-4 h-4 text-slate-400" />}
                      {member.role === "Technical Specialist" && <Shield className="w-4 h-4 text-purple-400" />}
                      <span className="text-white">{member.role}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{member.department}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === "Active" ? "bg-green-600 text-green-100" : "bg-yellow-600 text-yellow-100"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">{member.ticketsResolved}</p>
                      <p className="text-slate-400 text-xs">tickets resolved</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-slate-400 hover:text-blue-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <DeleteMemberButton memberId={member.id} memberName={member.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
