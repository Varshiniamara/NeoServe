"use client"

import React from "react"

import { supabase } from "./supabase"
import { trackEvent } from "./monitoring"

export class RealtimeManager {
  private static instance: RealtimeManager
  private subscriptions: Map<string, any> = new Map()

  static getInstance(): RealtimeManager {
    if (!RealtimeManager.instance) {
      RealtimeManager.instance = new RealtimeManager()
    }
    return RealtimeManager.instance
  }

  // Subscribe to ticket updates
  subscribeToTickets(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`tickets:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tickets",
          filter: `assigned_to=eq.${userId}`,
        },
        (payload) => {
          trackEvent("realtime_ticket_update", {
            event: payload.eventType,
            ticketId: payload.new?.id || payload.old?.id,
          })
          callback(payload)
        },
      )
      .subscribe()

    this.subscriptions.set(`tickets:${userId}`, channel)
    return channel
  }

  // Subscribe to notifications
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          trackEvent("realtime_notification", {
            type: payload.new.type,
            userId,
          })
          callback(payload)

          // Show browser notification if permission granted
          if (typeof window !== "undefined" && Notification.permission === "granted") {
            new Notification(payload.new.title, {
              body: payload.new.message,
              icon: "/favicon.ico",
            })
          }
        },
      )
      .subscribe()

    this.subscriptions.set(`notifications:${userId}`, channel)
    return channel
  }

  // Subscribe to team mood updates (for admins)
  subscribeToTeamMood(callback: (payload: any) => void) {
    const channel = supabase
      .channel("team_mood")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mood_entries",
        },
        (payload) => {
          trackEvent("realtime_mood_update", {
            mood: payload.new.mood_value,
            userId: payload.new.user_id,
          })
          callback(payload)
        },
      )
      .subscribe()

    this.subscriptions.set("team_mood", channel)
    return channel
  }

  // Unsubscribe from specific channel
  unsubscribe(channelName: string) {
    const channel = this.subscriptions.get(channelName)
    if (channel) {
      supabase.removeChannel(channel)
      this.subscriptions.delete(channelName)
    }
  }

  // Unsubscribe from all channels
  unsubscribeAll() {
    this.subscriptions.forEach((channel, name) => {
      supabase.removeChannel(channel)
    })
    this.subscriptions.clear()
  }
}

// React hook for real-time subscriptions
export function useRealtime(userId: string) {
  const [isConnected, setIsConnected] = React.useState(false)
  const realtimeManager = React.useRef(RealtimeManager.getInstance())

  React.useEffect(() => {
    setIsConnected(true)

    return () => {
      realtimeManager.current.unsubscribeAll()
      setIsConnected(false)
    }
  }, [userId])

  return {
    isConnected,
    subscribeToTickets: (callback: (payload: any) => void) =>
      realtimeManager.current.subscribeToTickets(userId, callback),
    subscribeToNotifications: (callback: (payload: any) => void) =>
      realtimeManager.current.subscribeToNotifications(userId, callback),
    subscribeToTeamMood: (callback: (payload: any) => void) => realtimeManager.current.subscribeToTeamMood(callback),
    unsubscribe: (channelName: string) => realtimeManager.current.unsubscribe(channelName),
  }
}
