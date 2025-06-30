"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Copy, Save, ArrowLeft, Loader2 } from "lucide-react"

interface ResultsStepProps {
  userPrompt: string
  isLoggedIn: boolean
  onAuth: (mode: "login" | "signup") => void
  onBackToLanding: () => void
}

interface PromptAnalysis {
  strengths: string[]
  improvements: string[]
  optimizedPrompt: string
}

export function ResultsStep({ userPrompt, isLoggedIn, onAuth, onBackToLanding }: ResultsStepProps) {
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const evaluatePrompt = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/evaluate-prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: userPrompt }),
        })

        if (!response.ok) {
          throw new Error("Failed to evaluate prompt")
        }

        const data = await response.json()
        setAnalysis(data)
      } catch (err) {
        setError("Failed to evaluate prompt. Please try again.")
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }

    evaluatePrompt()
  }, [userPrompt])

  const handleCopyPrompt = () => {
    if (analysis?.optimizedPrompt) {
      navigator.clipboard.writeText(analysis.optimizedPrompt)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" style={{ color: "#8b9f47" }} />
          <p className="text-gray-600">Analyzing your prompt...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* What Works */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            What This Prompt Gets Right
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* What Needs Improvement */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
            What Needs Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            {analysis.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Improved Prompt */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "#8b9f47" }}>
            🛠 Your Improved Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border">
            <pre className="whitespace-pre-wrap text-gray-800">{analysis.optimizedPrompt}</pre>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              onClick={handleCopyPrompt}
              className="w-full sm:w-auto flex items-center justify-center text-black"
              style={{ backgroundColor: "#ebfc72" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Improved Prompt
            </Button>

            {isLoggedIn ? (
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center bg-transparent">
                <Save className="mr-2 h-4 w-4" />
                Save to My Prompts
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center sm:text-left">
                  Sign up to save your improved prompt and view your prompt history
                </p>
                <Button onClick={() => onAuth("signup")} variant="outline" className="w-full sm:w-auto bg-transparent">
                  Create Account to Save
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Button onClick={onBackToLanding} variant="outline" className="flex items-center gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Evaluate Another Prompt
        </Button>
      </div>
    </div>
  )
}
