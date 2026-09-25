import React, { useState } from 'react';
import { FormState } from '../types';

interface IndustryShowcaseProps {
  onSelectPreset: (presetData: FormState) => void;
}

interface ShowcaseItem {
  id: string;
  industry: string;
  brandName: string;
  icon: string;
  tagline: string;
  audience: string;
  voice: string;
  pillars: string[];
  samplePost: {
    day: string;
    platform: string;
    platformIcon: string;
    format: string;
    time: string;
    topic: string;
    caption: string;
    hashtags: string[];
    cta: string;
    proTip: string;
  };
  formState: FormState;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'fitness',
    industry: 'Fitness & Wellness',
    brandName: 'FitLife Daily',
    icon: 'fitness_center',
    tagline: 'High-energy, relatable workout routines and nutrition habits for busy lifestyles.',
    audience: 'Busy Professionals & College Students (Ages 18-35)',
    voice: 'Friendly, Energetic & Motivational',
    pillars: ['15-Minute Home Workouts', 'No-Crash Nutrition & Meal Prep', 'Mindset & Daily Rituals'],
    samplePost: {
      day: 'Monday',
      platform: 'Instagram',
      platformIcon: 'photo_camera',
      format: 'Reel / 9:16 Video',
      time: '08:30 AM',
      topic: '3 Morning Habits That Eliminate the 2 PM Energy Slump',
      caption: 'Stop relying on your 3rd coffee to survive 2 PM! ⚡\n\nTry this 3-step morning sequence for 7 days:\n1️⃣ 10-minute sunlight walk before opening Slack or email\n2️⃣ 500ml water with pinch of sea salt & lemon before espresso\n3️⃣ High-protein breakfast (30g min) to stabilize blood sugar\n\nWhich one are you committing to tomorrow morning? Drop a ⚡ below!',
      hashtags: ['#MorningRoutine', '#HealthyHabits', '#ProductivityHacks', '#EnergyBoost', '#FitnessTips', '#HealthyLifestyle', '#DailyRituals'],
      cta: 'Save this reel to reset your Monday morning routine!',
      proTip: 'Hook viewers in the first 1.5 seconds by showing a dynamic countdown and energetic beat.',
    },
    formState: {
      brandName: 'FitLife',
      businessCategory: 'Fitness & Wellness',
      targetAudience: 'College Students & Busy Professionals',
      brandVoice: 'Friendly and Motivational',
      contentThemes: 'Workout Tips, Healthy Food, Motivation',
      primaryGoal: 'Increase Community Engagement & Organic Followers',
      platforms: {
        instagram: true,
        linkedin: false,
        twitter: true,
        facebook: false,
        pinterest: true,
        youtube: true,
      },
      additionalInstructions: 'Emphasize actionable habits that require under 20 minutes a day.',
    },
  },
  {
    id: 'tech',
    industry: 'Clean Tech & SaaS',
    brandName: 'EcoSphere Tech',
    icon: 'eco',
    tagline: 'Enterprise carbon accounting software simplifying ESG compliance for modern organizations.',
    audience: 'Sustainability Directors, CTOs & Enterprise ESG Teams',
    voice: 'Professional, Authoritative & Forward-Looking',
    pillars: ['Scope 1-3 Carbon Analytics', 'Regulatory ESG Compliance', 'Green Cloud Optimization'],
    samplePost: {
      day: 'Tuesday',
      platform: 'LinkedIn',
      platformIcon: 'work',
      format: 'Document Carousel (5 Slides)',
      time: '10:15 AM',
      topic: 'The 2026 Enterprise ESG Audit: 4 Critical Blindspots',
      caption: 'Most enterprise carbon reports still suffer from severe Scope 3 inaccuracies.\n\nAnalyzing over 120 global supply chains uncovered 4 critical data gaps:\n\n→ Tier-2 vendor emission extrapolation errors\n→ Unmetered hybrid cloud energy consumption\n→ Manual spreadsheet latency leading to outdated filings\n\nSwipe through our 5-slide breakdown for the exact checklist leading sustainability teams use to automate audit readiness.',
      hashtags: ['#Sustainability', '#ESGReporting', '#CleanTech', '#CarbonAccounting', '#B2BTech', '#GreenEnterprise', '#CorporateGovernance'],
      cta: 'Repost 🔁 to help sustainability leaders in your network ensure audit compliance.',
      proTip: 'Pin a link to the complete methodology in the first comment within 10 minutes of publishing.',
    },
    formState: {
      brandName: 'EcoSphere Tech',
      businessCategory: 'Clean Tech SaaS',
      targetAudience: 'Sustainability Directors & Enterprise Leaders',
      brandVoice: 'Professional & Authoritative',
      contentThemes: 'Carbon Auditing, Green Cloud, ESG Regulations',
      primaryGoal: 'Drive B2B Inbound Demos & Qualified Leads',
      platforms: {
        instagram: false,
        linkedin: true,
        twitter: true,
        facebook: false,
        pinterest: false,
        youtube: false,
      },
      additionalInstructions: 'Focus on enterprise ROI, compliance deadlines, and automated reporting accuracy.',
    },
  },
  {
    id: 'bakery',
    industry: 'Artisan Food & Beverage',
    brandName: 'Artisan Bakehouse',
    icon: 'bakery_dining',
    tagline: 'Wild-fermented sourdough, heirloom heritage grains, and small-batch morning pastries.',
    audience: 'Local Foodies, Coffee Lovers & Weekend Brunch Enthusiasts',
    voice: 'Warm, Sensory, Artisanal & Community-Driven',
    pillars: ['36-Hour Sourdough Fermentation', 'Behind-the-Scenes Baker Life', 'Seasonal Flavor Releases'],
    samplePost: {
      day: 'Wednesday',
      platform: 'Instagram',
      platformIcon: 'photo_camera',
      format: 'ASMR Reel & Carousel',
      time: '07:30 AM',
      topic: 'The Sound of a 36-Hour Sourdough Crust Crackling',
      caption: 'Turn your volume all the way up for this one! 🔊 Fresh out of our stone deck ovens at 5:30 AM.\n\nNotice that blistering on the crust? That is the hallmark of a cold 36-hour wild-yeast fermentation using stoneground heritage grains from our regional mill.\n\nLoaves are warm on the racks until 11 AM or until sold out. Come say hello!',
      hashtags: ['#ArtisanBakery', '#SourdoughLovers', '#RealBread', '#BakersOfInstagram', '#LocalFoodie', '#PastryArts', '#HeritageGrains'],
      cta: 'Tap the link in bio to pre-order your weekend country loaves.',
      proTip: 'Record crisp audio right near the oven door to maximize replay rate and audio saves.',
    },
    formState: {
      brandName: 'Artisan Bakehouse',
      businessCategory: 'Artisan Bakery & Cafe',
      targetAudience: 'Local Neighborhood Foodies & Coffee Drinkers',
      brandVoice: 'Warm and Approachable',
      contentThemes: 'Fresh Baking Process, Community Stories, Seasonal Menu',
      primaryGoal: 'Drive Foot Traffic & Weekend Pre-Orders',
      platforms: {
        instagram: true,
        linkedin: false,
        twitter: false,
        facebook: true,
        pinterest: true,
        youtube: false,
      },
      additionalInstructions: 'Emphasize sensory descriptions like warm aromas, crisp crusts, and local ingredients.',
    },
  },
  {
    id: 'fintech',
    industry: 'Fintech & Personal Finance',
    brandName: 'NovaFin App',
    icon: 'account_balance',
    tagline: 'Automated micro-investing and intelligent debt payoff designed for the next generation.',
    audience: 'Young Professionals & First-Time Investors (Ages 22-38)',
    voice: 'Sharp, Transparent, Jargon-Free & Empathetic',
    pillars: ['High-Yield Wealth Stacking', 'Hidden Fee Teardowns', 'Debt Snowball Frameworks'],
    samplePost: {
      day: 'Thursday',
      platform: 'X (Twitter)',
      platformIcon: 'chat',
      format: 'Actionable 5-Tweet Thread',
      time: '12:45 PM',
      topic: '5 Financial Traps Most 20-Somethings Fall Into',
      caption: 'Most people don\'t lose money on bad investments. They lose money on subtle leaks.\n\nHere are 5 traps that silently cost $400+/month:\n\n🧵 1. "Lazy Subscriptions" you forgot to audit (average American pays $219/mo for unused services).\n\n🧵 2. Leaving emergency savings in a 0.01% checking account instead of a 4.5% HYSA.\n\n🧵 3. Paying credit card minimums instead of applying the Avalanche method.\n\nFull framework breakdown below 👇',
      hashtags: ['#PersonalFinance', '#MoneyTips', '#InvestingForBeginners', '#WealthBuilding', '#FinancialFreedom', '#BudgetHacks'],
      cta: 'Bookmark this thread to audit your financial leaks this weekend.',
      proTip: 'Post the full calculator tool link in tweet #2 to avoid algorithmic link penalties on tweet #1.',
    },
    formState: {
      brandName: 'NovaFin',
      businessCategory: 'Fintech & Personal Finance',
      targetAudience: 'First-Time Investors & Young Professionals',
      brandVoice: 'Witty and Approachable',
      contentThemes: 'Smart Budgeting, Automated Investing, Debt Elimination',
      primaryGoal: 'Drive App Installs & Build Financial Literacy Credibility',
      platforms: {
        instagram: true,
        linkedin: true,
        twitter: true,
        facebook: false,
        pinterest: false,
        youtube: true,
      },
      additionalInstructions: 'Zero Wall Street jargon. Use clear everyday math and relatable money habits.',
    },
  },
  {
    id: 'fashion',
    industry: 'Sustainable Fashion',
    brandName: 'NextWave Apparel',
    icon: 'checkroom',
    tagline: 'Capsule wardrobe essentials crafted from 100% recycled organic fibers and natural dyes.',
    audience: 'Conscious Consumers, Eco-Stylists & Minimalists',
    voice: 'Refined, Intentional, Aesthetic & Transparent',
    pillars: ['Capsule Wardrobe Styling', 'Supply Chain Transparency', 'Garment Care & Longevity'],
    samplePost: {
      day: 'Friday',
      platform: 'Pinterest',
      platformIcon: 'push_pin',
      format: 'Visual Guide & Printable Lookbook',
      time: '11:00 AM',
      topic: 'The 10-Piece Autumn Capsule: 30 Outfits in 1 Rack',
      caption: 'You don\'t need a full closet to look effortlessly elevated every day. 🌿\n\nOur 10-piece capsule matrix pairs 3 structured tops, 2 organic linen trousers, 1 raw denim, 2 knit cardigans, and 2 timeless footwear pairs to create 30 distinct daily looks.\n\nSave this visual guide to simplify your morning styling routine!',
      hashtags: ['#CapsuleWardrobe', '#SustainableFashion', '#MinimalistStyle', '#OutfitInspo', '#SlowFashion', '#AutumnStyle', '#ConsciousCloset'],
      cta: 'Click through to download the high-resolution styling matrix PDF.',
      proTip: 'Use a clean vertical 2:3 ratio with rich natural earth tones to maximize repin velocity.',
    },
    formState: {
      brandName: 'NextWave Apparel',
      businessCategory: 'Sustainable Fashion',
      targetAudience: 'Conscious Consumers & Minimalist Stylists',
      brandVoice: 'Inspirational & Bold',
      contentThemes: 'Capsule Wardrobe Styling, Circular Supply Chain, Garment Care',
      primaryGoal: 'Increase Online Store Conversions & Brand Loyalty',
      platforms: {
        instagram: true,
        linkedin: false,
        twitter: false,
        facebook: false,
        pinterest: true,
        youtube: false,
      },
      additionalInstructions: 'Highlight circular fashion principles and easy styling combinations.',
    },
  },
];

export const IndustryShowcase: React.FC<IndustryShowcaseProps> = ({ onSelectPreset }) => {
  const [activeId, setActiveId] = useState<string>('fitness');
  const [copied, setCopied] = useState(false);

  const activeItem = SHOWCASE_ITEMS.find((item) => item.id === activeId) || SHOWCASE_ITEMS[0];

  const handleCopyCaption = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(activeItem.samplePost.caption);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="industry-showcase" className="py-20 px-6 bg-white border-y border-[#ccc3d8]/30">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#630ed4] text-xl">dataset</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#630ed4]">
              Real-World Strategy Architecture
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-4">
            See How SocialSpark Tailors to Your Exact Industry
          </h2>
          <p className="text-[#4a4455] text-base leading-relaxed">
            Generic AI spits out generic fluff. SocialSpark AI calibrates vocabulary, audience psychology, 
            and platform-native hooks specifically for your domain. Explore live samples below:
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start md:justify-center">
          {SHOWCASE_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#630ed4] text-white border-[#630ed4] shadow-md shadow-[#630ed4]/20 scale-105'
                    : 'bg-[#f7f9fb] text-[#4a4455] hover:bg-[#eaddff]/50 border-[#ccc3d8]/40'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.industry}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Interactive Card */}
        <div className="bg-[#f7f9fb] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#ccc3d8]/40 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Brand Strategy Profile & Pillars */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#79747e]">
                    Selected Blueprint:
                  </span>
                  <span className="text-xs font-extrabold text-[#630ed4] bg-[#eaddff] px-2.5 py-0.5 rounded-md">
                    {activeItem.industry}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#191c1e]">
                  {activeItem.brandName}
                </h3>
                <p className="text-xs text-[#4a4455] mt-1 leading-relaxed">
                  {activeItem.tagline}
                </p>
              </div>

              {/* Target & Voice Parameters */}
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#ccc3d8]/30">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] block">
                    Target Demographic
                  </span>
                  <p className="text-xs font-semibold text-[#191c1e] mt-0.5">
                    {activeItem.audience}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#79747e] block">
                    Calibrated Tone & Voice
                  </span>
                  <p className="text-xs font-semibold text-[#191c1e] mt-0.5">
                    {activeItem.voice}
                  </p>
                </div>
              </div>

              {/* Core Content Pillars */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#191c1e] block mb-2.5">
                  Core Content Pillars Generated:
                </span>
                <div className="space-y-2">
                  {activeItem.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#ccc3d8]/30 text-xs font-semibold text-[#191c1e]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#630ed4]/10 text-[#630ed4] flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Load preset into generator */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectPreset(activeItem.formState)}
                  className="w-full primary-gradient primary-gradient-hover text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg fill-1">auto_awesome</span>
                  <span>Use This Strategy Template</span>
                </button>
                <p className="text-[11px] text-[#79747e] text-center mt-2">
                  Pre-populates the generator with these parameters for you to customize
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Live Post Preview Mockup */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#ccc3d8]/40 shadow-sm space-y-4">
              {/* Post Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#ccc3d8]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#630ed4] to-[#c026d3] text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-lg">{activeItem.samplePost.platformIcon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#191c1e]">
                        {activeItem.samplePost.platform}
                      </span>
                      <span className="text-[10px] font-bold bg-[#630ed4]/10 text-[#630ed4] px-2 py-0.5 rounded">
                        {activeItem.samplePost.day} • {activeItem.samplePost.time}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#79747e]">
                      Format: {activeItem.samplePost.format}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="px-3 py-1.5 rounded-lg bg-[#f2f4f6] hover:bg-[#eaddff] text-xs font-bold text-[#191c1e] hover:text-[#630ed4] transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Copy sample caption"
                >
                  <span className="material-symbols-outlined text-xs">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied!' : 'Copy Caption'}</span>
                </button>
              </div>

              {/* Topic Headline */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#79747e] block">
                  Campaign Angle:
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-[#191c1e] mt-0.5">
                  {activeItem.samplePost.topic}
                </h4>
              </div>

              {/* Formatted Caption Box */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#79747e] block mb-1">
                  Full AI Generated Caption:
                </span>
                <div className="bg-[#f7f9fb] p-4 rounded-xl border border-[#ccc3d8]/40 text-xs sm:text-sm text-[#191c1e] whitespace-pre-line leading-relaxed font-normal">
                  {activeItem.samplePost.caption}
                </div>
              </div>

              {/* Hashtags Cluster */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#79747e] block mb-1.5">
                  Targeted Hashtags ({activeItem.samplePost.hashtags.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.samplePost.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#eaddff]/50 border border-[#630ed4]/20 text-[#630ed4] text-[11px] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call-to-Action & Algorithmic Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#fbf9fe] rounded-xl border border-[#ccc3d8]/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#79747e] block">
                    Strategic CTA:
                  </span>
                  <p className="text-xs font-semibold text-[#191c1e] mt-1">
                    {activeItem.samplePost.cta}
                  </p>
                </div>
                <div className="p-3 bg-[#fbf9fe] rounded-xl border border-[#ccc3d8]/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#79747e] block">
                    Algorithmic Timing Tip:
                  </span>
                  <p className="text-xs text-[#4a4455] mt-1">
                    💡 {activeItem.samplePost.proTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
