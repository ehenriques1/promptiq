"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface PromptInputProps {
  onSubmit: (prompt: string) => void
  onBack: () => void
}

export function PromptInput({ onSubmit, onBack }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt)
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Paste your prompt below</CardTitle>
        <p className="text-gray-600 mt-2">We'll evaluate it against 24 expert-level prompt structures</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here... For example: 'Write a blog post about artificial intelligence'"
          className="min-h-[200px] text-base resize-none border-gray-200"
          style={{ "--tw-ring-color": "#ebfc72" } as React.CSSProperties}
          onFocus={(e) => (e.target.style.borderColor = "#ebfc72")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        />

        <div className="border rounded-lg p-4" style={{ backgroundColor: "#f8fce8", borderColor: "#ebfc72" }}>
          <p className="text-gray-800 text-sm">
            💡 <strong>Note:</strong> You'll be able to edit and save your improved prompt after payment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex items-center justify-center bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="flex-1 text-black py-3"
            style={{ backgroundColor: "#ebfc72" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
          >
            Continue to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
