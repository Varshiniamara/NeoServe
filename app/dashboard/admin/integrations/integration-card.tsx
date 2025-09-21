"use client"

import { useState } from "react"
import { CheckCircle, Plus, ExternalLink, Settings, Loader2 } from "lucide-react"
import type { Integration } from "./actions"
import {
  connectIntegration,
  disconnectIntegration,
  reconnectIntegration,
  configureIntegration,
  completeSetup,
} from "./actions"

interface IntegrationCardProps {
  integration: Integration
}

export default function IntegrationCard({ integration }: IntegrationCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleAction = async (action: () => Promise<any>, actionName: string) => {
    setIsLoading(true)
    setMessage(null)
    try {
      const result = await action()
      setMessage(result.message)
      setTimeout(() => setMessage(null), 3000) // Clear message after 3 seconds
    } catch (error) {
      console.error(`Error ${actionName}:`, error)
      setMessage(`Failed to ${actionName}. Please try again.`)
      setTimeout(() => setMessage(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = () => handleAction(() => connectIntegration(integration.id), "connect")
  const handleDisconnect = () => {
    if (confirm(`Are you sure you want to disconnect ${integration.name}?`)) {
      handleAction(() => disconnectIntegration(integration.id), "disconnect")
    }
  }
  const handleReconnect = () => handleAction(() => reconnectIntegration(integration.id), "reconnect")
  const handleConfigure = () => handleAction(() => configureIntegration(integration.id), "configure")
  const handleCompleteSetup = () => handleAction(() => completeSetup(integration.id), "complete setup")

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold">{integration.icon}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{integration.name}</h3>
            <p className="text-slate-400 text-sm">{integration.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              integration.status === "Connected"
                ? "bg-green-400"
                : integration.status === "Pending"
                  ? "bg-yellow-400 animate-pulse"
                  : integration.status === "Disconnected"
                    ? "bg-red-400"
                    : "bg-slate-400"
            }`}
          ></div>
          <span
            className={`text-xs font-medium ${
              integration.status === "Connected"
                ? "text-green-400"
                : integration.status === "Pending"
                  ? "text-yellow-400"
                  : integration.status === "Disconnected"
                    ? "text-red-400"
                    : "text-slate-400"
            }`}
          >
            {integration.status}
          </span>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-4">{integration.description}</p>

      <div className="mb-4">
        <p className="text-slate-400 text-xs mb-2">Features:</p>
        <div className="space-y-1">
          {integration.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span className="text-slate-300 text-xs">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
        <span>Last sync: {integration.lastSync}</span>
        <ExternalLink className="w-3 h-3" />
      </div>

      {/* Status Message */}
      {message && (
        <div className="mb-4 p-2 bg-blue-600 bg-opacity-20 border border-blue-600 text-blue-100 rounded text-xs">
          {message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {integration.status === "Connected" ? (
          <>
            <button
              onClick={handleConfigure}
              disabled={isLoading}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
            >
              {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Settings className="w-3 h-3" />}
              <span>Configure</span>
            </button>
            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Disconnect
            </button>
          </>
        ) : integration.status === "Available" ? (
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>{isLoading ? "Connecting..." : "Connect"}</span>
          </button>
        ) : integration.status === "Pending" ? (
          <button
            onClick={handleCompleteSetup}
            disabled={isLoading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
            <span>{isLoading ? "Setting up..." : "Complete Setup"}</span>
          </button>
        ) : (
          <button
            onClick={handleReconnect}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
            <span>{isLoading ? "Reconnecting..." : "Reconnect"}</span>
          </button>
        )}
      </div>
    </div>
  )
}
