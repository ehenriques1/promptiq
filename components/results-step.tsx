"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Copy, Save, ArrowLeft, Loader2, FileText, Code, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye } from "lucide-react"
import { toast } from "sonner"
import { SubscriptionCTA } from "@/components/subscription-cta"
import { FreeModeAlert } from "@/components/free-mode-alert"
import { checkServerUsage } from "@/lib/usage-tracker"

interface ResultsStepProps {
  userPrompt: string
  isLoggedIn: boolean
  onAuth: () => void
  onBackToLanding: () => void
}

interface Analysis {
  strengths?: string[]
  improvements?: string[]
  improved_prompt?: string
  framework_coverage?: string[]
  score?: number
  recommendations?: string[]
}

export function ResultsStep({ userPrompt, isLoggedIn, onAuth, onBackToLanding }: ResultsStepProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showJson, setShowJson] = useState(false)
  const [jsonData, setJsonData] = useState<any>(null)
  const [canUseFree, setCanUseFree] = useState(true)
  const [showFreeAlert, setShowFreeAlert] = useState(false)

  useEffect(() => {
    const checkUsage = async () => {
      const usage = await checkServerUsage()
      setCanUseFree(usage.canUseFree)
      setShowFreeAlert(usage.canUseFree)
    }
    checkUsage()
  }, [])

  useEffect(() => {
    const evaluatePrompt = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/evaluate-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: userPrompt }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        // Handle InvalidPrompt error
        if (data.error === "InvalidPrompt") {
          // Show a more prominent toast for InvalidPrompt
          toast.error(data.message || "Please submit a longer, instruction-style prompt.", {
            duration: 5000,
            style: {
              background: '#ef4444',
              color: 'white',
              fontSize: '16px',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '400px',
              margin: '0 auto'
            }
          })
          setError(data.message || "Please submit a longer, instruction-style prompt.")
          setLoading(false)
          return
        }

        // Try both v0 and new format
        let parsed: any = null
        try {
          parsed = JSON.parse(data.result)
        } catch {
          parsed = data
        }

        setJsonData(parsed)

        // Extract data with fallbacks
        const extractedAnalysis: Analysis = {
          strengths: parsed.strengths || parsed.what_works || [],
          improvements: parsed.improvements || parsed.what_needs_improvement || [],
          improved_prompt: parsed.improved_prompt || parsed.better_prompt || "",
          framework_coverage: parsed.framework_coverage || [],
          score: parsed.score || 0,
          recommendations: parsed.recommendations || [],
        }

        setAnalysis(extractedAnalysis)
      } catch (err) {
        console.error('Error evaluating prompt:', err)
        setError('Failed to evaluate prompt. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (userPrompt) {
      evaluatePrompt()
    }
  }, [userPrompt])

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(`${type} copied to clipboard!`)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const copyJsonToClipboard = async () => {
    if (jsonData) {
      await copyToClipboard(JSON.stringify(jsonData, null, 2), "JSON data")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your prompt...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    // For InvalidPrompt errors, show a simpler message since we already show a toast
    if (error.includes("instruction-style prompt") || error.includes("InvalidPrompt")) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="text-amber-500 mb-4">
                <AlertTriangle className="w-16 h-16 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Prompt Too Short</h2>
              <p className="text-gray-600 mb-6">Please submit a longer, instruction-style prompt for evaluation.</p>
              <Button onClick={onBackToLanding} className="bg-[#ebfc72] text-black hover:bg-[#e5f666]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Evaluation Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={onBackToLanding} className="bg-[#ebfc72] text-black hover:bg-[#e5f666]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">No analysis available</p>
            <Button onClick={onBackToLanding} className="mt-4 bg-[#ebfc72] text-black hover:bg-[#e5f666]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Landing
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {showFreeAlert && <FreeModeAlert onDismiss={() => setShowFreeAlert(false)} />}
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Subscription CTA */}
        <div className="mb-8">
          <SubscriptionCTA variant="results" onSubscribe={() => {
            // Handle subscription logic here
            console.log('Subscribe clicked from results')
          }} />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBackToLanding} 
            variant="outline" 
            className="flex items-center bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowJson(!showJson)}
              variant="outline"
              className="flex items-center"
            >
              {showJson ? <Eye className="mr-2 h-4 w-4" /> : <Code className="mr-2 h-4 w-4" />}
              {showJson ? "Show Text" : "Show JSON"}
            </Button>
            
            {!isLoggedIn && (
              <Button onClick={onAuth} className="bg-[#ebfc72] text-black hover:bg-[#e5f666]">
                Create Account to Save
              </Button>
            )}
          </div>
        </div>

        {showJson ? (
          /* JSON View */
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                JSON Response
                <Button
                  onClick={copyJsonToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy JSON"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ) : (
          /* Text View */
          <>
            {/* Original Prompt */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Original Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{userPrompt}</p>
              </CardContent>
            </Card>

            {/* Framework Coverage */}
            {analysis.framework_coverage && analysis.framework_coverage.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Framework Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.framework_coverage.map((framework, index) => (
                      <Badge key={index} variant="secondary">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Score */}
            {analysis.score !== undefined && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#ebfc72] bg-black px-4 py-2 rounded-lg inline-block">
                    {analysis.score}/10
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Strengths */}
            {analysis.strengths && analysis.strengths.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>What This Prompt Gets Right</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Improvements */}
            {analysis.improvements && analysis.improvements.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>What Needs Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">⚠</span>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">💡</span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Improved Prompt */}
            {analysis.improved_prompt && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Your Improved Prompt
                    <Button
                      onClick={() => copyToClipboard(analysis.improved_prompt!, "Improved prompt")}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{analysis.improved_prompt}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
