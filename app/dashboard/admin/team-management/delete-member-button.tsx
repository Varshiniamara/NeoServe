"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { deleteTeamMember } from "./actions"

interface DeleteMemberButtonProps {
  memberId: number
  memberName: string
}

export default function DeleteMemberButton({ memberId, memberName }: DeleteMemberButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to remove ${memberName}?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteTeamMember(memberId)
    } catch (error) {
      console.error("Error deleting member:", error)
      alert("Failed to delete member. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
