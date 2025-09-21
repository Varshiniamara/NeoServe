import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

async function logoutAction() {
  "use server"
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
  redirect("/auth/admin/login")
}

export default async function DashboardPage() {
  // Check if user is authenticated
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")

  if (!session || session.value !== "authenticated") {
    redirect("/auth/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <form action={logoutAction}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You have successfully logged in to the admin portal.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-gray-600">Total registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$12,345</p>
              <p className="text-gray-600">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
