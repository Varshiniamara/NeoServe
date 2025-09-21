"use client"

import type React from "react"
import { useState } from "react"
import { X, UserPlus } from "lucide-react"
import { addTeamMember } from "@/app/dashboard/admin/team-management/actions"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
]

export default function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [phoneNumber, setPhoneNumber] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    // Combine country code with phone number
    const fullPhoneNumber = phoneNumber ? `${selectedCountry.code} ${phoneNumber}` : ""
    formData.set("phone", fullPhoneNumber)

    try {
      const result = await addTeamMember(formData)
      if (result.success) {
        onClose()
        // Reset form
        setPhoneNumber("")
        setSelectedCountry(countries[0])
      }
    } catch (error) {
      console.error("Error adding member:", error)
      setError("Failed to add member. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Add Team Member</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-600 bg-opacity-20 border border-red-600 text-red-100 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
              Role *
            </label>
            <select
              id="role"
              name="role"
              required
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a role</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Senior Agent">Senior Agent</option>
              <option value="Support Agent">Support Agent</option>
              <option value="Technical Specialist">Technical Specialist</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
              Department *
            </label>
            <select
              id="department"
              name="department"
              required
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a department</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Sales">Sales</option>
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number
            </label>
            <div className="flex space-x-2">
              {/* Country Selector */}
              <div className="relative">
                <select
                  value={`${selectedCountry.code}-${selectedCountry.name}`}
                  onChange={(e) => {
                    const [code, ...nameParts] = e.target.value.split("-")
                    const name = nameParts.join("-")
                    const country = countries.find((c) => c.code === code && c.name === name)
                    if (country) setSelectedCountry(country)
                  }}
                  className="w-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={`${country.code}-${country.name}`}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number Input */}
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123-456-7890"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Selected: {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.code})
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
