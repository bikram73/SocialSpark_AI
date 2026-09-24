import React from 'react';

interface CtaBannerProps {
  onStartGenerating: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartGenerating }) => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1280px] mx-auto primary-gradient rounded-[40px] py-16 px-8 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
          Ready to Create Your Next Week of Content?
        </h2>
        <p className="text-white/90 text-base max-w-xl mx-auto mb-8 relative z-10">
          Join 5,000+ creators and businesses who use SocialSpark AI to fuel their social presence without the burnout.
        </p>
        <button
          onClick={onStartGenerating}
          className="bg-white text-[#630ed4] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#f2f4f6] transition-all shadow-xl hover:scale-105 active:scale-95 relative z-10 cursor-pointer"
        >
          Start Generating Now
        </button>
      </div>
    </section>
  );
};
