"use client"

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isLoggedIn={false} onAuth={() => {}} />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="text-sm text-gray-600 mb-8">
              <p><strong>Effective Date:</strong> January 1, 2025</p>
              <p><strong>Last Updated:</strong> January 1, 2025</p>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              Welcome to PromptIQ. By using our platform, you agree to the following terms:
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Use of Service</h2>
                <p className="text-gray-700">
                  Our platform provides AI-driven prompt evaluation and optimization based on data you input. 
                  You are responsible for the accuracy of the information you submit.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Anonymized Data Usage</h2>
                <p className="text-gray-700 mb-3">
                  While we do not share your personal data, we reserve the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Collect and retain anonymized and aggregated usage data</li>
                  <li>Use this data to analyze trends, improve our platform, and generate internal insights</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  This data does not include any personally identifiable information (PII) and cannot be traced back to you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
                <p className="text-gray-700">
                  All platform content, including prompts, analyses, and models, are the intellectual property of PromptIQ, 
                  unless explicitly noted otherwise.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. No Guarantees</h2>
                <p className="text-gray-700">
                  Our outputs are for informational purposes only. We do not guarantee business success, 
                  investment outcomes, or legal compliance based on our insights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Changes to Terms</h2>
                <p className="text-gray-700">
                  We may update these terms occasionally. If changes are significant, we'll notify you via email or in-app notification.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Need Help or Have Questions?</h2>
              <p className="text-gray-700">
                Reach out anytime at{' '}
                <a 
                  href="mailto:sales@kulkan.co" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  sales@kulkan.co
                </a>
                . We're here to protect your data and support your success.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 