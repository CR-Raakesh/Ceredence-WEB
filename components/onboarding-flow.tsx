"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Briefcase, Target } from "lucide-react"
import Image from "next/image"

interface OnboardingFlowProps {
  walletAddress: string
  onComplete: () => void
}

interface UserProfile {
  name: string
  email: string
  company: string
  department: string
  role: "Technical" | "Non-Technical" | ""
  bio: string
}

export function OnboardingFlow({ walletAddress, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    company: "",
    department: "",
    role: "",
    bio: "",
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = async () => {
    // TODO: BACKEND - Save user profile to smart contract or database
    console.log("TODO: Save user profile:", { walletAddress, ...profile })
    // BACKEND: Call smart contract function to store user profile
    // or save to database for quick access
    onComplete()
  }

  const steps = [
    { number: 1, title: "Welcome", icon: User },
    { number: 2, title: "Profile", icon: Briefcase },
    { number: 3, title: "Ready", icon: Target },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${currentStep >= step.number ? "text-blue-600" : "text-gray-400"}`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="shadow-lg">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/credence-logo.png"
                    alt="Credence Logo"
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />
                </div>
                <CardTitle className="text-2xl">Welcome to Credence!</CardTitle>
                <CardDescription>Your wallet is connected. Let's set up your profile to get started.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Wallet Connected:</span>
                  </div>
                  <div className="font-mono text-sm text-gray-600 mt-1">{walletAddress}</div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">What you can do with Credence:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Promise
                      </Badge>
                      <span>Create and manage your professional commitments</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Stake
                      </Badge>
                      <span>Use $PROM credits to show commitment to your promises</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Score
                      </Badge>
                      <span>Build your reputation through consistent delivery</span>
                    </li>
                  </ul>
                </div>

                <Button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue Setup
                </Button>
              </CardContent>
            </>
          )}

          {/* Step 2: Profile Setup */}
          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  This information helps your team and HR understand your role and expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Current Company *</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    placeholder="Acme Corp, TechStart Inc, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                      placeholder="Engineering, Marketing, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Primary Role *</Label>
                    <Select
                      value={profile.role}
                      onValueChange={(value: "Technical" | "Non-Technical") => setProfile({ ...profile, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about your expertise and what you're working on..."
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!profile.name || !profile.email || !profile.company || !profile.role}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </Button>
              </CardContent>
            </>
          )}

          {/* Step 3: Ready to Start */}
          {currentStep === 3 && (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">You're All Set!</CardTitle>
                <CardDescription>
                  Your profile is complete. You can now start creating and managing promises.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold">Profile Summary:</h3>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium">Name:</span> {profile.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {profile.email}
                    </div>
                    <div>
                      <span className="font-medium">Company:</span> {profile.company}
                    </div>
                    <div>
                      <span className="font-medium">Department:</span> {profile.department || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span> {profile.role}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Create your first promise to start building your reputation</li>
                    <li>• You'll receive 100 $PROM credits to stake on promises</li>
                    <li>• Your Promise Score will update based on your performance</li>
                  </ul>
                </div>

                <Button onClick={handleComplete} className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Dashboard
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
