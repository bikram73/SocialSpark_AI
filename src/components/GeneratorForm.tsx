import React, { useState } from 'react';
import { FormState } from '../types';

interface GeneratorFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  formState,
  setFormState,
  onSubmit,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.brandName.trim() || formState.brandName.length < 2 || formState.brandName.length > 50) {
      setValidationError('Brand Name must be between 2 and 50 characters.');
      return;
    }

    if (!formState.businessCategory.trim()) {
      setValidationError('Please specify a Business Category / Industry.');
      return;
    }

    if (!formState.targetAudience.trim()) {
      setValidationError('Please specify your Target Audience.');
      return;
    }

    const hasPlatformSelected = Object.values(formState.platforms).some(Boolean);
    if (!hasPlatformSelected) {
      setValidationError('Please select at least one social media platform.');
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

        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 text-[#ba1a1a] text-sm font-semibold flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">error</span>
            <span>{validationError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1: Brand Name & Business Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Brand Name <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="text"
                name="brandName"
                value={formState.brandName}
                onChange={handleInputChange}
                placeholder="e.g. FitLife or EcoSphere Tech"
                className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Business Category / Industry <span className="text-[#ba1a1a]">*</span>
              </label>
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

          {/* Row 2: Target Audience & Brand Voice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Target Audience <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formState.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g. College Students or Busy Professionals"
                className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
              />
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
              <label className="text-sm font-semibold text-[#4a4455] block">
                Content Themes
              </label>
              <input
                type="text"
                name="contentThemes"
                value={formState.contentThemes}
                onChange={handleInputChange}
                placeholder="e.g. Workout Tips, Healthy Food, Motivation"
                className="w-full bg-white border border-[#ccc3d8] rounded-xl px-4 py-2.5 focus:border-[#630ed4] focus:ring-2 focus:ring-[#630ed4]/20 transition-all outline-none text-[#191c1e] text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#4a4455] block">
                Primary Goal
              </label>
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

          {/* Row 4: Platforms */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#4a4455] block">
              Platforms <span className="text-[#ba1a1a]">*</span>
            </label>
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
            <label className="text-sm font-semibold text-[#4a4455] block">
              Additional Instructions (Optional, max 500 chars)
            </label>
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

          {/* Action button */}
          <button
            type="submit"
            className="w-full primary-gradient primary-gradient-hover text-white flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base transition-all shadow-[0_20px_60px_rgba(124,58,237,0.18)] active:scale-[0.99] cursor-pointer"
          >
            <span className="material-symbols-outlined fill-1">auto_awesome</span>
            Generate Plan Now
          </button>
        </form>
      </div>
    </section>
  );
};

