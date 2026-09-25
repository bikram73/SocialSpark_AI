import React, { useState } from 'react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does SocialSpark AI prevent robotic, generic "AI slop" copy?',
      a: 'Unlike generic chatbots that default to sycophantic corporate fluff and vague buzzwords, SocialSpark AI enforces domain-calibrated prompt engineering. Captions are strictly formatted with platform-native hooks, dynamic line-breaks, audience-specific pain points, and natural conversational cadence. Every post is tailored specifically to your chosen brand voice and industry parameters.',
    },
    {
      q: 'How do you generate platform-specific formats like Reels, Carousels, and Threads?',
      a: 'Each platform has unique algorithmic mechanics. For Instagram, SocialSpark generates 1.5-second video hooks and carousel slide breakdowns. For LinkedIn, it structures document PDF frameworks optimized for dwell-time. For X (Twitter), it crafts zero-link hook tweets with 5-part actionable threads. For Pinterest, it designs visual checklists with 2:3 vertical layouts.',
    },
    {
      q: 'Can I regenerate or refresh individual posts if I don\'t like a specific angle?',
      a: 'Yes! Inside the generated strategy, every single day card has a 1-click "Refresh Post" button. You can keep 6 days of your schedule intact while instantly regenerating Monday\'s Reel or Friday\'s Carousel with fresh hooks, alternative angles, and updated hashtags without starting over.',
    },
    {
      q: 'How are the hashtag clusters selected?',
      a: 'SocialSpark never outputs generic vanity tags like #love, #happy, or #viral. Instead, our research model selects 6–10 niche, categorized search tags tailored to your industry and content pillar. This indexes your content for high-intent searchers and algorithmic discovery without triggering spam filters.',
    },
    {
      q: 'How are the peak posting times calculated?',
      a: 'Optimal posting windows are determined by analyzing aggregate dwell-time data for your target audience demographic. For instance, B2B audiences on LinkedIn index highest during morning commutes (08:30–10:00 AM) and midday lunches, while consumer fitness and lifestyle reels see peak engagement during early mornings and evening wind-downs.',
    },
    {
      q: 'Can I export the schedule into my social media scheduler?',
      a: 'Absolutely. You can copy individual captions and hashtag clusters with 1 click, use the "Copy All" tool to copy the complete weekly itinerary, or export the structured schedule as a standard .JSON file ready for import into social scheduling dashboards.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-[#f7f9fb] border-t border-[#ccc3d8]/30">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#630ed4] text-xl">help</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#630ed4]">
              Clear Answers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4a4455] text-base leading-relaxed">
            Everything you need to know about SocialSpark AI, our platform algorithms, and how to scale your reach:
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ccc3d8]/40 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f7f9fb]/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-[#191c1e]">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#630ed4] text-xl transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4a4455] leading-relaxed border-t border-[#ccc3d8]/20 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
