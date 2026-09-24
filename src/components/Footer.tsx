import React from 'react';

interface FooterProps {
  onOpenDocs?: () => void;
  onOpenGenerator?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenGenerator, onNavigateToSection }) => {
  return (
    <footer className="w-full py-16 bg-white border-t border-[#ccc3d8]/20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#630ed4] via-[#8127cf] to-[#d946ef] p-0.5 shadow-sm shadow-[#630ed4]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#1b0042] rounded-[10px] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[16px] fill-1">bolt</span>
              </div>
            </div>
            <div className="flex items-baseline tracking-tight">
              <span className="font-extrabold text-[19px] text-[#191c1e]">Social</span>
              <span className="font-extrabold text-[19px] bg-gradient-to-r from-[#630ed4] to-[#c026d3] bg-clip-text text-transparent">Spark</span>
              <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#630ed4]/10 text-[#630ed4] rounded-md border border-[#630ed4]/20">
                AI
              </span>
            </div>
          </div>
          <p className="text-[#4a4455] text-sm">
            Empowering creators with AI-driven social media mastery.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-[#191c1e] mb-2 text-base">Quick Links</h4>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToSection) {
                onNavigateToSection('features');
              } else {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline cursor-pointer"
          >
            Features
          </a>
          <a
            href="#benefits"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToSection) {
                onNavigateToSection('benefits');
              } else {
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline cursor-pointer"
          >
            Creator Benefits
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToSection) {
                onNavigateToSection('how-it-works');
              } else {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#generator-form"
            onClick={(e) => {
              e.preventDefault();
              onOpenGenerator?.();
            }}
            className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline cursor-pointer font-medium"
          >
            AI Content Planner
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-[#191c1e] mb-2 text-base">Resources</h4>
          <a
            href="https://github.com/bikram73/SocialSpark_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline flex items-center gap-1"
          >
            GitHub
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
          <button
            onClick={onOpenDocs}
            className="text-left text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline cursor-pointer"
          >
            Documentation
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 mt-12 pt-6 border-t border-[#ccc3d8]/20 text-center">
        <p className="text-[#4a4455] text-xs font-medium">
          © 2026 SocialSpark AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
