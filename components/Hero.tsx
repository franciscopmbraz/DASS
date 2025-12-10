import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
         {/* Placeholder for abstract game map background */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/valorant/1920/1080')] bg-cover bg-center opacity-20 blur-sm mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-semibold tracking-wide uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-400 mr-2 animate-ping"></span>
          Now in Private Beta
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          The AI Coach that <br className="hidden md:block" />
          <span className="gradient-text">Watches, Listens, and Teaches.</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed">
          Stop guessing why you lost. GameCoach AI bridges the insight gap with conversational, frame-by-frame analysis for the price of lunch.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="group relative px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center">
            Analyze My Match
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white text-lg font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center">
            <Play className="mr-2 h-5 w-5 fill-current" />
            Watch Demo
          </button>
        </div>

        {/* Social Proof / Stats */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-center items-center space-x-8 md:space-x-16 text-slate-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">400k+</div>
            <div className="text-sm">Frames Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Gemini 1.5</div>
            <div className="text-sm">Powered Engine</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm">Anti-Cheat Safe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;