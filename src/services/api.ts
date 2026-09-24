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
    brandName: formState.brandName.trim(),
    businessCategory: formState.businessCategory.trim(),
    targetAudience: formState.targetAudience.trim(),
    brandVoice: formState.brandVoice.trim(),
    contentThemes: formState.contentThemes.trim(),
    platforms: activePlatforms.length > 0 ? activePlatforms : ['Instagram', 'LinkedIn'],
    primaryGoal: formState.primaryGoal.trim(),
    additionalInstructions: formState.additionalInstructions.trim().slice(0, 500),
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
      return {
        ...data,
        isFallback: data.isFallback ?? false,
        source: data.source ?? (data.isFallback ? 'fallback' : 'ai'),
      };
    } else {
      const errJson = await response.json().catch(() => ({}));
      console.warn('API returned non-200 status:', response.status, errJson);
    }
  } catch (err) {
    console.warn('API call failed or running on static hosting:', err);
  }

  // Graceful deterministic fallback response if API is unreachable or returns an error
  const getPlat = (idx: number) => activePlatforms[idx % activePlatforms.length] || 'Instagram';

  return {
    strategy: `This 7-day content strategy for ${formState.brandName} is designed to achieve "${formState.primaryGoal || 'High Audience Engagement'}" by delivering authentic, ${formState.brandVoice.toLowerCase()} content that resonates directly with ${formState.targetAudience}.`,
    pillars: ['Educational & How-To', 'Inspirational & Mindset', 'Product & Social Proof', 'Community Discussion'],
    tips: [
      `Post during peak morning hours on ${activePlatforms[0] || 'Instagram'} for maximum early reach.`,
      'Reply to all comments within 30 minutes of publishing to boost algorithmic distribution.',
      'Use high-contrast visuals and multi-slide carousel guides to maximize audience dwell time.',
    ],
    calendar: [
      {
        day: 'Monday',
        platform: getPlat(0),
        contentType: 'Educational Reel',
        idea: `3 Game-Changing Insights in ${formState.businessCategory || 'Our Industry'}`,
        time: '09:00 AM',
        cta: 'Save This Post',
        caption: `🌿 Starting the week with fresh inspiration! At ${formState.brandName}, we believe small daily habits lead to massive results. What is your top focus this week?\n\nDrop your biggest goal in the comments below!`,
        hashtags: [`#${formState.brandName.replace(/\s+/g, '')}`, '#MondayMotivation', '#GrowthMindset', '#BrandStrategy', '#SocialSparkAI'],
        engagementTip: 'Ask a direct question at the end to trigger comments in the crucial first hour.',
      },
      {
        day: 'Tuesday',
        platform: getPlat(1),
        contentType: 'Thought Leadership Post',
        idea: `The Evolution of ${formState.businessCategory || 'Industry Trends'}`,
        time: '11:30 AM',
        cta: 'Comment Below',
        caption: `How is innovation changing our space? Here are key takeaways our team at ${formState.brandName} observed this month.\n\nAdapting early is essential for long-term growth. What trends are you seeing?`,
        hashtags: ['#Innovation', '#ThoughtLeadership', '#ProfessionalGrowth', '#Strategy', '#IndustryTrends'],
        engagementTip: 'Tag 2 industry colleagues to invite them into the discussion.',
      },
      {
        day: 'Wednesday',
        platform: getPlat(2),
        contentType: 'Carousel Guide',
        idea: `Behind the Scenes: How We Build at ${formState.brandName}`,
        time: '02:00 PM',
        cta: 'Save & Share',
        caption: `Take a peek behind the curtain! Slide through to see how we turn ideas into reality while staying true to ${formState.targetAudience}.\n\nBookmark this post so you have it whenever you need it!`,
        hashtags: ['#BehindTheScenes', '#CreatorLife', '#CarouselGuide', '#Community', '#ValueFirst'],
        engagementTip: 'Use a clear visual callout on the last slide reminding users to Save.',
      },
      {
        day: 'Thursday',
        platform: getPlat(3),
        contentType: 'Discussion Thread',
        idea: `5 Common Myths About ${formState.businessCategory || 'Our Field'} Debunked`,
        time: '04:15 PM',
        cta: 'Retweet & Save',
        caption: `Thread 🧵: Debunking 5 big misconceptions in ${formState.businessCategory || 'our industry'}.\n1. Myth: Success happens overnight.\n2. Fact: Consistency wins every single time.\n\nWhich myth did you fall for first?`,
        hashtags: ['#IndustryInsights', '#TechNews', '#Productivity', '#MythBusting', '#Learning'],
        engagementTip: 'Post a follow-up tweet 10 minutes later linking to your main resource or newsletter.',
      },
      {
        day: 'Friday',
        platform: getPlat(4),
        contentType: 'Case Study Highlights',
        idea: 'Real Results: Achieving Measurable Breakthroughs',
        time: '10:00 AM',
        cta: 'Read Full Post',
        caption: `Real results matter. Here is how ${formState.brandName} helped drive real growth towards ${formState.primaryGoal || 'key objectives'}.\n\nConsistency and community support make all the difference.`,
        hashtags: ['#CaseStudy', '#BusinessGrowth', '#ClientSuccess', '#Leadership', '#Milestones'],
        engagementTip: 'Include key metrics in bullet points near the top.',
      },
      {
        day: 'Saturday',
        platform: getPlat(5),
        contentType: 'Community Feature',
        idea: 'Weekend Spotlight & Member Story',
        time: '01:00 PM',
        cta: 'Tag a Friend',
        caption: `Happy Weekend! 🚀 Highlighting our amazing community today. Tag someone below who inspires you to reach higher this month!\n\nWe appreciate every single one of you.`,
        hashtags: ['#WeekendVibes', '#CommunityFirst', '#Inspiration', '#Spotlight', '#CreatorLife'],
        engagementTip: 'Reshare user comments to your Instagram Stories.',
      },
      {
        day: 'Sunday',
        platform: getPlat(6),
        contentType: 'Weekly Reflection & Q&A',
        idea: 'Sunday Reset: What was your biggest win?',
        time: '05:00 PM',
        cta: 'Share Your Story',
        caption: `Reflecting on the week! Drop your biggest win in the comments below. Let's celebrate each other's progress before heading into the new week.\n\nRest up and get ready to crush it tomorrow!`,
        hashtags: ['#WeeklyWrapUp', '#SundayReflection', '#CommunityGoal', '#Progress', '#Reset'],
        engagementTip: 'Reply to every single comment before Sunday evening.',
      },
    ],
    isFallback: true,
    source: 'fallback',
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
    caption: `✨ [Fresh Update] Excited to share our latest thoughts on ${params.idea}! At ${params.brandName}, we continuously strive to inspire and deliver value. What is your take? Let us know below!`,
    hashtags: [`#${params.brandName.replace(/\s+/g, '')}`, '#FreshIdeas', '#Strategy', '#Innovation', '#Growth'],
  };
}

/**
 * Safe clipboard copying with iframe fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('navigator.clipboard failed, attempting execCommand fallback:', err);
  }

  // Fallback using textarea execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (e) {
    console.error('Fallback clipboard copy failed:', e);
    return false;
  }
}
