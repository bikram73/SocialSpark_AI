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
  weekIndex?: number;
}

const DEFAULT_WEEK_1_POSTS: CalendarPostItem[] = [
  {
    id: 'w1-mon',
    weekIndex: 1,
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
    id: 'w1-tue',
    weekIndex: 1,
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
    id: 'w1-wed',
    weekIndex: 1,
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
    id: 'w1-thu',
    weekIndex: 1,
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
    id: 'w1-fri',
    weekIndex: 1,
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
    id: 'w1-sat',
    weekIndex: 1,
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
    id: 'w1-sun',
    weekIndex: 1,
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

const DEFAULT_WEEK_2_POSTS: CalendarPostItem[] = [
  {
    id: 'w2-mon',
    weekIndex: 2,
    day: 'Mon',
    dayFull: 'Monday (Week 2)',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    gradientClass: 'from-[#833ab4]/90 via-[#fd1d1d]/85 to-[#fcb045]/90',
    borderGlow: 'hover:shadow-[#fd1d1d]/30',
    time: '08:45 AM',
    contentType: 'Carousel / Myth-Busting',
    topic: '3 Common Industry Myths That Are Costing You Time & Money',
    caption: 'Stop believing these 3 outdated practices! 🛑 In 2026, the brands and creators winning are doing the exact opposite.\n\nSlide 1: Myth #1 — You need to post 5x a day.\nSlide 2: Reality — 3 high-leverage contextual posts outperform 10 low-effort posts every time.\nSlide 3: Myth #2 — Hashtags don\'t matter.\nSlide 4: Reality — Niche, categorized hashtags still index your content to high-intent searchers.\n\nSwipe through for the complete myth breakdown and bookmark for later!',
    hashtags: ['#MarketingMyths', '#ContentStrategy', '#SmartGrowth', '#BrandStrategy', '#CreatorHacks', '#InstagramTips', '#DigitalMarketing'],
    cta: 'Save this carousel to audit your content strategy this week!',
    engagementTip: 'Ask your audience in the caption which myth surprised them most to drive debate in comments.',
    status: 'High Potential',
  },
  {
    id: 'w2-tue',
    weekIndex: 2,
    day: 'Tue',
    dayFull: 'Tuesday (Week 2)',
    platform: 'LinkedIn',
    platformIcon: 'work',
    gradientClass: 'from-[#0077b5]/90 to-[#004182]/90',
    borderGlow: 'hover:shadow-[#0077b5]/30',
    time: '10:15 AM',
    contentType: 'Document Slide Breakdown',
    topic: 'The 2026 Social Architecture: How to Build Repeatable Reach',
    caption: 'Building an engaged audience isn\'t about chasing algorithm updates. It\'s about building repeatable social architecture.\n\nHere is the exact 4-tier funnel our team uses:\n1. Top of Funnel: Broad resonant observations\n2. Middle of Funnel: Proprietary data and actionable playbooks\n3. Bottom of Funnel: Real customer wins and workflow breakdowns\n4. Retention: Direct, thoughtful community interaction\n\nSwipe through the 6-slide PDF deck for complete implementation examples.',
    hashtags: ['#B2BMarketing', '#SocialArchitecture', '#LeadershipInsights', '#OrganicReach', '#ContentOperations', '#Founders', '#ScaleUp'],
    cta: 'Repost 🔁 to help founders in your network simplify their marketing.',
    engagementTip: 'Document posts on LinkedIn get 3x higher dwell time when each slide has under 40 words.',
    status: 'Ready to Publish',
  },
  {
    id: 'w2-wed',
    weekIndex: 2,
    day: 'Wed',
    dayFull: 'Wednesday (Week 2)',
    platform: 'X (Twitter)',
    platformIcon: 'chat',
    gradientClass: 'from-[#1d9bf0]/90 to-[#0a66c2]/90',
    borderGlow: 'hover:shadow-[#1d9bf0]/30',
    time: '01:30 PM',
    contentType: 'Actionable Cheat Sheet Thread',
    topic: '10 Friction-Eliminating Tools We Use Every Single Day',
    caption: 'The best tools don\'t do the work for you — they eliminate friction so you can focus on creativity.\n\nHere are 10 tools that save our marketing team 15+ hours every week:\n\n🧵 1. SocialSpark AI: Multi-platform strategy and calendar generation\n🧵 2. Notion: Centralized editorial roadmap\n🧵 3. Loom: Rapid feedback loops without 30-min meetings\n\nFull list with setup instructions below 👇',
    hashtags: ['#ProductivityTools', '#WorkflowHacks', '#CreatorTools', '#TechStack', '#EfficiencyTips', '#MarketingAutomation'],
    cta: 'Bookmark this thread to upgrade your weekly workflow.',
    engagementTip: 'Follow up with a poll asking your audience what their #1 tool is 2 hours later.',
    status: 'Optimized',
  },
  {
    id: 'w2-thu',
    weekIndex: 2,
    day: 'Thu',
    dayFull: 'Thursday (Week 2)',
    platform: 'Pinterest',
    platformIcon: 'push_pin',
    gradientClass: 'from-[#e60023]/90 to-[#b80018]/90',
    borderGlow: 'hover:shadow-[#e60023]/30',
    time: '03:00 PM',
    contentType: 'Step-by-Step Visual Infographic',
    topic: 'Weekly Content Planning Checklist: 5 Steps to Zero Burnout',
    caption: 'Plan your entire month without burnout! 📌 Save this visual checklist for your next creative planning session.\n\n• Step 1: Define weekly core theme\n• Step 2: Extract 3 key takeaways\n• Step 3: Format into native platform assets\n• Step 4: Schedule during audience peak hours\n• Step 5: Engage within the first 30 minutes\n\nDownload the printable template via the link in bio!',
    hashtags: ['#ContentPlanning', '#Infographic', '#VisualChecklist', '#SocialMediaTips', '#ProductivityHacks', '#OrganizationGoals', '#PrintableGuide'],
    cta: 'Save this pin to your Marketing & Business board.',
    engagementTip: 'Use a high-contrast pastel background to stand out on Pinterest search feeds.',
    status: 'Ready to Publish',
  },
  {
    id: 'w2-fri',
    weekIndex: 2,
    day: 'Fri',
    dayFull: 'Friday (Week 2)',
    platform: 'LinkedIn',
    platformIcon: 'work',
    gradientClass: 'from-[#0f172a]/90 via-[#334155]/90 to-[#630ed4]/90',
    borderGlow: 'hover:shadow-[#630ed4]/30',
    time: '11:30 AM',
    contentType: 'Customer Transformation Story',
    topic: 'How One Creator Reduced Content Planning Time by 75%',
    caption: '"I used to spend every Sunday evening stressed about what to post on Monday morning."\n\nSound familiar? We recently interviewed Sarah, a solo consultant who reclaimed 6 hours every weekend by batch-planning her content pillars and automating distribution.\n\nKey takeaways from her transformation:\n1. Never write from a blank page\n2. Group similar tasks into 90-minute blocks\n3. Focus on depth over frequency\n\nRead her complete case study below.',
    hashtags: ['#ClientSuccess', '#TimeManagement', '#SoloConsultant', '#Productivity', '#ContentStrategy', '#CaseStudy', '#WorkLifeBalance'],
    cta: 'Drop a "TEMPLATE" in the comments for Sarah\'s batching calendar.',
    engagementTip: 'Tag real team members or mentors in the story to drive early impressions.',
    status: 'Peak Hours',
  },
  {
    id: 'w2-sat',
    weekIndex: 2,
    day: 'Sat',
    dayFull: 'Saturday (Week 2)',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    gradientClass: 'from-[#a855f7]/90 to-[#ec4899]/90',
    borderGlow: 'hover:shadow-[#ec4899]/30',
    time: '10:30 AM',
    contentType: 'Weekend Lifestyle / Behind the Scenes',
    topic: 'How We Recharge: The Unplugged Saturday Protocol',
    caption: 'High output requires high-quality rest. 🌿 Here is what our weekend protocol looks like to ensure we start Monday inspired instead of depleted:\n\n✨ No notifications until after morning coffee\n✨ 60 minutes outside in nature without headphones\n✨ A physical notebook for creative shower-thoughts\n\nWhat is your go-to weekend reset habit? Tell us below! 👇',
    hashtags: ['#WeekendReset', '#MindfulLiving', '#CreativeEnergy', '#SlowLiving', '#WorkLifeHarmony', '#Unplugged', '#RestAndRecharge'],
    cta: 'Double tap if you\'re taking time to unplug this weekend! ❤️',
    engagementTip: 'Post bright warm natural lighting photos on Saturday morning for 25% higher saves.',
    status: 'Community Window',
  },
  {
    id: 'w2-sun',
    weekIndex: 2,
    day: 'Sun',
    dayFull: 'Sunday (Week 2)',
    platform: 'YouTube',
    platformIcon: 'smart_display',
    gradientClass: 'from-[#ff0000]/90 to-[#990000]/90',
    borderGlow: 'hover:shadow-[#ff0000]/30',
    time: '05:00 PM',
    contentType: 'YouTube Short / Quick Sprint Plan',
    topic: '3 High-ROI Moves to Make Before Monday 9 AM',
    caption: 'Don\'t let Monday sneak up on you! Take 3 minutes tonight to set these 3 things in motion:\n\n1. Pick your #1 non-negotiable priority\n2. Pre-schedule your first 2 social posts\n3. Clear your desk of clutter\n\nHit Subscribe for weekly high-performance micro-lessons! 🔔',
    hashtags: ['#YouTubeShorts', '#SundayPrep', '#HighPerformance', '#MondayReady', '#GoalSetting', '#ProductivityHacks', '#Planning'],
    cta: 'Subscribe to our channel for weekly 60-second masterclasses.',
    engagementTip: 'Add bold subtitles and an animated progress bar to retain viewers for the full 60 seconds.',
    status: 'Scheduled',
  },
];

const DEFAULT_WEEK_3_POSTS: CalendarPostItem[] = [
  {
    id: 'w3-mon',
    weekIndex: 3,
    day: 'Mon',
    dayFull: 'Monday (Week 3)',
    platform: 'LinkedIn',
    platformIcon: 'work',
    gradientClass: 'from-[#0077b5]/90 to-[#004182]/90',
    borderGlow: 'hover:shadow-[#0077b5]/30',
    time: '09:30 AM',
    contentType: 'Strategic Teardown',
    topic: 'Why Brand Storytelling Beats Product Pitches by 5x',
    caption: 'Features tell, but stories sell. Analyzing 1,000 top conversion posts in 2026 proved that emotional resonance drove 5.2x higher qualified pipeline than spec lists.\n\nHere is how to weave narrative tension into your next update.',
    hashtags: ['#Storytelling', '#B2BGrowth', '#BrandStrategy', '#MarketingROI', '#ContentStrategy'],
    cta: 'What is your brand\'s founding story? Share a sentence below.',
    engagementTip: 'Use a first-line hook that challenges conventional industry orthodoxy.',
    status: 'Optimized',
  },
  {
    id: 'w3-wed',
    weekIndex: 3,
    day: 'Wed',
    dayFull: 'Wednesday (Week 3)',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    gradientClass: 'from-[#833ab4]/90 via-[#fd1d1d]/85 to-[#fcb045]/90',
    borderGlow: 'hover:shadow-[#fd1d1d]/30',
    time: '01:45 PM',
    contentType: 'Community Reel & AMA',
    topic: 'Answering Your Top 3 Questions from Last Week',
    caption: 'You asked in our DMs, we answered on video! 🎥\n\n1. How often should small brands post?\n2. What hashtags are actually working right now?\n3. How to avoid content fatigue?\n\nWatch the 60-second video for concise answers!',
    hashtags: ['#AskMeAnything', '#CommunityFirst', '#SocialMediaFAQ', '#CreatorQnA', '#InstagramReels'],
    cta: 'Drop your question for next week\'s AMA in the comments!',
    engagementTip: 'Tag users whose questions you answered to prompt immediate comments and shares.',
    status: 'High Engagement',
  },
  {
    id: 'w3-fri',
    weekIndex: 3,
    day: 'Fri',
    dayFull: 'Friday (Week 3)',
    platform: 'Pinterest',
    platformIcon: 'push_pin',
    gradientClass: 'from-[#e60023]/90 to-[#b80018]/90',
    borderGlow: 'hover:shadow-[#e60023]/30',
    time: '11:15 AM',
    contentType: 'Visual Guide',
    topic: 'Complete 30-Day Social Media Health Audit Matrix',
    caption: 'Pin this complete health audit checklist before the month ends! Measure engagement quality, audience growth velocity, and conversion attribution.',
    hashtags: ['#AuditChecklist', '#SocialAudit', '#AnalyticsGuide', '#PinterestMarketing', '#BusinessGrowth'],
    cta: 'Click to save the high-resolution audit matrix to your board.',
    engagementTip: 'Pins with green and purple contrasting accents receive 31% higher saves.',
    status: 'Ready to Publish',
  },
  {
    id: 'w3-sun',
    weekIndex: 3,
    day: 'Sun',
    dayFull: 'Sunday (Week 3)',
    platform: 'YouTube',
    platformIcon: 'smart_display',
    gradientClass: 'from-[#ff0000]/90 to-[#990000]/90',
    borderGlow: 'hover:shadow-[#ff0000]/30',
    time: '04:00 PM',
    contentType: 'YouTube Short',
    topic: 'How to Prevent Mid-Quarter Burnout in 90 Seconds',
    caption: 'Setting boundaries in creator work isn\'t optional. Here are 3 non-negotiable systems top teams run to keep momentum without exhaustion.',
    hashtags: ['#BurnoutPrevention', '#CreatorWellness', '#ProductivityHacks', '#MentalClarity'],
    cta: 'Subscribe for weekly high-performance lessons.',
    engagementTip: 'Use a dynamic countdown timer graphic in the corner.',
    status: 'Scheduled',
  },
];

const DEFAULT_WEEK_4_POSTS: CalendarPostItem[] = [
  {
    id: 'w4-mon',
    weekIndex: 4,
    day: 'Mon',
    dayFull: 'Monday (Week 4)',
    platform: 'Instagram',
    platformIcon: 'photo_camera',
    gradientClass: 'from-[#833ab4]/90 via-[#fd1d1d]/85 to-[#fcb045]/90',
    borderGlow: 'hover:shadow-[#fd1d1d]/30',
    time: '09:15 AM',
    contentType: 'Carousel / Month Recap',
    topic: 'Month in Review: Top 5 Lessons & Content Wins',
    caption: 'As we close out the month, here are the 5 biggest takeaways our team learned from analyzing our audience engagement data. Swipe for the breakdowns!',
    hashtags: ['#MonthlyRecap', '#DataInsights', '#ContinuousLearning', '#GrowthMindset', '#CreatorEconomy'],
    cta: 'Which takeaway resonates most with your goals?',
    engagementTip: 'Carousels that summarize multi-week learnings generate 45% more bookmarks.',
    status: 'Optimized',
  },
  {
    id: 'w4-wed',
    weekIndex: 4,
    day: 'Wed',
    dayFull: 'Wednesday (Week 4)',
    platform: 'LinkedIn',
    platformIcon: 'work',
    gradientClass: 'from-[#0077b5]/90 to-[#004182]/90',
    borderGlow: 'hover:shadow-[#0077b5]/30',
    time: '10:45 AM',
    contentType: 'Executive Thought Leadership',
    topic: 'What the Future of Social Organic Distribution Means for 2026',
    caption: 'Algorithms are prioritizing topical authority over posting volume. Here is how forward-thinking leaders should adapt their Q2 and Q3 editorial roadmaps.',
    hashtags: ['#ExecutiveLeadership', '#FutureOfSocial', '#ContentStrategy', '#ThoughtLeadership'],
    cta: 'Join the conversation in the comments below.',
    engagementTip: 'Tag industry peers to spark insightful discourse.',
    status: 'Ready to Publish',
  },
  {
    id: 'w4-fri',
    weekIndex: 4,
    day: 'Fri',
    dayFull: 'Friday (Week 4)',
    platform: 'X (Twitter)',
    platformIcon: 'chat',
    gradientClass: 'from-[#1d9bf0]/90 to-[#0a66c2]/90',
    borderGlow: 'hover:shadow-[#1d9bf0]/30',
    time: '02:00 PM',
    contentType: 'Q&A Thread',
    topic: 'Month-End Open Mic: Ask Us Anything About Content & Growth',
    caption: 'We are hanging out in the replies for the next 2 hours! Ask us anything about copy, algorithms, growth systems, or creative batching. 👇',
    hashtags: ['#OpenMic', '#AskMeAnything', '#TwitterSpace', '#GrowthCommunity'],
    cta: 'Leave your question below and we will reply within 5 minutes.',
    engagementTip: 'Reply promptly to the first 5 inquiries to activate viral feed indexing.',
    status: 'High Engagement',
  },
  {
    id: 'w4-sun',
    weekIndex: 4,
    day: 'Sun',
    dayFull: 'Sunday (Week 4)',
    platform: 'Pinterest',
    platformIcon: 'push_pin',
    gradientClass: 'from-[#e60023]/90 to-[#b80018]/90',
    borderGlow: 'hover:shadow-[#e60023]/30',
    time: '11:00 AM',
    contentType: 'Monthly Planner Template',
    topic: 'Next Month Strategy Roadmap: Free Printable Canvas',
    caption: 'Kickstart next month with a clear, calm strategy. Pin this free roadmap canvas to plan your pillars, platforms, and key promotion dates.',
    hashtags: ['#PrintableRoadmap', '#MonthlyPlanner', '#StrategyCanvas', '#OrganizationHacks'],
    cta: 'Click the link to download the high-resolution printable PDF roadmap.',
    engagementTip: 'Use a mock iPad graphic to visually showcase the digital template.',
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
  const [monthSprintFilter, setMonthSprintFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'w4'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewDensity, setViewDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

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

  // Convert generated calendar for Week 1 if available
  const week1Posts: CalendarPostItem[] = useMemo(() => {
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
          weekIndex: 1,
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
    return DEFAULT_WEEK_1_POSTS;
  }, [generatedCalendar]);

  // Master posts list depending on active timeframe
  const rawPosts: CalendarPostItem[] = useMemo(() => {
    if (timeframe === 'Next Week') {
      return DEFAULT_WEEK_2_POSTS;
    }
    if (timeframe === 'Full Month Overview') {
      const full = [
        ...week1Posts.map(p => ({ ...p, weekIndex: 1 })),
        ...DEFAULT_WEEK_2_POSTS.map(p => ({ ...p, weekIndex: 2 })),
        ...DEFAULT_WEEK_3_POSTS.map(p => ({ ...p, weekIndex: 3 })),
        ...DEFAULT_WEEK_4_POSTS.map(p => ({ ...p, weekIndex: 4 })),
      ];
      if (monthSprintFilter === 'w1') return full.filter(p => p.weekIndex === 1);
      if (monthSprintFilter === 'w2') return full.filter(p => p.weekIndex === 2);
      if (monthSprintFilter === 'w3') return full.filter(p => p.weekIndex === 3);
      if (monthSprintFilter === 'w4') return full.filter(p => p.weekIndex === 4);
      return full;
    }
    // Default: Current Week
    return week1Posts;
  }, [timeframe, week1Posts, monthSprintFilter]);

  // Filter posts by day and platform
  const filteredPosts = useMemo(() => {
    return rawPosts.filter((post) => {
      const matchDay = selectedDay === 'All' || post.day === selectedDay;
      const matchPlatform =
        selectedPlatform === 'All' ||
        post.platform.toLowerCase().includes(selectedPlatform.toLowerCase());
      return matchDay && matchPlatform;
    });
  }, [rawPosts, selectedDay, selectedPlatform]);

  const daysList: { code: string; label: string }[] = [
    { code: 'All', label: 'All Days' },
    { code: 'Mon', label: 'Mon' },
    { code: 'Tue', label: 'Tue' },
    { code: 'Wed', label: 'Wed' },
    { code: 'Thu', label: 'Thu' },
    { code: 'Fri', label: 'Fri' },
    { code: 'Sat', label: 'Sat' },
    { code: 'Sun', label: 'Sun' },
  ];

  const platformsList = ['All', 'Instagram', 'LinkedIn', 'X (Twitter)', 'Pinterest', 'YouTube'];

  const handleCopyAllCaptions = () => {
    const bundle = filteredPosts
      .map(
        (p, idx) =>
          `=== [${p.dayFull}] ${p.platform} (${p.time}) ===\nTopic: ${p.topic}\nFormat: ${p.contentType}\n\nCaption:\n${p.caption}\n\nHashtags:\n${p.hashtags.join(' ')}\n\nCTA: ${p.cta}\nTip: ${p.engagementTip}\n`
      )
      .join('\n----------------------------------------\n\n');

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(bundle);
    }
    showToast(`Copied all ${filteredPosts.length} post captions to clipboard!`);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(filteredPosts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${brandName || 'socialspark'}-calendar-${timeframe.toLowerCase().replace(/\s+/g, '-')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Schedule exported as JSON successfully!');
  };

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
                {timeframe === 'Current Week' && 'Displaying 7-day sprint strategy with deep inspector and copy tools'}
                {timeframe === 'Next Week' && 'Displaying Week 2 momentum sprint & authority campaign'}
                {timeframe === 'Full Month Overview' && 'Displaying complete multi-week editorial calendar'}
              </p>
            </div>
          </div>

          {/* Child Div 2 of Header: Targeted Action Bar with Dropdowns, Density, Notifications, and Export */}
          <div className="flex items-center gap-2.5 relative">
            {/* Timeframe Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="bg-white/90 hover:bg-white backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-[#4a4455] hover:text-[#630ed4] shadow-sm border border-white flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                title="Select Schedule Timeframe"
              >
                <span className="material-symbols-outlined text-base text-[#630ed4]">calendar_month</span>
                <span>{timeframe}</span>
                <span className={`material-symbols-outlined text-sm transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-[#ccc3d8]/50 py-1.5 z-40 animate-fade-in text-[#191c1e]">
                    <div className="px-3 py-1.5 border-b border-[#ccc3d8]/30 mb-1 text-[10px] font-bold uppercase tracking-wider text-[#79747e]">
                      Select Calendar Window
                    </div>
                    {[
                      { id: 'Current Week', desc: 'Week 1 Core Strategy' },
                      { id: 'Next Week', desc: 'Week 2 Authority Sprint' },
                      { id: 'Full Month Overview', desc: 'All 4 Sprints (28 Posts)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setTimeframe(opt.id);
                          setDropdownOpen(false);
                          setSelectedDay('All');
                          setSelectedPost(null);
                          showToast(`Loaded ${opt.id}`);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-[#eaddff]/60 transition-colors flex items-center justify-between cursor-pointer ${
                          timeframe === opt.id
                            ? 'text-[#630ed4] font-bold bg-[#eaddff]/40'
                            : 'text-[#4a4455]'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{opt.id}</div>
                          <div className="text-[10px] text-[#79747e] font-normal">{opt.desc}</div>
                        </div>
                        {timeframe === opt.id && (
                          <span className="material-symbols-outlined text-base text-[#630ed4]">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* View Density Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextDensity = viewDensity === 'comfortable' ? 'compact' : 'comfortable';
                setViewDensity(nextDensity);
                showToast(`Switched to ${nextDensity === 'compact' ? 'Compact List' : 'Comfortable Grid'} View`);
              }}
              title={viewDensity === 'comfortable' ? 'Switch to Compact List View' : 'Switch to 3D Card Grid'}
              className={`h-9 px-2.5 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-sm border transition-all cursor-pointer active:scale-95 ${
                viewDensity === 'compact'
                  ? 'bg-[#630ed4] text-white border-[#630ed4]'
                  : 'bg-white/90 hover:bg-white text-[#4a4455] hover:text-[#7c3aed] border-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {viewDensity === 'comfortable' ? 'format_list_bulleted' : 'grid_view'}
              </span>
              <span className="text-xs font-bold hidden sm:inline">
                {viewDensity === 'comfortable' ? 'Cards' : 'Compact'}
              </span>
            </button>

            {/* Quick Export / Copy Button */}
            <button
              type="button"
              onClick={handleCopyAllCaptions}
              title="Copy all scheduled captions"
              className="h-9 px-2.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white text-[#4a4455] hover:text-[#630ed4] transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base text-[#630ed4]">copy_all</span>
              <span className="text-xs font-bold hidden md:inline">Copy All</span>
            </button>

            {/* Smart Notification / AI Schedule Intelligence */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsInsightsOpen((prev) => !prev)}
                title="AI Schedule Intelligence & Analytics"
                className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center shadow-sm border transition-colors cursor-pointer relative active:scale-95 ${
                  isInsightsOpen
                    ? 'bg-[#630ed4] text-white border-[#630ed4]'
                    : 'bg-white/90 hover:bg-white border-white text-[#4a4455] hover:text-[#7c3aed]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                {!isInsightsOpen && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ec4899] animate-pulse"></span>
                )}
              </button>

              {/* AI Schedule Intelligence Popover */}
              {isInsightsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsInsightsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white p-5 z-40 animate-fade-in text-[#191c1e]">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ccc3d8]/40 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#630ed4] text-lg">insights</span>
                        <h4 className="font-extrabold text-sm text-[#191c1e]">
                          AI Schedule Intelligence
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsInsightsOpen(false)}
                        className="text-[#79747e] hover:text-[#191c1e] p-1 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between bg-[#f7f9fb] p-2.5 rounded-xl border border-[#ccc3d8]/40">
                        <span className="font-semibold text-[#4a4455]">Schedule Health:</span>
                        <span className="font-bold text-[#146c2e] bg-[#e8f5e9] px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">verified</span> 100% Ready
                        </span>
                      </div>

                      <div className="bg-[#f7f9fb] p-2.5 rounded-xl border border-[#ccc3d8]/40">
                        <span className="font-semibold text-[#4a4455] block mb-1">
                          Peak Traffic Windows:
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-[11px]">
                          <span className="bg-white px-2 py-0.5 rounded border border-[#ccc3d8]/40 text-[#630ed4] font-bold">
                            Morning: 08:45 – 11:30 AM
                          </span>
                          <span className="bg-white px-2 py-0.5 rounded border border-[#ccc3d8]/40 text-[#630ed4] font-bold">
                            Afternoon: 01:15 – 04:30 PM
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#f7f9fb] p-2.5 rounded-xl border border-[#ccc3d8]/40">
                        <span className="font-semibold text-[#4a4455] block mb-1">
                          Selected Timeframe Scope:
                        </span>
                        <p className="text-[11px] text-[#4a4455]">
                          {filteredPosts.length} posts active across {platformsList.length - 1} platforms.
                          All copy adheres to character limits and algorithmic hashtag constraints.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleCopyAllCaptions();
                            setIsInsightsOpen(false);
                          }}
                          className="w-full py-2 bg-[#630ed4] hover:bg-[#520cb3] text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-sm">copy_all</span>
                          Copy All {filteredPosts.length} Captions
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleExportJSON();
                            setIsInsightsOpen(false);
                          }}
                          className="w-full py-2 bg-[#f2f4f6] hover:bg-[#eaddff] text-[#191c1e] rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#ccc3d8]/40"
                        >
                          <span className="material-symbols-outlined text-sm">download</span>
                          Export Schedule (.JSON)
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Child Div 4: 3D Glass Mockup Board */}
        <div className="relative bg-white/50 backdrop-blur-xl rounded-[28px] p-5 sm:p-6 border border-white/70 shadow-xl min-h-[460px] flex flex-col justify-between overflow-y-auto max-h-[64vh]">
          {/* Board Header Toolbar: Day Filters, Platform Filters, and Sprint switcher */}
          <div className="border-b border-white/60 pb-4 mb-4">
            {/* If Full Month Overview is active, show Sprint selector */}
            {timeframe === 'Full Month Overview' && (
              <div className="mb-3 p-2 bg-white/80 rounded-xl border border-white/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#630ed4] px-2 shrink-0">
                  Sprint Filter:
                </span>
                {[
                  { id: 'all', label: 'All Sprints (28 Posts)' },
                  { id: 'w1', label: 'Week 1: Foundations' },
                  { id: 'w2', label: 'Week 2: Momentum' },
                  { id: 'w3', label: 'Week 3: Authority' },
                  { id: 'w4', label: 'Week 4: Conversions' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setMonthSprintFilter(s.id as any);
                      showToast(`Showing ${s.label}`);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      monthSprintFilter === s.id
                        ? 'bg-[#630ed4] text-white shadow-sm'
                        : 'bg-[#f2f4f6] text-[#4a4455] hover:bg-[#eaddff]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#191c1e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#630ed4]">view_kanban</span>
                  {timeframe}
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

          {/* Posts View: Either Card Grid or Compact List View */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center text-[#4a4455]">
              <span className="material-symbols-outlined text-5xl text-[#630ed4]/40 mb-2 block">
                calendar_today
              </span>
              <p className="font-bold text-base text-[#191c1e]">No posts found for this filter</p>
              <p className="text-xs text-[#79747e] mt-1 mb-4">
                Try selecting "All Days" or reset your platform filter to inspect more posts.
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
          ) : viewDensity === 'compact' ? (
            /* COMPACT LIST VIEW */
            <div className="space-y-2.5 py-2">
              {filteredPosts.map((post) => {
                const isSelected = selectedPost?.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`group p-3.5 sm:p-4 rounded-2xl backdrop-blur-md border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white shadow-lg border-[#630ed4] ring-2 ring-[#630ed4]/30'
                        : 'bg-white/80 hover:bg-white border-white/80 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-11 h-11 rounded-xl bg-[#630ed4]/10 text-[#630ed4] font-black text-xs flex flex-col items-center justify-center shrink-0 border border-[#630ed4]/20">
                        <span className="text-[10px] text-[#79747e] font-semibold">{post.day}</span>
                        <span className="text-xs font-bold leading-none">{post.time.split(' ')[0]}</span>
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 font-extrabold text-xs text-[#191c1e]">
                            <span className="material-symbols-outlined text-sm text-[#630ed4]">
                              {post.platformIcon}
                            </span>
                            {post.platform}
                          </span>
                          <span className="text-[10px] font-bold bg-[#eaddff] text-[#630ed4] px-2 py-0.5 rounded-md">
                            {post.contentType}
                          </span>
                          <span className="text-[10px] text-[#79747e] hidden sm:inline">
                            • {post.hashtags.length} niche tags
                          </span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#191c1e] truncate">
                          {post.topic}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#ccc3d8]/30">
                      <span className="text-[11px] font-semibold text-[#146c2e] bg-[#e8f5e9] px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span>
                        {post.time}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyText(post.caption, post.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#f2f4f6] hover:bg-[#eaddff] text-[#191c1e] hover:text-[#630ed4] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Copy Caption"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedId === post.id ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedId === post.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#630ed4] hover:bg-[#520cb3] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Inspect Post"
                      >
                        <span className="material-symbols-outlined text-xs">open_in_full</span>
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* COMFORTABLE 3D CARD GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative z-10 py-2">
              {filteredPosts.map((post) => {
                const isSelected = selectedPost?.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`group relative bg-gradient-to-br ${post.gradientClass} text-white rounded-2xl shadow-xl backdrop-blur-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] p-5 ${post.borderGlow} ${
                      isSelected
                        ? 'ring-4 ring-white shadow-2xl scale-[1.02] border-white'
                        : 'border-white/30 hover:border-white/60'
                    }`}
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
              <span className="text-[#79747e] hidden sm:inline">• {filteredPosts.length} Posts Active</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#79747e]">
                Click any card or row to inspect full captions & copy hashtags
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
