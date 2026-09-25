import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'SocialSpark completely changed our client sprint workflow. Instead of spending 3 days brainstorming captions and researching hashtags, we generate an entire 7-day multi-platform foundation in 20 minutes.',
      author: 'Marcus Chen',
      role: 'Agency Founder & Creative Director',
      company: 'Apex Media Group',
      metric: '18 hrs saved weekly',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'The hashtag and format intelligence is what sets this apart. It does not spam generic #love or #fitness. It gives us high-intent search tags that actually ranked our Instagram Reels on the Explore page.',
      author: 'Elena Rostova',
      role: 'VP of Growth & Community',
      company: 'NexaFlow Health',
      metric: '+240% reach increase',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'As a solo founder, social media was the task I dreaded most every Sunday night. With SocialSpark, I batch my LinkedIn carousels and X threads in one sitting and focus on shipping code the rest of the week.',
      author: 'Devon Vance',
      role: 'Solo Founder & CEO',
      company: 'SyncLayer SaaS',
      metric: '3.4x follower growth',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#630ed4] text-xl">reviews</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#630ed4]">
              Customer Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-4">
            Trusted by Creators, Agencies &amp; Modern Brands
          </h2>
          <p className="text-[#4a4455] text-base leading-relaxed">
            See how teams use SocialSpark AI to stay 100% consistent across platforms without burning out:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#f7f9fb] p-8 rounded-3xl border border-[#ccc3d8]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center gap-1 text-[#f59e0b] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg fill-1">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#191c1e] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#ccc3d8]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#ccc3d8]/60"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#191c1e]">{t.author}</h4>
                    <p className="text-[11px] text-[#4a4455]">{t.role} • {t.company}</p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider text-[#146c2e] bg-[#e8f5e9] px-2 py-0.5 rounded-md shrink-0">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
