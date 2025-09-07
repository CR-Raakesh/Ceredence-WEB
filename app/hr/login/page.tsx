"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Users, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WalletConnection } from "@/components/wallet-connection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HRLoginPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [hrCode, setHrCode] = useState("")
  const [hrName, setHrName] = useState("")
  const [company, setCompany] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
  }

  const handleHRAccess = async () => {
    if (!walletAddress || !hrCode || !hrName || !company) return

    setIsVerifying(true)

    // TODO: BACKEND - Verify HR access code and wallet permissions
    // BACKEND: Check if wallet address has HR permissions for the selected company
    // BACKEND: Validate HR access code against company database
    // BACKEND: Store HR session with name, company, and elevated permissions
    // BACKEND: Log HR access attempt with user details

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo, accept any 6+ character code with valid name and company
    if (hrCode.length >= 6 && hrName.trim() && company) {
      // TODO: BACKEND - Store HR session state with user details
      console.log(`HR Access: ${hrName} from ${company} accessing dashboard`)
      router.push("/hr")
    } else {
      alert("Please fill in all required fields and ensure your access code is valid.")
    }

    setIsVerifying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Image
                  src="/images/credence-logo.png"
                  alt="Credence Logo"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl">HR Dashboard Access</CardTitle>
            <CardDescription>Connect your wallet and provide your details to access the HR dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Connection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Step 1: Connect Wallet</Label>
              <WalletConnection onConnect={handleWalletConnect} />
            </div>

            {/* HR Details Form */}
            {walletAddress && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hrName" className="text-sm font-medium">
                    Step 2: Your Full Name
                  </Label>
                  <Input
                    id="hrName"
                    type="text"
                    placeholder="Enter your full name"
                    value={hrName}
                    onChange={(e) => setHrName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Step 3: Select Company</Label>
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech-corp">TechCorp Inc.</SelectItem>
                      <SelectItem value="innovate-solutions">Innovate Solutions</SelectItem>
                      <SelectItem value="digital-dynamics">Digital Dynamics</SelectItem>
                      <SelectItem value="future-systems">Future Systems Ltd.</SelectItem>
                      <SelectItem value="nexus-enterprises">Nexus Enterprises</SelectItem>
                      <SelectItem value="quantum-labs">Quantum Labs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hrCode" className="text-sm font-medium">
                    Step 4: Enter HR Access Code
                  </Label>
                  <Input
                    id="hrCode"
                    type="password"
                    placeholder="Enter your HR access code"
                    value={hrCode}
                    onChange={(e) => setHrCode(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact your administrator if you don't have an access code
                  </p>
                </div>

                <Button
                  onClick={handleHRAccess}
                  disabled={!hrCode || !hrName || !company || isVerifying}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isVerifying ? "Verifying Access..." : "Access HR Dashboard"}
                </Button>
              </div>
            )}

            {/* HR Features Preview */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">HR Dashboard Features:</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  View all employee profiles and promise history
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                  Access team analytics and performance metrics
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-blue-600" />
                  Export employee data for verification
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                HR access requires additional authentication for security. All actions are logged and auditable.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
