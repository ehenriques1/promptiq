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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">✅ How It Works</h2>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Check your prompt for free — no strings attached.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Paste it. Analyze it. Get feedback instantly.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  But here's the catch: if you leave or refresh the page, your feedback disappears.
                </p>
                <p className="text-lg text-gray-700">
                  Want to track your best prompts, see improvements, and iterate like a pro? That's where PromptIQ shines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* What You Get Section */}
          <div className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">🚀 What You Get</h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  • 1 free evaluation, no account needed
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  • Or go Pro: just $5/month
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <ul className="space-y-3 text-gray-700">
                  <li>– Analyze up to 10 unique prompts per month</li>
                  <li>– Track your versions and progress</li>
                  <li>– Up to 3 revisions per prompt</li>
                  <li>– All for less than the price of a coffee ☕</li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 mt-6">
                See what's working, what's not, and how to consistently get better outputs.
              </p>
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
