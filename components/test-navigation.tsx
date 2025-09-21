"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TestTube, ExternalLink } from "lucide-react"
import Link from "next/link"

export function TestNavigation() {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
          <TestTube className="h-5 w-5" />
          <span>Feature Testing</span>
        </CardTitle>
        <CardDescription className="text-blue-700 dark:text-blue-300">
          Test all employee portal features to ensure they're working correctly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/test/employee-features" target="_blank">
          <Button className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Feature Test Page
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
