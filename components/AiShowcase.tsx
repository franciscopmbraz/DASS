import React from 'react';
import { Cpu, Cloud, Layers } from 'lucide-react';

const AiShowcase: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Side: Content */}
        <div className="mb-12 lg:mb-0">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Powered by <span className="gradient-text">Cascaded Architecture</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Traditional AI is too slow or too expensive. GameCoach AI changes the game with a revolutionary hybrid approach, making pro-coaching affordable for everyone.
          </p>

          <div className="space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-900/50 text-brand-400 border border-brand-500/20">
                  <Cpu className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-white">Local Vision (YOLOv11)</h3>
                <p className="mt-2 text-base text-slate-400">
                  Your PC handles the eyes. We detect key moments locally to strip out dead time, reducing data upload by 60% and keeping latency zero.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-900/50 text-brand-400 border border-brand-500/20">
                  <Cloud className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-white">Multimodal Cloud Brain (Gemini 1.5)</h3>
                <p className="mt-2 text-base text-slate-400">
                  The cloud handles the brain. We send key clips and OCR data to Gemini 1.5 Pro, which analyzes strategy, economy, and positioning better than a human.
                </p>
              </div>
            </div>

             <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-900/50 text-brand-400 border border-brand-500/20">
                  <Layers className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-white">Contextual Caching</h3>
                <p className="mt-2 text-base text-slate-400">
                  If 1,000 players make the same mistake, we know. Our system recalls pre-analyzed scenarios to deliver instant, proven advice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Demo */}
        <div className="relative rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden aspect-video group">
          {/* Mock Video Interface */}
          <img 
            src="https://picsum.photos/seed/gameplay1/800/450" 
            alt="Gameplay Analysis" 
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Overlay UI Mockup */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
               <div className="bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-md uppercase tracking-wide">
                 Critical Error Detected
               </div>
               <div className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md font-mono">
                 Round 08 | 1:45
               </div>
            </div>

            {/* Telestration Lines (SVG Overlay) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
               {/* Path showing where player went */}
               <path d="M 200 400 Q 300 350 400 300" stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="10 5" className="opacity-80" />
               <circle cx="400" cy="300" r="10" fill="#ef4444" className="animate-ping" />
               
               {/* Path showing where they SHOULD have gone */}
               <path d="M 200 400 Q 150 300 250 200" stroke="#22c55e" strokeWidth="4" fill="none" />
               <text x="260" y="200" fill="#22c55e" fontSize="14" fontWeight="bold">Optimal Angle</text>
            </svg>

            {/* AI Chat Bubble */}
            <div className="mt-auto max-w-sm self-end">
              <div className="bg-slate-900/90 backdrop-blur-xl border border-brand-500/30 p-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
                   <span className="text-xs font-bold text-brand-300 uppercase">GameCoach</span>
                </div>
                <p className="text-sm text-white">
                  "You dry-peeked the Operator here. Next time, ask Omen for a flash, or jiggle-peek to bait the shot like this."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiShowcase;