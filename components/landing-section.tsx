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
              Why spend 4 hours tweaking a prompt when you can get a sharper, smarter one in 20 seconds—for just $5/month?
            </p>

            <p>
              PromptIQ analyzes your prompt like a strategist—scanning it against 24 elite prompt frameworks to instantly deliver feedback and optimized versions that get better results.
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <Edit3 className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Input Your Prompt</div>
                <div className="text-gray-600 text-base text-center">Paste your current prompt into our evaluation tool</div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <CreditCard className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Secure Payment</div>
                <div className="text-gray-600 text-base text-center">Quick $5 payment to unlock your personalized analysis</div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <Zap className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">AI Analysis</div>
                <div className="text-gray-600 text-base text-center">Our AI evaluates against carefully curated elite prompt engineering frameworks in seconds</div>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <Download className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Get Results</div>
                <div className="text-gray-600 text-base text-center">Receive your optimized prompt with detailed feedback, ready to copy and paste for immediate use</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mt-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16">What You Get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Analyze Structure</div>
                <div className="text-gray-600 text-base text-center">Compare against 24 elite prompt frameworks</div>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Get Feedback</div>
                <div className="text-gray-600 text-base text-center">See what works and what needs improvement</div>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f5ff8a' }}>
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Improve Results</div>
                <div className="text-gray-600 text-base text-center">Get an optimized version of your prompt</div>
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
