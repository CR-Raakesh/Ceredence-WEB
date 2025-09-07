"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Promise {
  id: number
  title: string
  category: "Technical" | "Non-Technical"
  deadline: string
  stake: number
  status: "active" | "fulfilled" | "broken" | "overdue"
  daysUntilDeadline?: number
}

interface RecentActivityProps {
  promises: Promise[]
}

export function RecentActivity({ promises }: RecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "fulfilled":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "broken":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string, daysUntilDeadline?: number) => {
    switch (status) {
      case "active":
        if (daysUntilDeadline !== undefined && daysUntilDeadline <= 2) {
          return <Badge className="bg-red-100 text-red-800 border-red-200">Due Soon</Badge>
        }
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Active</Badge>
      case "fulfilled":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Fulfilled</Badge>
      case "broken":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Broken</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityLevel = (status: string, daysUntilDeadline?: number) => {
    if (status === "overdue") return "high"
    if (status === "active" && daysUntilDeadline !== undefined && daysUntilDeadline <= 2) return "high"
    if (status === "active" && daysUntilDeadline !== undefined && daysUntilDeadline <= 7) return "medium"
    return "low"
  }

  // Sort promises by priority
  const sortedPromises = [...promises].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const aPriority = getPriorityLevel(a.status, a.daysUntilDeadline)
    const bPriority = getPriorityLevel(b.status, b.daysUntilDeadline)
    return priorityOrder[bPriority] - priorityOrder[aPriority]
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Promises</CardTitle>
            <CardDescription>Your latest promise activity</CardDescription>
          </div>
          <Link href="/history">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPromises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No promises yet</p>
              <p className="text-sm">Create your first promise to get started</p>
            </div>
          ) : (
            sortedPromises.map((promise) => {
              const priority = getPriorityLevel(promise.status, promise.daysUntilDeadline)
              return (
                <div
                  key={promise.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all hover:shadow-md ${
                    priority === "high"
                      ? "border-red-200 bg-red-50/50"
                      : priority === "medium"
                        ? "border-orange-200 bg-orange-50/50"
                        : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">{getStatusIcon(promise.status)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{promise.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {promise.category}
                        </Badge>
                        <span>Due: {promise.deadline}</span>
                        <span className="font-medium">{promise.stake} $PROM</span>
                        {promise.daysUntilDeadline !== undefined && promise.status === "active" && (
                          <span
                            className={`font-medium ${
                              promise.daysUntilDeadline <= 2
                                ? "text-red-600"
                                : promise.daysUntilDeadline <= 7
                                  ? "text-orange-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {promise.daysUntilDeadline === 0
                              ? "Due today"
                              : promise.daysUntilDeadline === 1
                                ? "Due tomorrow"
                                : `${promise.daysUntilDeadline} days left`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(promise.status, promise.daysUntilDeadline)}
                    <Link href={`/promise/${promise.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
