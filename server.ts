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

// POST /generate or /api/generate
app.post("/api/generate", async (req, res) => {
  try {
    const {
      brandName = "FitLife",
      businessCategory = "Fitness",
      targetAudience = "College Students",
      brandVoice = "Friendly and Motivational",
      contentThemes = "Workout Tips, Healthy Food, Motivation",
      platforms = ["Instagram", "LinkedIn"],
      primaryGoal = "Increase Engagement and Followers",
      additionalInstructions = "",
    } = req.body;

    const selectedPlatforms = Array.isArray(platforms) && platforms.length > 0
      ? platforms.join(", ")
      : "Instagram, LinkedIn, X (Twitter)";

    const prompt = `You are an expert social media strategist and content planner.
Based on the following brand brief:

- Brand Name: ${brandName}
- Business Category / Industry: ${businessCategory}
- Target Audience: ${targetAudience}
- Brand Voice: ${brandVoice}
- Content Themes: ${contentThemes}
- Selected Platforms: ${selectedPlatforms}
- Primary Marketing Goal: ${primaryGoal}
- Additional Notes / Instructions: ${additionalInstructions || "None"}

Please generate a complete 7-day social media strategy and content posting calendar.
Requirements:
1. Provide a clear 2-3 sentence overarching weekly strategy summary tailored to this brand and audience.
2. List 3 to 4 core content pillars (e.g. Educational, Inspirational, Promotional, Community).
3. Provide 3 actionable weekly marketing/growth tips specifically for these platforms.
4. Provide exactly 7 daily posts (Monday through Sunday) distributed across the chosen platforms (${selectedPlatforms}).
   For each day include:
   - Day of the week (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
   - Platform (must be one of the selected platforms)
   - Content Type (e.g. Educational Reel, Carousel Guide, Thought Leadership, Thread, Story, Case Study)
   - Idea (Catchy title/concept for the post)
   - Time (Optimal posting time like "09:00 AM", "01:00 PM", "07:00 PM")
   - CTA (Call to action like "Link in Bio", "Comment Below", "Retweet & Save")
   - Caption (Detailed, highly engaging 2-4 sentence caption formatted with emojis and paragraph breaks)
   - Hashtags (Array of 8 to 12 targeted hashtags starting with #)
   - EngagementTip (A 1-sentence tip on how to maximize interaction for this specific post)
`;

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are SocialSpark AI, a world-class social media manager and growth strategist. Always output structured, non-repetitive, high-converting social media content tailored precisely to the user's brand voice and goal.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategy: {
              type: Type.STRING,
              description: "High-level weekly social media strategy narrative summary.",
            },
            pillars: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 core content pillars.",
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 actionable weekly social media growth tips.",
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
                ],
              },
            },
          },
          required: ["strategy", "pillars", "tips", "calendar"],
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No output text received from Gemini API");
    }

    const parsedData = JSON.parse(textOutput);
    res.json(parsedData);
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    // Return a structured fallback if API fails or key is missing
    const fallbackStrategy = {
      strategy: `This week's plan for ${req.body.brandName || "your brand"} focuses on building audience trust and driving engagement through educational reels and thought leadership stories.`,
      pillars: ["Educational", "Inspirational", "Promotional", "Community"],
      tips: [
        "Post Reels on Tuesday mornings for highest organic reach.",
        "Reply to all comments within 30 minutes of publishing.",
        "Use carousel posts twice a week to increase dwell time.",
      ],
      calendar: [
        {
          day: "Monday",
          platform: req.body.platforms?.[0] || "Instagram",
          contentType: "Educational Reel",
          idea: `3 Tips for ${req.body.businessCategory || "Success"}`,
          time: "09:00 AM",
          cta: "Link in Bio",
          caption: `🌿 Starting the week with fresh inspiration! At ${req.body.brandName || "our brand"}, we believe small habits lead to massive results. What is your top focus this week?`,
          hashtags: ["#MondayMotivation", "#GrowthMindset", "#BrandStrategy", "#SocialSparkAI"],
          engagementTip: "Ask a question at the end to trigger comments in the first hour.",
        },
        {
          day: "Tuesday",
          platform: "LinkedIn",
          contentType: "Thought Leadership",
          idea: `The Future of ${req.body.businessCategory || "Industry Trends"}`,
          time: "11:30 AM",
          cta: "Comment Below",
          caption: `How is innovation changing our space? Here are 3 key takeaways our team at ${req.body.brandName || "our team"} observed this month. What trends are you seeing?`,
          hashtags: ["#Innovation", "#ThoughtLeadership", "#ProfessionalGrowth", "#Strategy"],
          engagementTip: "Tag 2 industry colleagues to invite them into the discussion.",
        },
        {
          day: "Wednesday",
          platform: "Instagram",
          contentType: "Carousel Guide",
          idea: `Behind the Scenes: How We Build at ${req.body.brandName || "our brand"}`,
          time: "02:00 PM",
          cta: "Save & Share",
          caption: `Take a peek behind the curtain! Slide through to see how we turn ideas into reality while staying true to ${req.body.targetAudience || "our audience"}.`,
          hashtags: ["#BehindTheScenes", "#CreatorLife", "#CarouselGuide", "#Community"],
          engagementTip: "Use a clear callout on the last slide reminding users to Save.",
        },
        {
          day: "Thursday",
          platform: "X (Twitter)",
          contentType: "Discussion Thread",
          idea: `5 Common Myths About ${req.body.businessCategory || "Our Field"}`,
          time: "04:15 PM",
          cta: "Retweet",
          caption: `Thread 🧵: Debunking 5 big misconceptions in ${req.body.businessCategory || "our industry"}.\n1. Myth: Success happens overnight.\n2. Fact: Consistency wins every single time.`,
          hashtags: ["#TwitterThread", "#IndustryInsights", "#TechNews", "#Productivity"],
          engagementTip: "Post a follow-up tweet 10 minutes later linking to your newsletter.",
        },
        {
          day: "Friday",
          platform: "LinkedIn",
          contentType: "Case Study Highlights",
          idea: "How We Helped Partner X Achieve 200% Growth",
          time: "10:00 AM",
          cta: "Read Full Post",
          caption: `Real results matter. Here is how ${req.body.brandName || "our solution"} helped drive real growth towards ${req.body.primaryGoal || "key objectives"}.`,
          hashtags: ["#CaseStudy", "#BusinessGrowth", "#ClientSuccess", "#Leadership"],
          engagementTip: "Include key metrics in bullet points near the top.",
        },
        {
          day: "Saturday",
          platform: "Instagram",
          contentType: "Community Feature",
          idea: "Weekend Spotlight & Community Story",
          time: "01:00 PM",
          cta: "Tag a Friend",
          caption: `Happy Weekend! 🚀 Highlighting our amazing community today. Tag someone below who inspires you to reach higher this month!`,
          hashtags: ["#WeekendVibes", "#CommunityFirst", "#Inspiration", "#FitLife"],
          engagementTip: "Reshare user comments to your Instagram Stories.",
        },
        {
          day: "Sunday",
          platform: "Facebook",
          contentType: "Weekly Reflection & Q&A",
          idea: "Weekly Wrap-up: What was your biggest win?",
          time: "05:00 PM",
          cta: "Share Your Story",
          caption: `Reflecting on the week! Drop your biggest win in the comments below. Let's celebrate each other's progress before heading into the new week.`,
          hashtags: ["#WeeklyWrapUp", "#SundayReflection", "#CommunityGoal", "#Progress"],
          engagementTip: "Reply to every single comment before Sunday evening.",
        },
      ],
    };

    res.json(fallbackStrategy);
  }
});

// Single Post Caption Refresh Endpoint
app.post("/api/refresh-post", async (req, res) => {
  try {
    const { day, platform, contentType, idea, brandName, brandVoice } = req.body;
    const prompt = `Write a fresh, highly engaging alternative caption and 8-10 hashtags for a ${platform} post (${contentType}) for brand "${brandName}" on topic "${idea}". Tone: ${brandVoice || "Engaging"}. Output format JSON: {"caption": "...", "hashtags": ["#tag1", "#tag2"]}`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err) {
    console.error("Refresh Post Error:", err);
    res.json({
      caption: `✨ [Refreshed] Excited to share our latest thoughts on ${req.body.idea || "this topic"}! Join ${req.body.brandName || "us"} as we push boundaries and innovate.`,
      hashtags: ["#FreshContent", "#SocialSparkAI", "#Growth", "#Innovation"],
    });
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
