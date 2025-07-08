"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FreeModeAlert() {
  return (
    <div className="w-full bg-[#ebfc72] text-gray-900 py-5 px-8 flex items-center justify-between sticky top-0 z-40 border-b border-[#e5f666]">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-[#8b9f47]" />
        <span className="font-medium text-base">
          Free Mode: Your feedback will not be saved. Upgrade to Pro to save your analysis and track your progress.
        </span>
      </div>
      <Button
        className="bg-yellow-300 text-gray-900 font-semibold hover:bg-yellow-400 transition px-6 py-3 text-base shadow-md"
        onClick={() => {/* open upgrade modal or link */}}
      >
        Upgrade Now
        <span className="ml-2">→</span>
      </Button>
    </div>
  )
} 