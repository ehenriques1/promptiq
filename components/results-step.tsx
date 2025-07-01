"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Copy, Save, ArrowLeft, Loader2, FileText, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ResultsStepProps {
  isLoggedIn: boolean
  onAuth: (mode: "login" | "signup") => void
  onBackToLanding: () => void
}

interface PromptAnalysis {
  strengths: string[]
  improvements: string[]
  optimizedPrompt: string
  rawData?: any // Store the raw API response for JSON view
}

export function ResultsStep({ isLoggedIn, onAuth, onBackToLanding }: ResultsStepProps) {
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [originalPrompt, setOriginalPrompt] = useState("")
  const [copying, setCopying] = useState(false)
  const [showJson, setShowJson] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const prompt = localStorage.getItem("userPrompt") || ""
    setOriginalPrompt(prompt)
    const evaluatePrompt = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/evaluate-prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          throw new Error("Failed to evaluate prompt")
        }

        const data = await response.json()
        // Try both v0 and new format
        let parsed: any = null
        try {
          parsed = JSON.parse(data.result)
        } catch {
          parsed = data
        }
        
        // Handle new Kulkan PromptIQ Evaluator format
        if (parsed.overall_score !== undefined) {
          // New format - extract strengths from framework coverage
          const strengths = []
          const improvements = parsed.improvements || []
          
          // Generate strengths from framework coverage
          if (parsed.framework_coverage) {
            const matchedFrameworks = Object.entries(parsed.framework_coverage)
              .filter(([_, status]) => status === "match")
              .map(([framework, _]) => framework)
            
            if (matchedFrameworks.length > 0) {
              strengths.push(`Uses ${matchedFrameworks.length} elite prompt framework${matchedFrameworks.length > 1 ? 's' : ''}: ${matchedFrameworks.join(', ')}`)
            }
            
            const partialFrameworks = Object.entries(parsed.framework_coverage)
              .filter(([_, status]) => status === "partial")
              .map(([framework, _]) => framework)
            
            if (partialFrameworks.length > 0) {
              strengths.push(`Shows elements of: ${partialFrameworks.join(', ')}`)
            }
          }
          
          // Add score-based strengths
          if (parsed.overall_score >= 15) {
            strengths.push("High overall quality score")
          } else if (parsed.overall_score >= 10) {
            strengths.push("Good foundation with room for improvement")
          }
          
          // Fallback strengths if none generated
          if (strengths.length === 0) {
            strengths.push("The prompt provides a clear task or request")
          }
          
          setAnalysis({
            strengths: strengths,
            improvements: improvements,
            optimizedPrompt: parsed.improved_prompt || "",
            rawData: parsed // Store the full JSON response
          })
        } else {
          // Legacy format handling
          let strengths = parsed.strengths || []
          let improvements = parsed.improvements || []
          
          // If no strengths/improvements from API, generate them from other fields
          if (strengths.length === 0) {
            strengths = []
            if (parsed.clarity && parsed.clarity.includes("good") || parsed.clarity.includes("clear")) {
              strengths.push("Clear and understandable instructions")
            }
            if (parsed.specificity && parsed.specificity.includes("good") || parsed.specificity.includes("specific")) {
              strengths.push("Specific and detailed requirements")
            }
            if (parsed.context && parsed.context.includes("good") || parsed.context.includes("context")) {
              strengths.push("Good context provided")
            }
            if (strengths.length === 0) {
              strengths = ["The prompt provides a clear task or request"]
            }
          }
          
          if (improvements.length === 0) {
            improvements = parsed.suggestions || []
            if (improvements.length === 0) {
              improvements = ["Consider adding more specific constraints", "Provide additional context if needed"]
            }
          }
          
          setAnalysis({
            strengths: strengths,
            improvements: improvements,
            optimizedPrompt: parsed.optimizedPrompt || parsed.improved_prompt || "",
            rawData: parsed // Store the full JSON response
          })
        }
      } catch (err) {
        setError("Failed to evaluate prompt. Please try again.")
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    if (prompt) evaluatePrompt()
    else setLoading(false)
  }, [])

  const handleCopyPrompt = async () => {
    if (!analysis?.optimizedPrompt) {
      toast({
        title: "No prompt to copy",
        description: "The improved prompt is not available yet.",
        variant: "destructive",
      })
      return
    }

    try {
      setCopying(true)
      await navigator.clipboard.writeText(analysis.optimizedPrompt)
      toast({
        title: "Copied!",
        description: "The improved prompt has been copied to your clipboard.",
      })
    } catch (err) {
      console.error("Failed to copy:", err)
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      })
    } finally {
      setCopying(false)
    }
  }

  const handleCopyJson = async () => {
    if (!analysis?.rawData) {
      toast({
        title: "No JSON data available",
        description: "The detailed analysis data is not available.",
        variant: "destructive",
      })
      return
    }

    try {
      setCopying(true)
      const jsonString = JSON.stringify(analysis.rawData, null, 2)
      await navigator.clipboard.writeText(jsonString)
      toast({
        title: "JSON Copied!",
        description: "The detailed analysis has been copied to your clipboard.",
      })
    } catch (err) {
      console.error("Failed to copy JSON:", err)
      toast({
        title: "Copy failed",
        description: "Please select and copy the JSON manually.",
        variant: "destructive",
      })
    } finally {
      setCopying(false)
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
    <div className="py-12 flex justify-center bg-[#f9f9f6] min-h-screen">
      <div className="w-full max-w-2xl space-y-8">
        {/* View Toggle */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-1 shadow-lg border">
            <div className="flex">
              <Button
                onClick={() => setShowJson(false)}
                variant={!showJson ? "default" : "ghost"}
                size="sm"
                className={`flex items-center gap-2 ${!showJson ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
              >
                <FileText className="h-4 w-4" />
                Simple View
              </Button>
              <Button
                onClick={() => setShowJson(true)}
                variant={showJson ? "default" : "ghost"}
                size="sm"
                className={`flex items-center gap-2 ${showJson ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
              >
                <Code className="h-4 w-4" />
                JSON Feed
              </Button>
            </div>
          </div>
        </div>

        {!showJson ? (
          // Simple Text View
          <>
            {/* Original Prompt */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  📝 Your Original Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border">
                  <pre className="whitespace-pre-wrap text-gray-800">{originalPrompt}</pre>
                </div>
              </CardContent>
            </Card>

            {/* What This Prompt Gets Right */}
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
                  🛠️ Your Improved Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border">
                  <pre className="whitespace-pre-wrap text-gray-800">{analysis.optimizedPrompt}</pre>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <Button
                    onClick={handleCopyPrompt}
                    disabled={copying || !analysis?.optimizedPrompt}
                    className="w-full sm:w-auto flex items-center justify-center text-black"
                    style={{ backgroundColor: "#ebfc72" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
                  >
                    {copying ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copying ? "Copying..." : "Copy Improved Prompt"}
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
          </>
        ) : (
          // JSON Feed View
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Code className="h-5 w-5" />
                Detailed Analysis (JSON)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border max-h-96 overflow-auto">
                <pre className="whitespace-pre-wrap text-gray-800">
                  {JSON.stringify(analysis.rawData, null, 2)}
                </pre>
              </div>
              
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  onClick={handleCopyJson}
                  disabled={copying || !analysis?.rawData}
                  className="w-full sm:w-auto flex items-center justify-center text-black"
                  style={{ backgroundColor: "#ebfc72" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
                >
                  {copying ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copying ? "Copying..." : "Copy JSON Data"}
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  This JSON contains the complete analysis including framework coverage, scores, and detailed metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center pt-6">
          <Button onClick={onBackToLanding} variant="outline" className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Evaluate Another Prompt
          </Button>
        </div>
      </div>
    </div>
  )
}
