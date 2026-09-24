import React, { useState } from 'react';

interface CalendarPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarPreviewModal: React.FC<CalendarPreviewModalProps> = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#f8f5ff] via-[#f2ebfc] to-[#eaddff] rounded-[32px] p-6 md:p-10 shadow-2xl border border-white/80 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-gradient-to-r from-[#d946ef]/20 to-[#7c3aed]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-gradient-to-r from-[#8127cf]/20 to-[#ec4899]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#191c1e] flex items-center justify-center shadow-md transition-all cursor-pointer z-30"
          title="Close Preview"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-md border border-white">
              <span className="text-2xl font-black bg-gradient-to-r from-[#7c3aed] to-[#d946ef] bg-clip-text text-transparent">
                AI
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#191c1e]">3D Glass Calendar Preview</h2>
              <p className="text-xs text-[#4a4455]">Interactive multi-platform schedule mockup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-[#4a4455] shadow-sm border border-white flex items-center gap-2">
              <span>All Month</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
            <button className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm border border-white text-[#4a4455] hover:text-[#7c3aed] transition-colors">
              <span className="material-symbols-outlined text-lg">widgets</span>
            </button>
            <button className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm border border-white text-[#4a4455] hover:text-[#7c3aed] transition-colors">
              <span className="material-symbols-outlined text-lg">notifications</span>
            </button>
          </div>
        </div>

        {/* 3D Glass Mockup Board */}
        <div className="relative bg-white/40 backdrop-blur-xl rounded-[28px] p-6 border border-white/60 shadow-xl min-h-[420px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 border-b border-white/40 pb-4">
            <h3 className="text-xl font-bold text-[#191c1e] flex items-center gap-2">
              Weekly Calendar
            </h3>
            <div className="flex gap-8 text-sm font-bold text-[#4a4455]">
              <span className="text-[#7c3aed]">Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span className="text-[#ec4899]">Fri</span>
            </div>
          </div>

          {/* Floating Glass Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 py-4">
            {/* Card 1: Instagram */}
            <div
              onClick={() => setSelectedCard('Instagram Reel on Mon')}
              className="group relative bg-gradient-to-br from-[#8127cf]/80 to-[#9c48ea]/80 text-white p-5 rounded-2xl shadow-xl backdrop-blur-lg border border-white/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-bold text-sm tracking-wide">Instagram</span>
                <span className="material-symbols-outlined text-lg text-white/80">auto_awesome</span>
              </div>
              <p className="text-xs text-white/90 font-medium mb-6">3 Tips to Sustainable Living</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </div>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-md">09:00 AM</span>
              </div>
            </div>

            {/* Card 2: LinkedIn */}
            <div
              onClick={() => setSelectedCard('LinkedIn Article on Wed')}
              className="group relative bg-gradient-to-br from-[#9c48ea]/80 to-[#c026d3]/80 text-white p-5 rounded-2xl shadow-xl backdrop-blur-lg border border-white/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-bold text-sm tracking-wide">LinkedIn</span>
                <span className="material-symbols-outlined text-lg text-white/80">work</span>
              </div>
              <p className="text-xs text-white/90 font-medium mb-6">The Future of Eco-Tech</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">work</span>
                </div>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-md">11:30 AM</span>
              </div>
            </div>

            {/* Card 3: Instagram */}
            <div
              onClick={() => setSelectedCard('Instagram Carousel on Thu')}
              className="group relative bg-gradient-to-br from-[#a855f7]/80 to-[#ec4899]/80 text-white p-5 rounded-2xl shadow-xl backdrop-blur-lg border border-white/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-bold text-sm tracking-wide">Instagram</span>
                <span className="material-symbols-outlined text-lg text-white/80">photo_camera</span>
              </div>
              <p className="text-xs text-white/90 font-medium mb-6">Behind the Scenes Guide</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </div>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-md">02:00 PM</span>
              </div>
            </div>

            {/* Card 4: LinkedIn */}
            <div
              onClick={() => setSelectedCard('LinkedIn Case Study on Fri')}
              className="group relative bg-gradient-to-br from-[#d946ef]/80 to-[#f43f5e]/80 text-white p-5 rounded-2xl shadow-xl backdrop-blur-lg border border-white/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-bold text-sm tracking-wide">LinkedIn</span>
                <span className="material-symbols-outlined text-lg text-white/80">work</span>
              </div>
              <p className="text-xs text-white/90 font-medium mb-6">Case Study: 200% Reach Growth</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">work</span>
                </div>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-md">10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Floating AI badge */}
          <div className="absolute -bottom-4 right-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg border border-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7c3aed] fill-1 text-xl">auto_awesome</span>
            <span className="text-xs font-bold text-[#191c1e]">AI Smart Calendar Active</span>
          </div>
        </div>

        {/* Selected Details Drawer */}
        {selectedCard && (
          <div className="mt-6 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-md flex justify-between items-center animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7c3aed]">check_circle</span>
              <span className="text-sm font-bold text-[#191c1e]">Selected: {selectedCard}</span>
            </div>
            <button
              onClick={() => setSelectedCard(null)}
              className="text-xs font-bold text-[#7c3aed] hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="primary-gradient text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
          >
            Close Interactive Preview
          </button>
        </div>
      </div>
    </div>
  );
};
