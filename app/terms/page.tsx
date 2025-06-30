"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PromptIQ</h1>
            </div>
            <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border-0 p-8 sm:p-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

              <div className="space-y-2 mb-8 text-sm text-gray-600">
                <p>
                  <strong>Effective Date:</strong> June 30, 2025
                </p>
                <p>
                  <strong>Last Updated:</strong> June 30, 2025
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-8">
                  Welcome to PromptIQ. By using our platform, you agree to the following terms:
                </p>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of Service</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our platform provides AI-driven strategic insights based on data you input. You are responsible
                      for the accuracy of the information you submit.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Anonymized Data Usage</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      While we do not share your personal data, we reserve the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Collect and retain anonymized and aggregated usage data</li>
                      <li>Use this data to analyze trends, improve our platform, and generate internal insights</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      This data does not include any personally identifiable information (PII) and cannot be traced back
                      to you.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
                    <p className="text-gray-700 leading-relaxed">
                      All platform content, including prompts, analyses, and models, are the intellectual property of
                      PromptIQ, unless explicitly noted otherwise.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. No Guarantees</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our outputs are for informational purposes only. We do not guarantee business success, investment
                      outcomes, or legal compliance based on our insights.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We may update these terms occasionally. If changes are significant, we'll notify you via email or
                      in-app notification.
                    </p>
                  </section>

                  <section className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help or Have Questions?</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Reach out anytime at{" "}
                      <a
                        href="mailto:sales@kulkan.co"
                        className="font-medium hover:underline"
                        style={{ color: "#8b9f47" }}
                      >
                        sales@kulkan.co
                      </a>
                      . We're here to protect your data and support your success.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
