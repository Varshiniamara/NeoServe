"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import AddMemberModal from "@/components/add-member-modal"

export default function AddMemberButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span>Add Member</span>
      </button>

      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

