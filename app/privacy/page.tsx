"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacyPage() {
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
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

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
                  Your privacy matters to us. At PromptIQ, we are committed to protecting your personal information and
                  maintaining your trust. This Privacy Policy explains what data we collect, how we use it, and most
                  importantly — what we don't do with it.
                </p>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What We Collect</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Basic account information (name, email, phone — only if you choose to provide it)</li>
                      <li>Responses you submit during onboarding or while using our AI tools</li>
                      <li>Technical data (device type, browser, IP address) for security and diagnostics</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What We Don't Do</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        We never sell, rent, or share your personal information with third parties for marketing or
                        advertising purposes.
                      </li>
                      <li>We do not use your data to train third-party models.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">We use your data solely to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Provide and improve our services</li>
                      <li>Ensure system integrity and performance</li>
                      <li>Deliver results from our platform to you</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                    <p className="text-gray-700 leading-relaxed">
                      All data is encrypted in transit and at rest. We follow industry best practices to protect against
                      unauthorized access, misuse, or disclosure.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Control</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">You may request to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Access the data we have on you</li>
                      <li>Delete your account and associated data</li>
                      <li>Revoke any previously given permissions</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      To exercise your rights, contact us at{" "}
                      <a
                        href="mailto:sales@kulkan.co"
                        className="font-medium hover:underline"
                        style={{ color: "#8b9f47" }}
                      >
                        sales@kulkan.co
                      </a>
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
