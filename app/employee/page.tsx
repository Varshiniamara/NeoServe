"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EmployeeLanding() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (isAuth && userRole === "employee") {
      router.replace("/dashboard/employee")
    } else {
      router.replace("/login/employee")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  )
} 