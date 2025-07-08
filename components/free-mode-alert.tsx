"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FreeModeAlertProps {
  // onDismiss?: () => void // No longer needed, alert is always visible
}

export function FreeModeAlert({}: FreeModeAlertProps) {
  return (
    <div className="w-full bg-[#ebfc72] text-gray-900 py-3 px-4 flex justify-center sticky top-0 z-40 border-b border-[#e5f666]">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-[#8b9f47]" />
          <span className="font-medium text-center sm:text-left">
            Free Mode: Your feedback will not be saved. Upgrade to Pro to save your analysis and track your progress.
          </span>
        </div>
        <Button
          className="bg-yellow-300 text-gray-900 font-semibold hover:bg-yellow-400 transition px-4 py-2 text-sm"
          onClick={() => {/* open upgrade modal or link */}}
        >
          Learn how to upgrade and keep your prompts
        </Button>
      </div>
    </div>
  )
} 