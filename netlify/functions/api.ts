import express from "express";
import serverless from "serverless-http";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(express.json());

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

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

  const activePlatforms = platforms.length > 0 ? platforms : ["Instagram", "LinkedIn", "X (Twitter)"];
  const getPlat = (idx: number) => activePlatforms[idx % activePlatforms.length];

  return {
    strategy: `This 7-day content strategy for ${brandName} is designed to achieve "${primaryGoal || "High Audience Engagement"}" by delivering authentic, ${brandVoice.toLowerCase()} content that resonates directly with ${targetAudience}.`,
    pillars: ["Educational & How-To", "Inspirational & Mindset", "Product & Social Proof", "Community Discussion"],
    tips: [
      `Post during peak morning hours on ${activePlatforms[0]} for maximum early algorithmic velocity.`,
      "Engage with comments and direct messages within 30 minutes of publishing to boost post distribution.",
      "Use high-contrast visuals and multi-slide carousels to maximize audience dwell time.",
    ],
    calendar: [
      {
        day: "Monday",
        platform: getPlat(0),
        contentType: "Educational Reel / Video",
        idea: `3 Game-Changing Insights in ${businessCategory}`,
        time: "09:00 AM",
        cta: "Save This Guide",
        caption: `🚀 Kickstart your week! At ${brandName}, we know that small consistent actions lead to remarkable breakthroughs. Dive into these essential strategies tailored for ${targetAudience}.\n\nWhat is your #1 priority this week? Drop it below!`,
        hashtags: [`#${brandName.replace(/\s+/g, '')}`, "#MondayMotivation", "#IndustryInsights", "#GrowthMindset", "#TipsAndTricks"],
        engagementTip: "Ask a targeted question at the end to trigger comments in the crucial first hour.",
      },
      {
        day: "Tuesday",
        platform: getPlat(1),
        contentType: "Thought Leadership Post",
        idea: `The Evolution of ${businessCategory}: What We Learned`,
        time: "11:30 AM",
        cta: "Share Your Perspective",
        caption: `How is innovation reshaping our sector? Here are key takeaways observed by our team at ${brandName}.\n\nAdapting early isn't just an advantage—it's essential for sustainable growth. How are you approaching this transition?`,
        hashtags: ["#ThoughtLeadership", "#ProfessionalGrowth", "#Innovation", "#IndustryTrends", "#Strategy"],
        engagementTip: "Tag 2 industry leaders or peers to invite their perspective into the conversation.",
      },
      {
        day: "Wednesday",
        platform: getPlat(2),
        contentType: "Multi-Slide Carousel Guide",
        idea: `Step-by-Step Breakdown: ${contentThemes ? contentThemes.split(',')[0].trim() : 'Mastering the Basics'}`,
        time: "02:00 PM",
        cta: "Swipe & Save",
        caption: `Swipe through for a step-by-step masterclass! 📊 We broke down everything ${targetAudience} needs to know to take the next step with confidence.\n\nBookmark this post so you can reference it whenever you need it!`,
        hashtags: ["#CarouselPost", "#StepByStep", "#EducationalContent", "#ValueFirst", "#ActionableAdvice"],
        engagementTip: "Add a clear visual pointer on the final slide reminding viewers to hit the save button.",
      },
      {
        day: "Thursday",
        platform: getPlat(3),
        contentType: "Case Study / Transformation",
        idea: `Real Results: Transforming Challenges into Wins`,
        time: "10:15 AM",
        cta: "Read Full Story",
        caption: `Proof is in the results. 💡 Discover how focusing on quality and community helped overcome obstacles and reach new milestones at ${brandName}.\n\nConsistency beats intensity every single time.`,
        hashtags: ["#TransformationThursday", "#ClientSuccess", "#RealResults", "#CaseStudy", "#ProofOfWork"],
        engagementTip: "Include 2-3 specific quantifiable bullet points in the first 3 lines.",
      },
      {
        day: "Friday",
        platform: getPlat(4),
        contentType: "Interactive Discussion Thread",
        idea: `5 Common Myths in ${businessCategory} Debunked`,
        time: "03:45 PM",
        cta: "Join the Debate",
        caption: `Let's bust some widespread myths in ${businessCategory}! 🧵\n\n1. Myth: You need endless time.\n2. Fact: Focused execution creates 10x the output.\n\nWhich myth did you believe the longest?`,
        hashtags: ["#MythBusting", "#FridayFacts", "#CommunityTalk", "#IndustryTruths", "#LearnTogether"],
        engagementTip: "Reply to every single incoming comment with an open-ended follow-up question.",
      },
      {
        day: "Saturday",
        platform: getPlat(5),
        contentType: "Behind-the-Scenes Spotlight",
        idea: `Behind the Curtain: How the Team at ${brandName} Builds`,
        time: "01:00 PM",
        cta: "Double-Tap to Support",
        caption: `Weekend spotlight! 🌟 Here is an honest, candid look behind the scenes at how we bring our ideas to life for ${targetAudience}.\n\nPassionate work done with great people. Have an incredible weekend!`,
        hashtags: ["#BehindTheScenes", "#CompanyCulture", "#CreatorLife", "#WeekendVibes", "#BuildingInPublic"],
        engagementTip: "Use conversational storytelling and reshare responses to your Stories.",
      },
      {
        day: "Sunday",
        platform: getPlat(6),
        contentType: "Weekly Reflection & Community Q&A",
        idea: "Sunday Reset: Celebrate Wins and Set Intentions",
        time: "05:00 PM",
        cta: "Drop Your Win",
        caption: `Sunday Reset time! 🌿 Take a minute to celebrate your biggest win from this past week, no matter how small.\n\nWhat are you most excited to accomplish in the week ahead? Let's champion each other!`,
        hashtags: ["#SundayReset", "#WeeklyReflection", "#WinsOfTheWeek", "#CommunityLove", "#MindsetMatters"],
        engagementTip: "Pin the most inspiring community comment to the top of the thread.",
      },
    ],
    isFallback: true,
    source: "fallback" as const,
  };
}

// Router handler helper to support /api/generate, /.netlify/functions/api/generate, /generate
const handleGenerate = async (req: express.Request, res: express.Response) => {
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

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    return res.json(fallbackData);
  }

  try {
    const prompt = `You are an expert social media strategist and content planner.
Based on the following brand brief:

- Brand Name: ${cleanBrandName}
- Business Category / Industry: ${cleanCategory}
- Target Audience: ${cleanAudience}
- Brand Voice: ${cleanVoice}
- Content Themes: ${contentThemes || "General Growth & Value"}
- Selected Platforms: ${selectedPlatforms}
- Primary Marketing Goal: ${primaryGoal || "Engagement"}
- Additional Instructions: ${additionalInstructions || "None"}

Please generate a complete 7-day social media strategy and content posting calendar.
Requirements:
1. Provide an overarching 2-3 sentence weekly strategy summary tailored to this brand and audience.
2. List exactly 4 core content pillars.
3. Provide 3 actionable weekly marketing/growth tips specifically for these platforms.
4. Provide exactly 7 daily posts in chronological order from Monday through Sunday.
   The days MUST strictly be: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.
   Distribute the posts across the selected platforms (${selectedPlatforms}).
   For each day include:
   - day: strictly "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", or "Sunday"
   - platform: one of (${selectedPlatforms})
   - contentType: descriptive format (e.g. Educational Reel, Carousel Guide, Case Study, Thread, Thought Leadership)
   - idea: catchy, engaging post concept
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
          "You are SocialSpark AI, a world-class social media manager and growth strategist. Always output structured, non-repetitive, high-converting social media content tailored precisely to the user's brand voice and goal. You must generate exactly 7 distinct days (Monday through Sunday).",
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

    const strategy = typeof parsedData.strategy === "string" && parsedData.strategy.trim()
      ? parsedData.strategy.trim()
      : fallbackData.strategy;

    const pillars = Array.isArray(parsedData.pillars) && parsedData.pillars.length >= 3
      ? parsedData.pillars.map(String)
      : fallbackData.pillars;

    const tips = Array.isArray(parsedData.tips) && parsedData.tips.length >= 3
      ? parsedData.tips.map(String)
      : fallbackData.tips;

    const rawCalendar: any[] = Array.isArray(parsedData.calendar) ? parsedData.calendar : [];
    const sanitizedCalendar: SanitizedPost[] = [];

    VALID_DAYS.forEach((dayName, idx) => {
      const match = rawCalendar.find(
        (item) => typeof item?.day === "string" && item.day.toLowerCase() === dayName.toLowerCase()
      ) || rawCalendar[idx];

      const fallbackItem = fallbackData.calendar[idx];

      sanitizedCalendar.push({
        day: dayName,
        platform: typeof match?.platform === "string" && match.platform.trim()
          ? match.platform.trim()
          : fallbackItem.platform,
        contentType: typeof match?.contentType === "string" && match.contentType.trim()
          ? match.contentType.trim()
          : fallbackItem.contentType,
        idea: typeof match?.idea === "string" && match.idea.trim()
          ? match.idea.trim()
          : fallbackItem.idea,
        time: typeof match?.time === "string" && match.time.trim()
          ? match.time.trim()
          : fallbackItem.time,
        cta: typeof match?.cta === "string" && match.cta.trim()
          ? match.cta.trim()
          : fallbackItem.cta,
        caption: typeof match?.caption === "string" && match.caption.trim()
          ? match.caption.trim()
          : fallbackItem.caption,
        hashtags: Array.isArray(match?.hashtags) && match.hashtags.length > 0
          ? match.hashtags.map((tag: any) => {
              const str = String(tag).trim();
              return str.startsWith("#") ? str : `#${str}`;
            })
          : fallbackItem.hashtags,
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
};

const handleRefreshPost = async (req: express.Request, res: express.Response) => {
  const { day, platform, contentType, idea, brandName, brandVoice } = req.body || {};

  if (!day || !platform || !brandName) {
    return res.status(400).json({ error: "Missing required parameters (day, platform, brandName)." });
  }

  const fallbackRefresh = {
    caption: `✨ [Fresh Update] Exploring new horizons with ${idea || "our latest focus"}! At ${brandName}, we stay committed to delivering authentic value and inspiring results. What resonated most with you?`,
    hashtags: [`#${String(brandName).replace(/\s+/g, '')}`, "#FreshIdeas", "#Strategy", "#CommunityFirst", "#Innovation"],
  };

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    return res.json(fallbackRefresh);
  }

  try {
    const prompt = `Write a fresh, highly engaging alternative caption and 6-8 relevant hashtags for a ${platform} post (${contentType || "Social Post"}) for brand "${brandName}" on topic "${idea || "Community Value"}".
Tone: ${brandVoice || "Engaging and Authentic"}.
Output format JSON: {"caption": "...", "hashtags": ["#tag1", "#tag2"]}`;

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
    const hashtags = Array.isArray(parsed.hashtags) && parsed.hashtags.length > 0
      ? parsed.hashtags.map((h: any) => {
          const tag = String(h).trim();
          return tag.startsWith("#") ? tag : `#${tag}`;
        })
      : fallbackRefresh.hashtags;

    res.json({ caption, hashtags });
  } catch (err) {
    console.error("Refresh Post Netlify Function Error:", err);
    res.json(fallbackRefresh);
  }
};

app.all(["/api/health", "/.netlify/functions/api/health", "/health"], (req, res) => {
  res.json({ status: "ok", message: "SocialSpark AI API Running" });
});

app.post(["/api/generate", "/.netlify/functions/api/generate", "/generate"], handleGenerate);
app.post(["/api/refresh-post", "/.netlify/functions/api/refresh-post", "/refresh-post"], handleRefreshPost);

export const handler = serverless(app);
