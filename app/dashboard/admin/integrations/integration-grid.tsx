"use client"

import { useState } from "react"
import type { Integration } from "./types"
import IntegrationCard from "./integration-card"
import CategoryFilterWithCounts from "./category-filter-with-counts"

interface IntegrationsGridProps {
  integrations: Integration[]
}

export default function IntegrationsGrid({ integrations }: IntegrationsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredIntegrations =
    selectedCategory === "All"
      ? integrations
      : integrations.filter((integration) => integration.category === selectedCategory)

  return (
    <div>
      <CategoryFilterWithCounts
        integrations={integrations}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Results counter */}
      <div className="mb-4">
        <p className="text-slate-400 text-sm">
          Showing {filteredIntegrations.length} of {integrations.length} integrations
          {selectedCategory !== "All" && (
            <span className="ml-2 px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs">{selectedCategory}</span>
          )}
        </p>
      </div>

      {/* Integrations Grid */}
      {filteredIntegrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg mb-2">No integrations found</div>
          <p className="text-slate-500 text-sm">No integrations match the selected category "{selectedCategory}"</p>
        </div>
      )}
    </div>
  )
}
