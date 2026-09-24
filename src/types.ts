export type ActiveTab = 'landing' | 'generator' | 'demo';

export interface FormState {
  brandName: string;
  businessCategory: string;
  targetAudience: string;
  brandVoice: string;
  contentThemes: string;
  primaryGoal: string;
  platforms: {
    instagram: boolean;
    linkedin: boolean;
    twitter: boolean;
    facebook: boolean;
    pinterest: boolean;
    youtube: boolean;
  };
  additionalInstructions: string;
}

export interface DayPlan {
  day: string;
  platform: string;
  contentType: string;
  idea: string;
  time: string;
  cta: string;
  caption: string;
  hashtags: string[];
  engagementTip?: string;
}

export interface GeneratedResult {
  strategy: string;
  pillars: string[];
  tips: string[];
  calendar: DayPlan[];
  isFallback?: boolean;
  source?: 'ai' | 'fallback';
}

