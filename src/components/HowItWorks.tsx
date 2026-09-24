import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-[#f2f4f6]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e]">
            The 3-Step Success Path
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 border-t-2 border-dashed border-[#7c3aed]/30 -translate-y-12 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            <div className="w-20 h-20 primary-gradient rounded-full flex items-center justify-center text-white font-bold mb-4 shadow-xl border-4 border-white">
              <span className="material-symbols-outlined text-[40px]">edit_note</span>
            </div>
            <h3 className="text-[22px] font-bold text-[#191c1e] mb-2">1. Fill Brand Brief</h3>
            <p className="text-[#4a4455] text-sm leading-relaxed">
              Tell us about your brand, target audience, and current marketing goals in a simple form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            <div className="w-20 h-20 primary-gradient rounded-full flex items-center justify-center text-white font-bold mb-4 shadow-xl border-4 border-white">
              <span className="material-symbols-outlined text-[40px] fill-1">bolt</span>
            </div>
            <h3 className="text-[22px] font-bold text-[#191c1e] mb-2">2. Gemini Generates</h3>
            <p className="text-[#4a4455] text-sm leading-relaxed">
              Our Google Gemini-powered engine creates a week's worth of content in less than 30 seconds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            <div className="w-20 h-20 primary-gradient rounded-full flex items-center justify-center text-white font-bold mb-4 shadow-xl border-4 border-white">
              <span className="material-symbols-outlined text-[40px]">send</span>
            </div>
            <h3 className="text-[22px] font-bold text-[#191c1e] mb-2">3. Copy &amp; Post</h3>
            <p className="text-[#4a4455] text-sm leading-relaxed">
              Review, make any final tweaks, and schedule your posts to your favorite platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
