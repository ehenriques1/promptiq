"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultsStep } from '../../components/results-step';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthModal } from '@/components/auth-modal';
import { Toaster } from '@/components/ui/toaster';
import { toast } from 'sonner';

function ResultsContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [userPrompt, setUserPrompt] = useState("");
  const searchParams = useSearchParams();

  // Handle payment success and get user prompt
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      toast.success('Payment successful! Your prompt evaluation is ready.');
    }
    
    // Get prompt from localStorage
    const prompt = localStorage.getItem("userPrompt") || "";
    setUserPrompt(prompt);
  }, [searchParams]);

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleBackToLanding = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isLoggedIn={isLoggedIn} onAuth={handleAuth} />
      <main className="flex-1">
        <ResultsStep 
          userPrompt={userPrompt}
          isLoggedIn={isLoggedIn}
          onAuth={() => handleAuth('signup')}
          onBackToLanding={handleBackToLanding}
        />
      </main>
      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        mode={authMode}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
      />
      <Toaster />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
} 