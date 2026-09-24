import React from 'react';

interface BenefitsSectionProps {
  onGetStarted: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onGetStarted }) => {
  const benefits = [
    'Save 10+ Hours Weekly',
    'Improve Engagement Rates',
    'Stay 100% Consistent',
    'Higher Quality Captions',
    'Platform-Specific Strategy',
    'Professional Hashtags',
  ];

  return (
    <section id="benefits" className="py-20 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative rounded-[40px] overflow-hidden shadow-2xl h-[420px] md:h-[500px]">
          <img
            className="w-full h-full object-cover"
            alt="Home office setup displaying social media dashboard"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKyBh7SHooytJVUnpR7OROTQRTIpKb-ndrgivDp5bVkq-B3Qrp0a8FMEMEtIhLpoB30tKrZCWPMcpUJ16UG2KfboVRR8dBCCj7fR06_rtGQc4F1bUhpEnMthQdb1wajlFceiSquQeglRVzg3ZW4RVdlYQrDbWhi-hGEogVprhZMVyODzV8jC25FeK4nyz8nnxYLxWrbFdnwP7HU7coKEcCTRGVlWEaz98vI6WDfexCbiOHs2njBvBw"
          />
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] leading-tight">
            Focus on Growing Your Business, Let AI Handle the Feed
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#630ed4] bg-[#630ed4]/10 p-1.5 rounded-full text-lg">
                  check
                </span>
                <span className="text-[#4a4455] font-medium text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <button
              onClick={onGetStarted}
              className="primary-gradient text-white px-8 py-3.5 rounded-full font-bold primary-gradient-hover shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
