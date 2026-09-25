import React, { useState } from 'react';

interface RoiCalculatorProps {
  onStartCalculating: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onStartCalculating }) => {
  const [platformsCount, setPlatformsCount] = useState<number>(3);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(45);

  // Calculations
  const hoursSavedWeekly = Math.round(hoursPerWeek * 0.75); // 75% efficiency gain
  const hoursSavedMonthly = Math.round(hoursSavedWeekly * 4.3);
  const monthlySavings = Math.round(hoursSavedMonthly * hourlyRate);
  const annualSavings = monthlySavings * 12;
  const postsPerMonth = platformsCount * 4 * 4; // ~16 posts/platform/month

  return (
    <section id="roi-calculator" className="py-20 px-6 bg-[#f7f9fb]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#630ed4] text-xl">calculate</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#630ed4]">
              Quantifiable Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-4">
            Calculate Your Weekly Time &amp; Cost Savings
          </h2>
          <p className="text-[#4a4455] text-base leading-relaxed">
            Content creation is one of the highest leverage activities for growth, but manually drafting copy 
            and researching hashtags drains hours. See what automating your weekly sprint gives back:
          </p>
        </div>

        <div className="bg-white rounded-[32px] p-6 sm:p-10 md:p-12 border border-[#ccc3d8]/40 shadow-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Column: Sliders */}
            <div className="space-y-6">
              {/* Slider 1: Platforms */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-[#191c1e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#630ed4] text-base">share</span>
                    Active Social Platforms:
                  </label>
                  <span className="font-extrabold text-sm text-[#630ed4] bg-[#eaddff] px-2.5 py-0.5 rounded-lg">
                    {platformsCount} {platformsCount === 1 ? 'Platform' : 'Platforms'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={platformsCount}
                  onChange={(e) => setPlatformsCount(parseInt(e.target.value, 10))}
                  className="w-full accent-[#630ed4] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#79747e]">
                  <span>1 Platform</span>
                  <span>3 Platforms</span>
                  <span>6 Platforms</span>
                </div>
              </div>

              {/* Slider 2: Hours spent */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-[#191c1e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#630ed4] text-base">timer</span>
                    Hours Spent Weekly on Content:
                  </label>
                  <span className="font-extrabold text-sm text-[#630ed4] bg-[#eaddff] px-2.5 py-0.5 rounded-lg">
                    {hoursPerWeek} hrs / week
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10))}
                  className="w-full accent-[#630ed4] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#79747e]">
                  <span>2 hrs (Casual)</span>
                  <span>12 hrs (Active)</span>
                  <span>25 hrs (Full-time)</span>
                </div>
              </div>

              {/* Slider 3: Hourly Value */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-[#191c1e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#630ed4] text-base">payments</span>
                    Estimated Hourly Value:
                  </label>
                  <span className="font-extrabold text-sm text-[#630ed4] bg-[#eaddff] px-2.5 py-0.5 rounded-lg">
                    ${hourlyRate} / hr
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                  className="w-full accent-[#630ed4] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#79747e]">
                  <span>$20/hr</span>
                  <span>$75/hr</span>
                  <span>$150/hr</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#ccc3d8]/40 text-xs text-[#4a4455] leading-relaxed">
                💡 <strong className="text-[#191c1e]">Real-World Metric:</strong> Based on 500+ users, 
                batch-planning with SocialSpark AI reduces blank-page ideation time from 8 hours down to under 45 minutes per sprint.
              </div>
            </div>

            {/* Right Column: Calculated Value Card */}
            <div className="bg-gradient-to-br from-[#1b0042] via-[#2c0068] to-[#630ed4] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#d946ef] block mb-1">
                  Estimated Creator ROI
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  Your Annual Savings
                </h3>
              </div>

              <div className="space-y-4">
                <div className="border-b border-white/20 pb-3">
                  <span className="text-xs text-white/70 block">Time Reclaimed Monthly</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ~{hoursSavedMonthly} hrs
                    </span>
                    <span className="text-xs text-[#d946ef] font-bold">
                      ({hoursSavedWeekly} hrs / week)
                    </span>
                  </div>
                </div>

                <div className="border-b border-white/20 pb-3">
                  <span className="text-xs text-white/70 block">Equivalent Monthly Dollar Value</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#5eead4]">
                    ${monthlySavings.toLocaleString()} / mo
                  </div>
                </div>

                <div>
                  <span className="text-xs text-white/70 block">Cumulative 12-Month Value</span>
                  <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-[#f5d0fe] to-[#d946ef] bg-clip-text text-transparent">
                    ${annualSavings.toLocaleString()} / yr
                  </div>
                  <span className="text-[11px] text-white/70 mt-1 block">
                    Plus consistency across ~{postsPerMonth} planned monthly touchpoints
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onStartCalculating}
                className="w-full bg-white hover:bg-[#f7f9fb] text-[#630ed4] font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all cursor-pointer text-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-lg fill-1">bolt</span>
                <span>Claim Your Hours: Generate Strategy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
