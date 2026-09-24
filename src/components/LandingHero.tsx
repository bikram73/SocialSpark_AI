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
            Generate captions, hashtags, content ideas, and a full 7-day posting calendar in seconds using advanced AI.
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
            
            <div className="relative w-full h-full group cursor-pointer" onClick={onViewDemo}>
              <img
                alt="SocialSpark AI Dashboard & Social Planner"
                className="w-full h-full object-cover rounded-[40px] shadow-[0_25px_60px_-12px_rgba(99,14,212,0.3)] z-10 border-2 border-white/80 ring-4 ring-[#630ed4]/15 group-hover:ring-[#630ed4]/40 group-hover:shadow-[0_30px_70px_-10px_rgba(99,14,212,0.45)] group-hover:scale-[1.02] transition-all duration-500 ease-out"
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85"
                onError={(e) => {
                  // High quality fallback
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85';
                }}
              />

              {/* Glassmorphic Live Card Overlay */}
              <div className="absolute top-6 left-6 z-20 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
                <span className="text-xs font-extrabold text-[#191c1e]">7-Day Auto Planner Active</span>
              </div>

              {/* Interactive badge over image on hover */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-[#630ed4]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-center pb-8 pointer-events-none">
                <span className="bg-white text-[#630ed4] font-extrabold text-sm px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="material-symbols-outlined text-base fill-1">auto_awesome</span>
                  Click to Explore 3D Calendar Demo
                </span>
              </div>
            </div>

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
