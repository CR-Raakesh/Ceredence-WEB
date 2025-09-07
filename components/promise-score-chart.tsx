"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface PromiseScoreChartProps {
  score: number
  trend: "up" | "down" | "stable"
  trendValue: number
  activePromises: number
  fulfilledPromises: number
  brokenPromises: number
}

export function PromiseScoreChart({
  score,
  trend,
  trendValue,
  activePromises,
  fulfilledPromises,
  brokenPromises,
}: PromiseScoreChartProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Very Good"
    if (score >= 70) return "Good"
    if (score >= 60) return "Fair"
    return "Needs Improvement"
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Promise Score</CardTitle>
            <CardDescription className="text-blue-100">Based on your promise fulfillment history</CardDescription>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            {getTrendIcon()}
            <span className={getTrendColor()}>{trend === "stable" ? "No change" : `${trendValue} points`}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-8">
          {/* Circular Score Display */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-blue-300 flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-xs text-blue-200">{getScoreLabel(score)}</div>
              </div>
            </div>
            {/* Progress ring overlay */}
            <svg className="absolute inset-0 w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-blue-300/30"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${score * 2.83} 283`}
                className="text-white transition-all duration-1000 ease-out"
              />
            </svg>
          </div>

          {/* Stats Grid */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-200">{activePromises}</div>
                <div className="text-sm text-blue-200">Active</div>
                <Progress
                  value={(activePromises / (activePromises + fulfilledPromises + brokenPromises)) * 100}
                  className="mt-1 h-1"
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">{fulfilledPromises}</div>
                <div className="text-sm text-blue-200">Fulfilled</div>
                <Progress
                  value={(fulfilledPromises / (activePromises + fulfilledPromises + brokenPromises)) * 100}
                  className="mt-1 h-1"
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-200">{brokenPromises}</div>
                <div className="text-sm text-blue-200">Broken</div>
                <Progress
                  value={(brokenPromises / (activePromises + fulfilledPromises + brokenPromises)) * 100}
                  className="mt-1 h-1"
                />
              </div>
            </div>

            {/* Success Rate */}
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <span>Success Rate</span>
                <span className="font-semibold">
                  {Math.round((fulfilledPromises / (fulfilledPromises + brokenPromises)) * 100)}%
                </span>
              </div>
              <Progress value={(fulfilledPromises / (fulfilledPromises + brokenPromises)) * 100} className="mt-2 h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
