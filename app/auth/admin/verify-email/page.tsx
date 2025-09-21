"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-[400px] bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Verify Your Email</CardTitle>
          <CardDescription className="text-gray-400">
            Please check your email for a verification link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            We've sent a verification link to your email address. Please click the link to verify your account and complete the registration process.
          </p>
          <Button
            onClick={() => router.push("/auth/admin/login")}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Return to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 