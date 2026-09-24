import React from 'react';

export const TrustedBrands: React.FC = () => {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-[#ccc3d8]/20">
      <div className="max-w-[1280px] mx-auto px-6">
        <p className="text-center text-xs font-semibold text-[#4a4455] uppercase tracking-widest mb-8">
          Trusted by creators across
        </p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 items-center text-[#191c1e]">
          <span className="font-bold text-xl md:text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#E1306C]">photo_camera</span> Instagram
          </span>
          <span className="font-bold text-xl md:text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#0077B5]">work</span> LinkedIn
          </span>
          <span className="font-bold text-xl md:text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#1877F2]">qr_code_2</span> Facebook
          </span>
          <span className="font-bold text-xl md:text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-black">close</span> X
          </span>
          <span className="font-bold text-xl md:text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#E60023]">push_pin</span> Pinterest
          </span>
          <span className="font-bold text-xl md:text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#FF0000]">video_library</span> YouTube
          </span>
        </div>
      </div>
    </section>
  );
};
