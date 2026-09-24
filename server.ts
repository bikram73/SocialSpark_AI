import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gemini AI SDK
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// GET /api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SocialSpark AI API Running" });
});

const VALID_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface SanitizedPost {
  day: string;
  platform: string;
  contentType: string;
  idea: string;
  time: string;
  cta: string;
  caption: string;
  hashtags: string[];
  engagementTip: string;
}

// Helper to ensure 6-10 niche hashtags per post with brand tag and theme relevance
function sanitizeHashtags(
  rawTags: any[],
  brandName: string,
  themeOrCategory: string,
  targetCount: number = 7
): string[] {
  const cleanBrand = brandName.replace(/[^a-zA-Z0-9]/g, "");
  const brandTag = cleanBrand.length >= 2 ? `#${cleanBrand}` : "#SocialSpark";

  // Generic corporate buzzwords to avoid unless the business category is corporate/consulting
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

  // 1. Always include the brand tag first
  addTag(brandTag);

  // 2. Add raw tags provided by AI or input
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

  // 3. Extract words from themeOrCategory to generate niche-specific tags if fewer than 7
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

  // 4. Guaranteed industry/niche fillers if still under 6
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

  // Enforce strictly 6 to 10 hashtags
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

// Generate deterministic fallback strategy tailored strictly to brand, category, and user themes
function createFallbackPlan(params: {
  brandName: string;
  businessCategory: string;
  targetAudience: string;
  brandVoice: string;
  contentThemes: string;
  platforms: string[];
  primaryGoal: string;
  additionalInstructions: string;
}) {
  const {
    brandName,
    businessCategory,
    targetAudience,
    brandVoice,
    contentThemes,
    platforms,
    primaryGoal,
  } = params;

  const activePlatforms = platforms.length > 0 ? platforms : ["Instagram", "Facebook", "Pinterest"];
  const getPlat = (idx: number) => activePlatforms[idx % activePlatforms.length];

  // Parse user content themes or create niche-specific themes from businessCategory
  const rawThemes = contentThemes
    ? contentThemes.split(/[,;\n]+/).map((t) => t.trim()).filter(Boolean)
    : [];

  const theme1 = rawThemes[0] || `${businessCategory} Essentials`;
  const theme2 = rawThemes[1] || `Practical ${businessCategory} Habits`;
  const theme3 = rawThemes[2] || `Quick Tips for ${targetAudience}`;
  const theme4 = rawThemes[3] || `Sustainable ${businessCategory} Practices`;
  const theme5 = rawThemes[4] || `Weekend ${businessCategory} Inspiration`;

  const cleanBrand = brandName.replace(/[^a-zA-Z0-9]/g, "");

  // Build conversational caption style matching friendly/motivational/approachable voice
  const isFriendly = /friendly|approachable|casual|warm|playful|witty/i.test(brandVoice);

  const intro1 = isFriendly
    ? `Eating healthy and staying energized when you're busy doesn't have to mean spending hours cooking! 🥗 At ${brandName}, we're all about simple, realistic choices that fit your real life.`
    : `Kickstart your week with intentional focus. At ${brandName}, we know consistency in ${theme1} creates measurable results for ${targetAudience}.`;

  const intro2 = isFriendly
    ? `The secret to a stress-free week? A little smart prep on your own terms. 🍱 Here is our easy routine for ${theme2} so you can save time without sacrificing quality.`
    : `Streamline your approach to ${theme2}. Here are structured guidelines observed by our team at ${brandName} to maximize output and efficiency.`;

  const intro3 = isFriendly
    ? `Small daily swaps add up to massive wellness wins! ✨ Swipe through for 5 simple changes for ${theme3} you'll actually look forward to doing every single day.`
    : `Explore 5 strategic adaptations for ${theme3}. Bookmark this breakdown to optimize your daily routine and support long-term goals.`;

  const intro4 = isFriendly
    ? `Good for your lifestyle, great for the planet! 🌿 Here are 4 realistic ways to practice ${theme4} without any extra stress.`
    : `Examining the impact of ${theme4}. Here is how mindful practices create lasting sustainability for ${targetAudience}.`;

  const intro5 = isFriendly
    ? `Friday mood: keeping it quick, nourishing, and fun! 🥑 Here are 3 simple ideas for ${theme5} you can enjoy this weekend with zero hassle.`
    : `End the week strong. Here is a curated guide for ${theme5} designed to support ${primaryGoal || "your lifestyle"}.`;

  const intro6 = isFriendly
    ? `Weekend project mode! 📌 Here is our complete step-by-step guide to ${theme1} tailored for ${targetAudience}. Save this pin or post to your weekend board!`
    : `Detailed weekend breakdown: Master the fundamentals of ${theme1}. Designed for ${targetAudience} to implement with clarity.`;

  const intro7 = isFriendly
    ? `Sunday Reset time! 🌿 Taking just 15 minutes today to set your intentions makes all the difference. What was your favorite nourishing win this week? Drop it below!`
    : `Weekly reflection and reset: Celebrate milestones achieved in ${businessCategory} and outline objectives for the upcoming week.`;

  // Pinterest-specific concept formatting if selected
  const getFormatAndIdea = (idx: number, plat: string, defaultFormat: string, defaultIdea: string) => {
    if (plat.toLowerCase() === "pinterest") {
      return {
        format: "Visual Checklist / Recipe Pin",
        idea: `5 Step-by-Step ${theme1} Ideas for ${targetAudience}`,
      };
    }
    return { format: defaultFormat, idea: defaultIdea };
  };

  const day1Plat = getPlat(0);
  const d1 = getFormatAndIdea(0, day1Plat, "Educational Reel / Video", `3 Quick & Easy ${theme1} for Busy Days`);

  const day2Plat = getPlat(1);
  const d2 = getFormatAndIdea(1, day2Plat, "Community Discussion Post", `Batch Planning 101: ${theme2} That Actually Works`);

  const day3Plat = getPlat(2);
  const d3 = getFormatAndIdea(2, day3Plat, "Multi-Slide Carousel Guide", `5 Simple Swaps for ${theme3}`);

  const day4Plat = getPlat(3);
  const d4 = getFormatAndIdea(3, day4Plat, "Practical Tips Guide", `Sustainable Daily Habits: ${theme4}`);

  const day5Plat = getPlat(4);
  const d5 = getFormatAndIdea(4, day5Plat, "Quick Actionable Ideas", `Quick & Nourishing: ${theme5} in 15 Minutes`);

  const day6Plat = getPlat(5);
  const d6 = getFormatAndIdea(5, day6Plat, "Visual Guide / Inspiration", `Weekend Spotlight: ${theme1} Master Guide`);

  const day7Plat = getPlat(6);
  const d7 = getFormatAndIdea(6, day7Plat, "Weekly Reflection & Q&A", `Sunday Reset: Plan Your ${theme2} for the Week Ahead`);

  return {
    strategy: `This 7-day content strategy for ${brandName} is built around your core themes (${theme1}, ${theme2}, and ${theme3}) to achieve "${primaryGoal || "High Audience Engagement"}" by delivering authentic, ${brandVoice.toLowerCase()} content specifically for ${targetAudience}.`,
    pillars: [
      theme1,
      theme2,
      theme3,
      theme4 || "Community Engagement & Q&A",
    ],
    tips: [
      `Post video reels and visual guides during peak morning hours on ${activePlatforms[0]} for maximum organic reach.`,
      "Reply to all comments within 30 minutes of publishing to boost algorithmic distribution and build community trust.",
      `Create searchable, save-worthy guides on ${activePlatforms.includes("Pinterest") ? "Pinterest" : activePlatforms[0]} to drive long-term evergreen traffic.`,
    ],
    calendar: [
      {
        day: "Monday",
        platform: day1Plat,
        contentType: d1.format,
        idea: d1.idea,
        time: "09:00 AM",
        cta: "Save This Guide",
        caption: `${intro1}\n\nWhat is your go-to goal for the week ahead? Drop it in the comments below!`,
        hashtags: sanitizeHashtags([], brandName, `${theme1} ${businessCategory}`, 7),
        engagementTip: "Ask a relatable question at the end to trigger comments in the crucial first hour.",
      },
      {
        day: "Tuesday",
        platform: day2Plat,
        contentType: d2.format,
        idea: d2.idea,
        time: "11:30 AM",
        cta: "Share Your Routine",
        caption: `${intro2}\n\nTell us: what is the one routine you always stick to when your schedule gets crazy?`,
        hashtags: sanitizeHashtags([], brandName, `${theme2} ${businessCategory}`, 7),
        engagementTip: "Tag 2 community members or invite followers to share their favorite routine in the replies.",
      },
      {
        day: "Wednesday",
        platform: day3Plat,
        contentType: d3.format,
        idea: d3.idea,
        time: "02:00 PM",
        cta: "Swipe & Bookmark",
        caption: `${intro3}\n\nBookmark this post so you have it ready whenever you need a quick refresh!`,
        hashtags: sanitizeHashtags([], brandName, `${theme3} ${businessCategory}`, 8),
        engagementTip: "Add a clear visual pointer on the final slide reminding viewers to hit the save button.",
      },
      {
        day: "Thursday",
        platform: day4Plat,
        contentType: d4.format,
        idea: d4.idea,
        time: "10:15 AM",
        cta: "Try This Today",
        caption: `${intro4}\n\nWhich of these simple habits do you already practice at home? Let's discuss below!`,
        hashtags: sanitizeHashtags([], brandName, `${theme4} ${businessCategory}`, 7),
        engagementTip: "Include 2-3 specific practical bullet points right near the top of the post.",
      },
      {
        day: "Friday",
        platform: day5Plat,
        contentType: d5.format,
        idea: d5.idea,
        time: "03:45 PM",
        cta: "Save for the Weekend",
        caption: `${intro5}\n\nTap save so you have this ready for your weekend plans!`,
        hashtags: sanitizeHashtags([], brandName, `${theme5} ${businessCategory}`, 7),
        engagementTip: "Reply to every incoming comment with a friendly follow-up question.",
      },
      {
        day: "Saturday",
        platform: day6Plat,
        contentType: d6.format,
        idea: d6.idea,
        time: "01:00 PM",
        cta: "Pin & Share",
        caption: `${intro6}\n\nHave a wonderful, restful weekend from all of us at ${brandName}!`,
        hashtags: sanitizeHashtags([], brandName, `${theme1} ${targetAudience}`, 8),
        engagementTip: "Encourage followers to bookmark this pin/post to their personal planning boards.",
      },
      {
        day: "Sunday",
        platform: day7Plat,
        contentType: d7.format,
        idea: d7.idea,
        time: "05:00 PM",
        cta: "Drop Your Win",
        caption: `${intro7}\n\nShare your biggest win below—let's cheer each other on heading into the new week!`,
        hashtags: sanitizeHashtags([], brandName, `SundayReset ${theme2}`, 7),
        engagementTip: "Pin the most inspiring community comment to the top of the thread.",
      },
    ],
    isFallback: true,
    source: "fallback" as const,
  };
}

// POST /api/generate
app.post("/api/generate", async (req, res) => {
  const {
    brandName,
    businessCategory,
    targetAudience,
    brandVoice,
    contentThemes = "",
    platforms = [],
    primaryGoal = "Increase Engagement and Followers",
    additionalInstructions = "",
  } = req.body || {};

  // Validation
  if (!brandName || typeof brandName !== "string" || !brandName.trim()) {
    return res.status(400).json({ error: "Brand Name is required and cannot be empty." });
  }
  const cleanBrandName = brandName.trim();
  if (cleanBrandName.length < 2 || cleanBrandName.length > 100) {
    return res.status(400).json({ error: "Brand Name must be between 2 and 100 characters." });
  }

  if (!businessCategory || typeof businessCategory !== "string" || !businessCategory.trim()) {
    return res.status(400).json({ error: "Business Category / Industry is required." });
  }
  const cleanCategory = businessCategory.trim();

  if (!targetAudience || typeof targetAudience !== "string" || !targetAudience.trim()) {
    return res.status(400).json({ error: "Target Audience is required." });
  }
  const cleanAudience = targetAudience.trim();

  if (!brandVoice || typeof brandVoice !== "string" || !brandVoice.trim()) {
    return res.status(400).json({ error: "Brand Voice is required." });
  }
  const cleanVoice = brandVoice.trim();

  if (!Array.isArray(platforms) || platforms.length === 0) {
    return res.status(400).json({ error: "At least one social media platform must be selected." });
  }

  if (typeof additionalInstructions === "string" && additionalInstructions.length > 500) {
    return res.status(400).json({ error: "Additional Instructions cannot exceed 500 characters." });
  }

  const selectedPlatforms = platforms.join(", ");
  const fallbackData = createFallbackPlan({
    brandName: cleanBrandName,
    businessCategory: cleanCategory,
    targetAudience: cleanAudience,
    brandVoice: cleanVoice,
    contentThemes: String(contentThemes).slice(0, 300),
    platforms,
    primaryGoal: String(primaryGoal).slice(0, 150),
    additionalInstructions: String(additionalInstructions).slice(0, 500),
  });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    console.info("Notice: No live GEMINI_API_KEY provided. Serving verified smart fallback content plan.");
    return res.json(fallbackData);
  }

  try {
    const prompt = `You are an expert social media strategist and content planner.
Based on the following brand brief:

- Brand Name: ${cleanBrandName}
- Business Category / Industry: ${cleanCategory}
- Target Audience: ${cleanAudience}
- Brand Voice: ${cleanVoice}
- Content Themes: ${contentThemes || `${cleanCategory} Essentials and Tips`}
- Selected Platforms: ${selectedPlatforms}
- Primary Marketing Goal: ${primaryGoal || "Engagement and Community"}
- Additional Instructions: ${additionalInstructions || "None"}

CRITICAL CONTENT RELEVANCE RULES:
- Every post MUST directly relate to at least one user-provided Content Theme: "${contentThemes || cleanCategory}".
- DO NOT generate generic business, marketing, leadership, scaling, or corporate topics (such as "game-changing insights", "industry evolution", "sustainable growth", "innovation is reshaping our sector", "adapting early is essential for growth", or "how our team builds") unless they are explicitly included in Content Themes.
- If this brand is about food, healthy recipes, or meal prep: every post MUST discuss real food, recipes, meal prep boxes, grocery budgeting, ingredients, snacks, kitchen hacks, or sustainable eating.
- At least 5 of the 7 posts MUST directly feature the provided Content Themes.

BRAND VOICE & AUDIENCE RULES:
- Strictly maintain the selected Brand Voice ("${cleanVoice}") throughout every caption.
- If Friendly & Approachable: write warm, conversational, human, and encouraging captions (e.g., "Eating healthy when you're busy doesn't have to mean spending hours in the kitchen..."). Speak directly to ${cleanAudience}.

HASHTAG RULES (CRITICAL):
- Generate strictly between 6 and 10 niche hashtags for EVERY post (NEVER 5 or fewer, and NEVER more than 10).
- At least 4 hashtags must be directly relevant to the selected Content Theme.
- Include the brand hashtag #${cleanBrandName.replace(/[^a-zA-Z0-9]/g, "")}.
- Avoid generic hashtags like #Strategy, #ProfessionalGrowth, #IndustryInsights, #GrowthMindset unless relevant to corporate business/consulting.

PLATFORM RELEVANCE:
- Instagram: visual, reels, carousels, engaging save-worthy tips.
- Facebook: conversational and community-focused discussion prompts.
- Pinterest: searchable, visual, tutorial/checklist/recipe-oriented (e.g., "5 Easy Meal-Prep Boxes for Busy Students").
- LinkedIn: professional and insight-oriented tailored specifically to this niche.
- X (Twitter): concise, discussion-driven, or actionable thread.
- YouTube: video-focused, tutorials, Shorts hooks.

Requirements:
1. Provide an overarching 2-3 sentence weekly strategy summary tailored to this brand and audience.
2. List exactly 4 core content pillars matching the content themes.
3. Provide 3 actionable weekly marketing/growth tips specifically for these platforms.
4. Provide exactly 7 daily posts in chronological order from Monday through Sunday.
   The days MUST strictly be: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.
   Distribute the posts across the selected platforms (${selectedPlatforms}).
   For each day include:
   - day: strictly "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", or "Sunday"
   - platform: one of (${selectedPlatforms})
   - contentType: descriptive format (e.g. Educational Reel, Carousel Guide, Recipe Card, Discussion Thread)
   - idea: catchy, engaging post concept directly tied to the brand's themes
   - time: optimal posting time (e.g. "09:00 AM", "01:30 PM", "07:00 PM")
   - cta: strong call to action
   - caption: complete, engaging 2-4 sentence caption with emojis and proper line breaks matching the "${cleanVoice}" voice
   - hashtags: 6 to 10 relevant hashtags starting with #
   - engagementTip: 1 actionable sentence on how to maximize interaction for this post
`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are SocialSpark AI, a world-class social media manager and growth strategist. Always output structured, non-repetitive, high-converting social media content tailored precisely to the user's specific brand, content themes, and voice. NEVER output generic corporate filler for lifestyle, food, or consumer brands. You must generate exactly 7 distinct days (Monday through Sunday) with 6 to 10 niche hashtags per post.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategy: { type: Type.STRING },
            pillars: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            calendar: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  contentType: { type: Type.STRING },
                  idea: { type: Type.STRING },
                  time: { type: Type.STRING },
                  cta: { type: Type.STRING },
                  caption: { type: Type.STRING },
                  hashtags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  engagementTip: { type: Type.STRING },
                },
                required: [
                  "day",
                  "platform",
                  "contentType",
                  "idea",
                  "time",
                  "cta",
                  "caption",
                  "hashtags",
                  "engagementTip",
                ],
              },
            },
          },
          required: ["strategy", "pillars", "tips", "calendar"],
        },
      },
    });

    let textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty response from Gemini API");
    }

    textOutput = textOutput.trim();
    if (textOutput.startsWith("```json")) {
      textOutput = textOutput.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (textOutput.startsWith("```")) {
      textOutput = textOutput.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const parsedData = JSON.parse(textOutput);

    // Validate and sanitize AI response
    const strategy = typeof parsedData.strategy === "string" && parsedData.strategy.trim()
      ? parsedData.strategy.trim()
      : fallbackData.strategy;

    const pillars = Array.isArray(parsedData.pillars) && parsedData.pillars.length >= 3
      ? parsedData.pillars.map(String)
      : fallbackData.pillars;

    const tips = Array.isArray(parsedData.tips) && parsedData.tips.length >= 3
      ? parsedData.tips.map(String)
      : fallbackData.tips;

    // Ensure all 7 days are present in order without duplication or missing days
    const rawCalendar: any[] = Array.isArray(parsedData.calendar) ? parsedData.calendar : [];
    const sanitizedCalendar: SanitizedPost[] = [];

    VALID_DAYS.forEach((dayName, idx) => {
      const match = rawCalendar.find(
        (item) => typeof item?.day === "string" && item.day.toLowerCase() === dayName.toLowerCase()
      ) || rawCalendar[idx];

      const fallbackItem = fallbackData.calendar[idx];

      const postIdea = typeof match?.idea === "string" && match.idea.trim()
        ? match.idea.trim()
        : fallbackItem.idea;

      // Strictly enforce 6 to 10 niche hashtags per post
      const rawTags = Array.isArray(match?.hashtags) && match.hashtags.length > 0
        ? match.hashtags
        : fallbackItem.hashtags;
      const validatedHashtags = sanitizeHashtags(
        rawTags,
        cleanBrandName,
        `${postIdea} ${cleanCategory} ${contentThemes}`,
        7
      );

      sanitizedCalendar.push({
        day: dayName,
        platform: typeof match?.platform === "string" && match.platform.trim()
          ? match.platform.trim()
          : fallbackItem.platform,
        contentType: typeof match?.contentType === "string" && match.contentType.trim()
          ? match.contentType.trim()
          : fallbackItem.contentType,
        idea: postIdea,
        time: typeof match?.time === "string" && match.time.trim()
          ? match.time.trim()
          : fallbackItem.time,
        cta: typeof match?.cta === "string" && match.cta.trim()
          ? match.cta.trim()
          : fallbackItem.cta,
        caption: typeof match?.caption === "string" && match.caption.trim()
          ? match.caption.trim()
          : fallbackItem.caption,
        hashtags: validatedHashtags,
        engagementTip: typeof match?.engagementTip === "string" && match.engagementTip.trim()
          ? match.engagementTip.trim()
          : fallbackItem.engagementTip,
      });
    });

    res.json({
      strategy,
      pillars,
      tips,
      calendar: sanitizedCalendar,
      isFallback: false,
      source: "ai",
    });
  } catch (err: any) {
    console.error("Gemini Generation Error, returning fallback:", err);
    res.json(fallbackData);
  }
});

// Single Post Caption Refresh Endpoint
app.post("/api/refresh-post", async (req, res) => {
  const { day, platform, contentType, idea, brandName, brandVoice, businessCategory } = req.body || {};

  if (!day || !platform || !brandName) {
    return res.status(400).json({ error: "Missing required parameters (day, platform, brandName)." });
  }

  const cleanBrand = String(brandName).trim();
  const cleanIdea = String(idea || "Our Latest Focus").trim();
  const cleanCategory = String(businessCategory || "").trim();
  const cleanVoice = String(brandVoice || "Friendly and Approachable").trim();

  const isFriendly = /friendly|approachable|casual|warm|playful|witty/i.test(cleanVoice);
  const fallbackCaption = isFriendly
    ? `✨ [Fresh Update] Quick peek into ${cleanIdea}! At ${cleanBrand}, we're always looking for simple, realistic ways to make life easier and more enjoyable. What do you think of this approach? Let's chat in the comments! 👇`
    : `✨ [Fresh Update] Exploring essential strategies in ${cleanIdea}. At ${cleanBrand}, our mission is delivering actionable value and measurable results. How are you implementing this in your daily routine?`;

  const fallbackRefresh = {
    caption: fallbackCaption,
    hashtags: sanitizeHashtags([], cleanBrand, `${cleanIdea} ${cleanCategory}`, 7),
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    return res.json(fallbackRefresh);
  }

  try {
    const prompt = `Write a fresh, highly engaging alternative caption and strictly 6 to 10 niche hashtags for a ${platform} post (${contentType || "Social Post"}) for brand "${cleanBrand}" on topic "${cleanIdea}".
Tone: ${cleanVoice}.
Rules:
- MUST generate between 6 and 10 niche hashtags (strictly >= 6 and <= 10).
- Include #${cleanBrand.replace(/[^a-zA-Z0-9]/g, "")}.
- Avoid generic corporate buzzwords like #Strategy or #GrowthMindset unless specifically a business consultancy.
- Maintain the "${cleanVoice}" tone throughout the caption.
Output format JSON: {"caption": "...", "hashtags": ["#tag1", "#tag2", ...]}`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["caption", "hashtags"],
        },
      },
    });

    let text = response.text?.trim() || "{}";
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(text);
    const caption = typeof parsed.caption === "string" && parsed.caption.trim()
      ? parsed.caption.trim()
      : fallbackRefresh.caption;

    const rawTags = Array.isArray(parsed.hashtags) && parsed.hashtags.length > 0
      ? parsed.hashtags
      : fallbackRefresh.hashtags;

    const hashtags = sanitizeHashtags(rawTags, cleanBrand, `${cleanIdea} ${cleanCategory}`, 7);

    res.json({ caption, hashtags });
  } catch (err) {
    console.error("Refresh Post Error, using fallback:", err);
    res.json(fallbackRefresh);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
