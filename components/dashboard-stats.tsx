"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Coins, Calendar, Target } from "lucide-react"

interface DashboardStatsProps {
  activePromises: number
  fulfilledPromises: number
  brokenPromises: number
  totalStaked: number
  promBalance: number
  avgCompletionTime: number
}

export function DashboardStats({
  activePromises,
  fulfilledPromises,
  brokenPromises,
  totalStaked,
  promBalance,
  avgCompletionTime,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Active Promises",
      value: activePromises,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      description: `${totalStaked} $PROM staked`,
      trend: activePromises > 0 ? "active" : "none",
    },
    {
      title: "Fulfilled",
      value: fulfilledPromises,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      description: "Great track record!",
      trend: "positive",
    },
    {
      title: "Broken",
      value: brokenPromises,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      description: brokenPromises === 0 ? "Perfect record!" : "Room for improvement",
      trend: brokenPromises === 0 ? "positive" : "negative",
    },
    {
      title: "$PROM Balance",
      value: promBalance,
      icon: Coins,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      description: "Available to stake",
      trend: "neutral",
    },
    {
      title: "Avg. Completion",
      value: `${avgCompletionTime}d`,
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      description: "Days to complete",
      trend: avgCompletionTime <= 7 ? "positive" : "neutral",
    },
    {
      title: "Success Rate",
      value: `${Math.round((fulfilledPromises / (fulfilledPromises + brokenPromises || 1)) * 100)}%`,
      icon: Target,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      description: "Promise fulfillment",
      trend: fulfilledPromises / (fulfilledPromises + brokenPromises || 1) >= 0.8 ? "positive" : "neutral",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>

            {/* Trend indicator */}
            <div className="absolute top-2 right-2">
              {stat.trend === "positive" && (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs px-1 py-0">
                  ↗
                </Badge>
              )}
              {stat.trend === "negative" && (
                <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs px-1 py-0">
                  ↘
                </Badge>
              )}
              {stat.trend === "active" && (
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 text-xs px-1 py-0">
                  ●
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
