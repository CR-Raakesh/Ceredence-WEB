# Backend Implementation Guide for Credence

This document outlines all the places where backend implementation is needed for the Credence promise management system.

## 1. Blockchain Integration (Stacks.js + Leather Wallet)

### Files requiring backend implementation:
- `app/login/page.tsx` - Wallet connection logic
- `app/dashboard/page.tsx` - User data fetching
- All promise-related pages - Smart contract interactions

### Required implementations:

#### Wallet Connection (`app/login/page.tsx`)
\`\`\`javascript
// TODO: BACKEND - Implement Leather Wallet connection
const handleConnectWallet = () => {
  // - Install and configure @stacks/connect
  // - Check if Leather Wallet is installed
  // - Request wallet connection using showConnect()
  // - Get user's Stacks address
  // - Store user session
  // - Redirect to dashboard on successful connection
}
\`\`\`

#### Smart Contract Functions Needed:
```clarity
;; Core promise management functions
(define-public (create-promise (title (string-ascii 100)) (category (string-ascii 20)) (deadline uint) (stake uint)))
(define-public (fulfill-promise (promise-id uint)))
(define-public (break-promise (promise-id uint)))
(define-read-only (get-employee-score (employee principal)))
(define-read-only (get-employee-promises (employee principal)))
(define-read-only (get-promise-details (promise-id uint)))
