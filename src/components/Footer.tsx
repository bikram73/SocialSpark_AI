import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 bg-white border-t border-[#ccc3d8]/20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-3">
          <div className="text-xl font-extrabold text-[#191c1e]">SocialSpark AI</div>
          <p className="text-[#4a4455] text-sm">
            Empowering creators with AI-driven social media mastery.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-[#191c1e] mb-2 text-base">Quick Links</h4>
          <a href="#features" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            Features
          </a>
          <a href="#benefits" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            Pricing
          </a>
          <a href="#how-it-works" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            Testimonials
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-[#191c1e] mb-2 text-base">Resources</h4>
          <a href="#" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            GitHub
          </a>
          <a href="#" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            Documentation
          </a>
          <a href="#" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            API Status
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-[#191c1e] mb-2 text-base">Connect</h4>
          <a href="#" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            Contact
          </a>
          <a href="#" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            Twitter
          </a>
          <a href="#" className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm hover:underline">
            LinkedIn
          </a>
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
