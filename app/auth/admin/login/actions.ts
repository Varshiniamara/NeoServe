"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function adminLoginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Demo credentials validation
  if (email === "admin@company.com" && password === "admin123") {
    // Set authentication cookie
    const cookieStore = await cookies()
    cookieStore.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Redirect to admin dashboard
    redirect("/dashboard/admin")
  } else {
    return {
      error: "Invalid credentials. Please try again.",
    }
  }
}
