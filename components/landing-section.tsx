"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Edit3, CreditCard, Zap, Download } from "lucide-react"

interface LandingSectionProps {
  onStartEvaluation: () => void
}

export function LandingSection({ onStartEvaluation }: LandingSectionProps) {
  return (
    <section className="py-12 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What's Your{" "}
            <span className="inline-block px-4 py-2 rounded-lg text-black" style={{ backgroundColor: "#ebfc72" }}>
              PromptIQ
            </span>
            ?
          </h1>

          <div className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto space-y-4">
            <p>
              Why spend 4 hours tweaking a prompt when you can get a sharper, smarter one in 20 seconds—for just $3?
            </p>

            <p>
              PromptIQ evaluates your prompt like a strategist, using carefully curated elite prompt engineering
              frameworks and precision-tuned criteria to instantly deliver a version that drives better results.
            </p>
          </div>

          <Button
            onClick={onStartEvaluation}
            size="lg"
            className="text-black px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ backgroundColor: "#ebfc72" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
          >
            Start Evaluation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* How It Works Section with Light Grey Background */}
      <div className="w-full bg-gray-50 mt-20 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">How It Works</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <Edit3 className="h-8 w-8 text-gray-800" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className="inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-black"
                    style={{ backgroundColor: "#ebfc72" }}
                  >
                    1
                  </span>
                  <h3 className="font-semibold text-gray-900 text-lg">Input Your Prompt</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Paste your current prompt into our evaluation tool
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <CreditCard className="h-8 w-8 text-gray-800" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className="inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-black"
                    style={{ backgroundColor: "#ebfc72" }}
                  >
                    2
                  </span>
                  <h3 className="font-semibold text-gray-900 text-lg">Secure Payment</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Quick $3 payment to unlock your personalized analysis
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <Zap className="h-8 w-8 text-gray-800" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className="inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-black"
                    style={{ backgroundColor: "#ebfc72" }}
                  >
                    3
                  </span>
                  <h3 className="font-semibold text-gray-900 text-lg">AI Analysis</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our AI evaluates against carefully curated elite prompt engineering frameworks in seconds
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <Download className="h-8 w-8 text-gray-800" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span
                    className="inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-black"
                    style={{ backgroundColor: "#ebfc72" }}
                  >
                    4
                  </span>
                  <h3 className="font-semibold text-gray-900 text-lg">Get Results</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Receive your optimized prompt with detailed feedback, ready to copy and paste for immediate use
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Original 3-step process */}
          <div className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">What You Get</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <CheckCircle className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Analyze Structure</h3>
                <p className="text-gray-600 text-sm">Compare against 24 elite prompt frameworks</p>
              </div>

              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <CheckCircle className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Feedback</h3>
                <p className="text-gray-600 text-sm">See what works and what needs improvement</p>
              </div>

              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#ebfc72" }}
                >
                  <CheckCircle className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Improve Results</h3>
                <p className="text-gray-600 text-sm">Get an optimized version of your prompt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross bar section */}
      <div className="w-full bg-black mt-16" style={{ height: "200px" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-medium text-center max-w-5xl leading-tight">
            Join top prompt engineers saving hours—and outperforming their past selves—for less than the price of a
            coffee.
          </p>
        </div>
      </div>

      {/* Second CTA Button */}
      <div className="w-full bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button
            onClick={onStartEvaluation}
            size="lg"
            className="text-black px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ backgroundColor: "#ebfc72" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
          >
            Start Evaluation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
