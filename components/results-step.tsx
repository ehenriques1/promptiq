"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Copy, ArrowLeft, Loader2, Code, Check, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye } from "lucide-react"
import { toast } from "sonner"
import { SubscriptionCTA } from "@/components/subscription-cta"
import { FreeModeAlert } from "@/components/free-mode-alert"
import { checkServerUsage } from "@/lib/usage-tracker"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ResultsStepProps {
  userPrompt: string
  isLoggedIn: boolean
  onAuth: (mode: "login" | "signup") => void
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
  const [showOriginal, setShowOriginal] = useState(false)

  useEffect(() => {
    const checkUsage = async () => {
      const usage = await checkServerUsage()
      setCanUseFree(usage.canUseFree)
      setShowFreeAlert(usage.canUseFree)
    }
    checkUsage()
  }, [])

  useEffect(() => {
    console.log('Analysis state changed:', analysis)
  }, [analysis])

  useEffect(() => {
    const evaluatePrompt = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Evaluating prompt:', userPrompt)
        console.log('Prompt length:', userPrompt.length)
        console.log('userPrompt is empty?', !userPrompt)

        if (!userPrompt || userPrompt.trim() === '') {
          console.log('No prompt provided, skipping evaluation')
          setLoading(false)
          setError('No prompt provided for evaluation')
          return
        }

                console.log('Making API call to /api/evaluate-prompt')
        console.log('Request body:', JSON.stringify({ prompt: userPrompt }))
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout
        
        const response = await fetch('/api/evaluate-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: userPrompt }),
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)

        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error:', errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()
        console.log('API Response:', JSON.stringify(data, null, 2))
        console.log('API Response type:', typeof data)
        console.log('API Response keys:', Object.keys(data))
        
        // Handle InvalidPrompt error
        if (data.error === "InvalidPrompt") {
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

        // Use new backend fields
        setJsonData(data)
        console.log('Extracting analysis from data:', {
          detailed_feedback: data.detailed_feedback,
          improvements: data.improvements,
          improved_prompt: data.improved_prompt,
          framework_mapping: data.framework_mapping,
          overall_score: data.overall_score,
          score: data.score
        })
        
        const extractedAnalysis: Analysis = {
          strengths: data.detailed_feedback ? [data.detailed_feedback] : ["No insights provided."],
          improvements: data.improvements || ["No improvement suggestions provided."],
          improved_prompt: data.improved_prompt || "No improved prompt provided.",
          framework_coverage: data.framework_mapping ? Object.keys(data.framework_mapping) : [],
          score: data.overall_score || data.score || 0,
          recommendations: data.recommendations || [],
        }
        
        console.log('Extracted analysis:', extractedAnalysis)
        setAnalysis(extractedAnalysis)
        console.log('Analysis state should now be set')
      } catch (err) {
        console.error('Error evaluating prompt:', err)
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('Request timed out. Please try again.')
          } else if (err.message.includes('Failed to fetch')) {
            setError('Network error. Please check your connection and try again.')
          } else {
            setError(`Failed to evaluate prompt: ${err.message}`)
          }
        } else {
          setError('Failed to evaluate prompt. Please try again.')
        }
      } finally {
        console.log('Setting loading to false')
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

  console.log('Rendering ResultsStep - loading:', loading, 'analysis:', analysis, 'error:', error)
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your prompt...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    // Show more specific error messages for shallow-quality guard
    let title = "Prompt Error";
    let message = error;
    if (error.includes("too short")) {
      title = "Prompt Too Short";
      message = "Please enter at least 40 characters.";
    } else if (error.includes("at least 6 words")) {
      title = "Prompt Too Short";
      message = "Please enter a prompt with at least 6 words.";
    } else if (error.includes("instruction phrase")) {
      title = "Instruction Missing";
      message = "Please include an instruction phrase such as 'you are', 'respond', 'return', 'step', 'task', 'format', 'explain', 'analyze', or 'summarize'.";
    } else if (error.includes("empty")) {
      title = "Prompt Empty";
      message = "Please enter a prompt for evaluation.";
    }
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center px-2 sm:px-0">
          <div className="text-center max-w-md w-full mx-auto p-4 sm:p-6 rounded-lg border border-amber-100 shadow-sm bg-amber-50">
            <div className="text-amber-500 mb-4">
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">{message}</p>
            <Button onClick={onBackToLanding} className="w-full sm:w-auto bg-[#ebfc72] text-black hover:bg-[#e5f666]">
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
      {/* {showFreeAlert && <FreeModeAlert />} */}
      
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {/* Subscription CTA */}
        <div className="mb-8">
          <SubscriptionCTA variant="results" onSubscribe={() => {
            // Handle subscription logic here
            console.log('Subscribe clicked from results')
          }} />
        </div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-0 w-full">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button 
              onClick={onBackToLanding} 
              variant="outline" 
              className="flex items-center bg-transparent w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={() => setShowJson(!showJson)}
              variant="outline"
              className="flex items-center w-full sm:w-auto"
            >
              {showJson ? <Eye className="mr-2 h-4 w-4" /> : <Code className="mr-2 h-4 w-4" />}
              {showJson ? "Show Text" : "Show JSON"}
            </Button>
            {!isLoggedIn && (
              <Button onClick={() => onAuth('signup')} className="bg-[#ebfc72] text-black hover:bg-[#e5f666] w-full sm:w-auto">
                Create Account to Save
              </Button>
            )}
          </div>
        </div>

        {/* Prompt Score Section - strict to provided design */}
        {analysis.score !== undefined && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl sm:text-2xl font-extrabold text-gray-700">Prompt Score</span>
              <Dialog>
                <DialogTrigger asChild>
                  <button aria-label="Scoring Info" className="ml-2 w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#f5ff80', border: 'none', outline: 'none', borderRadius: '50%' }}>
                    <span className="text-2xl font-extrabold" style={{ color: '#333' }}>i</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>How is the score calculated?</DialogTitle>
                  </DialogHeader>
                  <div className="text-gray-700 text-base space-y-2">
                    <p>The score (0-10) reflects your prompt's structure, clarity, role definition, context, constraints, and error handling.</p>
                    <ul className="list-disc pl-6 text-sm">
                      <li><b>8-10:</b> Excellent prompt with clear structure and comprehensive guidelines.</li>
                      <li><b>6-7:</b> Good prompt with room for improvement.</li>
                      <li><b>4-5:</b> Average prompt needing significant refinement.</li>
                      <li><b>0-3:</b> Basic prompt requiring major improvements.</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="text-[2.5rem] sm:text-[3.5rem] leading-none font-extrabold text-gray-600 mb-2">{Math.round((analysis.score / 20) * 10) / 10}/10</div>
          </div>
        )}

        {/* Collapsible Original Prompt */}
        <Card className="mb-6 w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setShowOriginal(!showOriginal)}>
            <CardTitle>Your Original Prompt</CardTitle>
            <Button variant="ghost" size="icon" aria-label="Toggle Original Prompt">
              {showOriginal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </CardHeader>
          {showOriginal && (
            <CardContent>
              <pre className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{userPrompt}</pre>
            </CardContent>
          )}
        </Card>

        {/* What This Prompt Gets Right */}
        {analysis.strengths && analysis.strengths.length > 0 && (
          <Card className="mb-6 w-full">
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

        {/* What Needs Improvement */}
        {analysis.improvements && analysis.improvements.length > 0 && (
          <Card className="mb-6 w-full">
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

        {/* Improved Prompt */}
        {analysis.improved_prompt && (
          <Card className="mb-6 w-full">
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

        {/* Remove redundant score at the bottom */}
      </div>
    </div>
  )
}
