import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, TrendingUp, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/images/credence-logo.png" alt="Credence Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-2xl font-bold text-gray-900">Credence</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/credence-logo.png"
              alt="Credence Logo"
              width={120}
              height={120}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-balance">
            Build Trust Through <span className="text-blue-600">Transparent Promises</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            Credence empowers organizations with blockchain-based promise management, creating accountability and
            building reputation through verifiable commitments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Connect Wallet & Start
              </Button>
            </Link>
            <Link href="/hr">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                HR Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Card className="text-center">
            <CardHeader>
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Blockchain Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Promises are secured on the Stacks blockchain with Leather Wallet integration
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Reputation Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Build your Promise Score through consistent delivery and accountability</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>HR Oversight</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                HR teams can monitor employee promises and reputation across the organization
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Stake & Commit</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Use $PROM credits to stake on promises, creating real accountability</CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <Image src="/images/credence-logo.png" alt="Credence Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-semibold text-gray-700">Credence</span>
          </div>
          <p className="text-center text-gray-500 mt-4">Building trust through transparent promise management</p>
        </div>
      </footer>
    </div>
  )
}
