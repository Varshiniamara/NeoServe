"use server"

import { revalidatePath } from "next/cache"

export interface Integration {
  id: number
  name: string
  description: string
  category: string
  status: string
  icon: string
  color: string
  lastSync: string
  features: string[]
}

// In a real app, this would be stored in a database
const integrations: Integration[] = [
  {
    id: 1,
    name: "Slack",
    description: "Team notifications and alerts",
    category: "Communication",
    status: "Connected",
    icon: "S",
    color: "bg-purple-500",
    lastSync: "2 minutes ago",
    features: ["Real-time notifications", "Channel routing", "Bot commands"],
  },
  {
    id: 2,
    name: "Jira",
    description: "Issue tracking and project management",
    category: "Project Management",
    status: "Disconnected",
    icon: "J",
    color: "bg-blue-500",
    lastSync: "Never",
    features: ["Ticket sync", "Status updates", "Custom fields"],
  },
  {
    id: 3,
    name: "Outlook",
    description: "Email integration and calendar sync",
    category: "Email",
    status: "Connected",
    icon: "O",
    color: "bg-orange-500",
    lastSync: "5 minutes ago",
    features: ["Email tickets", "Calendar integration", "Contact sync"],
  },
  {
    id: 4,
    name: "Salesforce",
    description: "CRM integration and customer data",
    category: "CRM",
    status: "Connected",
    icon: "SF",
    color: "bg-blue-600",
    lastSync: "1 hour ago",
    features: ["Customer sync", "Lead tracking", "Sales pipeline"],
  },
  {
    id: 5,
    name: "Zendesk",
    description: "Customer support platform integration",
    category: "Support",
    status: "Pending",
    icon: "Z",
    color: "bg-green-500",
    lastSync: "Configuring",
    features: ["Ticket migration", "Agent sync", "Knowledge base"],
  },
  {
    id: 6,
    name: "GitHub",
    description: "Code repository and issue tracking",
    category: "Development",
    status: "Available",
    icon: "GH",
    color: "bg-gray-600",
    lastSync: "Not connected",
    features: ["Issue sync", "PR notifications", "Code reviews"],
  },
  {
    id: 7,
    name: "Microsoft Teams",
    description: "Team collaboration and communication",
    category: "Communication",
    status: "Available",
    icon: "MT",
    color: "bg-blue-500",
    lastSync: "Not connected",
    features: ["Team notifications", "File sharing", "Video calls"],
  },
  {
    id: 8,
    name: "Trello",
    description: "Project management and task tracking",
    category: "Project Management",
    status: "Available",
    icon: "T",
    color: "bg-blue-400",
    lastSync: "Not connected",
    features: ["Board sync", "Card updates", "Team collaboration"],
  },
  {
    id: 9,
    name: "Gmail",
    description: "Email integration and automation",
    category: "Email",
    status: "Available",
    icon: "G",
    color: "bg-red-500",
    lastSync: "Not connected",
    features: ["Email automation", "Label management", "Thread tracking"],
  },
  {
    id: 10,
    name: "HubSpot",
    description: "Marketing and sales CRM platform",
    category: "CRM",
    status: "Available",
    icon: "H",
    color: "bg-orange-600",
    lastSync: "Not connected",
    features: ["Contact management", "Deal tracking", "Marketing automation"],
  },
  {
    id: 11,
    name: "Freshdesk",
    description: "Customer support and helpdesk solution",
    category: "Support",
    status: "Available",
    icon: "FD",
    color: "bg-green-600",
    lastSync: "Not connected",
    features: ["Ticket management", "Customer portal", "Automation rules"],
  },
  {
    id: 12,
    name: "GitLab",
    description: "DevOps platform and code repository",
    category: "Development",
    status: "Available",
    icon: "GL",
    color: "bg-orange-500",
    lastSync: "Not connected",
    features: ["CI/CD pipelines", "Issue tracking", "Code reviews"],
  },
]

export async function getIntegrations(): Promise<Integration[]> {
  return integrations
}

export async function connectIntegration(integrationId: number) {
  try {
    const integration = integrations.find((i) => i.id === integrationId)
    if (!integration) {
      throw new Error("Integration not found")
    }

    // Simulate connection process
    integration.status = "Pending"
    integration.lastSync = "Connecting..."

    // Simulate async connection
    setTimeout(() => {
      integration.status = "Connected"
      integration.lastSync = "Just now"
    }, 2000)

    revalidatePath("/dashboard/admin/integrations")
    return { success: true, message: `${integration.name} connection initiated` }
  } catch (error) {
    console.error("Error connecting integration:", error)
    throw error
  }
}

export async function disconnectIntegration(integrationId: number) {
  try {
    const integration = integrations.find((i) => i.id === integrationId)
    if (!integration) {
      throw new Error("Integration not found")
    }

    integration.status = "Disconnected"
    integration.lastSync = "Disconnected"

    revalidatePath("/dashboard/admin/integrations")
    return { success: true, message: `${integration.name} has been disconnected` }
  } catch (error) {
    console.error("Error disconnecting integration:", error)
    throw error
  }
}

export async function reconnectIntegration(integrationId: number) {
  try {
    const integration = integrations.find((i) => i.id === integrationId)
    if (!integration) {
      throw new Error("Integration not found")
    }

    integration.status = "Pending"
    integration.lastSync = "Reconnecting..."

    // Simulate async reconnection
    setTimeout(() => {
      integration.status = "Connected"
      integration.lastSync = "Just now"
    }, 2000)

    revalidatePath("/dashboard/admin/integrations")
    return { success: true, message: `${integration.name} reconnection initiated` }
  } catch (error) {
    console.error("Error reconnecting integration:", error)
    throw error
  }
}

export async function configureIntegration(integrationId: number) {
  try {
    const integration = integrations.find((i) => i.id === integrationId)
    if (!integration) {
      throw new Error("Integration not found")
    }

    // In a real app, this would redirect to a configuration page
    // For now, we'll just update the last sync time
    integration.lastSync = "Just configured"

    revalidatePath("/dashboard/admin/integrations")
    return { success: true, message: `${integration.name} configuration updated` }
  } catch (error) {
    console.error("Error configuring integration:", error)
    throw error
  }
}

export async function completeSetup(integrationId: number) {
  try {
    const integration = integrations.find((i) => i.id === integrationId)
    if (!integration) {
      throw new Error("Integration not found")
    }

    integration.status = "Connected"
    integration.lastSync = "Just now"

    revalidatePath("/dashboard/admin/integrations")
    return { success: true, message: `${integration.name} setup completed` }
  } catch (error) {
    console.error("Error completing setup:", error)
    throw error
  }
}
