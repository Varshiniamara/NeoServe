"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Ticket } from "@/lib/supabase"

export function useRealtimeTickets(userId?: string) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    const fetchTickets = async () => {
      let query = supabase.from("tickets").select(`
          *,
          assigned_user:users!tickets_assigned_to_fkey(name, email),
          customer:users!tickets_customer_id_fkey(name, email)
        `)

      if (userId) {
        query = query.eq("assigned_to", userId)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (!error && data) {
        setTickets(data)
      }
      setLoading(false)
    }

    fetchTickets()

    // Set up real-time subscription
    const subscription = supabase
      .channel("tickets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tickets",
          ...(userId && { filter: `assigned_to=eq.${userId}` }),
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTickets((prev) => [payload.new as Ticket, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setTickets((prev) =>
              prev.map((ticket) => (ticket.id === payload.new.id ? (payload.new as Ticket) : ticket)),
            )
          } else if (payload.eventType === "DELETE") {
            setTickets((prev) => prev.filter((ticket) => ticket.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  return { tickets, loading }
}
