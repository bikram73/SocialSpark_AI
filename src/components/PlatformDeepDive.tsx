import React, { useState } from 'react';

export const PlatformDeepDive: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'linkedin' | 'twitter' | 'pinterest' | 'youtube'>('instagram');

  const platformData = {
    instagram: {
      name: 'Instagram',
      icon: 'photo_camera',
      gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
      accentBg: 'bg-[#fd1d1d]/10 text-[#fd1d1d]',
      headline: 'Reels Hooks & Carousel Dwell-Time Architecture',
      summary: 'Instagram\'s 2026 algorithm heavily weights replay rate, saves, and direct message shares over passive likes.',
      strategies: [
        {
          title: '1.5-Second Visual Hook',
          desc: 'Scripts lead immediately with a dynamic question or counter-intuitive premise before viewers swipe away.',
        },
        {
          title: 'Multi-Slide Carousel Retention',
          desc: 'Each slide contains a discrete, bite-sized insight under 35 words to encourage complete swipe-through velocity.',
        },
        {
          title: 'Categorized Search Indexing',
          desc: 'Includes 6–10 niche hashtags that index your profile for in-app keyword search without triggering shadowban spam filters.',
        },
      ],
      timingRule: 'Peak Traffic Windows: 08:30 – 10:00 AM (commute) & 07:00 – 09:00 PM (wind-down)',
    },
    linkedin: {
      name: 'LinkedIn',
      icon: 'work',
      gradient: 'from-[#0077b5] to-[#004182]',
      accentBg: 'bg-[#0077b5]/10 text-[#0077b5]',
      headline: 'B2B Authority & Organic Dwell Optimization',
      summary: 'LinkedIn rewards document carousel dwell-time and multi-line comments from relevant industry peers.',
      strategies: [
        {
          title: '2-Line Provocative "See More" Hook',
          desc: 'The opening 150 characters are engineered to maximize clicks on the "see more" fold, signaling immediate interest.',
        },
        {
          title: 'Document PDF Frameworks',
          desc: 'Formatted into high-contrast slides that prompt users to spend 90+ seconds reading through step-by-step playbooks.',
        },
        {
          title: 'First-Comment Engagement Trigger',
          desc: 'Places all external URLs and downloadable report links in the comments to preserve 3x higher organic algorithmic reach.',
        },
      ],
      timingRule: 'Peak Traffic Windows: Tuesday through Thursday 08:00 – 10:30 AM & 12:00 – 01:30 PM',
    },
    twitter: {
      name: 'X (Twitter)',
      icon: 'chat',
      gradient: 'from-[#1d9bf0] to-[#0a66c2]',
      accentBg: 'bg-[#1d9bf0]/10 text-[#1d9bf0]',
      headline: 'Viral Thread Pacing & Algorithmic Bookmarking',
      summary: 'X favors threads with high reply density, quote-tweets, and bookmarks that retain readers on the timeline.',
      strategies: [
        {
          title: 'Zero-Link Primary Tweet',
          desc: 'The master hook tweet never contains external URLs, avoiding algorithmic penalties and maximizing viral distribution.',
        },
        {
          title: 'High-Value Thread Numbering',
          desc: 'Uses clean numbered bullet syntax that makes complex tutorials instantly skimmable and highly bookmarkable.',
        },
        {
          title: 'Evening Retargeting Quote',
          desc: 'SocialSpark includes recommendations to quote-tweet tweet #2 with visual infographics to capture late-day timeline traffic.',
        },
      ],
      timingRule: 'Peak Traffic Windows: Weekdays 11:30 AM – 02:00 PM & 05:00 – 07:00 PM',
    },
    pinterest: {
      name: 'Pinterest',
      icon: 'push_pin',
      gradient: 'from-[#e60023] to-[#b80018]',
      accentBg: 'bg-[#e60023]/10 text-[#e60023]',
      headline: 'Long-Tail Visual Search & Evergreen Repin Momentum',
      summary: 'Pins have a half-life of 4+ months, functioning more like a visual search engine than a transient chronological feed.',
      strategies: [
        {
          title: '2:3 Vertical Ratio Layout',
          desc: 'Graphics calibrated for standard 1000x1500px dimensions to occupy maximum mobile screen real estate.',
        },
        {
          title: 'Search-Intent Keyword Density',
          desc: 'Captions combine semantic problem statements with solution-focused terms that rank on Pinterest visual search.',
        },
        {
          title: 'Actionable Checklist Formats',
          desc: 'Printable guides and step-by-step diagrams that drive 42% higher board saves and click-through rates.',
        },
      ],
      timingRule: 'Peak Traffic Windows: Saturday & Sunday mornings 09:00 – 11:30 AM & evening 08:00 – 10:00 PM',
    },
    youtube: {
      name: 'YouTube Shorts',
      icon: 'smart_display',
      gradient: 'from-[#ff0000] to-[#990000]',
      accentBg: 'bg-[#ff0000]/10 text-[#ff0000]',
      headline: 'Short-Form Retention & 60-Second Masterclasses',
      summary: 'YouTube Shorts algorithm tests audience retention in 5-second segments, penalizing slow introductions.',
      strategies: [
        {
          title: 'Zero-Fluff Opening Hook',
          desc: 'No "hey guys welcome back" intros. Content dives immediately into the solution or surprising fact within second 1.',
        },
        {
          title: 'Muted Viewer Architecture',
          desc: 'Scripts are structured with high-contrast text cues and dynamic pacing so viewers understand 100% without audio.',
        },
        {
          title: 'Looping Seamless Transitions',
          desc: 'The concluding sentence connects grammatically to the opening hook, encouraging unintentional second replays.',
        },
      ],
      timingRule: 'Peak Traffic Windows: Friday through Sunday 03:00 – 06:00 PM',
    },
  };

  const current = platformData[activePlatform];

  return (
    <section id="platform-deep-dive" className="py-20 px-6 bg-white border-b border-[#ccc3d8]/30">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#630ed4] text-xl">tune</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#630ed4]">
              Native Algorithmic Engineering
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-4">
            How SocialSpark Optimizes For Each Platform
          </h2>
          <p className="text-[#4a4455] text-base leading-relaxed">
            One size does not fit all. What goes viral on LinkedIn will flop on TikTok. 
            Here is how SocialSpark adjusts hook structure, format, and hashtags for each channel:
          </p>
        </div>

        {/* Platform Selection Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {(['instagram', 'linkedin', 'twitter', 'pinterest', 'youtube'] as const).map((key) => {
            const p = platformData[key];
            const isActive = activePlatform === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePlatform(key)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#191c1e] text-white border-[#191c1e] shadow-md scale-105'
                    : 'bg-[#f7f9fb] text-[#4a4455] hover:bg-[#eaddff]/60 border-[#ccc3d8]/40'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{p.icon}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Platform Feature Card */}
        <div className="bg-[#f7f9fb] rounded-3xl p-6 sm:p-10 border border-[#ccc3d8]/40 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ccc3d8]/40">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${current.gradient} text-white flex items-center justify-center shadow-md`}>
                <span className="material-symbols-outlined text-2xl">{current.icon}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] block">
                  Platform Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#191c1e]">
                  {current.headline}
                </h3>
              </div>
            </div>

            <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full ${current.accentBg} shrink-0`}>
              Verified 2026 Engine
            </span>
          </div>

          <p className="text-sm text-[#4a4455] my-6 leading-relaxed">
            {current.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {current.strategies.map((strat, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-[#ccc3d8]/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-[#630ed4]/10 text-[#630ed4] font-bold text-xs flex items-center justify-center mb-3">
                    0{i + 1}
                  </div>
                  <h4 className="font-extrabold text-sm text-[#191c1e] mb-1.5">
                    {strat.title}
                  </h4>
                  <p className="text-xs text-[#4a4455] leading-relaxed">
                    {strat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ccc3d8]/40 flex items-center gap-3 text-xs text-[#191c1e]">
            <span className="material-symbols-outlined text-[#630ed4] text-lg shrink-0">
              schedule
            </span>
            <span className="font-medium text-[#4a4455]">
              <strong className="text-[#191c1e]">Algorithmic Schedule Window:</strong> {current.timingRule}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
