import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold text-white mb-6">
        Ready to Climb the Ranks?
      </h2>
      <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
        Join the waitlist today. The first 100 users get lifetime access to the "Pro" tier features.
      </p>
      
      <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-6">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg whitespace-nowrap">
          Reserve My Spot
        </button>
      </form>
      
      <p className="text-sm text-slate-500">
        Compatible with Valorant. CS2 & Overwatch coming soon. <br/>
        <span className="text-brand-500/80">100% Anti-Cheat Compliant.</span>
      </p>
    </div>
  );
};

export default CtaSection;