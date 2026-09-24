import React, { useState } from 'react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const [activeDocSection, setActiveDocSection] = useState<'overview' | 'quickstart' | 'platforms' | 'export' | 'contributing'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-[28px] shadow-2xl border border-[#ccc3d8]/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#ccc3d8]/30 bg-gradient-to-r from-[#f7f9fb] to-[#f2ebfc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xl">menu_book</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#191c1e]">SocialSpark AI Documentation</h2>
              <p className="text-xs text-[#4a4455]">Comprehensive guide to AI-powered content planning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#f2f4f6] text-[#4a4455] flex items-center justify-center shadow-sm border border-[#ccc3d8]/40 transition-all cursor-pointer"
            title="Close Documentation"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body with Sidebar Navigation */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-60 bg-[#f7f9fb] border-r border-[#ccc3d8]/30 p-4 flex md:flex-col gap-2 overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveDocSection('overview')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDocSection === 'overview'
                  ? 'bg-[#630ed4] text-white shadow-md'
                  : 'text-[#4a4455] hover:bg-[#eaddff]/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">info</span>
              Overview
            </button>
            <button
              onClick={() => setActiveDocSection('quickstart')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDocSection === 'quickstart'
                  ? 'bg-[#630ed4] text-white shadow-md'
                  : 'text-[#4a4455] hover:bg-[#eaddff]/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              Quick Start
            </button>
            <button
              onClick={() => setActiveDocSection('platforms')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDocSection === 'platforms'
                  ? 'bg-[#630ed4] text-white shadow-md'
                  : 'text-[#4a4455] hover:bg-[#eaddff]/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">hub</span>
              Platforms & Strategy
            </button>
            <button
              onClick={() => setActiveDocSection('export')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDocSection === 'export'
                  ? 'bg-[#630ed4] text-white shadow-md'
                  : 'text-[#4a4455] hover:bg-[#eaddff]/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              Exports & Formats
            </button>
            <button
              onClick={() => setActiveDocSection('contributing')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDocSection === 'contributing'
                  ? 'bg-[#630ed4] text-white shadow-md'
                  : 'text-[#4a4455] hover:bg-[#eaddff]/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">code</span>
              GitHub Repository
            </button>
          </div>

          {/* Main Doc View */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 text-[#191c1e]">
            {activeDocSection === 'overview' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-extrabold text-[#630ed4]">About SocialSpark AI</h3>
                <p className="text-sm text-[#4a4455] leading-relaxed">
                  SocialSpark AI is an end-to-end intelligent social media content generator designed for content creators, marketing agencies, and growing businesses. It automates weekly posting schedules, tailored captions, targeted hashtags, and engagement hooks across multiple social platforms in seconds.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#f2ebfc] border border-[#d2bbff]/40">
                    <h4 className="font-bold text-sm text-[#630ed4] flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-base">auto_awesome</span>
                      AI Caption Generator
                    </h4>
                    <p className="text-xs text-[#4a4455]">Generates witty, educational, and high-conversion post copies matching your exact brand tone.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#f2ebfc] border border-[#d2bbff]/40">
                    <h4 className="font-bold text-sm text-[#630ed4] flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-base">calendar_month</span>
                      7-Day Posting Schedule
                    </h4>
                    <p className="text-xs text-[#4a4455]">Delivers optimal posting hours and clear day-by-day objectives for consistent audience reach.</p>
                  </div>
                </div>
              </div>
            )}

            {activeDocSection === 'quickstart' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-extrabold text-[#630ed4]">Quick Start Guide</h3>
                <ol className="list-decimal pl-5 space-y-3 text-sm text-[#4a4455]">
                  <li>
                    <strong className="text-[#191c1e]">Enter Brand Identity:</strong> Provide your brand name, industry or niche category, and target audience demographic.
                  </li>
                  <li>
                    <strong className="text-[#191c1e]">Select Brand Voice:</strong> Choose from <em>Friendly & Motivational</em>, <em>Professional & Authoritative</em>, <em>Witty & Sarcastic</em>, or <em>Inspirational & Bold</em>.
                  </li>
                  <li>
                    <strong className="text-[#191c1e]">Pick Target Platforms:</strong> Check off the channels you post on: Instagram, LinkedIn, X (Twitter), Facebook, Pinterest, or YouTube.
                  </li>
                  <li>
                    <strong className="text-[#191c1e]">Generate Plan:</strong> Click <strong>Generate Plan Now</strong> to produce your full 7-day content roadmap.
                  </li>
                  <li>
                    <strong className="text-[#191c1e]">Refine & Export:</strong> Regenerate individual captions on the fly, copy posts to clipboard, or export full Markdown/PDF reports.
                  </li>
                </ol>
              </div>
            )}

            {activeDocSection === 'platforms' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-extrabold text-[#630ed4]">Platform Adaptation Rules</h3>
                <div className="space-y-3 text-sm text-[#4a4455]">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-[#e1306c]">Instagram:</span> Focused on visual hooks, short reels, carousels, hashtags in the 5-8 range, and high-engagement CTA prompts.
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-[#0077b5]">LinkedIn:</span> Emphasizes thought leadership, storytelling breakdowns, industry observations, and professional networking cues.
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-black">X (Twitter):</span> Compact punchy statements, question prompts, threads, and high-velocity engagement hooks.
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-[#1877f2]">Facebook & Pinterest:</span> Community-centric discussions, infographics, and actionable step-by-step takeaways.
                  </div>
                </div>
              </div>
            )}

            {activeDocSection === 'export' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-extrabold text-[#630ed4]">Export Formats</h3>
                <p className="text-sm text-[#4a4455]">
                  SocialSpark AI provides multiple seamless ways to transfer your generated plan into social media management schedulers (e.g. Buffer, Hootsuite, Notion, Later):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl border border-[#ccc3d8]/40 bg-white">
                    <span className="material-symbols-outlined text-xl text-[#630ed4] mb-1">content_copy</span>
                    <h4 className="font-bold text-sm text-[#191c1e]">Copy All</h4>
                    <p className="text-xs text-[#4a4455] mt-1">Copies the entire formatted 7-day schedule to your device clipboard.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#ccc3d8]/40 bg-white">
                    <span className="material-symbols-outlined text-xl text-[#630ed4] mb-1">markdown</span>
                    <h4 className="font-bold text-sm text-[#191c1e]">Markdown (.md)</h4>
                    <p className="text-xs text-[#4a4455] mt-1">Downloads structured markdown ready for Obsidian, Notion, or GitHub.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#ccc3d8]/40 bg-white">
                    <span className="material-symbols-outlined text-xl text-[#630ed4] mb-1">picture_as_pdf</span>
                    <h4 className="font-bold text-sm text-[#191c1e]">PDF Print Report</h4>
                    <p className="text-xs text-[#4a4455] mt-1">Generates an instant client-ready printable presentation report.</p>
                  </div>
                </div>
              </div>
            )}

            {activeDocSection === 'contributing' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-extrabold text-[#630ed4]">GitHub Repository</h3>
                <p className="text-sm text-[#4a4455]">
                  SocialSpark AI is maintained on GitHub. You can view the repository, contribute feature requests, and review source code at:
                </p>
                <div className="p-4 bg-[#f2ebfc] rounded-2xl border border-[#d2bbff]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold text-[#630ed4] uppercase tracking-wider">Official Repository</span>
                    <p className="font-mono text-sm font-bold text-[#191c1e]">https://github.com/bikram73/SocialSpark_AI</p>
                  </div>
                  <a
                    href="https://github.com/bikram73/SocialSpark_AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-gradient text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    View on GitHub
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ccc3d8]/30 bg-[#f7f9fb] flex justify-between items-center">
          <span className="text-xs text-[#4a4455]">SocialSpark AI • v1.0.0</span>
          <button
            onClick={onClose}
            className="primary-gradient text-white px-6 py-2 rounded-full font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
