"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultsStep } from '../../components/results-step';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthModal } from '@/components/auth-modal';
import { Toaster } from '@/components/ui/toaster';
import { toast } from 'sonner';

export default function ResultsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const searchParams = useSearchParams();

  // Handle payment success
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      toast.success('Payment successful! Your prompt evaluation is ready.');
    }
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
          isLoggedIn={isLoggedIn}
          onAuth={handleAuth}
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