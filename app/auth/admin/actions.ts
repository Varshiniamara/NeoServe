"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Demo credentials validation
  if (email === "admin@company.com" && password === "admin123") {
    // Set authentication cookie/session
    const cookieStore = await cookies()
    cookieStore.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Redirect to dashboard
    redirect("/dashboard")
  } else {
    // Return error for invalid credentials
    return {
      error: "Invalid credentials. Please try again.",
    }
  }
}
