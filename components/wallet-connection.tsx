"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Wallet, ExternalLink } from "lucide-react"

interface WalletConnectionProps {
  onConnect: (address: string) => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // TODO: BACKEND - Implement actual Leather wallet connection
      // Replace this mock implementation with real Stacks.js integration:
      /*
      import { showConnect } from '@stacks/connect';
      import { StacksTestnet } from '@stacks/network';
      
      const appConfig = new AppConfig(['store_write', 'publish_data']);
      const userSession = new UserSession({ appConfig });
      
      showConnect({
        appDetails: {
          name: 'Credence',
          icon: window.location.origin + '/images/credence-logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          const userData = userSession.loadUserData();
          onConnect(userData.profile.stxAddress.testnet);
        },
        userSession,
      });
      */

      // Check if Leather wallet is installed
      if (typeof window !== "undefined" && !(window as any).LeatherProvider) {
        throw new Error("Leather Wallet not detected. Please install Leather Wallet extension.")
      }

      // Simulate wallet connection for demo
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock Stacks address for demo
      const mockAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
      onConnect(mockAddress)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const installLeatherWallet = () => {
    window.open("https://leather.io/install-extension", "_blank")
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
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
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Leather Wallet
          </>
        )}
      </Button>

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

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Secure Connection:</strong> Your wallet connection is encrypted and secure. Credence never stores your
          private keys or has access to your funds.
        </p>
      </div>
    </div>
  )
}
