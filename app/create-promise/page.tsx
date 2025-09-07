"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Coins, Target, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PromiseForm {
  title: string
  description: string
  category: "Technical" | "Non-Technical" | ""
  deadline: string
  stake: number
}

export default function CreatePromisePage() {
  const router = useRouter()
  const [form, setForm] = useState<PromiseForm>({
    title: "",
    description: "",
    category: "",
    deadline: "",
    stake: 50,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<PromiseForm>>({})

  // TODO: BACKEND - Get user's current $PROM balance
  const userPromBalance = 250

  const validateForm = (): boolean => {
    const newErrors: Partial<PromiseForm> = {}

    if (!form.title.trim()) {
      newErrors.title = "Promise title is required"
    } else if (form.title.length < 10) {
      newErrors.title = "Promise title must be at least 10 characters"
    }

    if (!form.description.trim()) {
      newErrors.description = "Promise description is required"
    } else if (form.description.length < 20) {
      newErrors.description = "Promise description must be at least 20 characters"
    }

    if (!form.category) {
      newErrors.category = "Please select a category"
    }

    if (!form.deadline) {
      newErrors.deadline = "Deadline is required"
    } else {
      const deadlineDate = new Date(form.deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (deadlineDate <= today) {
        newErrors.deadline = "Deadline must be in the future"
      }
    }

    if (form.stake < 10) {
      newErrors.stake = "Minimum stake is 10 $PROM"
    } else if (form.stake > userPromBalance) {
      newErrors.stake = `Insufficient balance. You have ${userPromBalance} $PROM`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: BACKEND - Create promise on blockchain
      console.log("TODO: Create promise with data:", form)
      /*
      BACKEND: Call smart contract function createPromise
      - Convert deadline to timestamp
      - Call contract with: title, category, deadline, stake
      - Handle transaction confirmation
      - Update user's $PROM balance
      - Redirect to promise details or dashboard
      */

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to create promise:", error)
      // Handle error state
    } finally {
      setIsSubmitting(false)
    }
  }

  const suggestedStakes = [25, 50, 75, 100]

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
            <span className="text-lg font-semibold text-gray-900">Create New Promise</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Create Your Promise
            </CardTitle>
            <CardDescription>
              Make a commitment and stake $PROM credits to show your dedication. Your Promise Score will be updated
              based on your performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Promise Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Promise Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Complete user authentication system"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Be specific and measurable. This will be visible to your team and HR.
                </p>
              </div>

              {/* Promise Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what you will deliver, success criteria, and any important details..."
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-gray-500">Include deliverables, success criteria, and any dependencies.</p>
              </div>

              {/* Category and Deadline Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value: "Technical" | "Non-Technical") => setForm({ ...form, category: value })}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Tomorrow
                    className={errors.deadline ? "border-red-500" : ""}
                  />
                  {errors.deadline && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.deadline}
                    </p>
                  )}
                </div>
              </div>

              {/* Stake Amount */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stake">Stake Amount ($PROM) *</Label>
                  <Badge variant="outline" className="text-blue-600">
                    <Coins className="w-3 h-3 mr-1" />
                    Balance: {userPromBalance} $PROM
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Input
                    id="stake"
                    type="number"
                    min="10"
                    max={userPromBalance}
                    value={form.stake}
                    onChange={(e) => setForm({ ...form, stake: Number.parseInt(e.target.value) || 0 })}
                    className={errors.stake ? "border-red-500" : ""}
                  />

                  {/* Suggested Stakes */}
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 py-2">Quick select:</span>
                    {suggestedStakes.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setForm({ ...form, stake: amount })}
                        disabled={amount > userPromBalance}
                        className="text-xs"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {errors.stake && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.stake}
                  </p>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Higher stakes show greater commitment and can improve your Promise Score more when fulfilled. Stakes
                    are returned when promises are completed successfully.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Promise Preview */}
              {form.title && form.deadline && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Promise Preview</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Title:</span> {form.title}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {form.category || "Not selected"}
                    </div>
                    <div>
                      <span className="font-medium">Deadline:</span> {new Date(form.deadline).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Stake:</span> {form.stake} $PROM
                    </div>
                    {form.deadline && (
                      <div>
                        <span className="font-medium">Days to complete:</span>{" "}
                        {Math.ceil((new Date(form.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Link href="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Promise...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create Promise
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
