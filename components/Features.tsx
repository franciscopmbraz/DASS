import React from 'react';
import { Mic, Eye, Zap, BrainCircuit } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="glass-card p-8 rounded-2xl hover:border-brand-500/50 transition-colors duration-300 group">
    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
      <div className="text-brand-400 group-hover:text-brand-300 transition-colors">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Smart-Capture Companion",
      description: "Auto-detects key moments locally. No need to upload 40GB video files—we only analyze what matters."
    },
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "Causal Analysis Engine",
      description: "Go beyond stats. The AI understands context to tell you WHY you died, not just that your HP hit zero."
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Conversational Coaching",
      description: "Talk to your coach. Ask \"What should I have done?\" and get specific, spoken advice instantly."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Telestration Overlays",
      description: "Visual learners rejoice. We draw the optimal path, crosshair placement, and utility angles directly on your VOD."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-base text-brand-400 font-semibold tracking-wide uppercase">Core Features</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          More Than Just A VOD Review
        </p>
        <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
          We combined computer vision with the world's most advanced LLMs to create a coach that actually understands the game.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;