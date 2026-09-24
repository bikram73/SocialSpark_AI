import React, { useEffect, useState } from 'react';

interface LoadingStateProps {
  onComplete: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { text: 'Analyzing brand brief...', percent: '25%' },
    { text: 'Generating creative pillars...', percent: '50%' },
    { text: 'Crafting multi-platform captions...', percent: '75%' },
    { text: 'Optimizing posting schedule...', percent: '95%' },
    { text: 'Finalizing your strategy...', percent: '100%' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  const current = steps[stepIndex];

  return (
    <section className="py-20 animate-fade-in my-8">
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center space-y-8 glass p-10 rounded-[20px] shadow-lg border border-[#ccc3d8]/40">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 primary-gradient opacity-20 rounded-full animate-ping"></div>
          <div className="relative w-28 h-28 primary-gradient rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <span className="material-symbols-outlined text-white text-5xl animate-pulse">
              neurology
            </span>
          </div>
        </div>

        <div className="space-y-4 w-full">
          <p className="text-xl font-extrabold text-[#630ed4] transition-all duration-300">
            {current.text}
          </p>
          <div className="w-full h-3 bg-[#e6e8ea] rounded-full overflow-hidden p-0.5 border border-white/50">
            <div
              className="h-full primary-gradient rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: current.percent }}
            ></div>
          </div>
          <p className="text-xs text-[#4a4455] font-medium tracking-wider uppercase pt-1">
            Gemini AI Engine Active • {current.percent}
          </p>
        </div>
      </div>
    </section>
  );
};
