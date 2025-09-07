"use client"

import { Button } from "@/components/ui/button"
import { Plus, User, LogOut, Bell, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PromiseScoreChart } from "@/components/promise-score-chart"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  // TODO: BACKEND - Fetch user data from blockchain
  const mockUserData = {
    address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
    name: "John Doe", // TODO: BACKEND - Get from user profile
    promiseScore: 85,
    scoreTrend: "up" as const,
    scoreTrendValue: 5,
    activePromises: 3,
    fulfilledPromises: 12,
    brokenPromises: 1,
    totalStaked: 150,
    promBalance: 250,
    avgCompletionTime: 5,
  }

  // TODO: BACKEND - Fetch promises from smart contract with deadline calculations
  const mockPromises = [
    {
      id: 1,
      title: "Complete API documentation",
      category: "Technical" as const,
      deadline: "2024-01-15",
      stake: 50,
      status: "active" as const,
      daysUntilDeadline: 2,
    },
    {
      id: 2,
      title: "Conduct team training session",
      category: "Non-Technical" as const,
      deadline: "2024-01-20",
      stake: 30,
      status: "active" as const,
      daysUntilDeadline: 7,
    },
    {
      id: 3,
      title: "Fix critical bug in payment system",
      category: "Technical" as const,
      deadline: "2024-01-10",
      stake: 70,
      status: "fulfilled" as const,
    },
    {
      id: 4,
      title: "Update user onboarding flow",
      category: "Technical" as const,
      deadline: "2024-01-08",
      stake: 40,
      status: "overdue" as const,
      daysUntilDeadline: -2,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/credence-logo.png"
                alt="Credence Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Credence</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {mockUserData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg">
                <User className="w-4 h-4" />
                <span className="font-mono">{mockUserData.address.slice(0, 8)}...</span>
              </div>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Promise Score Section */}
        <PromiseScoreChart
          score={mockUserData.promiseScore}
          trend={mockUserData.scoreTrend}
          trendValue={mockUserData.scoreTrendValue}
          activePromises={mockUserData.activePromises}
          fulfilledPromises={mockUserData.fulfilledPromises}
          brokenPromises={mockUserData.brokenPromises}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/create-promise" className="group">
            <Button className="w-full h-16 text-base font-medium bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all group-hover:scale-[1.02]">
              <Plus className="w-5 h-5 mr-2" />
              Create New Promise
            </Button>
          </Link>
          <Link href="/history" className="group">
            <Button
              variant="outline"
              className="w-full h-16 text-base font-medium border-border hover:bg-accent hover:text-accent-foreground transition-all group-hover:scale-[1.02] bg-transparent"
            >
              View Promise History
            </Button>
          </Link>
          <Link href="/profile" className="group">
            <Button
              variant="outline"
              className="w-full h-16 text-base font-medium border-border hover:bg-accent hover:text-accent-foreground transition-all group-hover:scale-[1.02] bg-transparent"
            >
              Export Profile
            </Button>
          </Link>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats
          activePromises={mockUserData.activePromises}
          fulfilledPromises={mockUserData.fulfilledPromises}
          brokenPromises={mockUserData.brokenPromises}
          totalStaked={mockUserData.totalStaked}
          promBalance={mockUserData.promBalance}
          avgCompletionTime={mockUserData.avgCompletionTime}
        />

        {/* Recent Activity */}
        <RecentActivity promises={mockPromises} />
      </main>
    </div>
  )
}
