import React, { useState } from 'react';
import { FormState } from '../types';

interface GeneratorFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
}

interface ExamplePreset {
  id: string;
  name: string;
  icon: string;
  tag: string;
  data: FormState;
}

const EXAMPLE_PRESETS: ExamplePreset[] = [
  {
    id: 'fitlife',
    name: 'FitLife',
    icon: 'fitness_center',
    tag: 'Fitness & Health',
    data: {
      brandName: 'FitLife',
      businessCategory: 'Fitness & Wellness',
      targetAudience: 'College Students & Young Professionals',
      brandVoice: 'Friendly and Motivational',
      contentThemes: 'Quick 15-Min Workouts, Healthy Meal Prep, Mindset Motivation',
      primaryGoal: 'Increase Community Engagement and Followers',
      platforms: {
        instagram: true,
        linkedin: true,
        twitter: true,
        facebook: false,
        pinterest: false,
        youtube: true,
      },
      additionalInstructions: 'Focus on relatable beginner fitness tips and simple meal-prep hacks.',
    },
  },
  {
    id: 'ecosphere',
    name: 'EcoSphere Tech',
    icon: 'eco',
    tag: 'Clean Tech & SaaS',
    data: {
      brandName: 'EcoSphere Tech',
      businessCategory: 'Sustainable Consumer Electronics',
      targetAudience: 'Eco-Conscious Tech Enthusiasts & Early Adopters',
      brandVoice: 'Inspirational & Bold',
      contentThemes: 'Solar Innovations, Zero-Waste Living, Circular Tech Economy',
      primaryGoal: 'Drive Product Pre-Orders & Thought Leadership',
      platforms: {
        instagram: true,
        linkedin: true,
        twitter: true,
        facebook: false,
        pinterest: true,
        youtube: false,
      },
      additionalInstructions: 'Highlight recyclable ocean plastics and carbon offset statistics.',
    },
  },
  {
    id: 'beanbrew',
    name: 'Bean & Brew',
    icon: 'local_cafe',
    tag: 'Café & Food',
    data: {
      brandName: 'Bean & Brew',
      businessCategory: 'Artisanal Coffee & Bakery',
      targetAudience: 'Coffee Lovers, Remote Workers & Local Foodies',
      brandVoice: 'Friendly & Approachable',
      contentThemes: 'Latte Art Tutorials, Morning Rituals, Single-Origin Beans, Pastry Pairings',
      primaryGoal: 'Drive In-Store Foot Traffic & Weekend Visits',
      platforms: {
        instagram: true,
        facebook: true,
        pinterest: true,
        twitter: false,
        linkedin: false,
        youtube: false,
      },
      additionalInstructions: 'Emphasize cozy neighborhood morning vibes and seasonal drinks.',
    },
  },
  {
    id: 'luxeglow',
    name: 'LuxeGlow Skincare',
    icon: 'spa',
    tag: 'Beauty & Skincare',
    data: {
      brandName: 'LuxeGlow Skincare',
      businessCategory: 'Clean Dermatological Skincare',
      targetAudience: 'Gen Z & Millennials Seeking Glowing, Glass Skin',
      brandVoice: 'Friendly & Approachable',
      contentThemes: 'Ingredient Deep-Dives, Nighttime Routines, Skincare Myths, Before & Afters',
      primaryGoal: 'Boost E-Commerce Sales & UGC Reviews',
      platforms: {
        instagram: true,
        pinterest: true,
        youtube: true,
        facebook: false,
        twitter: false,
        linkedin: false,
      },
      additionalInstructions: 'Highlight hyaluronic acid benefits, vegan cruelty-free formulas.',
    },
  },
  {
    id: 'codecraft',
    name: 'CodeCraft Academy',
    icon: 'terminal',
    tag: 'EdTech & Bootcamps',
    data: {
      brandName: 'CodeCraft Academy',
      businessCategory: 'Online Coding Bootcamp & Upskilling',
      targetAudience: 'Aspiring Web Developers & Tech Career Switchers',
      brandVoice: 'Professional & Authoritative',
      contentThemes: 'Full-Stack Tips, AI Coding Workflows, Portfolio Reviews, Tech Career Roadmaps',
      primaryGoal: 'Acquire New Student Enrollments & Course Signups',
      platforms: {
        linkedin: true,
        twitter: true,
        youtube: true,
        instagram: false,
        facebook: false,
        pinterest: false,
      },
      additionalInstructions: 'Feature real student transformations and actionable 60-second code tips.',
    },
  },
  {
    id: 'urbannest',
    name: 'UrbanNest Realty',
    icon: 'home_pin',
    tag: 'Real Estate & Design',
    data: {
      brandName: 'UrbanNest Realty',
      businessCategory: 'Boutique Real Estate & Interior Architecture',
      targetAudience: 'First-Time Homebuyers & Modern Property Investors',
      brandVoice: 'Professional & Authoritative',
      contentThemes: 'Virtual Home Tours, Interior Staging Hacks, Market Trends, Mortgage Advice',
      primaryGoal: 'Generate Inbound Buyer & Seller Lead Inquiries',
      platforms: {
        instagram: true,
        linkedin: true,
        facebook: true,
        pinterest: true,
        twitter: false,
        youtube: false,
      },
      additionalInstructions: 'Focus on modern minimalist aesthetic and downtown neighborhood highlights.',
    },
  },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  formState,
  setFormState,
  onSubmit,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string>('fitlife');
  const [lastClearedState, setLastClearedState] = useState<FormState | null>(null);
  const [showClearedFeedback, setShowClearedFeedback] = useState(false);

  const isFormEmpty =
    !formState.brandName.trim() &&
    !formState.businessCategory.trim() &&
    !formState.targetAudience.trim() &&
    !formState.contentThemes.trim() &&
    !formState.primaryGoal.trim() &&
    !formState.additionalInstructions.trim() &&
    !Object.values(formState.platforms).some(Boolean);

  const handleClearAll = () => {
    setLastClearedState({ ...formState, platforms: { ...formState.platforms } });
    setActivePresetId('');
    setFormState({
      brandName: '',
      businessCategory: '',
      targetAudience: '',
      brandVoice: 'Friendly and Motivational',
      contentThemes: '',
      primaryGoal: '',
      platforms: {
        instagram: false,
        linkedin: false,
        twitter: false,
        facebook: false,
        pinterest: false,
        youtube: false,
      },
      additionalInstructions: '',
    });
    setValidationError(null);
    setShowClearedFeedback(true);
  };

  const handleUndoClear = () => {
    if (lastClearedState) {
      setFormState(lastClearedState);
      setLastClearedState(null);
      setShowClearedFeedback(false);
    }
  };

  const handleClearField = (fieldName: keyof FormState) => {
    setFormState((prev) => ({ ...prev, [fieldName]: '' }));
    setValidationError(null);
  };

  const handleSelectPreset = (preset: ExamplePreset) => {
    setActivePresetId(preset.id);
    setFormState(preset.data);
    setValidationError(null);
    setShowClearedFeedback(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
    setShowClearedFeedback(false);
  };

  const handleCheckboxChange = (platformKey: keyof FormState['platforms']) => {
    setFormState((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platformKey]: !prev.platforms[platformKey],
      },
    }));
    setValidationError(null);
    setShowClearedFeedback(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanBrand = formState.brandName.trim();
    if (!cleanBrand || cleanBrand.length < 2 || cleanBrand.length > 50) {
      setValidationError('Brand Name is required and must be between 2 and 50 characters.');
      return;
    }

    const cleanCategory = formState.businessCategory.trim();
    if (!cleanCategory || cleanCategory.length < 2 || cleanCategory.length > 100) {
      setValidationError('Please specify a Business Category / Industry (2-100 characters).');
      return;
    }

    const cleanAudience = formState.targetAudience.trim();
    if (!cleanAudience || cleanAudience.length < 2 || cleanAudience.length > 150) {
      setValidationError('Please specify your Target Audience (2-150 characters).');
      return;
    }

    const cleanVoice = formState.brandVoice.trim();
    if (!cleanVoice) {
      setValidationError('Please select a Brand Voice.');
      return;
    }

    const hasPlatformSelected = Object.values(formState.platforms).some(Boolean);
    if (!hasPlatformSelected) {
      setValidationError('Please select at least one social media platform.');
      return;
    }

    if (formState.additionalInstructions && formState.additionalInstructions.length > 500) {
      setValidationError('Additional Instructions cannot exceed 500 characters.');
      return;
    }

    setValidationError(null);
    onSubmit();
  };

  return (
    <section className="mb-16" id="generator-form">
      <div className="glass p-8 md:p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-7xl fill-1 text-[#630ed4]">
            auto_awesome
          </span>
        </div>

        {/* Quick Example Presets Selector */}
        <div className="mb-8 p-5 bg-[#f7f9fb] rounded-2xl border border-[#ccc3d8]/40">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#630ed4] text-lg">touch_app</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#191c1e]">
                Try Sample Brand Examples:
              </span>
            </div>
            <span className="text-[11px] text-[#4a4455] hidden sm:inline">
              Click any example to autofill the form
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {EXAMPLE_PRESETS.map((preset) => {
              const isSelected = formState.brandName.toLowerCase() === preset.data.brandName.toLowerCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#630ed4] text-white border-[#630ed4] shadow-md shadow-[#630ed4]/20 scale-[1.02]'
                      : 'bg-white hover:bg-[#eaddff]/40 text-[#191c1e] border-[#ccc3d8]/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`material-symbols-outlined text-base ${
                        isSelected ? 'text-white' : 'text-[#630ed4]'
                      }`}
                    >
                      {preset.icon}
                    </span>
                    <span className="font-bold text-xs truncate">{preset.name}</span>
                  </div>
                  <span
                    className={`text-[10px] truncate ${
                      isSelected ? 'text-white/80' : 'text-[#4a4455]'
                    }`}
                  >
                    {preset.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 text-[#ba1a1a] text-sm font-semibold flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">error</span>
            <span>{validationError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} id="strategy-generator-form">
          {/* Header Toolbar with Clear Option */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e1e2ec]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#630ed4] text-lg">tune</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4a4455]">
                Strategy Parameters
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isFormEmpty}
              title="Clear all inputs and reset form"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                isFormEmpty
                  ? 'opacity-40 cursor-not-allowed text-[#79747e] border-transparent bg-transparent'
                  : 'text-[#ba1a1a] hover:bg-[#ffdad6]/50 active:bg-[#ffdad6]/80 border-[#ba1a1a]/30 cursor-pointer shadow-xs'
              }`}
            >
              <span className="material-symbols-outlined text-base">delete_sweep</span>
              Clear All
            </button>
          </div>

          {/* Cleared Feedback Notification */}
          {showClearedFeedback && (
            <div className="p-3.5 rounded-xl bg-[#eaddff]/60 border border-[#630ed4]/30 text-[#191c1e] text-xs font-medium flex items-center justify-between transition-all">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#630ed4] text-base">check_circle</span>
                <span>All form inputs and platforms have been cleared.</span>
              </div>
              {lastClearedState && (
                <button
                  type="button"
                  onClick={handleUndoClear}
                  className="text-[#630ed4] hover:text-[#4f00ad] font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">undo</span>
                  Undo Clear
                </button>
              )}
            </div>
          )}

          {/* Row 1: Brand Name & Business Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#4a4455] block">
                  Brand Name <span className="text-[#ba1a1a]">*</span>
                </label>
                {formState.brandName && (
                  <button
                    type="button"
                    onClick={() => handleClearField('brandName')}
                    className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                    title="Clear brand name"
                  >
                    <span className="material-symbols-outlined text-xs">close</span> Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="brandName"
                  value={formState.brandName}
                  onChange={handleInputChange}
                  placeholder="e.g. FitLife or EcoSphere Tech"
                  className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#4a4455] block">
                  Business Category / Industry <span className="text-[#ba1a1a]">*</span>
                </label>
                {formState.businessCategory && (
                  <button
                    type="button"
                    onClick={() => handleClearField('businessCategory')}
                    className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                    title="Clear category"
                  >
                    <span className="material-symbols-outlined text-xs">close</span> Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="businessCategory"
                  value={formState.businessCategory}
                  onChange={handleInputChange}
                  placeholder="e.g. Fitness or Sustainable Fashion"
                  className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Target Audience & Brand Voice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#4a4455] block">
                  Target Audience <span className="text-[#ba1a1a]">*</span>
                </label>
                {formState.targetAudience && (
                  <button
                    type="button"
                    onClick={() => handleClearField('targetAudience')}
                    className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                    title="Clear audience"
                  >
                    <span className="material-symbols-outlined text-xs">close</span> Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="targetAudience"
                  value={formState.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g. College Students or Busy Professionals"
                  className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Brand Voice
              </label>
              <select
                name="brandVoice"
                value={formState.brandVoice}
                onChange={handleInputChange}
                className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm appearance-none cursor-pointer"
              >
                <option value="Friendly and Motivational">Friendly and Motivational</option>
                <option value="Professional & Authoritative">Professional &amp; Authoritative</option>
                <option value="Friendly & Approachable">Friendly &amp; Approachable</option>
                <option value="Witty & Sarcastic">Witty &amp; Sarcastic</option>
                <option value="Inspirational & Bold">Inspirational &amp; Bold</option>
              </select>
            </div>
          </div>

          {/* Row 3: Content Themes & Primary Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#4a4455] block">
                  Content Themes
                </label>
                {formState.contentThemes && (
                  <button
                    type="button"
                    onClick={() => handleClearField('contentThemes')}
                    className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                    title="Clear content themes"
                  >
                    <span className="material-symbols-outlined text-xs">close</span> Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="contentThemes"
                  value={formState.contentThemes}
                  onChange={handleInputChange}
                  placeholder="e.g. Workout Tips, Healthy Food, Motivation"
                  className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#4a4455] block">
                  Primary Goal
                </label>
                {formState.primaryGoal && (
                  <button
                    type="button"
                    onClick={() => handleClearField('primaryGoal')}
                    className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                    title="Clear primary goal"
                  >
                    <span className="material-symbols-outlined text-xs">close</span> Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="primaryGoal"
                  value={formState.primaryGoal}
                  onChange={handleInputChange}
                  placeholder="e.g. Increase Engagement and Followers"
                  className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Platforms */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Platforms <span className="text-[#ba1a1a]">*</span>
              </label>
              {Object.values(formState.platforms).some(Boolean) && (
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      platforms: {
                        instagram: false,
                        linkedin: false,
                        twitter: false,
                        facebook: false,
                        pinterest: false,
                        youtube: false,
                      },
                    }))
                  }
                  className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                  title="Deselect all platforms"
                >
                  <span className="material-symbols-outlined text-xs">close</span> Deselect all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full cursor-pointer hover:bg-[#eaddff] transition-colors text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formState.platforms.instagram}
                  onChange={() => handleCheckboxChange('instagram')}
                  className="rounded text-[#630ed4] focus:ring-[#630ed4]"
                />
                <span>Instagram</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full cursor-pointer hover:bg-[#eaddff] transition-colors text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formState.platforms.linkedin}
                  onChange={() => handleCheckboxChange('linkedin')}
                  className="rounded text-[#630ed4] focus:ring-[#630ed4]"
                />
                <span>LinkedIn</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full cursor-pointer hover:bg-[#eaddff] transition-colors text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formState.platforms.twitter}
                  onChange={() => handleCheckboxChange('twitter')}
                  className="rounded text-[#630ed4] focus:ring-[#630ed4]"
                />
                <span>X (Twitter)</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full cursor-pointer hover:bg-[#eaddff] transition-colors text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formState.platforms.facebook}
                  onChange={() => handleCheckboxChange('facebook')}
                  className="rounded text-[#630ed4] focus:ring-[#630ed4]"
                />
                <span>Facebook</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full cursor-pointer hover:bg-[#eaddff] transition-colors text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formState.platforms.pinterest}
                  onChange={() => handleCheckboxChange('pinterest')}
                  className="rounded text-[#630ed4] focus:ring-[#630ed4]"
                />
                <span>Pinterest</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full cursor-pointer hover:bg-[#eaddff] transition-colors text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formState.platforms.youtube}
                  onChange={() => handleCheckboxChange('youtube')}
                  className="rounded text-[#630ed4] focus:ring-[#630ed4]"
                />
                <span>YouTube</span>
              </label>
            </div>
          </div>

          {/* Row 5: Additional Instructions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Additional Instructions (Optional, max 500 chars)
              </label>
              <div className="flex items-center gap-3">
                {formState.additionalInstructions && (
                  <button
                    type="button"
                    onClick={() => handleClearField('additionalInstructions')}
                    className="text-[11px] text-[#79747e] hover:text-[#ba1a1a] cursor-pointer flex items-center gap-0.5"
                    title="Clear instructions"
                  >
                    <span className="material-symbols-outlined text-xs">close</span> Clear
                  </button>
                )}
                <span className={`text-xs ${formState.additionalInstructions.length >= 480 ? 'text-[#ba1a1a] font-bold' : 'text-[#4a4455]'}`}>
                  {formState.additionalInstructions.length} / 500
                </span>
              </div>
            </div>
            <textarea
              name="additionalInstructions"
              rows={3}
              maxLength={500}
              value={formState.additionalInstructions}
              onChange={handleInputChange}
              placeholder="Mention specific upcoming events, product launches, or keywords to include..."
              className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-3 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isFormEmpty}
              id="clear-form-btn-bottom"
              title="Remove everything in this form"
              className={`w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isFormEmpty
                  ? 'opacity-40 cursor-not-allowed text-[#79747e] bg-[#e1e2ec]/30 border border-[#ccc3d8]/40'
                  : 'text-[#ba1a1a] hover:text-[#93000a] bg-white hover:bg-[#ffdad6]/40 border border-[#ba1a1a]/40 hover:border-[#ba1a1a] cursor-pointer shadow-sm active:scale-[0.99]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">delete_sweep</span>
              Clear All Fields
            </button>

            <button
              type="submit"
              className="w-full sm:flex-1 primary-gradient primary-gradient-hover text-white flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base transition-all shadow-[0_20px_60px_rgba(124,58,237,0.18)] active:scale-[0.99] cursor-pointer"
            >
              <span className="material-symbols-outlined fill-1">auto_awesome</span>
              Generate Plan Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

