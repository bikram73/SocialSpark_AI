import React from 'react';

interface LandingHeroProps {
  onGenerateNow: () => void;
  onViewDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onGenerateNow, onViewDemo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10">
          <h1 className="text-[40px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight text-[#191c1e]">
            AI-Powered Social Media Content Creation Made Effortless
          </h1>
          <p className="text-[#4a4455] text-[16px] leading-[1.6] max-w-xl">
            Generate captions, hashtags, content ideas, and a full 7-day posting calendar in seconds using Google Gemini AI.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onGenerateNow}
              className="primary-gradient text-white px-8 py-3.5 rounded-full font-bold primary-gradient-hover shadow-lg active:scale-95 transition-all cursor-pointer text-base"
            >
              Generate Now
            </button>
            <button
              onClick={onViewDemo}
              className="bg-white border border-[#ccc3d8] text-[#630ed4] px-8 py-3.5 rounded-full font-bold hover:bg-[#f2f4f6] transition-all cursor-pointer text-base shadow-sm active:scale-95"
            >
              View Demo
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          {/* Hero Image Container */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-[#630ed4]/10 rounded-[40px] blur-3xl -z-10"></div>
            
            <img
              alt="SocialSpark AI Dashboard Preview"
              className="w-full h-full object-cover rounded-[40px] shadow-2xl z-10 border border-white/60"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvP5fw4Eb-4uYsRL-It2la5g1uxwTipKDmB0oSpUSYovH8ksn_QjbIOhY7VMsKw4AB8RcXX-gnOq8bttXzVTa2EX-KdcZuOA4ifXFpU0VrP0HQDHczxZ1KfourwZOlJu1z7kO3i0CfSBCpRIkGwUbRsmiPVnR-SRJDlaFL0Gg3_gCy86MpjsmOQq1rie-8XNfg3affdD90ACiYkA0SoHJMo2VzQhpH5cVY6Dwbhe_C6vRSmJZKKTjK9jnQ"
              onError={(e) => {
                // Fallback if google usercontent link expires or is restricted
                (e.target as HTMLImageElement).src = 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg';
              }}
            />

            {/* Floating Icons */}
            <div className="absolute -top-4 -left-4 floating bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 flex items-center justify-center border border-[#ccc3d8]/50">
              <span className="material-symbols-outlined text-[#630ed4] text-[32px] fill-1">auto_awesome</span>
            </div>

            <div
              className="absolute top-1/4 -right-6 floating bg-[#E1306C] text-white p-4 rounded-2xl shadow-xl z-20 flex items-center justify-center border border-white/30"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="material-symbols-outlined text-[32px]">photo_camera</span>
            </div>

            <div
              className="absolute -bottom-6 left-1/4 floating bg-[#0077B5] text-white p-4 rounded-2xl shadow-xl z-20 flex items-center justify-center border border-white/30"
              style={{ animationDelay: '1s' }}
            >
              <span className="material-symbols-outlined text-[32px]">work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
