import { FormState, GeneratedResult } from '../types';

// Helper to strictly ensure 6 to 10 niche hashtags per post with brand tag and theme relevance
function sanitizeHashtags(
  rawTags: any[],
  brandName: string,
  themeOrCategory: string,
  targetCount: number = 7
): string[] {
  const cleanBrand = brandName.replace(/[^a-zA-Z0-9]/g, "");
  const brandTag = cleanBrand.length >= 2 ? `#${cleanBrand}` : "#SocialSpark";

  const genericBanned = new Set([
    "#strategy",
    "#growthmindset",
    "#professionalgrowth",
    "#industryinsights",
    "#innovation",
    "#thoughtleadership",
    "#buildinginpublic",
    "#scale",
  ]);

  const seen = new Set<string>();
  const result: string[] = [];

  const addTag = (tagStr: string) => {
    let t = tagStr.trim();
    if (!t) return;
    if (!t.startsWith("#")) t = `#${t}`;
    t = "#" + t.replace(/^#+/, "").replace(/[^a-zA-Z0-9_]/g, "");
    if (t.length < 3) return;
    const lower = t.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(t);
    }
  };

  addTag(brandTag);

  if (Array.isArray(rawTags)) {
    const isCategoryCorporate = /consulting|corporate|b2b|enterprise|venture/i.test(themeOrCategory);
    for (const item of rawTags) {
      if (typeof item === "string") {
        const lower = item.trim().toLowerCase();
        if (!genericBanned.has(lower) || isCategoryCorporate) {
          addTag(item);
        }
      }
    }
  }

  const words = themeOrCategory
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(
      (w) =>
        w.length >= 3 &&
        !["and", "for", "the", "with", "from", "tips", "our", "your"].includes(w.toLowerCase())
    );

  for (const w of words) {
    if (result.length >= 9) break;
    const cap = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    addTag(`#${cap}`);
    addTag(`#${cap}Tips`);
    addTag(`#Daily${cap}`);
    addTag(`#${cap}Inspo`);
  }

  const cleanWords = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  const mainWord = cleanWords[0] || "Lifestyle";
  const extraTags = [
    `#${mainWord}Guide`,
    `#${mainWord}Love`,
    `#${cleanBrand}Tips`,
    `#${cleanBrand}Community`,
    `#Easy${mainWord}`,
    `#Quick${mainWord}`,
    `#${mainWord}Ideas`,
    `#${mainWord}Goals`,
  ];

  for (const extra of extraTags) {
    if (result.length >= 8) break;
    addTag(extra);
  }

  let finalTags = result;
  if (finalTags.length > 10) {
    finalTags = finalTags.slice(0, 10);
  }
  let fallbackCounter = 1;
  while (finalTags.length < 6) {
    addTag(`#${cleanBrand}Post${fallbackCounter++}`);
    finalTags = result.slice(0, 10);
  }

  return finalTags;
}

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
      // Client-side guarantee: strictly validate 6-10 hashtags on all days
      const validatedCalendar = Array.isArray(data.calendar)
        ? data.calendar.map((post) => ({
            ...post,
            hashtags: sanitizeHashtags(
              post.hashtags,
              payload.brandName,
              `${post.idea || ''} ${payload.businessCategory} ${payload.contentThemes}`,
              7
            ),
          }))
        : [];

      return {
        ...data,
        calendar: validatedCalendar,
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

  // Graceful deterministic fallback response tailored to actual themes & brand voice
  const activePlats = activePlatforms.length > 0 ? activePlatforms : ['Instagram', 'Facebook', 'Pinterest'];
  const getPlat = (idx: number) => activePlats[idx % activePlats.length];

  const rawThemes = formState.contentThemes
    ? formState.contentThemes.split(/[,;\n]+/).map((t) => t.trim()).filter(Boolean)
    : [];

  const theme1 = rawThemes[0] || `${formState.businessCategory} Essentials`;
  const theme2 = rawThemes[1] || `Practical ${formState.businessCategory} Habits`;
  const theme3 = rawThemes[2] || `Quick Tips for ${formState.targetAudience}`;
  const theme4 = rawThemes[3] || `Sustainable ${formState.businessCategory} Practices`;
  const theme5 = rawThemes[4] || `Weekend ${formState.businessCategory} Inspiration`;

  const isFriendly = /friendly|approachable|casual|warm|playful|witty/i.test(formState.brandVoice);

  const intro1 = isFriendly
    ? `Eating healthy and staying energized when you're busy doesn't have to mean spending hours cooking! 🥗 At ${formState.brandName}, we're all about simple, realistic choices that fit your real life.`
    : `Kickstart your week with intentional focus. At ${formState.brandName}, we know consistency in ${theme1} creates measurable results for ${formState.targetAudience}.`;

  const intro2 = isFriendly
    ? `The secret to a stress-free week? A little smart prep on your own terms. 🍱 Here is our easy routine for ${theme2} so you can save time without sacrificing quality.`
    : `Streamline your approach to ${theme2}. Here are structured guidelines observed by our team at ${formState.brandName} to maximize output and efficiency.`;

  const intro3 = isFriendly
    ? `Small daily swaps add up to massive wellness wins! ✨ Swipe through for 5 simple changes for ${theme3} you'll actually look forward to doing every single day.`
    : `Explore 5 strategic adaptations for ${theme3}. Bookmark this breakdown to optimize your daily routine and support long-term goals.`;

  const intro4 = isFriendly
    ? `Good for your lifestyle, great for the planet! 🌿 Here are 4 realistic ways to practice ${theme4} without any extra stress.`
    : `Examining the impact of ${theme4}. Here is how mindful practices create lasting sustainability for ${formState.targetAudience}.`;

  const intro5 = isFriendly
    ? `Friday mood: keeping it quick, nourishing, and fun! 🥑 Here are 3 simple ideas for ${theme5} you can enjoy this weekend with zero hassle.`
    : `End the week strong. Here is a curated guide for ${theme5} designed to support ${formState.primaryGoal || 'your lifestyle'}.`;

  const intro6 = isFriendly
    ? `Weekend project mode! 📌 Here is our complete step-by-step guide to ${theme1} tailored for ${formState.targetAudience}. Save this pin or post to your weekend board!`
    : `Detailed weekend breakdown: Master the fundamentals of ${theme1}. Designed for ${formState.targetAudience} to implement with clarity.`;

  const intro7 = isFriendly
    ? `Sunday Reset time! 🌿 Taking just 15 minutes today to set your intentions makes all the difference. What was your favorite nourishing win this week? Drop it below!`
    : `Weekly reflection and reset: Celebrate milestones achieved in ${formState.businessCategory} and outline objectives for the upcoming week.`;

  const getFormatAndIdea = (idx: number, plat: string, defaultFormat: string, defaultIdea: string) => {
    if (plat.toLowerCase() === 'pinterest') {
      return {
        format: 'Visual Checklist / Recipe Pin',
        idea: `5 Step-by-Step ${theme1} Ideas for ${formState.targetAudience}`,
      };
    }
    return { format: defaultFormat, idea: defaultIdea };
  };

  const day1Plat = getPlat(0);
  const d1 = getFormatAndIdea(0, day1Plat, 'Educational Reel / Video', `3 Quick & Easy ${theme1} for Busy Days`);

  const day2Plat = getPlat(1);
  const d2 = getFormatAndIdea(1, day2Plat, 'Community Discussion Post', `Batch Planning 101: ${theme2} That Actually Works`);

  const day3Plat = getPlat(2);
  const d3 = getFormatAndIdea(2, day3Plat, 'Multi-Slide Carousel Guide', `5 Simple Swaps for ${theme3}`);

  const day4Plat = getPlat(3);
  const d4 = getFormatAndIdea(3, day4Plat, 'Practical Tips Guide', `Sustainable Daily Habits: ${theme4}`);

  const day5Plat = getPlat(4);
  const d5 = getFormatAndIdea(4, day5Plat, 'Quick Actionable Ideas', `Quick & Nourishing: ${theme5} in 15 Minutes`);

  const day6Plat = getPlat(5);
  const d6 = getFormatAndIdea(5, day6Plat, 'Visual Guide / Inspiration', `Weekend Spotlight: ${theme1} Master Guide`);

  const day7Plat = getPlat(6);
  const d7 = getFormatAndIdea(6, day7Plat, 'Weekly Reflection & Q&A', `Sunday Reset: Plan Your ${theme2} for the Week Ahead`);

  return {
    strategy: `This 7-day content strategy for ${formState.brandName} is built around your core themes (${theme1}, ${theme2}, and ${theme3}) to achieve "${formState.primaryGoal || 'High Audience Engagement'}" by delivering authentic, ${formState.brandVoice.toLowerCase()} content specifically for ${formState.targetAudience}.`,
    pillars: [theme1, theme2, theme3, theme4 || 'Community Engagement & Q&A'],
    tips: [
      `Post video reels and visual guides during peak morning hours on ${activePlats[0]} for maximum organic reach.`,
      'Reply to all comments within 30 minutes of publishing to boost algorithmic distribution and build community trust.',
      `Create searchable, save-worthy guides on ${activePlats.includes('Pinterest') ? 'Pinterest' : activePlats[0]} to drive long-term evergreen traffic.`,
    ],
    calendar: [
      {
        day: 'Monday',
        platform: day1Plat,
        contentType: d1.format,
        idea: d1.idea,
        time: '09:00 AM',
        cta: 'Save This Guide',
        caption: `${intro1}\n\nWhat is your go-to goal for the week ahead? Drop it in the comments below!`,
        hashtags: sanitizeHashtags([], formState.brandName, `${theme1} ${formState.businessCategory}`, 7),
        engagementTip: 'Ask a relatable question at the end to trigger comments in the crucial first hour.',
      },
      {
        day: 'Tuesday',
        platform: day2Plat,
        contentType: d2.format,
        idea: d2.idea,
        time: '11:30 AM',
        cta: 'Share Your Routine',
        caption: `${intro2}\n\nTell us: what is the one routine you always stick to when your schedule gets crazy?`,
        hashtags: sanitizeHashtags([], formState.brandName, `${theme2} ${formState.businessCategory}`, 7),
        engagementTip: 'Tag 2 community members or invite followers to share their favorite routine in the replies.',
      },
      {
        day: 'Wednesday',
        platform: day3Plat,
        contentType: d3.format,
        idea: d3.idea,
        time: '02:00 PM',
        cta: 'Swipe & Bookmark',
        caption: `${intro3}\n\nBookmark this post so you have it ready whenever you need a quick refresh!`,
        hashtags: sanitizeHashtags([], formState.brandName, `${theme3} ${formState.businessCategory}`, 8),
        engagementTip: 'Add a clear visual pointer on the final slide reminding viewers to hit the save button.',
      },
      {
        day: 'Thursday',
        platform: day4Plat,
        contentType: d4.format,
        idea: d4.idea,
        time: '10:15 AM',
        cta: 'Try This Today',
        caption: `${intro4}\n\nWhich of these simple habits do you already practice at home? Let's discuss below!`,
        hashtags: sanitizeHashtags([], formState.brandName, `${theme4} ${formState.businessCategory}`, 7),
        engagementTip: 'Include 2-3 specific practical bullet points right near the top of the post.',
      },
      {
        day: 'Friday',
        platform: day5Plat,
        contentType: d5.format,
        idea: d5.idea,
        time: '03:45 PM',
        cta: 'Save for the Weekend',
        caption: `${intro5}\n\nTap save so you have this ready for your weekend plans!`,
        hashtags: sanitizeHashtags([], formState.brandName, `${theme5} ${formState.businessCategory}`, 7),
        engagementTip: 'Reply to every incoming comment with a friendly follow-up question.',
      },
      {
        day: 'Saturday',
        platform: day6Plat,
        contentType: d6.format,
        idea: d6.idea,
        time: '01:00 PM',
        cta: 'Pin & Share',
        caption: `${intro6}\n\nHave a wonderful, restful weekend from all of us at ${formState.brandName}!`,
        hashtags: sanitizeHashtags([], formState.brandName, `${theme1} ${formState.targetAudience}`, 8),
        engagementTip: 'Encourage followers to bookmark this pin/post to their personal planning boards.',
      },
      {
        day: 'Sunday',
        platform: day7Plat,
        contentType: d7.format,
        idea: d7.idea,
        time: '05:00 PM',
        cta: 'Drop Your Win',
        caption: `${intro7}\n\nShare your biggest win below—let's cheer each other on heading into the new week!`,
        hashtags: sanitizeHashtags([], formState.brandName, `SundayReset ${theme2}`, 7),
        engagementTip: 'Pin the most inspiring community comment to the top of the thread.',
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
  businessCategory?: string;
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
      const data = await response.json();
      return {
        caption: data.caption,
        hashtags: sanitizeHashtags(
          data.hashtags,
          params.brandName,
          `${params.idea} ${params.businessCategory || ''}`,
          7
        ),
      };
    }
  } catch (err) {
    console.warn('Refresh API call failed:', err);
  }

  const isFriendly = /friendly|approachable|casual|warm|playful|witty/i.test(params.brandVoice);
  const caption = isFriendly
    ? `✨ [Fresh Update] Quick peek into ${params.idea}! At ${params.brandName}, we're always looking for simple, realistic ways to make things easier and more nourishing. What do you think of this idea? Let's chat below! 👇`
    : `✨ [Fresh Update] Exploring essential strategies in ${params.idea}. At ${params.brandName}, our mission is delivering actionable value and measurable results. How are you implementing this in your daily routine?`;

  return {
    caption,
    hashtags: sanitizeHashtags([], params.brandName, `${params.idea} ${params.businessCategory || ''}`, 7),
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
