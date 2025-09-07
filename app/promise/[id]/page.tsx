"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Calendar,
  Coins,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Target,
  FileText,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Promise {
  id: number
  title: string
  description: string
  category: "Technical" | "Non-Technical"
  deadline: string
  stake: number
  status: "active" | "fulfilled" | "broken" | "overdue"
  createdAt: string
  daysUntilDeadline: number
  completedAt?: string
  creator: {
    address: string
    name: string
  }
}

export default function PromiseDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [actionType, setActionType] = useState<"fulfill" | "break" | null>(null)

  // TODO: BACKEND - Fetch promise details from smart contract
  const mockPromise: Promise = {
    id: Number.parseInt(params.id),
    title: "Complete API documentation",
    description:
      "Create comprehensive API documentation for the user authentication system, including endpoint descriptions, request/response examples, error codes, and integration guides. The documentation should be accessible to both technical and non-technical team members.",
    category: "Technical",
    deadline: "2024-01-15",
    stake: 50,
    status: "active",
    createdAt: "2024-01-08",
    daysUntilDeadline: 2,
    creator: {
      address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
      name: "John Doe",
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "fulfilled":
        return "bg-green-100 text-green-800 border-green-200"
      case "broken":
        return "bg-red-100 text-red-800 border-red-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "fulfilled":
        return <CheckCircle className="w-4 h-4" />
      case "broken":
        return <XCircle className="w-4 h-4" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getUrgencyLevel = (daysUntilDeadline: number, status: string) => {
    if (status !== "active") return "none"
    if (daysUntilDeadline < 0) return "overdue"
    if (daysUntilDeadline <= 1) return "critical"
    if (daysUntilDeadline <= 3) return "high"
    if (daysUntilDeadline <= 7) return "medium"
    return "low"
  }

  const handlePromiseAction = async (action: "fulfill" | "break") => {
    setIsProcessing(true)
    setActionType(action)

    try {
      // TODO: BACKEND - Call smart contract function
      console.log(`TODO: ${action} promise with ID:`, params.id)
      /*
      BACKEND: Call smart contract function
      - fulfillPromise(promiseId) or breakPromise(promiseId)
      - Handle transaction confirmation
      - Update promise status
      - Update user's Promise Score
      - Return/forfeit staked $PROM
      */

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to dashboard after action
      router.push("/dashboard")
    } catch (error) {
      console.error(`Failed to ${action} promise:`, error)
    } finally {
      setIsProcessing(false)
      setActionType(null)
    }
  }

  const urgencyLevel = getUrgencyLevel(mockPromise.daysUntilDeadline, mockPromise.status)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Image src="/images/credence-logo.png" alt="Credence Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-semibold text-gray-900">Promise Details</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Promise Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Promise Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getStatusColor(mockPromise.status)}>
                        {getStatusIcon(mockPromise.status)}
                        <span className="ml-1 capitalize">{mockPromise.status}</span>
                      </Badge>
                      <Badge variant="outline">{mockPromise.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl text-balance">{mockPromise.title}</CardTitle>
                  </div>
                  <Target className="w-8 h-8 text-blue-600 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{mockPromise.description}</p>
                  </div>

                  {/* Urgency Alert */}
                  {urgencyLevel === "critical" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Critical:</strong> This promise is due very soon! Take action now to maintain your
                        Promise Score.
                      </AlertDescription>
                    </Alert>
                  )}

                  {urgencyLevel === "high" && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <strong>High Priority:</strong> This promise is due soon. Consider taking action.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Promise Actions */}
            {mockPromise.status === "active" && (
              <Card>
                <CardHeader>
                  <CardTitle>Promise Actions</CardTitle>
                  <CardDescription>
                    Mark this promise as fulfilled or broken. This action cannot be undone and will affect your Promise
                    Score.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handlePromiseAction("fulfill")}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isProcessing && actionType === "fulfill" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Fulfilling...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Fulfilled
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handlePromiseAction("break")}
                      disabled={isProcessing}
                      variant="destructive"
                      className="flex-1"
                    >
                      {isProcessing && actionType === "break" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Breaking...
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Mark as Broken
                        </>
                      )}
                    </Button>
                  </div>

                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Fulfilling</strong> returns your stake and improves your score.
                      <strong> Breaking</strong> forfeits your stake and reduces your score.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Promise Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promise Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm font-medium">{new Date(mockPromise.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Deadline</span>
                  <span className="text-sm font-medium flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(mockPromise.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stake</span>
                  <span className="text-sm font-medium flex items-center">
                    <Coins className="w-3 h-3 mr-1" />
                    {mockPromise.stake} $PROM
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Creator</span>
                  <span className="text-sm font-medium flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {mockPromise.creator.name}
                  </span>
                </div>

                {mockPromise.status === "active" && (
                  <>
                    <hr />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Time Remaining</span>
                        <span
                          className={`text-sm font-medium ${
                            mockPromise.daysUntilDeadline <= 1
                              ? "text-red-600"
                              : mockPromise.daysUntilDeadline <= 3
                                ? "text-orange-600"
                                : "text-gray-900"
                          }`}
                        >
                          {mockPromise.daysUntilDeadline === 0
                            ? "Due today"
                            : mockPromise.daysUntilDeadline === 1
                              ? "Due tomorrow"
                              : `${mockPromise.daysUntilDeadline} days left`}
                        </span>
                      </div>
                      <Progress value={Math.max(0, 100 - (mockPromise.daysUntilDeadline / 30) * 100)} className="h-2" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Impact Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Score Impact</CardTitle>
                <CardDescription>How this promise affects your reputation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">If Fulfilled</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">+{Math.floor(mockPromise.stake / 10)} points</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <XCircle className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">If Broken</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">-{Math.floor(mockPromise.stake / 5)} points</span>
                </div>

                <p className="text-xs text-gray-500 mt-2">Higher stakes have greater impact on your Promise Score</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
