"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import AddTicketModal from "@/components/add-ticket-modal"

export default function AddTicketButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Ticket</span>
      </button>

      <AddTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
