import React, { useState } from 'react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onGenerateClick: () => void;
  scrollToSection?: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onGenerateClick,
  scrollToSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-[#ccc3d8]/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveTab('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer text-left transition-transform active:scale-95"
        >
          {/* Logo Mark */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#630ed4] via-[#8127cf] to-[#d946ef] p-0.5 shadow-md shadow-[#630ed4]/20 group-hover:shadow-lg group-hover:shadow-[#630ed4]/35 transition-all duration-300">
            <div className="w-full h-full bg-[#1b0042]/90 backdrop-blur-md rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#630ed4]/60 to-[#ec4899]/40 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <span className="material-symbols-outlined text-white text-[20px] fill-1 relative z-10 group-hover:rotate-12 transition-transform duration-300">
                bolt
              </span>
            </div>
          </div>
          {/* Brand Wordmark */}
          <div className="flex items-baseline tracking-tight">
            <span className="font-extrabold text-[21px] text-[#191c1e]">Social</span>
            <span className="font-extrabold text-[21px] bg-gradient-to-r from-[#630ed4] to-[#c026d3] bg-clip-text text-transparent">Spark</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#630ed4]/10 text-[#630ed4] rounded-md border border-[#630ed4]/20">
              AI
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-[16px] font-medium text-[#4a4455]">
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-[#630ed4] transition-colors hover:scale-105 duration-200 cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-[#630ed4] transition-colors hover:scale-105 duration-200 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('benefits')}
            className="hover:text-[#630ed4] transition-colors hover:scale-105 duration-200 cursor-pointer"
          >
            Benefits
          </button>
          <button
            onClick={() => {
              setActiveTab('demo');
            }}
            className={`transition-colors hover:scale-105 duration-200 cursor-pointer ${
              activeTab === 'demo' ? 'text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-0.5' : 'hover:text-[#630ed4]'
            }`}
          >
            3D Calendar View
          </button>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onGenerateClick}
            className="primary-gradient text-white px-6 py-2 rounded-full font-bold primary-gradient-hover shadow-md active:scale-95 cursor-pointer text-sm"
          >
            Generate Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#630ed4] p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#ccc3d8]/40 px-6 py-4 flex flex-col gap-4 text-[#191c1e] font-medium shadow-xl">
          <button
            onClick={() => handleNavClick('features')}
            className="text-left py-2 hover:text-[#630ed4] border-b border-gray-100"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-left py-2 hover:text-[#630ed4] border-b border-gray-100"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('benefits')}
            className="text-left py-2 hover:text-[#630ed4] border-b border-gray-100"
          >
            Benefits
          </button>
          <button
            onClick={() => {
              setActiveTab('demo');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-[#630ed4] font-bold border-b border-gray-100"
          >
            3D Calendar View
          </button>
          <button
            onClick={() => {
              onGenerateClick();
              setMobileMenuOpen(false);
            }}
            className="primary-gradient text-white w-full py-3 rounded-full font-bold primary-gradient-hover text-center mt-2 shadow-md"
          >
            Generate Now
          </button>
        </div>
      )}
    </header>
  );
};
