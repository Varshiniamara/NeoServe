"use client"

import type { Integration } from "./types"

interface CategoryFilterWithCountsProps {
  integrations: Integration[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilterWithCounts({
  integrations,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterWithCountsProps) {
  const categories = ["All", "Communication", "Project Management", "Email", "CRM", "Support", "Development"]

  const getCategoryCount = (category: string) => {
    if (category === "All") return integrations.length
    return integrations.filter((integration) => integration.category === category).length
  }

  return (
    <div className="mb-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const count = getCategoryCount(category)
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center space-x-2 ${
                category === selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <span>{category}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  category === selectedCategory ? "bg-blue-500 text-white" : "bg-slate-600 text-slate-300"
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
