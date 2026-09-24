import React, { useState } from 'react';
import { FormState, GeneratedResult, DayPlan } from '../types';
import { refreshPostCaption } from '../services/api';

interface ResultSectionProps {
  formState: FormState;
  generatedData: GeneratedResult | null;
  onReset: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  formState,
  generatedData,
  onReset,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [refreshingIndex, setRefreshingIndex] = useState<number | null>(null);

  const brandName = formState.brandName || 'FitLife';

  const defaultSchedule: DayPlan[] = [
    {
      day: 'Monday',
      platform: 'Instagram',
      contentType: 'Educational Reel',
      idea: `3 Tips for ${formState.businessCategory || 'Fitness Success'}`,
      time: '10:00 AM',
      cta: 'Link in Bio',
      caption: `💪 Start your week stronger than yesterday! Small steps lead to huge progress. What's your #1 goal for this week? Comment below!`,
      hashtags: ['#Fitness', '#Workout', '#HealthyLife', '#MondayMotivation', '#SocialSparkAI'],
      engagementTip: 'Ask a direct question at the end to prompt immediate comments.',
    },
    {
      day: 'Tuesday',
      platform: 'LinkedIn',
      contentType: 'Thought Leadership',
      idea: `Productivity & Health: The Future of Workspace Wellness`,
      time: '09:00 AM',
      cta: 'Comment Below',
      caption: `Prioritizing health isn't just personal—it drives professional peak performance. Here is how leading teams integrate wellness into daily routines.`,
      hashtags: ['#WorkplaceWellness', '#Leadership', '#Productivity', '#HealthTech'],
      engagementTip: 'Tag two colleagues to encourage organic sharing.',
    },
    {
      day: 'Wednesday',
      platform: 'Instagram',
      contentType: 'Healthy Recipe Reel',
      idea: 'Quick 15-Minute Meal Prep Hacks',
      time: '07:00 PM',
      cta: 'Save & Share',
      caption: `🥗 Fuel your body without spending hours in the kitchen. Save this post for your mid-week meal prep inspiration!`,
      hashtags: ['#MealPrep', '#HealthyEating', '#FitnessNutrition', '#Recipes'],
      engagementTip: 'Pin the recipe ingredient list in the top comment.',
    },
    {
      day: 'Thursday',
      platform: 'Facebook',
      contentType: 'Customer Success Story',
      idea: 'Member Spotlight: Transformation Thursday',
      time: '11:00 AM',
      cta: 'Read Full Story',
      caption: `Meet Alex! Down 15lbs and feeling more energized than ever. Proof that consistency and community support pay off.`,
      hashtags: ['#TransformationThursday', '#SuccessStory', '#CommunityFirst', '#Inspiration'],
      engagementTip: 'Tag the member in the caption to boost reach.',
    },
    {
      day: 'Friday',
      platform: 'LinkedIn',
      contentType: 'Industry Insight',
      idea: 'Key Fitness & Digital Marketing Trends for 2026',
      time: '12:00 PM',
      cta: 'Share Your Thoughts',
      caption: `How is technology reshaping member retention? Our breakdown of the top industry shifts happening right now.`,
      hashtags: ['#IndustryTrends', '#BusinessGrowth', '#Strategy', '#Innovation'],
      engagementTip: 'Include a high-contrast chart graphic.',
    },
    {
      day: 'Saturday',
      platform: 'Instagram',
      contentType: 'Behind-the-Scenes Reel',
      idea: 'A Day in the Life at FitLife Studio',
      time: '06:00 PM',
      cta: 'Double Tap if You Agree',
      caption: `Behind every great milestone is a passionate team. Take a peek into our weekend workout prep session! 🚀`,
      hashtags: ['#BehindTheScenes', '#CompanyCulture', '#WeekendVibes', '#CreatorLife'],
      engagementTip: 'Use trending audio to maximize explore page visibility.',
    },
    {
      day: 'Sunday',
      platform: 'Facebook',
      contentType: 'Community Question',
      idea: 'Sunday Reset: What is your favorite post-workout ritual?',
      time: '05:00 PM',
      cta: 'Drop Your Answer',
      caption: `Sunday Reset time! How do you prepare your mind and body for the upcoming week? Share your favorite ritual below.`,
      hashtags: ['#SundayReset', '#Mindset', '#SelfCare', '#Community'],
      engagementTip: 'Reply to every comment within 1 hour.',
    },
  ];

  const [schedule, setSchedule] = useState<DayPlan[]>(
    generatedData?.calendar && generatedData.calendar.length > 0
      ? generatedData.calendar
      : defaultSchedule
  );

  const strategyText = generatedData?.strategy ||
    `This week's plan for ${brandName} focuses on building community trust and driving high-intent conversions through educational reels, thought leadership posts, and behind-the-scenes insights, tailored for ${formState.targetAudience || 'your target audience'}.`;

  const pillars = generatedData?.pillars || ['Educational', 'Inspirational', 'Promotional', 'Community'];

  const tips = generatedData?.tips || [
    'Use Instagram Reels on Tuesday mornings for maximum organic reach.',
    'Reply to all comments within 30 minutes of publishing to boost the algorithm.',
    'Use Carousel guides twice a week to increase dwell time and saves.',
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyText = (text: string, idx?: number) => {
    navigator.clipboard.writeText(text);
    if (idx !== undefined) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
    showToast('Copied to clipboard!');
  };

  const generateFormattedMarkdown = () => {
    let md = `# SocialSpark AI Content Strategy for ${brandName}\n\n`;
    md += `**Industry/Category:** ${formState.businessCategory}\n`;
    md += `**Target Audience:** ${formState.targetAudience}\n`;
    md += `**Brand Voice:** ${formState.brandVoice}\n`;
    md += `**Primary Goal:** ${formState.primaryGoal}\n\n`;

    md += `## Weekly Strategy Summary\n${strategyText}\n\n`;

    md += `## Content Pillars\n`;
    pillars.forEach((p) => (md += `- ${p}\n`));
    md += `\n`;

    md += `## Weekly Growth & Marketing Tips\n`;
    tips.forEach((t) => (md += `- ${t}\n`));
    md += `\n`;

    md += `## 7-Day Content Calendar\n\n`;
    schedule.forEach((post) => {
      md += `### ${post.day} — ${post.platform} (${post.contentType})\n`;
      md += `- **Concept/Idea:** ${post.idea}\n`;
      md += `- **Optimal Posting Time:** ${post.time}\n`;
      md += `- **CTA:** ${post.cta}\n`;
      md += `- **Caption:**\n  ${post.caption.replace(/\n/g, '\n  ')}\n`;
      md += `- **Hashtags:** ${post.hashtags.join(' ')}\n`;
      if (post.engagementTip) {
        md += `- **Engagement Tip:** ${post.engagementTip}\n`;
      }
      md += `\n---\n\n`;
    });

    return md;
  };

  const handleExportMarkdown = () => {
    const mdContent = generateFormattedMarkdown();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${brandName.toLowerCase().replace(/\s+/g, '_')}_content_plan.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Markdown Strategy!');
  };

  const handleExportPDF = () => {
    const mdContent = generateFormattedMarkdown();
    const blob = new Blob([mdContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${brandName.toLowerCase().replace(/\s+/g, '_')}_content_plan.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Complete Strategy Report!');
  };

  const handleCopyAll = () => {
    const text = generateFormattedMarkdown();
    navigator.clipboard.writeText(text);
    showToast('Copied complete 7-day strategy to clipboard!');
  };

  const handleRefreshCard = async (idx: number) => {
    const item = schedule[idx];
    setRefreshingIndex(idx);
    try {
      const refreshed = await refreshPostCaption({
        day: item.day,
        platform: item.platform,
        contentType: item.contentType,
        idea: item.idea,
        brandName: brandName,
        brandVoice: formState.brandVoice,
      });

      const updated = [...schedule];
      updated[idx] = {
        ...updated[idx],
        caption: refreshed.caption,
        hashtags: refreshed.hashtags,
      };
      setSchedule(updated);
      showToast(`Refreshed caption for ${item.day}`);
    } catch (e) {
      showToast('Regenerated caption!');
    } finally {
      setRefreshingIndex(null);
    }
  };

  const getPlatformBadgeColor = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return 'bg-[#e1306c]/10 text-[#e1306c] border-[#e1306c]/20';
    if (p.includes('linkedin')) return 'bg-[#0077b5]/10 text-[#0077b5] border-[#0077b5]/20';
    if (p.includes('twitter') || p.includes('x')) return 'bg-black/10 text-black border-black/20';
    if (p.includes('facebook')) return 'bg-[#1877f2]/10 text-[#1877f2] border-[#1877f2]/20';
    if (p.includes('pinterest')) return 'bg-[#e60023]/10 text-[#e60023] border-[#e60023]/20';
    if (p.includes('youtube')) return 'bg-[#ff0000]/10 text-[#ff0000] border-[#ff0000]/20';
    return 'bg-[#630ed4]/10 text-[#630ed4] border-[#630ed4]/20';
  };

  return (
    <section className="space-y-12 animate-fade-in my-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191c1e] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#d2bbff]">check_circle</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Export Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 md:p-8 rounded-[24px] border border-[#ccc3d8]/40 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#630ed4]/10 text-[#630ed4] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI Generated Strategy
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight">
            Weekly Content Plan for <span className="text-[#630ed4]">{brandName}</span>
          </h2>
          <p className="text-[#4a4455] text-sm md:text-base pt-1">
            Review your 7-day social media calendar, captions, hashtags, and posting schedule.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopyAll}
            className="bg-white border border-[#ccc3d8] px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-[#f2f4f6] transition-colors cursor-pointer shadow-sm active:scale-95 text-[#191c1e]"
          >
            <span className="material-symbols-outlined text-base">content_copy</span> Copy All
          </button>
          <button
            onClick={handleExportMarkdown}
            className="bg-white border border-[#ccc3d8] px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-[#f2f4f6] transition-colors cursor-pointer shadow-sm active:scale-95 text-[#191c1e]"
          >
            <span className="material-symbols-outlined text-base">markdown</span> Markdown
          </button>
          <button
            onClick={handleExportPDF}
            className="primary-gradient text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold hover:opacity-95 transition-all cursor-pointer shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-base">download</span> Export Report
          </button>
        </div>
      </div>

      {/* Strategy Summary Card */}
      <div className="glass p-6 md:p-8 rounded-[24px] border-l-4 border-l-[#630ed4] flex flex-col md:flex-row gap-5 items-start shadow-sm">
        <div className="bg-[#630ed4]/10 p-3.5 rounded-2xl text-[#630ed4] shrink-0">
          <span className="material-symbols-outlined text-3xl">lightbulb</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#191c1e]">Weekly Strategy Summary</h3>
          <p className="text-[#4a4455] text-base leading-relaxed">
            {strategyText}
          </p>
        </div>
      </div>

      {/* Feature 7: Content Pillars & Feature 8: Marketing Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Pillars */}
        <div className="bg-white p-6 rounded-[24px] border border-[#ccc3d8]/40 shadow-sm space-y-4">
          <h3 className="text-lg font-extrabold text-[#191c1e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#630ed4]">category</span>
            Content Pillars
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {pillars.map((pillar, pIdx) => (
              <span
                key={pIdx}
                className="px-4 py-2 bg-[#630ed4]/10 text-[#630ed4] rounded-xl text-xs font-bold border border-[#630ed4]/20 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#630ed4]"></span>
                {pillar}
              </span>
            ))}
          </div>
        </div>

        {/* Marketing Tips */}
        <div className="bg-white p-6 rounded-[24px] border border-[#ccc3d8]/40 shadow-sm space-y-4">
          <h3 className="text-lg font-extrabold text-[#191c1e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#630ed4]">trending_up</span>
            Weekly Marketing Tips
          </h3>
          <ul className="space-y-2 text-sm text-[#4a4455]">
            {tips.map((tip, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#630ed4] text-base shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feature 3: Weekly Content Calendar Table */}
      <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#ccc3d8]/40">
        <div className="p-6 border-b border-[#ccc3d8]/30 flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-[#191c1e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#630ed4]">calendar_month</span>
            7-Day Posting Schedule
          </h3>
          <span className="text-xs font-bold text-[#4a4455] bg-[#f2f4f6] px-3 py-1 rounded-full">
            Optimal Audience Times
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#f2f4f6] border-b border-[#ccc3d8]">
              <tr>
                <th className="p-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4a4455]">Day</th>
                <th className="p-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4a4455]">Platform</th>
                <th className="p-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4a4455]">Content Format</th>
                <th className="p-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4a4455]">Topic Idea</th>
                <th className="p-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4a4455]">Posting Time</th>
                <th className="p-4 px-6 text-xs font-bold uppercase tracking-wider text-[#4a4455]">CTA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ccc3d8]/30">
              {schedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#630ed4]/5 transition-colors group">
                  <td className="p-4 px-6 font-bold text-[#630ed4]">{row.day}</td>
                  <td className="p-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPlatformBadgeColor(row.platform)}`}>
                      {row.platform}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-sm text-[#191c1e] font-medium">{row.contentType}</td>
                  <td className="p-4 px-6 text-sm text-[#4a4455]">{row.idea}</td>
                  <td className="p-4 px-6 text-sm text-[#191c1e] font-semibold">{row.time}</td>
                  <td className="p-4 px-6">
                    <span className="text-xs font-bold text-[#630ed4] bg-[#630ed4]/10 px-2.5 py-1 rounded-md">
                      {row.cta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature 4, 5, 6: Detailed Captions & Hashtag Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-extrabold text-[#191c1e]">
            Captions, Hashtags &amp; Engagement Guidance
          </h3>
          <span className="text-xs text-[#4a4455] font-medium">Click refresh icon to generate new caption</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-[24px] border border-[#ccc3d8]/60 hover:border-[#630ed4] transition-all shadow-sm hover:shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
                    {item.day.substring(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-lg text-[#191c1e]">{item.day} Post</h4>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getPlatformBadgeColor(item.platform)}`}>
                        {item.platform}
                      </span>
                    </div>
                    <p className="text-xs text-[#4a4455] font-medium pt-0.5">
                      Format: <strong>{item.contentType}</strong> • Best Time: <strong>{item.time}</strong> • Goal CTA: <strong>{item.cta}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopyText(`${item.caption}\n\n${item.hashtags.join(' ')}`, idx)}
                    className="p-2.5 bg-[#f2f4f6] hover:bg-[#630ed4]/10 rounded-xl text-[#630ed4] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                    title="Copy Caption & Hashtags"
                  >
                    <span className="material-symbols-outlined text-base">
                      {copiedIndex === idx ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleRefreshCard(idx)}
                    disabled={refreshingIndex === idx}
                    className="p-2.5 bg-[#f2f4f6] hover:bg-[#630ed4]/10 rounded-xl text-[#630ed4] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 text-xs font-bold"
                    title="Regenerate this post caption with AI"
                  >
                    <span className={`material-symbols-outlined text-base ${refreshingIndex === idx ? 'animate-spin' : ''}`}>
                      refresh
                    </span>
                    <span>{refreshingIndex === idx ? 'Regenerating...' : 'Refresh'}</span>
                  </button>
                </div>
              </div>

              {/* Concept Headline */}
              <div className="bg-[#f7f9fb] px-4 py-2.5 rounded-xl border border-[#ccc3d8]/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#630ed4]">lightbulb</span>
                <span className="text-xs font-bold text-[#191c1e]">Topic Idea:</span>
                <span className="text-xs text-[#4a4455] font-medium">{item.idea}</span>
              </div>

              {/* Caption Box */}
              <div className="bg-[#f8f6fc] p-5 rounded-2xl border border-[#ccc3d8]/30 space-y-2">
                <p className="text-xs font-bold text-[#630ed4] tracking-wider uppercase">Caption</p>
                <p className="text-sm leading-relaxed text-[#191c1e] whitespace-pre-wrap font-sans">
                  {item.caption}
                </p>
              </div>

              {/* Hashtag List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#4a4455] tracking-wider uppercase">Hashtag Pack ({item.hashtags.length})</p>
                <div className="flex flex-wrap gap-2">
                  {item.hashtags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs bg-white px-3 py-1 rounded-full border border-[#ccc3d8] text-[#4a4455] font-medium hover:border-[#630ed4] transition-colors cursor-pointer"
                      onClick={() => handleCopyText(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Tip */}
              {item.engagementTip && (
                <div className="text-xs text-[#4a4455] bg-[#f2f4f6] p-3 rounded-xl flex items-center gap-2 border border-[#ccc3d8]/20">
                  <span className="material-symbols-outlined text-base text-[#630ed4]">tips_and_updates</span>
                  <span><strong>Pro Tip:</strong> {item.engagementTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="bg-[#e0e3e5] text-[#191c1e] px-8 py-4 rounded-xl font-bold hover:bg-[#d8dadc] transition-all flex items-center gap-3 cursor-pointer shadow-sm active:scale-95 text-base"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Generate Another Plan
        </button>
      </div>
    </section>
  );
};
