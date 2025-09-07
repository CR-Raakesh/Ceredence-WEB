"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Download,
  QrCode,
  Share,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Employee {
  address: string
  name: string
  email: string
  department: string
  role: "Technical" | "Non-Technical"
  bio?: string
  promiseScore: number
  scoreTrend: "up" | "down" | "stable"
  scoreTrendValue: number
  activePromises: number
  fulfilledPromises: number
  brokenPromises: number
  totalStaked: number
  promBalance: number
  avgCompletionTime: number
  joinedAt: string
  lastActive: string
}

interface Promise {
  id: number
  title: string
  category: "Technical" | "Non-Technical"
  deadline: string
  stake: number
  status: "active" | "fulfilled" | "broken" | "overdue"
  createdAt: string
  completedAt?: string
  scoreImpact?: number
}

export default function EmployeeProfilePage({ params }: { params: { address: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // TODO: BACKEND - Fetch employee data by wallet address
  const mockEmployee: Employee = {
    address: params.address,
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    role: "Technical",
    bio: "Senior Full-Stack Developer with 5+ years of experience in React, Node.js, and blockchain technologies. Passionate about building scalable applications and mentoring junior developers.",
    promiseScore: 85,
    scoreTrend: "up",
    scoreTrendValue: 5,
    activePromises: 3,
    fulfilledPromises: 12,
    brokenPromises: 1,
    totalStaked: 150,
    promBalance: 250,
    avgCompletionTime: 5,
    joinedAt: "2023-06-15",
    lastActive: "2024-01-12",
  }

  // TODO: BACKEND - Fetch employee's promise history
  const mockPromises: Promise[] = [
    {
      id: 1,
      title: "Complete API documentation",
      category: "Technical",
      deadline: "2024-01-15",
      stake: 50,
      status: "active",
      createdAt: "2024-01-08",
    },
    {
      id: 2,
      title: "Conduct team training session",
      category: "Non-Technical",
      deadline: "2024-01-20",
      stake: 30,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Fix critical bug in payment system",
      category: "Technical",
      deadline: "2024-01-10",
      stake: 70,
      status: "fulfilled",
      createdAt: "2024-01-05",
      completedAt: "2024-01-09",
      scoreImpact: 7,
    },
    {
      id: 4,
      title: "Implement user feedback system",
      category: "Technical",
      deadline: "2023-12-25",
      stake: 60,
      status: "fulfilled",
      createdAt: "2023-12-15",
      completedAt: "2023-12-24",
      scoreImpact: 6,
    },
    {
      id: 5,
      title: "Update deployment pipeline",
      category: "Technical",
      deadline: "2023-12-10",
      stake: 25,
      status: "broken",
      createdAt: "2023-12-01",
      completedAt: "2023-12-11",
      scoreImpact: -5,
    },
  ]

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
    switch (mockEmployee.scoreTrend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const handleExportProfile = () => {
    // TODO: BACKEND - Generate employee profile export
    console.log("TODO: Export employee profile as PDF")
  }

  const handleGenerateQR = () => {
    // TODO: BACKEND - Generate QR code for blockchain verification
    console.log("TODO: Generate QR code for employee verification")
  }

  const successRate = Math.round(
    (mockEmployee.fulfilledPromises / (mockEmployee.fulfilledPromises + mockEmployee.brokenPromises || 1)) * 100,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/hr">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to HR Dashboard
                </Button>
              </Link>
              <Image
                src="/images/credence-logo.png"
                alt="Credence Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-semibold text-gray-900">Employee Profile</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleGenerateQR} variant="outline" size="sm">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR
              </Button>
              <Button onClick={handleExportProfile} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Profile
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Employee Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xl">
                  {mockEmployee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{mockEmployee.name}</h1>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">{mockEmployee.role}</Badge>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon()}
                    <span className="text-sm text-gray-600">
                      {mockEmployee.scoreTrend === "stable" ? "Stable" : `${mockEmployee.scoreTrendValue} points`}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{mockEmployee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>{mockEmployee.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(mockEmployee.joinedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-mono text-xs">{mockEmployee.address.slice(0, 12)}...</span>
                  </div>
                </div>
                {mockEmployee.bio && <p className="mt-3 text-gray-700 text-sm leading-relaxed">{mockEmployee.bio}</p>}
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(mockEmployee.promiseScore)}`}>
                  {mockEmployee.promiseScore}
                </div>
                <div className="text-sm text-gray-600">{getScoreLabel(mockEmployee.promiseScore)}</div>
                <div className="text-xs text-gray-500 mt-1">Promise Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="promises">Promise History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{mockEmployee.activePromises}</div>
                  <div className="text-sm text-gray-600">Active Promises</div>
                  <div className="text-xs text-gray-500 mt-1">{mockEmployee.totalStaked} $PROM staked</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{mockEmployee.fulfilledPromises}</div>
                  <div className="text-sm text-gray-600">Fulfilled</div>
                  <div className="text-xs text-gray-500 mt-1">Great track record</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{mockEmployee.brokenPromises}</div>
                  <div className="text-sm text-gray-600">Broken</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {mockEmployee.brokenPromises === 0 ? "Perfect!" : "Room for improvement"}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Promise fulfillment</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Promise Score</span>
                      <span className={getScoreColor(mockEmployee.promiseScore)}>{mockEmployee.promiseScore}/100</span>
                    </div>
                    <Progress value={mockEmployee.promiseScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Success Rate</span>
                      <span>{successRate}%</span>
                    </div>
                    <Progress value={successRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="text-sm text-gray-600">Avg. Completion</div>
                      <div className="font-semibold">{mockEmployee.avgCompletionTime} days</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">$PROM Balance</div>
                      <div className="font-semibold">{mockEmployee.promBalance}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest promise updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPromises.slice(0, 4).map((promise) => (
                      <div key={promise.id} className="flex items-center space-x-3 text-sm">
                        <div className="flex-shrink-0">
                          {promise.status === "active" && <Clock className="w-4 h-4 text-orange-500" />}
                          {promise.status === "fulfilled" && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {promise.status === "broken" && <XCircle className="w-4 h-4 text-red-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium">{promise.title}</div>
                          <div className="text-gray-500 text-xs">
                            {promise.completedAt
                              ? `Completed ${new Date(promise.completedAt).toLocaleDateString()}`
                              : `Due ${new Date(promise.deadline).toLocaleDateString()}`}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {promise.stake} $PROM
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Promise History Tab */}
          <TabsContent value="promises">
            <Card>
              <CardHeader>
                <CardTitle>Complete Promise History</CardTitle>
                <CardDescription>All promises created by this employee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPromises.map((promise) => (
                    <div
                      key={promise.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {promise.status === "active" && <Clock className="w-4 h-4 text-orange-500" />}
                          {promise.status === "fulfilled" && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {promise.status === "broken" && <XCircle className="w-4 h-4 text-red-500" />}
                          {promise.status === "overdue" && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{promise.title}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <Badge variant="outline" className="text-xs">
                              {promise.category}
                            </Badge>
                            <span>Created: {new Date(promise.createdAt).toLocaleDateString()}</span>
                            <span>Due: {new Date(promise.deadline).toLocaleDateString()}</span>
                            <span>{promise.stake} $PROM</span>
                            {promise.scoreImpact && (
                              <span
                                className={`font-medium ${promise.scoreImpact > 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {promise.scoreImpact > 0 ? "+" : ""}
                                {promise.scoreImpact} score
                              </span>
                            )}
                          </div>
                          {promise.completedAt && (
                            <div className="text-xs text-gray-400 mt-1">
                              Completed: {new Date(promise.completedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            promise.status === "active"
                              ? "bg-orange-100 text-orange-800"
                              : promise.status === "fulfilled"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {promise.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Score and completion trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Analytics charts would be displayed here</p>
                    <p className="text-sm">TODO: Implement with charting library</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Promise distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical Promises</span>
                        <span>
                          {mockPromises.filter((p) => p.category === "Technical").length} / {mockPromises.length}
                        </span>
                      </div>
                      <Progress
                        value={
                          (mockPromises.filter((p) => p.category === "Technical").length / mockPromises.length) * 100
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Non-Technical Promises</span>
                        <span>
                          {mockPromises.filter((p) => p.category === "Non-Technical").length} / {mockPromises.length}
                        </span>
                      </div>
                      <Progress
                        value={
                          (mockPromises.filter((p) => p.category === "Non-Technical").length / mockPromises.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
