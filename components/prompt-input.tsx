"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PaymentButton } from "@/components/payment-button"
import { SubscriptionCTA } from "@/components/subscription-cta"
import { FreeModeAlert } from "@/components/free-mode-alert"
import { checkServerUsage } from "@/lib/usage-tracker"

interface PromptInputProps {
  onBack: () => void
}

export function PromptInput({ onBack }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")
  const [canUseFree, setCanUseFree] = useState(true)
  const [usageCount, setUsageCount] = useState(0)
  const [showFreeAlert, setShowFreeAlert] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUsage = async () => {
      const usage = await checkServerUsage()
      setCanUseFree(usage.canUseFree)
      setUsageCount(usage.usageCount)
      setShowFreeAlert(usage.canUseFree)
    }
    checkUsage()
  }, [])

  const handleSubmit = () => {
    if (!prompt.trim()) return
    localStorage.setItem("userPrompt", prompt)
    const toolPrompt = `You are a senior prompt strategist trained in evaluating and optimizing AI prompts across diverse use cases (chat, classification, generation, reasoning, etc.). Your job is to audit the structure, clarity, intent, and effectiveness of a given prompt and return a clean, structured analysis in strict JSON format.

Please analyze the following prompt using the criteria below:

1. Clarity: Is the prompt unambiguous and well-structured?
2. Intent Alignment: Does the prompt clearly communicate its goal to the model?
3. Framework Fit: Does it follow any recognized best-practice prompt patterns (e.g., role-based, step-by-step, zero/few-shot)?
4. Risk Factors: Any signs of vague phrasing, overload, conflicting tasks, or hallucination risk?
5. Output Constraints: Are there formatting, tone, or content structure requirements?

Return only valid JSON in this format:

{
  "strengths": [
    "Clearly specifies the assistant's role as a summarizer.",
    "Includes structured formatting instructions for the output."
  ],
  "improvements": [
    "Prompt is overly broad in intent — could be narrowed to a specific task.",
    "Missing example output for clearer alignment."
  ],
  "optimizedPrompt": "You are a summarization assistant tasked with distilling long-form text into 3 bullet points. Use clear, concise language and maintain factual integrity. Output must be in Markdown format."
}

Only output valid JSON. Do not explain your reasoning outside the JSON block.

Evaluate this prompt:`
    localStorage.setItem("toolPrompt", toolPrompt)
    router.push("/results") // we'll simulate post-payment result view
  }

  return (
    <div>
      {showFreeAlert && <FreeModeAlert onDismiss={() => setShowFreeAlert(false)} />}
      
      <div className="space-y-6">
        <SubscriptionCTA variant="prompt-input" onSubscribe={() => {
          // Handle subscription logic here
          console.log('Subscribe clicked')
        }} />
        
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

              <PaymentButton 
                prompt={prompt}
                className="flex-1 text-black py-3 bg-[#ebfc72] hover:bg-[#e5f666]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}