import React from 'react';

interface ComparisonTableProps {
  onStartNow: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onStartNow }) => {
  const comparisonRows = [
    {
      feature: 'Sprint Generation Time',
      socialSpark: 'Under 5 seconds',
      agency: '10 to 14 business days',
      chatGpt: '1–2 hours manual prompting',
    },
    {
      feature: 'Multi-Platform Native Formats',
      socialSpark: 'Automatic (Reels, Carousels, Threads, Pins)',
      agency: 'Limited by billable retainer scope',
      chatGpt: 'Requires 5+ separate repetitive prompts',
    },
    {
      feature: 'Hashtag Precision & Quality',
      socialSpark: '6–10 niche, categorized search tags',
      agency: 'Manual research (often recycled)',
      chatGpt: 'Generic spam tags (#love, #viral, #business)',
    },
    {
      feature: 'Full 7-Day Visual Calendar',
      socialSpark: 'Interactive 3D Glass calendar with times',
      agency: 'Static PDF or Notion sheet',
      chatGpt: 'Raw unformatted text dump',
    },
    {
      feature: 'Brand Voice Preservation',
      socialSpark: 'Deep tone calibration & anti-slop rules',
      agency: 'Depends heavily on assigned copywriter',
      chatGpt: 'Sounds robotic and corporate',
    },
    {
      feature: 'Single-Post Regeneration',
      socialSpark: 'Instant 1-click creative refresh',
      agency: 'Multi-day review revision cycles',
      chatGpt: 'Start prompt sequence from scratch',
    },
    {
      feature: 'Monthly Investment',
      socialSpark: 'Free & Accessible',
      agency: '$2,500 – $6,000 / month',
      chatGpt: '$20/mo + hours of unpaid time',
    },
  ];

  return (
    <section id="comparison" className="py-20 px-6 bg-[#f7f9fb]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#630ed4] text-xl">balance</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#630ed4]">
              Clear Market Comparison
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-4">
            How SocialSpark Compares to Traditional Workflows
          </h2>
          <p className="text-[#4a4455] text-base leading-relaxed">
            Stop overpaying agencies for cookie-cutter posts or wrestling with generic chatbots. 
            SocialSpark AI is purpose-built specifically for social growth operators:
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-[#ccc3d8]/40 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ccc3d8]/40 bg-[#f7f9fb]">
                  <th className="py-5 px-6 font-extrabold text-sm text-[#191c1e] w-1/4">
                    Capability / Factor
                  </th>
                  <th className="py-5 px-6 font-black text-sm text-white bg-[#630ed4] w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base fill-1">bolt</span>
                      <span>SocialSpark AI</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-xs text-[#4a4455] w-1/5">
                    Marketing Agency
                  </th>
                  <th className="py-5 px-6 font-semibold text-xs text-[#4a4455] w-1/5">
                    Generic ChatGPT Prompts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ccc3d8]/30 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#f7f9fb]/80 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-[#191c1e]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#630ed4] bg-[#630ed4]/5">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#146c2e] shrink-0">
                          check_circle
                        </span>
                        <span>{row.socialSpark}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#4a4455]">
                      {row.agency}
                    </td>
                    <td className="py-4 px-6 text-[#79747e]">
                      {row.chatGpt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-[#fbf9fe] border-t border-[#ccc3d8]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#4a4455]">
              <span className="material-symbols-outlined text-[#630ed4] text-base">verified</span>
              <span>All plans include complete 7-day calendars, hashtag research, and copy inspection</span>
            </div>
            <button
              type="button"
              onClick={onStartNow}
              className="primary-gradient primary-gradient-hover text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              Generate Free Strategy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
