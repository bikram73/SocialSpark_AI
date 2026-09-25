import React, { useState, useMemo } from 'react';
import { DayPlan } from '../types';

interface CalendarPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  generatedCalendar?: DayPlan[];
  brandName?: string;
}

export interface CalendarPostItem {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dayFull: string;
  platform: string;
  platformIcon: string;
  gradientClass: string;
  borderGlow: string;
  time: string;
  contentType: string;
  topic: string;
  caption: string;
  hashtags: string[];
  cta: string;
  engagementTip: string;
  status: string;
}

const DEFAULT_DEMO_POSTS: CalendarPostItem[] = [
  {
    id: 'post-mon',
    day: 'Mon',
    dayFull: 'Monday',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    gradientClass: 'from-[#833ab4]/90 via-[#fd1d1d]/85 to-[#fcb045]/90',
    borderGlow: 'hover:shadow-[#fd1d1d]/30',
    time: '09:00 AM',
    contentType: 'Reel / Short Video',
    topic: '3 Morning Habits for Sustained Energy & Focus',
    caption: 'Start your week with intentional energy! ⚡ Here are 3 habits our team swears by to maintain peak focus without the 2 PM crash:\n\n1️⃣ 10-minute morning sunlight walk before looking at any screens\n2️⃣ Batch high-leverage creative work before noon\n3️⃣ Hydrate with electrolytes before your second espresso\n\nWhich one are you implementing this Monday? Drop a ⚡ below!',
    hashtags: ['#ProductivityTips', '#MondayMotivation', '#HealthyHabits', '#MorningRoutine', '#FocusMindset', '#WorkSmart', '#EnergyBoost', '#DailyRituals'],
    cta: 'Save this reel for your Monday morning routine!',
    engagementTip: 'Use a trending ambient audio track and include bold on-screen text in the first 1.5 seconds to hook mobile viewers.',
    status: 'Peak Engagement Window',
  },
  {
    id: 'post-tue',
    day: 'Tue',
    dayFull: 'Tuesday',
    platform: 'LinkedIn',
    platformIcon: 'work',
    gradientClass: 'from-[#0077b5]/90 to-[#004182]/90',
    borderGlow: 'hover:shadow-[#0077b5]/30',
    time: '10:30 AM',
    contentType: 'Carousel / Framework Breakdown',
    topic: 'The Playbook for Sustainable Brand Growth in 2026',
    caption: 'Most brands chase viral spikes. Sustainable brands engineer repeatable systems.\n\nOver the past 6 months, analyzing over 500 top-performing social campaigns revealed 3 distinct pillars:\n\n→ Audience-first value over vanity reach\n→ Native formats optimized for platform dwell time\n→ Micro-community engagement in the comments\n\nSwipe through the 5-slide breakdown for our step-by-step operating playbook.',
    hashtags: ['#SocialMediaStrategy', '#OrganicGrowth', '#ContentMarketing', '#BrandStrategy', '#MarketingLeaders', '#DigitalTrends', '#B2BMarketing', '#GrowthHacking'],
    cta: 'Repost 🔁 to help a fellow founder or marketer scale up.',
    engagementTip: 'Pin a provocative discussion question in the first comment within 10 minutes of publishing.',
    status: 'Ready to Publish',
  },
  {
    id: 'post-wed',
    day: 'Wed',
    dayFull: 'Wednesday',
    platform: 'X (Twitter)',
    platformIcon: 'chat',
    gradientClass: 'from-[#1d9bf0]/90 to-[#0a66c2]/90',
    borderGlow: 'hover:shadow-[#1d9bf0]/30',
    time: '01:15 PM',
    contentType: 'Actionable Thread',
    topic: '5 Critical Mistakes Creators Make When Repurposing Content',
    caption: 'Repurposing isn\'t just copy-pasting the same text to 5 platforms. Here is how top operators do it 10x better:\n\n🧵 1/5: The Hook must match the platform mindset. What works on LinkedIn will flop on TikTok if pacing is slow.\n\n🧵 2/5: Strip links from the primary tweet. Thread the URL in tweet 2 or 3 for 3x algorithmic reach.\n\n🧵 3/5: Re-cut vertical video into distinct 15-second punchlines.\n\nRead the full breakdown below 👇',
    hashtags: ['#ContentCreation', '#CreatorEconomy', '#SocialGrowth', '#WritingTips', '#AudienceBuilding', '#MarketingThread', '#BrandBuilding'],
    cta: 'Bookmark this thread to reference when planning your next sprint.',
    engagementTip: 'Quote-tweet the second post with an infographic 4 hours later to catch evening traffic.',
    status: 'Optimized',
  },
  {
    id: 'post-thu',
    day: 'Thu',
    dayFull: 'Thursday',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    gradientClass: 'from-[#a855f7]/90 to-[#ec4899]/90',
    borderGlow: 'hover:shadow-[#ec4899]/30',
    time: '02:00 PM',
    contentType: 'Behind-the-Scenes Carousel',
    topic: 'How We Plan 30 Days of Content in 2 Hours',
    caption: 'Ever wonder what goes into planning our weekly calendar? Here is our exact 4-step workflow from raw ideation to final schedule:\n\n1. Brain dump themes into SocialSpark AI\n2. Filter by audience pain-points and current questions\n3. Match formats to peak traffic windows\n4. Automate approvals and visual assets\n\nNo stress, no blank screens. Save this post for your next content sprint! 📌',
    hashtags: ['#BehindTheScenes', '#ContentPlanning', '#InstagramStrategy', '#WorkflowHacks', '#SocialPlanner', '#ContentCalendar', '#CreativeProcess', '#SocialSpark'],
    cta: 'Tap the link in bio to try our workflow template for free.',
    engagementTip: 'Slide 1 uses high-contrast typography with a question that drives 38% higher swipe-through rates.',
    status: 'High Engagement Potential',
  },
  {
    id: 'post-fri',
    day: 'Fri',
    dayFull: 'Friday',
    platform: 'LinkedIn',
    platformIcon: 'work',
    gradientClass: 'from-[#0f172a]/90 via-[#334155]/90 to-[#630ed4]/90',
    borderGlow: 'hover:shadow-[#630ed4]/30',
    time: '11:00 AM',
    contentType: 'Case Study & Client Spotlight',
    topic: 'Case Study: How Community-Led Marketing Drove 240% Reach Growth',
    caption: 'Last quarter, we tested a radical shift: instead of broadcasting brand announcements, we highlighted community member transformations every Friday.\n\nThe results after 90 days:\n📈 Organic reach increased by 240%\n💬 Inbound comments jumped from 12 to 84 per post\n🤝 Direct inbound qualified inquiries doubled\n\nPeople connect with people, not logos. Read the full metrics breakdown in the first comment.',
    hashtags: ['#CaseStudy', '#CommunityBuilding', '#CustomerSuccess', '#GrowthStrategy', '#MarketingInsights', '#SocialProof', '#Leadership', '#ScaleUp'],
    cta: 'Comment "CASE STUDY" to receive the complete 12-page PDF report.',
    engagementTip: 'Tag mentioned partners and team members to jumpstart viral network reach within hour 1.',
    status: 'Peak Hours',
  },
  {
    id: 'post-sat',
    day: 'Sat',
    dayFull: 'Saturday',
    platform: 'Pinterest',
    platformIcon: 'push_pin',
    gradientClass: 'from-[#e60023]/90 to-[#b80018]/90',
    borderGlow: 'hover:shadow-[#e60023]/30',
    time: '10:00 AM',
    contentType: 'Visual Checklist & Printable Guide',
    topic: 'Weekend Reset: 7 Easy Meal-Prep & Mindset Boxes',
    caption: 'Your ultimate weekend recharge checklist! 🌿 Step-by-step visual guide to setting up your week for calm, productive success without Sunday scaries.\n\nFrom 30-minute nutrient-dense prep containers to a 10-minute digital cleanup ritual, this is the cheat sheet you need.\n\nClick through to save the high-resolution printable checklist!',
    hashtags: ['#WeekendReset', '#MealPrepIdeas', '#HealthyLiving', '#SundayPrep', '#SelfCareRoutine', '#MindfulLiving', '#PrintableChecklist', '#WellnessTips'],
    cta: 'Click the link to download the high-res printable PDF checklist.',
    engagementTip: 'Use a 2:3 vertical graphic ratio with bold warm lifestyle imagery for maximum repins.',
    status: 'Ready to Publish',
  },
  {
    id: 'post-sun',
    day: 'Sun',
    dayFull: 'Sunday',
    platform: 'YouTube',
    platformIcon: 'smart_display',
    gradientClass: 'from-[#ff0000]/90 to-[#990000]/90',
    borderGlow: 'hover:shadow-[#ff0000]/30',
    time: '04:30 PM',
    contentType: 'YouTube Shorts / Micro Masterclass',
    topic: '60-Second Sunday Audit: Preparing for the Week Ahead',
    caption: 'Spend 60 seconds with this weekly reflection framework before starting Monday. Watch till the end for the #1 question that eliminates 80% of unnecessary meetings!\n\n"What is the single highest-leverage task I can accomplish this week?"\n\nSubscribe for weekly bite-sized strategy masterclasses.',
    hashtags: ['#YouTubeShorts', '#WeeklyReview', '#MindsetShift', '#ProductivityAudit', '#SundayMotivation', '#ShortTutorial', '#SmartWork', '#Planning'],
    cta: 'Subscribe for weekly 60-second strategy drops.',
    engagementTip: 'Add dynamic animated captions on screen for mobile viewers watching without sound.',
    status: 'Scheduled',
  },
];

export const CalendarPreviewModal: React.FC<CalendarPreviewModalProps> = ({
  isOpen,
  onClose,
  generatedCalendar,
  brandName,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<CalendarPostItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<string>('Current Week');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewDensity, setViewDensity] = useState<'comfortable' | 'compact'>('comfortable');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCopyText = (text: string, id: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Convert generated calendar if available
  const posts: CalendarPostItem[] = useMemo(() => {
    if (generatedCalendar && generatedCalendar.length > 0) {
      return generatedCalendar.map((item, idx) => {
        const dayStr = item.day || `Day ${idx + 1}`;
        const dayCode = (dayStr.slice(0, 3) as CalendarPostItem['day']) || 'Mon';
        const platform = item.platform || 'Instagram';
        
        let icon = 'auto_awesome';
        let gradient = 'from-[#630ed4]/90 to-[#9c48ea]/90';
        let borderGlow = 'hover:shadow-[#630ed4]/30';

        const pLower = platform.toLowerCase();
        if (pLower.includes('insta')) {
          icon = 'photo_camera';
          gradient = 'from-[#833ab4]/90 via-[#fd1d1d]/85 to-[#fcb045]/90';
          borderGlow = 'hover:shadow-[#fd1d1d]/30';
        } else if (pLower.includes('link')) {
          icon = 'work';
          gradient = 'from-[#0077b5]/90 to-[#004182]/90';
          borderGlow = 'hover:shadow-[#0077b5]/30';
        } else if (pLower.includes('twit') || pLower.includes('x')) {
          icon = 'chat';
          gradient = 'from-[#1d9bf0]/90 to-[#0a66c2]/90';
          borderGlow = 'hover:shadow-[#1d9bf0]/30';
        } else if (pLower.includes('face')) {
          icon = 'groups';
          gradient = 'from-[#1877f2]/90 to-[#0d5ac9]/90';
          borderGlow = 'hover:shadow-[#1877f2]/30';
        } else if (pLower.includes('pin')) {
          icon = 'push_pin';
          gradient = 'from-[#e60023]/90 to-[#b80018]/90';
          borderGlow = 'hover:shadow-[#e60023]/30';
        } else if (pLower.includes('you') || pLower.includes('tube')) {
          icon = 'smart_display';
          gradient = 'from-[#ff0000]/90 to-[#990000]/90';
          borderGlow = 'hover:shadow-[#ff0000]/30';
        }

        return {
          id: `gen-post-${idx}`,
          day: dayCode,
          dayFull: item.day || `Day ${idx + 1}`,
          platform: item.platform,
          platformIcon: icon,
          gradientClass: gradient,
          borderGlow: borderGlow,
          time: item.time || '10:00 AM',
          contentType: item.contentType || 'Social Post',
          topic: item.idea || 'Content Campaign',
          caption: item.caption || '',
          hashtags: item.hashtags || [],
          cta: item.cta || 'Engage with our post!',
          engagementTip: item.engagementTip || 'Engage with comments in the first 30 minutes for highest reach.',
          status: 'AI Optimized',
        };
      });
    }
    return DEFAULT_DEMO_POSTS;
  }, [generatedCalendar]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchDay = selectedDay === 'All' || post.day === selectedDay;
      const matchPlatform =
        selectedPlatform === 'All' ||
        post.platform.toLowerCase().includes(selectedPlatform.toLowerCase());
      return matchDay && matchPlatform;
    });
  }, [posts, selectedDay, selectedPlatform]);

  const daysList: { code: string; label: string }[] = [
    { code: 'All', label: 'All Week' },
    { code: 'Mon', label: 'Mon' },
    { code: 'Tue', label: 'Tue' },
    { code: 'Wed', label: 'Wed' },
    { code: 'Thu', label: 'Thu' },
    { code: 'Fri', label: 'Fri' },
    { code: 'Sat', label: 'Sat' },
    { code: 'Sun', label: 'Sun' },
  ];

  const platformsList = ['All', 'Instagram', 'LinkedIn', 'X (Twitter)', 'Pinterest', 'YouTube'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#fbf9fe] via-[#f5efff] to-[#eaddff] rounded-[32px] p-5 sm:p-8 md:p-10 shadow-2xl border border-white/80 overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Child Div 1: Decorative background glow top */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-gradient-to-r from-[#d946ef]/20 to-[#7c3aed]/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Child Div 2: Decorative background glow bottom */}
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-gradient-to-r from-[#8127cf]/20 to-[#ec4899]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#191c1e] flex items-center justify-center shadow-md transition-all cursor-pointer z-30 hover:scale-105 active:scale-95"
          title="Close Calendar"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Child Div 3: Header bar with interactive dropdown and tools */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md border border-white">
              <span className="text-2xl font-black bg-gradient-to-r from-[#7c3aed] to-[#d946ef] bg-clip-text text-transparent">
                3D
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#191c1e]">
                  Interactive Glass Calendar
                </h2>
                {brandName && (
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#630ed4]/10 text-[#630ed4] border border-[#630ed4]/20">
                    {brandName}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#4a4455]">
                Multi-platform schedule visualizer with deep post inspector and copy tools
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Timeframe Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="bg-white/90 hover:bg-white backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-[#4a4455] hover:text-[#630ed4] shadow-sm border border-white flex items-center gap-2 cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-base text-[#630ed4]">calendar_month</span>
                <span>{timeframe}</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-[#ccc3d8]/40 py-1.5 z-40 animate-fade-in">
                  {['Current Week', 'Next Week', 'Full Month Overview'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setTimeframe(opt);
                        setDropdownOpen(false);
                        showToast(`Switched view to ${opt}`);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-[#eaddff]/50 transition-colors flex items-center justify-between cursor-pointer ${
                        timeframe === opt ? 'text-[#630ed4] font-bold bg-[#eaddff]/30' : 'text-[#4a4455]'
                      }`}
                    >
                      <span>{opt}</span>
                      {timeframe === opt && <span className="material-symbols-outlined text-xs">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Density toggle */}
            <button
              onClick={() => {
                setViewDensity((prev) => (prev === 'comfortable' ? 'compact' : 'comfortable'));
                showToast(`Layout changed to ${viewDensity === 'comfortable' ? 'Compact' : 'Comfortable'}`);
              }}
              title="Toggle View Density"
              className="w-9 h-9 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-sm border border-white text-[#4a4455] hover:text-[#7c3aed] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">widgets</span>
            </button>

            {/* Smart Notification / Status */}
            <button
              onClick={() => {
                showToast('AI Smart Calendar is active: All 7 days verified and tailored to audience peak hours');
              }}
              title="Schedule Status"
              className="w-9 h-9 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-sm border border-white text-[#4a4455] hover:text-[#7c3aed] transition-colors cursor-pointer relative"
            >
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ec4899] animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Child Div 4: 3D Glass Mockup Board (Target of CSS selector) */}
        <div className="relative bg-white/50 backdrop-blur-xl rounded-[28px] p-5 sm:p-6 border border-white/70 shadow-xl min-h-[460px] flex flex-col justify-between overflow-y-auto max-h-[64vh]">
          {/* Board Header Toolbar: Day Filters & Platform Filters */}
          <div className="border-b border-white/60 pb-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#191c1e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#630ed4]">view_kanban</span>
                  Weekly Plan
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#630ed4] text-white shadow-xs">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                </span>
              </div>

              {/* Day filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {daysList.map((d) => {
                  const isActive = selectedDay === d.code;
                  return (
                    <button
                      key={d.code}
                      onClick={() => {
                        setSelectedDay(d.code);
                        if (selectedPost && d.code !== 'All' && selectedPost.day !== d.code) {
                          setSelectedPost(null);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#630ed4] text-white shadow-md shadow-[#630ed4]/20 scale-105'
                          : 'bg-white/80 hover:bg-white text-[#4a4455] border border-white/60'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] shrink-0">
                Platform:
              </span>
              {platformsList.map((p) => {
                const isActive = selectedPlatform === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#191c1e] text-white shadow-sm'
                        : 'bg-white/70 hover:bg-white text-[#4a4455] border border-white/60'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="mb-4 p-3 rounded-xl bg-[#630ed4] text-white text-xs font-medium flex items-center justify-between shadow-lg animate-fade-in z-30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="hover:opacity-80 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          {/* Floating Glass Cards Grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center text-[#4a4455]">
              <span className="material-symbols-outlined text-5xl text-[#630ed4]/40 mb-2 block">
                calendar_today
              </span>
              <p className="font-bold text-base text-[#191c1e]">No posts found for this filter</p>
              <p className="text-xs text-[#79747e] mt-1 mb-4">
                Try selecting "All Week" or clear your platform filter to see more posts.
              </p>
              <button
                onClick={() => {
                  setSelectedDay('All');
                  setSelectedPlatform('All');
                }}
                className="px-4 py-2 bg-[#630ed4] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:bg-[#520cb3]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative z-10 py-2 ${
                viewDensity === 'compact' ? 'gap-3' : 'gap-5'
              }`}
            >
              {filteredPosts.map((post) => {
                const isSelected = selectedPost?.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`group relative bg-gradient-to-br ${post.gradientClass} text-white rounded-2xl shadow-xl backdrop-blur-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] ${post.borderGlow} ${
                      isSelected
                        ? 'ring-4 ring-white shadow-2xl scale-[1.02] border-white'
                        : 'border-white/30 hover:border-white/60'
                    } ${viewDensity === 'compact' ? 'p-4' : 'p-5'}`}
                  >
                    {/* Top row: Platform & Day Badge */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-flex items-center gap-1.5 font-extrabold text-xs tracking-wide bg-black/25 px-2.5 py-1 rounded-lg backdrop-blur-md">
                          <span className="material-symbols-outlined text-sm">{post.platformIcon}</span>
                          <span>{post.platform}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-black uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-md backdrop-blur-sm">
                            {post.day}
                          </span>
                        </div>
                      </div>

                      {/* Content Type pill */}
                      <div className="mb-2">
                        <span className="text-[10px] font-semibold text-white/80 bg-white/10 px-2 py-0.5 rounded-md inline-block">
                          {post.contentType}
                        </span>
                      </div>

                      {/* Topic headline */}
                      <h4 className="font-extrabold text-sm text-white mb-2 leading-snug line-clamp-2">
                        {post.topic}
                      </h4>

                      {/* Caption snippet */}
                      <p className="text-[11px] text-white/85 line-clamp-2 mb-3 leading-relaxed">
                        {post.caption}
                      </p>
                    </div>

                    {/* Bottom footer: Time, Status, & Quick Actions */}
                    <div className="pt-3 border-t border-white/20 mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-white/70">schedule</span>
                        <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-md">
                          {post.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyText(post.caption, post.id);
                          }}
                          className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#191c1e] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xs"
                          title="Copy Caption"
                        >
                          <span className="material-symbols-outlined text-sm">
                            {copiedId === post.id ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPost(post);
                          }}
                          className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#191c1e] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xs"
                          title="Inspect Details"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_full</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Post Inspector Drawer / Panel when a card is selected */}
          {selectedPost && (
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-2xl animate-fade-in relative z-20">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#ccc3d8]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#630ed4] to-[#c026d3] text-white flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-xl">{selectedPost.platformIcon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-[#191c1e]">
                        {selectedPost.platform} Plan
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#630ed4]/10 text-[#630ed4]">
                        {selectedPost.dayFull} • {selectedPost.time}
                      </span>
                    </div>
                    <span className="text-xs text-[#4a4455] font-semibold">
                      Format: {selectedPost.contentType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyText(selectedPost.caption, `detail-${selectedPost.id}`)}
                    className="px-3.5 py-1.5 bg-[#630ed4] hover:bg-[#520cb3] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedId === `detail-${selectedPost.id}` ? 'check' : 'content_copy'}
                    </span>
                    {copiedId === `detail-${selectedPost.id}` ? 'Copied!' : 'Copy Caption'}
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#ffdad6] text-[#4a4455] hover:text-[#ba1a1a] flex items-center justify-center transition-all cursor-pointer"
                    title="Close Inspector"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              </div>

              {/* Inspector Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#79747e] block mb-1">
                      Post Caption & Copy:
                    </span>
                    <div className="bg-[#f7f9fb] p-4 rounded-xl border border-[#ccc3d8]/40 text-[#191c1e] text-sm whitespace-pre-line leading-relaxed font-normal">
                      {selectedPost.caption}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#79747e]">
                        Niche Hashtags ({selectedPost.hashtags.length}):
                      </span>
                      <button
                        onClick={() =>
                          handleCopyText(
                            selectedPost.hashtags.join(' '),
                            `tags-${selectedPost.id}`
                          )
                        }
                        className="text-xs font-bold text-[#630ed4] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">copy_all</span>
                        {copiedId === `tags-${selectedPost.id}` ? 'Copied!' : 'Copy Hashtags'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPost.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#ccc3d8]/60 text-xs font-semibold text-[#630ed4]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 bg-[#fbf9fe] p-4 rounded-xl border border-[#ccc3d8]/40 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] block">
                        Call-To-Action (CTA):
                      </span>
                      <p className="text-xs font-semibold text-[#191c1e] mt-1 bg-white p-2.5 rounded-lg border border-[#ccc3d8]/40">
                        {selectedPost.cta}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] block">
                        Engagement Strategy Tip:
                      </span>
                      <p className="text-xs text-[#4a4455] mt-1 bg-white p-2.5 rounded-lg border border-[#ccc3d8]/40 leading-relaxed">
                        💡 {selectedPost.engagementTip}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] block">
                        Timing & Window:
                      </span>
                      <p className="text-xs font-medium text-[#191c1e] mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#630ed4]">bolt</span>
                        Scheduled for {selectedPost.dayFull} at {selectedPost.time}
                      </p>
                    </div>
                  </div>

                  {/* Previous / Next navigation */}
                  <div className="pt-3 border-t border-[#ccc3d8]/40 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const curIdx = filteredPosts.findIndex((p) => p.id === selectedPost.id);
                        const prevIdx = (curIdx - 1 + filteredPosts.length) % filteredPosts.length;
                        setSelectedPost(filteredPosts[prevIdx]);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-[#4a4455] hover:bg-white rounded-lg border border-[#ccc3d8]/50 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      Prev Post
                    </button>

                    <button
                      onClick={() => {
                        const curIdx = filteredPosts.findIndex((p) => p.id === selectedPost.id);
                        const nextIdx = (curIdx + 1) % filteredPosts.length;
                        setSelectedPost(filteredPosts[nextIdx]);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-[#630ed4] hover:bg-white rounded-lg border border-[#630ed4]/30 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Next Post
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active AI Status Pill inside the board */}
          <div className="mt-4 pt-3 border-t border-white/50 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4a4455]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#630ed4] fill-1 text-base">auto_awesome</span>
              <span className="font-bold text-[#191c1e]">Smart Schedule Sync</span>
              <span className="text-[#79747e] hidden sm:inline">• 7 Full Days Configured</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#79747e]">
                Click any card to inspect full captions & copy hashtags
              </span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="mt-5 flex items-center justify-between shrink-0">
          <p className="text-xs text-[#79747e] hidden sm:block">
            Previewing SocialSpark 3D Glass Schedule Mockup
          </p>
          <button
            onClick={onClose}
            className="primary-gradient text-white px-7 py-2.5 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs sm:text-sm ml-auto"
          >
            Close Calendar Preview
          </button>
        </div>
      </div>
    </div>
  );
};
