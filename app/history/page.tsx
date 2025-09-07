"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  // TODO: BACKEND - Fetch user's promise history from smart contract
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
      title: "Update user onboarding flow",
      category: "Technical",
      deadline: "2024-01-08",
      stake: 40,
      status: "overdue",
      createdAt: "2024-01-01",
    },
    {
      id: 5,
      title: "Prepare quarterly presentation",
      category: "Non-Technical",
      deadline: "2023-12-30",
      stake: 25,
      status: "broken",
      createdAt: "2023-12-20",
      completedAt: "2023-12-31",
      scoreImpact: -5,
    },
    {
      id: 6,
      title: "Implement user feedback system",
      category: "Technical",
      deadline: "2023-12-25",
      stake: 60,
      status: "fulfilled",
      createdAt: "2023-12-15",
      completedAt: "2023-12-24",
      scoreImpact: 6,
    },
  ]

  // Filter and sort promises
  const filteredPromises = mockPromises
    .filter((promise) => {
      const matchesSearch = promise.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || promise.status === statusFilter
      const matchesCategory = categoryFilter === "all" || promise.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case "stake":
          return b.stake - a.stake
        default:
          return 0
      }
    })

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
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

  const stats = {
    total: mockPromises.length,
    active: mockPromises.filter((p) => p.status === "active").length,
    fulfilled: mockPromises.filter((p) => p.status === "fulfilled").length,
    broken: mockPromises.filter((p) => p.status === "broken").length,
    overdue: mockPromises.filter((p) => p.status === "overdue").length,
  }

  const handleExportHistory = () => {
    // TODO: BACKEND - Generate and download promise history report
    console.log("TODO: Export promise history as PDF/CSV")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Image
                src="/images/credence-logo.png"
                alt="Credence Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-semibold text-gray-900">Promise History</span>
            </div>
            <Button onClick={handleExportHistory} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.fulfilled}</div>
              <div className="text-sm text-gray-600">Fulfilled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.broken}</div>
              <div className="text-sm text-gray-600">Broken</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-700">{stats.overdue}</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search promises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="broken">Broken</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="deadline">By Deadline</SelectItem>
                  <SelectItem value="stake">By Stake Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Promise List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Promises ({filteredPromises.length})</CardTitle>
            <CardDescription>Complete history of your promises and their outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPromises.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No promises found</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                filteredPromises.map((promise) => (
                  <div
                    key={promise.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">{getStatusIcon(promise.status)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{promise.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {promise.category}
                          </Badge>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Created: {new Date(promise.createdAt).toLocaleDateString()}
                          </span>
                          <span>Due: {new Date(promise.deadline).toLocaleDateString()}</span>
                          <span className="font-medium">{promise.stake} $PROM</span>
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
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(promise.status)}
                      <Link href={`/promise/${promise.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
