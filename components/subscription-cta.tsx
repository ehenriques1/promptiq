"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface SubscriptionCTAProps {
  variant?: "prompt-input" | "results"
  onSubscribe?: () => void
}

export function SubscriptionCTA({ variant = "prompt-input", onSubscribe }: SubscriptionCTAProps) {
  const isResultsPage = variant === "results"
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Card className="border-2 border-[#ebfc72] bg-[#f8fce8] shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#ebfc72] rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isResultsPage ? "Unlock Your Full Potential" : "Go Pro & Save Time"}
              </h3>
              <p className="text-gray-700 mb-4">
                {isResultsPage 
                  ? "Save this analysis and get unlimited prompt evaluations with progress tracking."
                  : "Get unlimited evaluations, save your prompts, and track your progress."
                }
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Up to 10 prompts per month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Save & track your progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Up to 3 revisions per prompt</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  $5<span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                <Button 
                  onClick={() => setOpen(true)}
                  className="bg-[#ebfc72] hover:bg-[#e5f666] text-black px-6 py-2 shadow-none border border-[#ebfc72]"
                >
                  Upgrade Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md mx-auto rounded-lg p-8 bg-white border border-[#ebfc72]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#ebfc72]" /> Go Pro & Save Time
            </DialogTitle>
            <DialogDescription className="text-gray-700 mb-4">
              Get unlimited evaluations, save your prompts, and track your progress.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2 text-base text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" /> Up to 10 prompts per month
            </li>
            <li className="flex items-center gap-2 text-base text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" /> Save & track your progress
            </li>
            <li className="flex items-center gap-2 text-base text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" /> Up to 3 revisions per prompt
            </li>
          </ul>
          <div className="text-2xl font-bold text-gray-900 mb-2">$5<span className="text-base font-normal text-gray-600">/month</span></div>
          <Button className="w-full bg-[#ebfc72] hover:bg-[#e5f666] text-black mt-4" onClick={() => setOpen(false)}>
            Continue to Payment
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
} 