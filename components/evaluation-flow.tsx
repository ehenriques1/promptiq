"use client"

import { PromptInput } from "@/components/prompt-input"
import { PaymentStep } from "@/components/payment-step"
import { ResultsStep } from "@/components/results-step"

interface EvaluationFlowProps {
  currentStep: "input" | "payment" | "results"
  userPrompt: string
  isLoggedIn: boolean
  onPromptSubmit: (prompt: string) => void
  onPaymentComplete: () => void
  onAuth: (mode: "login" | "signup") => void
  onBackToLanding: () => void
}

export function EvaluationFlow({
  currentStep,
  userPrompt,
  isLoggedIn,
  onPromptSubmit,
  onPaymentComplete,
  onAuth,
  onBackToLanding,
}: EvaluationFlowProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${currentStep === "input" ? "text-gray-800" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "input" ? "text-black" : "bg-gray-200"
                  }`}
                  style={currentStep === "input" ? { backgroundColor: "#ebfc72" } : {}}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Input</span>
              </div>

              <div className="w-8 h-0.5 bg-gray-200"></div>

              <div className={`flex items-center ${currentStep === "payment" ? "text-gray-800" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "payment" ? "text-black" : "bg-gray-200"
                  }`}
                  style={currentStep === "payment" ? { backgroundColor: "#ebfc72" } : {}}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Payment</span>
              </div>

              <div className="w-8 h-0.5 bg-gray-200"></div>

              <div className={`flex items-center ${currentStep === "results" ? "text-gray-800" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "results" ? "text-black" : "bg-gray-200"
                  }`}
                  style={currentStep === "results" ? { backgroundColor: "#ebfc72" } : {}}
                >
                  3
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Results</span>
              </div>
            </div>
          </div>

          {currentStep === "input" && <PromptInput onSubmit={onPromptSubmit} onBack={onBackToLanding} />}

          {currentStep === "payment" && <PaymentStep onComplete={onPaymentComplete} onBack={() => {}} />}

          {currentStep === "results" && (
            <ResultsStep
              userPrompt={userPrompt}
              isLoggedIn={isLoggedIn}
              onAuth={onAuth}
              onBackToLanding={onBackToLanding}
            />
          )}
        </div>
      </div>
    </section>
  )
}
