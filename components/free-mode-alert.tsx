"use client"

import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"

interface FreeModeAlertProps {
  onDismiss?: () => void
}

export function FreeModeAlert({ onDismiss }: FreeModeAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <div className="w-full bg-amber-500 border-b border-amber-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
            <div className="text-white">
              <span className="font-medium">Free Mode:</span>
              <span className="ml-1">
                Your feedback will not be saved. Upgrade to Pro to save your analysis and track your progress.
              </span>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="text-white hover:text-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 