import React from 'react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'description',
      title: 'AI Caption Generator',
      desc: 'Witty, engaging, or professional captions tailored to your specific post image or video topic.',
      color: 'bg-[#630ed4]/10 text-[#630ed4] group-hover:bg-[#630ed4] group-hover:text-white',
    },
    {
      icon: 'calendar_month',
      title: 'Weekly Posting Calendar',
      desc: 'A complete 7-day blueprint of what to post, when to post, and the goal for every single update.',
      color: 'bg-[#8127cf]/10 text-[#8127cf] group-hover:bg-[#8127cf] group-hover:text-white',
    },
    {
      icon: 'tag',
      title: 'Hashtag Generator',
      desc: 'Smart hashtag research that balances high-volume reach with niche targeting for maximum exposure.',
      color: 'bg-[#a15100]/10 text-[#a15100] group-hover:bg-[#a15100] group-hover:text-white',
    },
    {
      icon: 'record_voice_over',
      title: 'Brand Voice Matching',
      desc: 'Upload your past content and our AI will learn and replicate your unique tone and vocabulary perfectly.',
      color: 'bg-[#ba1a1a]/10 text-[#ba1a1a] group-hover:bg-[#ba1a1a] group-hover:text-white',
    },
    {
      icon: 'lightbulb',
      title: 'Content Ideas',
      desc: 'Never stare at a blank screen again with endless scrolls of trending topics and creative angles.',
      color: 'bg-[#7c3aed]/10 text-[#7c3aed] group-hover:bg-[#7c3aed] group-hover:text-white',
    },
    {
      icon: 'schedule',
      title: 'Best Posting Times',
      desc: 'Data-driven insights telling you exactly when your specific audience is most active and ready to engage.',
      color: 'bg-[#9c48ea]/10 text-[#9c48ea] group-hover:bg-[#9c48ea] group-hover:text-white',
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#f7f9fb]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#191c1e] mb-4">
            Everything You Need to Scale Your Presence
          </h2>
          <p className="text-[#4a4455] text-base">
            Powerful AI features designed to turn hours of content planning into minutes of creative freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-[20px] hover:-translate-y-2 transition-all duration-300 group shadow-sm hover:shadow-md cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${feature.color}`}
              >
                <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#191c1e] mb-2">{feature.title}</h3>
              <p className="text-[#4a4455] text-[15px] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
