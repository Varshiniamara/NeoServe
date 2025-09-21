import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-12">Welcome to NeoServe Platform</h1>

        <div className="space-y-4">
          <Link
            href="/employee"
            className="block w-64 mx-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Employee Portal
          </Link>

          <Link
            href="/auth/admin/login"
            className="block w-64 mx-auto bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Admin Portal
          </Link>

          <Link
            href="/support"
            className="block w-64 mx-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Customer Support
          </Link>
        </div>
      </div>
    </div>
  )
}
