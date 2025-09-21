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
  
  // Re-export the Integration type from actions
  export type { Integration } from "./actions"
  