import React from 'react';

interface LandingHeroProps {
  onGenerateNow: () => void;
  onViewDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onGenerateNow, onViewDemo }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column (7 cols): Hero Pitch, Trust Proof, and Quick CTAs */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Trust Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#630ed4]/10 border border-[#630ed4]/20 text-[#630ed4] text-xs font-bold">
            <span className="flex items-center text-[#f59e0b]">
              <span className="material-symbols-outlined text-sm fill-1">star</span>
            </span>
            <span>Rated 4.9/5 by 12,000+ Creators &amp; Growth Teams</span>
          </div>

          <h1 className="text-[40px] sm:text-[48px] md:text-[58px] font-black leading-[1.08] tracking-tight text-[#191c1e]">
            AI Social Media Content Creation{' '}
            <span className="bg-gradient-to-r from-[#630ed4] via-[#8127cf] to-[#d946ef] bg-clip-text text-transparent">
              Engineered For Real Reach
            </span>
          </h1>

          <p className="text-[#4a4455] text-base sm:text-lg leading-[1.6] max-w-xl">
            Generate platform-native reels, document carousels, actionable threads, 
            and a complete 7-day calendar in under 5 seconds. Calibrated for your brand voice with zero robotic fluff.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={onGenerateNow}
              className="primary-gradient text-white px-8 py-4 rounded-xl font-bold primary-gradient-hover shadow-xl shadow-[#630ed4]/25 active:scale-95 transition-all cursor-pointer text-base flex items-center gap-2.5"
            >
              <span className="material-symbols-outlined fill-1 text-xl">auto_awesome</span>
              <span>Generate Free Strategy Now</span>
            </button>
            <button
              onClick={onViewDemo}
              className="bg-white border border-[#ccc3d8] text-[#191c1e] hover:text-[#630ed4] px-7 py-4 rounded-xl font-bold hover:bg-[#f2f4f6] transition-all cursor-pointer text-base shadow-sm active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-[#630ed4]">calendar_month</span>
              <span>Explore 3D Calendar</span>
            </button>
          </div>

          {/* Key Value Prop Tickers */}
          <div className="pt-4 border-t border-[#ccc3d8]/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="font-black text-[#191c1e] text-base sm:text-lg">Sub-5s</div>
              <div className="text-[#4a4455]">Generation Time</div>
            </div>
            <div>
              <div className="font-black text-[#630ed4] text-base sm:text-lg">6–10 Tags</div>
              <div className="text-[#4a4455]">Niche Search Hashtags</div>
            </div>
            <div>
              <div className="font-black text-[#146c2e] text-base sm:text-lg">100% Native</div>
              <div className="text-[#4a4455]">Platform Format Match</div>
            </div>
            <div>
              <div className="font-black text-[#c026d3] text-base sm:text-lg">3.4x Reach</div>
              <div className="text-[#4a4455]">Avg. Engagement Lift</div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Interactive Dashboard Visual */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#630ed4]/20 via-[#d946ef]/15 to-transparent rounded-[44px] blur-3xl -z-10"></div>

            <div
              className="relative w-full h-full group cursor-pointer"
              onClick={onViewDemo}
              title="Click to open interactive 3D Calendar"
            >
              <img
                alt="SocialSpark AI Dashboard & Social Planner"
                className="w-full h-full object-cover rounded-[36px] shadow-[0_25px_60px_-12px_rgba(99,14,212,0.3)] z-10 border-2 border-white/80 ring-4 ring-[#630ed4]/15 group-hover:ring-[#630ed4]/40 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85';
                }}
              />

              {/* Status Badge Top Left */}
              <div className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white/80 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
                <span className="text-xs font-bold text-[#191c1e]">7-Day Plan Engine Live</span>
              </div>

              {/* Interactive Hover Pill Bottom */}
              <div className="absolute inset-0 rounded-[36px] bg-gradient-to-t from-[#1b0042]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-center pb-6 pointer-events-none">
                <span className="bg-white text-[#630ed4] font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="material-symbols-outlined text-base fill-1">auto_awesome</span>
                  Click to Explore 3D Calendar Demo
                </span>
              </div>
            </div>

            {/* Floating Platform Badges */}
            <div className="absolute -top-3 -left-3 floating bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl z-20 flex items-center gap-2 border border-[#ccc3d8]/40">
              <span className="material-symbols-outlined text-[#630ed4] text-xl fill-1">auto_awesome</span>
              <span className="text-xs font-bold text-[#191c1e]">AI Optimized</span>
            </div>

            <div
              className="absolute top-1/3 -right-4 floating bg-[#E1306C] text-white p-3 rounded-xl shadow-xl z-20 flex items-center justify-center border border-white/30"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </div>

            <div
              className="absolute -bottom-4 left-1/3 floating bg-[#0077B5] text-white px-3 py-1.5 rounded-xl shadow-xl z-20 flex items-center gap-1.5 border border-white/30"
              style={{ animationDelay: '0.8s' }}
            >
              <span className="material-symbols-outlined text-base">work</span>
              <span className="text-[11px] font-bold">LinkedIn Dwell</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
