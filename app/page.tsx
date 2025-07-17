"use client";

import { useState } from "react"
import { Header } from "@/components/header"
import { LandingSection } from "@/components/landing-section"
import { EvaluationFlow } from "@/components/evaluation-flow"
import { AuthModal } from "@/components/auth-modal"
import { Footer } from "@/components/footer"
import { FreeModeAlert } from "@/components/free-mode-alert"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"landing" | "input" | "payment" | "results">("landing")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userPrompt, setUserPrompt] = useState("")

  const handleStartEvaluation = () => {
    setCurrentStep("input")
  }

  const handlePromptSubmit = (prompt: string) => {
    console.log('Main page received prompt:', prompt)
    setUserPrompt(prompt)
    setCurrentStep("results")
  }

  const handlePaymentComplete = () => {
    setCurrentStep("results")
  }

  const handleAuth = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isLoggedIn={isLoggedIn} onAuth={handleAuth} />
      {currentStep === "input" && <FreeModeAlert />}
      <main className="flex-1">
        {currentStep === "landing" && <LandingSection onStartEvaluation={handleStartEvaluation} />}

        {(currentStep === "input" || currentStep === "results") && (
          <EvaluationFlow
            currentStep={currentStep as "input" | "results"}
            userPrompt={userPrompt}
            isLoggedIn={isLoggedIn}
            onAuth={handleAuth}
            onBackToLanding={() => setCurrentStep("landing")}
            onPromptSubmit={handlePromptSubmit}
          />
        )}
        {/* You may want to handle 'payment' step separately if needed */}
      </main>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        mode={authMode}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        onSwitchMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
      />
    </div>
  )
} 