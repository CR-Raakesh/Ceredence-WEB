"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertTriangle,
  Award,
  Download,
  ArrowLeft,
  Users,
  DollarSign,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import Image from "next/image"
import Link from "next/link"

export default function HRAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [department, setDepartment] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const monthlyTrends = [
    { month: "Jul", avgScore: 72, promises: 45, fulfilled: 38, broken: 7, stakingVolume: 2400, activeUsers: 28 },
    { month: "Aug", avgScore: 75, promises: 52, fulfilled: 44, broken: 8, stakingVolume: 2800, activeUsers: 32 },
    { month: "Sep", avgScore: 78, promises: 48, fulfilled: 42, broken: 6, stakingVolume: 2600, activeUsers: 30 },
    { month: "Oct", avgScore: 81, promises: 55, fulfilled: 49, broken: 6, stakingVolume: 3200, activeUsers: 35 },
    { month: "Nov", avgScore: 79, promises: 60, fulfilled: 51, broken: 9, stakingVolume: 3600, activeUsers: 38 },
    { month: "Dec", avgScore: 83, promises: 58, fulfilled: 52, broken: 6, stakingVolume: 3800, activeUsers: 41 },
  ]

  const departmentData = [
    { name: "Engineering", score: 82, employees: 12, promises: 156, color: "#3B82F6", growth: 8.5, satisfaction: 85 },
    { name: "Marketing", score: 88, employees: 8, promises: 94, color: "#10B981", growth: 12.3, satisfaction: 92 },
    { name: "Design", score: 85, employees: 6, promises: 72, color: "#F59E0B", growth: 6.7, satisfaction: 88 },
    { name: "Sales", score: 76, employees: 10, promises: 118, color: "#EF4444", growth: -2.1, satisfaction: 74 },
    { name: "Operations", score: 79, employees: 5, promises: 45, color: "#8B5CF6", growth: 4.2, satisfaction: 81 },
  ]

  const performanceMetrics = [
    { name: "Overall Score", value: 82, change: 5.2, trend: "up", color: "text-green-600" },
    { name: "Active Promises", value: 247, change: 12.8, trend: "up", color: "text-blue-600" },
    { name: "Completion Rate", value: 89, change: 3.1, trend: "up", color: "text-green-600" },
    { name: "Avg Stake ($PROM)", value: 156, change: -2.3, trend: "down", color: "text-red-600" },
  ]

  const departmentRadarData = [
    { department: "Engineering", reliability: 82, communication: 78, innovation: 90, teamwork: 85, delivery: 88 },
    { department: "Marketing", reliability: 88, communication: 92, innovation: 85, teamwork: 90, delivery: 86 },
    { department: "Design", reliability: 85, communication: 88, innovation: 95, teamwork: 82, delivery: 84 },
    { department: "Sales", reliability: 76, communication: 85, innovation: 70, teamwork: 78, delivery: 82 },
    { department: "Operations", reliability: 79, communication: 82, innovation: 75, teamwork: 88, delivery: 90 },
  ]

  const promiseCategories = [
    { name: "Project Delivery", value: 35, color: "#3B82F6" },
    { name: "Client Communication", value: 25, color: "#10B981" },
    { name: "Team Collaboration", value: 20, color: "#F59E0B" },
    { name: "Skill Development", value: 12, color: "#EF4444" },
    { name: "Process Improvement", value: 8, color: "#8B5CF6" },
  ]

  const insights = [
    {
      type: "positive",
      title: "Strong Q4 Performance",
      description: "Team promise scores increased by 12% compared to Q3, with Marketing leading at 88% average score.",
      recommendation: "Consider implementing Marketing's best practices across other departments.",
      icon: TrendingUp,
      color: "text-green-600",
      priority: "low",
    },
    {
      type: "warning",
      title: "Sales Team Attention Needed",
      description: "Sales department shows 23% higher broken promise rate. Consider additional support or training.",
      recommendation: "Schedule 1-on-1 coaching sessions and implement peer mentoring program.",
      icon: AlertTriangle,
      color: "text-yellow-600",
      priority: "high",
    },
    {
      type: "info",
      title: "Project Delivery Focus",
      description:
        "35% of all promises relate to project delivery. Consider implementing better project management tools.",
      recommendation: "Evaluate project management software and provide training on deadline management.",
      icon: Target,
      color: "text-blue-600",
      priority: "medium",
    },
  ]

  const predictiveData = [
    { month: "Jan", predicted: 85, confidence: 92 },
    { month: "Feb", predicted: 87, confidence: 89 },
    { month: "Mar", predicted: 84, confidence: 85 },
    { month: "Apr", predicted: 89, confidence: 88 },
    { month: "May", predicted: 91, confidence: 90 },
    { month: "Jun", predicted: 88, confidence: 87 },
  ]

  const topPerformers = [
    { name: "Sarah Johnson", score: 92, department: "Marketing", promises: 18 },
    { name: "Emily Rodriguez", score: 88, department: "Design", promises: 15 },
    { name: "John Doe", score: 85, department: "Engineering", promises: 12 },
    { name: "Alex Kim", score: 84, department: "Engineering", promises: 14 },
    { name: "Lisa Wang", score: 82, department: "Operations", promises: 11 },
  ]

  const riskEmployees = [
    { name: "David Wilson", score: 65, department: "Sales", issues: "4 broken promises", risk: "High" },
    { name: "Mark Thompson", score: 58, department: "Sales", issues: "Low completion rate", risk: "High" },
    { name: "Jennifer Lee", score: 72, department: "Engineering", issues: "Declining trend", risk: "Medium" },
  ]

  const handleExportAnalytics = () => {
    console.log("TODO: Export analytics data as PDF report")
  }

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
              <div>
                <span className="text-xl font-bold text-gray-900">Team Analytics</span>
                <div className="text-sm text-gray-500">Performance insights and trends</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportAnalytics} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {performanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                      {metric.name.includes("Rate") || metric.name.includes("Score") ? "%" : ""}
                    </p>
                  </div>
                  <div className={`flex items-center ${metric.color}`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                    )}
                    <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Insights & Recommendations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights & Recommendations</h2>
              <div className="grid grid-cols-1 gap-4">
                {insights.map((insight, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${
                      insight.priority === "high"
                        ? "border-l-red-500"
                        : insight.priority === "medium"
                          ? "border-l-yellow-500"
                          : "border-l-green-500"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <insight.icon className={`w-5 h-5 mt-1 ${insight.color}`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                              <Badge
                                variant={
                                  insight.priority === "high"
                                    ? "destructive"
                                    : insight.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {insight.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-blue-900">💡 Recommendation:</p>
                              <p className="text-sm text-blue-800">{insight.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Monthly Performance Trends
                  </CardTitle>
                  <CardDescription>Average promise scores and activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="avgScore"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        name="Avg Score"
                      />
                      <Area
                        type="monotone"
                        dataKey="activeUsers"
                        stackId="2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.3}
                        name="Active Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Promise Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Promise Categories</CardTitle>
                  <CardDescription>Distribution of promise types across the organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={promiseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {promiseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Department Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Comparison</CardTitle>
                <CardDescription>Comprehensive analysis across all departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" name="Average Score" />
                    <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                  {departmentData.map((dept) => (
                    <div key={dept.name} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">{dept.name}</div>
                      <div className="text-2xl font-bold mt-1" style={{ color: dept.color }}>
                        {dept.score}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {dept.employees} employees • {dept.promises} promises
                      </div>
                      <div className={`text-xs mt-1 ${dept.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {dept.growth >= 0 ? "↗" : "↘"} {Math.abs(dept.growth)}% growth
                      </div>
                      <Progress value={dept.score} className="mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department Skills Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Department Skills Analysis</CardTitle>
                <CardDescription>Multi-dimensional performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart
                    data={
                      departmentRadarData[0]
                        ? Object.keys(departmentRadarData[0])
                            .filter((key) => key !== "department")
                            .map((skill) => ({
                              skill: skill.charAt(0).toUpperCase() + skill.slice(1),
                              Engineering:
                                departmentRadarData.find((d) => d.department === "Engineering")?.[skill] || 0,
                              Marketing: departmentRadarData.find((d) => d.department === "Marketing")?.[skill] || 0,
                              Design: departmentRadarData.find((d) => d.department === "Design")?.[skill] || 0,
                              Sales: departmentRadarData.find((d) => d.department === "Sales")?.[skill] || 0,
                              Operations: departmentRadarData.find((d) => d.department === "Operations")?.[skill] || 0,
                            }))
                        : []
                    }
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Engineering" dataKey="Engineering" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                    <Radar name="Marketing" dataKey="Marketing" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                    <Radar name="Design" dataKey="Design" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Employees with highest promise scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{performer.name}</div>
                            <div className="text-sm text-gray-500">
                              {performer.department} • {performer.promises} promises
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">{performer.score}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Employees Needing Attention
                  </CardTitle>
                  <CardDescription>Team members who may need additional support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskEmployees.map((employee, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.department}</div>
                          <div className="text-sm text-red-600 mt-1">{employee.issues}</div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              employee.risk === "High"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }
                          >
                            {employee.risk} Risk
                          </Badge>
                          <div className="text-sm text-gray-500 mt-1">Score: {employee.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            {/* Predictive Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Predictive Analytics
                </CardTitle>
                <CardDescription>AI-powered predictions for next 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      name="Predicted Score"
                      strokeDasharray="5 5"
                    />
                    <Line type="monotone" dataKey="confidence" stroke="#10B981" strokeWidth={2} name="Confidence %" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🔮 AI Insights</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Team performance is predicted to peak in May with 91% average score</li>
                    <li>• Confidence levels remain high (85-92%) indicating stable predictions</li>
                    <li>• March shows a slight dip - consider proactive interventions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Predictive Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">+15%</div>
                  <div className="text-sm text-gray-600">Predicted team growth</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">92%</div>
                  <div className="text-sm text-gray-600">Expected completion rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900">4.2K</div>
                  <div className="text-sm text-gray-600">Projected $PROM volume</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
