"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaymentButton } from "@/components/payment-button"

export function FreeModeAlert() {
  return (
    <div className="w-full bg-[#ebfc72] text-gray-900 py-6 px-8 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-40 border-b border-[#e5f666] shadow-sm">
      <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start mb-4 sm:mb-0">
        <AlertTriangle className="w-6 h-6 text-[#8b9f47]" />
        <span className="font-medium text-lg text-center sm:text-left">
          Free Mode! Your feedback will not be saved. Upgrade to <b>PromptIQ Plus</b> to save your analysis and track your progress.
        </span>
      </div>
      <PaymentButton
        prompt={"upgrade"}
        className="bg-yellow-300 text-gray-900 font-semibold hover:bg-yellow-400 transition px-8 py-4 text-lg shadow-lg rounded-lg"
        label="Upgrade Now"
      />
    </div>
  )
} 