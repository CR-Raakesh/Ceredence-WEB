"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Filter,
  BarChart3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Employee {
  address: string
  name: string
  email: string
  department: string
  role: "Technical" | "Non-Technical"
  promiseScore: number
  activePromises: number
  fulfilledPromises: number
  brokenPromises: number
  totalStaked: number
  joinedAt: string
  lastActive: string
}

export default function HRDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("score")

  // TODO: BACKEND - Fetch all employees data from smart contract/database
  const mockEmployees: Employee[] = [
    {
      address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "Technical",
      promiseScore: 85,
      activePromises: 3,
      fulfilledPromises: 12,
      brokenPromises: 1,
      totalStaked: 150,
      joinedAt: "2023-06-15",
      lastActive: "2024-01-12",
    },
    {
      address: "SP1ABC123DEF456GHI789JKL012MNO345PQR678ST",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      role: "Non-Technical",
      promiseScore: 92,
      activePromises: 2,
      fulfilledPromises: 18,
      brokenPromises: 0,
      totalStaked: 80,
      joinedAt: "2023-03-20",
      lastActive: "2024-01-11",
    },
    {
      address: "SP3XYZ789ABC012DEF345GHI678JKL901MNO234PQ",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Engineering",
      role: "Technical",
      promiseScore: 78,
      activePromises: 4,
      fulfilledPromises: 8,
      brokenPromises: 3,
      totalStaked: 200,
      joinedAt: "2023-09-10",
      lastActive: "2024-01-10",
    },
    {
      address: "SP4DEF456GHI789JKL012MNO345PQR678STU901VW",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      department: "Design",
      role: "Non-Technical",
      promiseScore: 88,
      activePromises: 1,
      fulfilledPromises: 15,
      brokenPromises: 2,
      totalStaked: 60,
      joinedAt: "2023-07-05",
      lastActive: "2024-01-12",
    },
    {
      address: "SP5GHI789JKL012MNO345PQR678STU901VWX234YZ",
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "Sales",
      role: "Non-Technical",
      promiseScore: 65,
      activePromises: 2,
      fulfilledPromises: 6,
      brokenPromises: 4,
      totalStaked: 120,
      joinedAt: "2023-11-01",
      lastActive: "2024-01-09",
    },
  ]

  // Filter and sort employees
  const filteredEmployees = mockEmployees
    .filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
      const matchesRole = roleFilter === "all" || employee.role === roleFilter
      return matchesSearch && matchesDepartment && matchesRole
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.promiseScore - a.promiseScore
        case "name":
          return a.name.localeCompare(b.name)
        case "department":
          return a.department.localeCompare(b.department)
        case "active":
          return b.activePromises - a.activePromises
        case "joined":
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
        default:
          return 0
      }
    })

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  // Calculate team statistics
  const teamStats = {
    totalEmployees: mockEmployees.length,
    avgScore: Math.round(mockEmployees.reduce((sum, emp) => sum + emp.promiseScore, 0) / mockEmployees.length),
    totalActivePromises: mockEmployees.reduce((sum, emp) => sum + emp.activePromises, 0),
    totalFulfilledPromises: mockEmployees.reduce((sum, emp) => sum + emp.fulfilledPromises, 0),
    totalBrokenPromises: mockEmployees.reduce((sum, emp) => sum + emp.brokenPromises, 0),
    highPerformers: mockEmployees.filter((emp) => emp.promiseScore >= 80).length,
  }

  const departments = [...new Set(mockEmployees.map((emp) => emp.department))]

  const handleExportTeamData = () => {
    // TODO: BACKEND - Generate and download team performance report
    console.log("TODO: Export team data as PDF/CSV")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/credence-logo.png"
                alt="Credence Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="text-xl font-bold text-gray-900">Credence HR Dashboard</span>
                <div className="text-sm text-gray-500">Employee Promise Management</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleExportTeamData} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Team Data
              </Button>
              <Link href="/hr/analytics">
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Team Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{teamStats.totalEmployees}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${getScoreColor(teamStats.avgScore)}`}>{teamStats.avgScore}</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{teamStats.totalActivePromises}</div>
              <div className="text-sm text-gray-600">Active Promises</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.totalFulfilledPromises}</div>
              <div className="text-sm text-gray-600">Fulfilled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{teamStats.totalBrokenPromises}</div>
              <div className="text-sm text-gray-600">Broken</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{teamStats.highPerformers}</div>
              <div className="text-sm text-gray-600">High Performers</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Employee Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Promise Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="active">Active Promises</SelectItem>
                  <SelectItem value="joined">Join Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members ({filteredEmployees.length})</CardTitle>
            <CardDescription>Overview of all employees and their promise performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEmployees.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No employees found</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                filteredEmployees.map((employee) => (
                  <div
                    key={employee.address}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                          <Badge className={getScoreBadgeColor(employee.promiseScore)}>
                            Score: {employee.promiseScore}
                          </Badge>
                          <Badge variant="outline">{employee.role}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{employee.email}</span>
                          <span>{employee.department}</span>
                          <span className="font-mono text-xs">{employee.address.slice(0, 12)}...</span>
                        </div>
                        <div className="flex items-center space-x-6 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-orange-500" />
                            <span>{employee.activePromises} active</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{employee.fulfilledPromises} fulfilled</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <XCircle className="w-3 h-3 text-red-500" />
                            <span>{employee.brokenPromises} broken</span>
                          </div>
                          <span className="text-gray-400">
                            Last active: {new Date(employee.lastActive).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {employee.promiseScore >= 80 && (
                        <TrendingUp className="w-4 h-4 text-green-500" title="High Performer" />
                      )}
                      {employee.promiseScore < 60 && (
                        <TrendingDown className="w-4 h-4 text-red-500" title="Needs Attention" />
                      )}
                      <Link href={`/hr/employee/${employee.address}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
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
