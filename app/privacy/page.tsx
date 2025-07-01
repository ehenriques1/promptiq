"use client"

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isLoggedIn={false} onAuth={() => {}} />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="text-sm text-gray-600 mb-8">
              <p><strong>Effective Date:</strong> January 1, 2025</p>
              <p><strong>Last Updated:</strong> January 1, 2025</p>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              Your privacy matters to us. At PromptIQ, we are committed to protecting your personal information 
              and maintaining your trust. This Privacy Policy explains what data we collect, how we use it, 
              and most importantly — what we don't do with it.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What We Collect</h2>
                <p className="text-gray-700 mb-3">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Basic account information (name, email, phone — only if you choose to provide it)</li>
                  <li>Responses you submit during onboarding or while using our AI tools</li>
                  <li>Technical data (device type, browser, IP address) for security and diagnostics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. What We Don't Do</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>We never sell, rent, or share your personal information with third parties for marketing or advertising purposes.</li>
                  <li>We do not use your data to train third-party models.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-3">
                  We use your data solely to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Provide and improve our services</li>
                  <li>Ensure system integrity and performance</li>
                  <li>Deliver results from our platform to you</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
                <p className="text-gray-700">
                  All data is encrypted in transit and at rest. We follow industry best practices to protect 
                  against unauthorized access, misuse, or disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Control</h2>
                <p className="text-gray-700 mb-3">
                  You may request to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Access the data we have on you</li>
                  <li>Delete your account and associated data</li>
                  <li>Revoke any previously given permissions</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  To exercise your rights, contact us at{' '}
                  <a 
                    href="mailto:sales@kulkan.co" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    sales@kulkan.co
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 