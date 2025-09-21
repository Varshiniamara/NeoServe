import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if accessing admin dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    const session = request.cookies.get("admin-session")

    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/auth/admin/login", request.url))
    }
  }

  // Check if accessing login while already authenticated
  if (request.nextUrl.pathname === "/auth/admin/login") {
    const session = request.cookies.get("admin-session")

    if (session && session.value === "authenticated") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/admin/:path*", "/auth/admin/login"],
}
