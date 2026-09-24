/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, FormState, GeneratedResult } from './types';
import { Navigation } from './components/Navigation';
import { LandingHero } from './components/LandingHero';
import { TrustedBrands } from './components/TrustedBrands';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { BenefitsSection } from './components/BenefitsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { GeneratorForm } from './components/GeneratorForm';
import { LoadingState } from './components/LoadingState';
import { ResultSection } from './components/ResultSection';
import { CalendarPreviewModal } from './components/CalendarPreviewModal';
import { generateContentPlan } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedResult | null>(null);

  const [formState, setFormState] = useState<FormState>({
    brandName: 'FitLife',
    businessCategory: 'Fitness',
    targetAudience: 'College Students',
    brandVoice: 'Friendly and Motivational',
    contentThemes: 'Workout Tips, Healthy Food, Motivation',
    primaryGoal: 'Increase Engagement and Followers',
    platforms: {
      instagram: true,
      linkedin: true,
      twitter: true,
      facebook: false,
      pinterest: false,
      youtube: false,
    },
    additionalInstructions: '',
  });

  const handleFormSubmit = async () => {
    setIsGenerating(true);
    setIsGenerated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const data = await generateContentPlan(formState);
      setGeneratedData(data);
    } catch (error) {
      console.error('Generation failed, using default plan:', error);
      setGeneratedData(null);
    }
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
    setIsGenerated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetGenerator = () => {
    setIsGenerated(false);
    setIsGenerating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans antialiased selection:bg-[#7c3aed] selection:text-white">
      {/* Top Header Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'demo') {
            setIsDemoOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onGenerateClick={() => {
          setActiveTab('generator');
          setIsGenerated(false);
          setIsGenerating(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Page Body */}
      <main className="flex-1 pt-20">
        {activeTab === 'landing' && (
          <>
            <LandingHero
              onGenerateNow={() => {
                setActiveTab('generator');
                setIsGenerated(false);
                setIsGenerating(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewDemo={() => setIsDemoOpen(true)}
            />

            <TrustedBrands />

            <FeaturesSection />

            <HowItWorks />

            <BenefitsSection
              onGetStarted={() => {
                setActiveTab('generator');
                setIsGenerated(false);
                setIsGenerating(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <CtaBanner
              onStartGenerating={() => {
                setActiveTab('generator');
                setIsGenerated(false);
                setIsGenerating(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {activeTab === 'generator' && (
          <div className="max-w-[1280px] mx-auto px-6 py-8">
            {/* Header Section for Generator */}
            {!isGenerating && !isGenerated && (
              <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#630ed4] tracking-tight">
                  Generate Your Weekly Social Media Plan
                </h1>
                <p className="text-[#4a4455] max-w-2xl mx-auto text-base">
                  Fill in your brand details and let Gemini AI create a complete, multi-platform content strategy in seconds.
                </p>
              </header>
            )}

            {/* Step 1: Form */}
            {!isGenerating && !isGenerated && (
              <GeneratorForm
                formState={formState}
                setFormState={setFormState}
                onSubmit={handleFormSubmit}
              />
            )}

            {/* Step 2: Loading State */}
            {isGenerating && (
              <LoadingState onComplete={handleGenerationComplete} />
            )}

            {/* Step 3: Result Section */}
            {isGenerated && !isGenerating && (
              <ResultSection
                formState={formState}
                generatedData={generatedData}
                onReset={handleResetGenerator}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* 3D Calendar View Modal */}
      <CalendarPreviewModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}
