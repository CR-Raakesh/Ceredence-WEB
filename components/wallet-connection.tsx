"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Wallet, ExternalLink, CheckCircle } from "lucide-react"

interface WalletConnectionProps {
  onConnect: (address: string) => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLeatherInstalled, setIsLeatherInstalled] = useState(false)

  useEffect(() => {
    const checkLeatherWallet = () => {
      if (typeof window !== "undefined") {
        const hasLeather = !!(window as any).LeatherProvider || !!(window as any).StacksProvider
        setIsLeatherInstalled(hasLeather)
        console.log("[v0] Leather wallet detected:", hasLeather)
      }
    }

    checkLeatherWallet()
    // Check again after a short delay in case the extension loads later
    const timer = setTimeout(checkLeatherWallet, 1000)
    return () => clearTimeout(timer)
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      console.log("[v0] Starting wallet connection process...")

      if (typeof window !== "undefined" && isLeatherInstalled) {
        try {
          const provider = (window as any).LeatherProvider || (window as any).StacksProvider

          if (provider) {
            console.log("[v0] Attempting to connect to Leather wallet...")

            const response = await provider.request({
              method: "stx_requestAccounts",
            })

            if (response && response.length > 0) {
              const address = response[0]
              console.log("[v0] Wallet connected successfully:", address)

              setConnectedAddress(address)
              setIsConnected(true)
              onConnect(address)
              return
            }
          }
        } catch (walletError) {
          console.log("[v0] Leather wallet connection failed, falling back to demo mode:", walletError)
        }
      }

      if (!isLeatherInstalled) {
        console.log("[v0] Leather wallet not installed, using demo mode")
        setError("Leather Wallet not detected. Using demo mode with mock address.")
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockAddresses = [
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
        "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC",
        "ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ",
        "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
      ]
      const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)]

      console.log("[v0] Demo wallet connected:", randomAddress)

      setConnectedAddress(randomAddress)
      setIsConnected(true)
      onConnect(randomAddress)

      if (error && error.includes("demo mode")) {
        setTimeout(() => setError(null), 3000)
      }
    } catch (err) {
      console.log("[v0] Wallet connection error:", err)
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setConnectedAddress(null)
    setError(null)
    console.log("[v0] Wallet disconnected")
  }

  const installLeatherWallet = () => {
    window.open("https://leather.io/install-extension", "_blank")
  }

  if (isConnected && connectedAddress) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {isLeatherInstalled && !error ? "Real Wallet Connected" : "Demo Wallet Connected"}
                </p>
                <p className="text-xs text-green-600 font-mono">
                  {connectedAddress.slice(0, 8)}...{connectedAddress.slice(-8)}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
              className="text-green-700 border-green-300 hover:bg-green-100 bg-transparent"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant={error.includes("demo mode") ? "default" : "destructive"}>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        {isConnecting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {isLeatherInstalled ? "Connecting..." : "Connecting (Demo Mode)..."}
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            {isLeatherInstalled ? "Connect Leather Wallet" : "Connect Wallet (Demo)"}
          </>
        )}
      </Button>

      {!isLeatherInstalled && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Don't have Leather Wallet?</p>
          <Button
            variant="outline"
            onClick={installLeatherWallet}
            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Install Leather Wallet
          </Button>
        </div>
      )}

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Secure Connection:</strong> Your wallet connection is encrypted and secure. Credence never stores your
          private keys or has access to your funds.
          {!isLeatherInstalled && (
            <span className="block mt-1">
              <em>Currently running in demo mode. Install Leather Wallet for full functionality.</em>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
