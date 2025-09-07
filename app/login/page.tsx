"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WalletConnection } from "@/components/wallet-connection"
import { OnboardingFlow } from "@/components/onboarding-flow"

export default function LoginPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)

    // TODO: BACKEND - Check if user profile exists
    // BACKEND: Query smart contract or database for existing user profile
    // If profile exists, redirect to dashboard
    // If new user, show onboarding flow

    // For demo, assume new user needs onboarding
    const isNewUser = Math.random() > 0.3 // 70% chance of being new user for demo

    if (isNewUser) {
      setShowOnboarding(true)
    } else {
      // Existing user, go directly to dashboard
      router.push("/dashboard")
    }
  }

  const handleOnboardingComplete = () => {
    // TODO: BACKEND - Store user session/authentication state
    // BACKEND: Save authentication state, user profile, initial $PROM credits
    router.push("/dashboard")
  }

  if (showOnboarding && walletAddress) {
    return <OnboardingFlow walletAddress={walletAddress} onComplete={handleOnboardingComplete} />
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
              <Image
                src="/images/credence-logo.png"
                alt="Credence Logo"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </div>
            <CardTitle className="text-2xl">Welcome to Credence</CardTitle>
            <CardDescription>Connect your Leather Wallet to access your promise management dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <WalletConnection onConnect={handleWalletConnect} />

            <div className="border-t pt-4">
              <p className="text-xs text-gray-400 text-center">
                By connecting your wallet, you agree to our terms of service and privacy policy. Your wallet address
                will be used to identify your promises on the blockchain.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
