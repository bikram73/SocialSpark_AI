import { FormState, GeneratedResult } from '../types';

export async function generateContentPlan(formState: FormState): Promise<GeneratedResult> {
  const activePlatforms = Object.entries(formState.platforms)
    .filter(([_, enabled]) => enabled)
    .map(([name]) => {
      switch (name) {
        case 'instagram':
          return 'Instagram';
        case 'linkedin':
          return 'LinkedIn';
        case 'twitter':
          return 'X (Twitter)';
        case 'facebook':
          return 'Facebook';
        case 'pinterest':
          return 'Pinterest';
        case 'youtube':
          return 'YouTube';
        default:
          return name;
      }
    });

  const payload = {
    brandName: formState.brandName,
    businessCategory: formState.businessCategory,
    targetAudience: formState.targetAudience,
    brandVoice: formState.brandVoice,
    contentThemes: formState.contentThemes,
    platforms: activePlatforms.length > 0 ? activePlatforms : ['Instagram', 'LinkedIn'],
    primaryGoal: formState.primaryGoal,
    additionalInstructions: formState.additionalInstructions,
  };

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data: GeneratedResult = await response.json();
      return data;
    }
  } catch (err) {
    console.warn('API call failed or running on static hosting without serverless functions:', err);
  }

  // Fallback response generator if deployed statically without serverless function active
  return {
    strategy: `This week's plan for ${formState.brandName} focuses on building audience trust and driving engagement through educational reels, guides, and thought leadership stories for ${formState.targetAudience}.`,
    pillars: ['Educational', 'Inspirational', 'Promotional', 'Community'],
    tips: [
      'Post Reels or Short Videos during peak morning hours for highest organic reach.',
      'Reply to all comments within 30 minutes of publishing to boost the algorithm.',
      'Use multi-slide carousel guides twice a week to increase dwell time and saves.',
    ],
    calendar: [
      {
        day: 'Monday',
        platform: activePlatforms[0] || 'Instagram',
        contentType: 'Educational Reel',
        idea: `3 Tips for ${formState.businessCategory || 'Industry Success'}`,
        time: '09:00 AM',
        cta: 'Link in Bio',
        caption: `🌿 Starting the week with fresh inspiration! At ${formState.brandName}, we believe small daily habits lead to massive results. What is your top focus this week?`,
        hashtags: ['#MondayMotivation', '#GrowthMindset', '#BrandStrategy', '#SocialSparkAI'],
        engagementTip: 'Ask a direct question at the end to trigger comments in the first hour.',
      },
      {
        day: 'Tuesday',
        platform: activePlatforms[1] || 'LinkedIn',
        contentType: 'Thought Leadership',
        idea: `The Future of ${formState.businessCategory || 'Industry Trends'}`,
        time: '11:30 AM',
        cta: 'Comment Below',
        caption: `How is innovation changing our space? Here are 3 key takeaways our team at ${formState.brandName} observed this month. What trends are you seeing?`,
        hashtags: ['#Innovation', '#ThoughtLeadership', '#ProfessionalGrowth', '#Strategy'],
        engagementTip: 'Tag 2 industry colleagues to invite them into the discussion.',
      },
      {
        day: 'Wednesday',
        platform: activePlatforms[2] || 'Instagram',
        contentType: 'Carousel Guide',
        idea: `Behind the Scenes: How We Build at ${formState.brandName}`,
        time: '02:00 PM',
        cta: 'Save & Share',
        caption: `Take a peek behind the curtain! Slide through to see how we turn ideas into reality while staying true to ${formState.targetAudience}.`,
        hashtags: ['#BehindTheScenes', '#CreatorLife', '#CarouselGuide', '#Community'],
        engagementTip: 'Use a clear callout on the last slide reminding users to Save.',
      },
      {
        day: 'Thursday',
        platform: activePlatforms[3] || 'X (Twitter)',
        contentType: 'Discussion Thread',
        idea: `5 Common Myths About ${formState.businessCategory || 'Our Field'}`,
        time: '04:15 PM',
        cta: 'Retweet',
        caption: `Thread 🧵: Debunking 5 big misconceptions in ${formState.businessCategory || 'our industry'}.\n1. Myth: Success happens overnight.\n2. Fact: Consistency wins every single time.`,
        hashtags: ['#TwitterThread', '#IndustryInsights', '#TechNews', '#Productivity'],
        engagementTip: 'Post a follow-up tweet 10 minutes later linking to your newsletter.',
      },
      {
        day: 'Friday',
        platform: activePlatforms[4] || 'LinkedIn',
        contentType: 'Case Study Highlights',
        idea: 'How We Helped Partner X Achieve 200% Growth',
        time: '10:00 AM',
        cta: 'Read Full Post',
        caption: `Real results matter. Here is how ${formState.brandName} helped drive real growth towards ${formState.primaryGoal || 'key objectives'}.`,
        hashtags: ['#CaseStudy', '#BusinessGrowth', '#ClientSuccess', '#Leadership'],
        engagementTip: 'Include key metrics in bullet points near the top.',
      },
      {
        day: 'Saturday',
        platform: activePlatforms[5] || 'Instagram',
        contentType: 'Community Feature',
        idea: 'Weekend Spotlight & Community Story',
        time: '01:00 PM',
        cta: 'Tag a Friend',
        caption: `Happy Weekend! 🚀 Highlighting our amazing community today. Tag someone below who inspires you to reach higher this month!`,
        hashtags: ['#WeekendVibes', '#CommunityFirst', '#Inspiration', '#FitLife'],
        engagementTip: 'Reshare user comments to your Instagram Stories.',
      },
      {
        day: 'Sunday',
        platform: activePlatforms[6] || 'Facebook',
        contentType: 'Weekly Reflection & Q&A',
        idea: 'Weekly Wrap-up: What was your biggest win?',
        time: '05:00 PM',
        cta: 'Share Your Story',
        caption: `Reflecting on the week! Drop your biggest win in the comments below. Let's celebrate each other's progress before heading into the new week.`,
        hashtags: ['#WeeklyWrapUp', '#SundayReflection', '#CommunityGoal', '#Progress'],
        engagementTip: 'Reply to every single comment before Sunday evening.',
      },
    ],
  };
}

export async function refreshPostCaption(params: {
  day: string;
  platform: string;
  contentType: string;
  idea: string;
  brandName: string;
  brandVoice: string;
}): Promise<{ caption: string; hashtags: string[] }> {
  try {
    const response = await fetch('/api/refresh-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Refresh API call failed:', err);
  }

  return {
    caption: `✨ [Refreshed] Excited to share our latest thoughts on ${params.idea}! Join ${params.brandName} as we push boundaries and innovate together.`,
    hashtags: ['#FreshContent', '#SocialSparkAI', '#Growth', '#Innovation', '#Strategy'],
  };
}
