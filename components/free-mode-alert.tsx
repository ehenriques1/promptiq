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
    <div className="w-full bg-[#ebfc72] text-gray-900 py-3 px-6 flex items-center justify-between text-base font-medium shadow-sm z-50 border-b border-[#e5f666]">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-[#8b9f47]" />
        <span>Free Mode: Your feedback will not be saved. Upgrade to Pro to save your analysis and track your progress.</span>
      </div>
      <button onClick={onDismiss} className="ml-4 text-gray-700 hover:text-black focus:outline-none">
        <X className="w-6 h-6" />
      </button>
    </div>
  )
} 