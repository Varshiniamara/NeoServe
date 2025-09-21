"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import AddRuleModal from "@/components/add-rule-modal"

export default function AddRuleButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Rule</span>
      </button>

      <AddRuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
