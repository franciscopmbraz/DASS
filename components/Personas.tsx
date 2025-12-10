import React from 'react';
import { TrendingUp, ShieldCheck, Users } from 'lucide-react';

const Personas: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Who is GameCoach AI For?
        </h2>
        <p className="mt-4 text-xl text-slate-400">
          Tailored solutions for every level of the esports ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* The Grinder */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-brand-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={100} />
          </div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-400">
            <TrendingUp size={28} />
          </div>
          <h3 className="text-xl font-bold text-white">The Grinder</h3>
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-4">Competitive Player</p>
          <div className="space-y-4">
            <div className="bg-slate-950/50 p-3 rounded-lg border-l-2 border-red-500">
              <p className="text-sm text-slate-400">"I'm hardstuck Gold. My stats are good, but I keep losing and don't know why."</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-lg border-l-2 border-brand-500">
              <p className="text-sm text-slate-300"><span className="text-brand-400 font-bold">Goal:</span> Identify specific mistakes in positioning without watching 40 mins of footage.</p>
            </div>
          </div>
        </div>

        {/* The Parent */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-brand-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={100} />
          </div>
          <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-400">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold text-white">The Esports Parent</h3>
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-4">Supportive Guardian</p>
          <div className="space-y-4">
            <div className="bg-slate-950/50 p-3 rounded-lg border-l-2 border-red-500">
              <p className="text-sm text-slate-400">"I want to help my kid improve, but $50/hr for a stranger on Discord feels unsafe."</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-lg border-l-2 border-brand-500">
              <p className="text-sm text-slate-300"><span className="text-brand-400 font-bold">Goal:</span> A safe, affordable "Digital Tutor" that builds skills and confidence.</p>
            </div>
          </div>
        </div>

        {/* The Coach */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-brand-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={100} />
          </div>
          <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 text-purple-400">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold text-white">The Collegiate Coach</h3>
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-4">Varsity Director</p>
          <div className="space-y-4">
            <div className="bg-slate-950/50 p-3 rounded-lg border-l-2 border-red-500">
              <p className="text-sm text-slate-400">"I have 15 players and not enough time to VOD review everyone individually."</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-lg border-l-2 border-brand-500">
              <p className="text-sm text-slate-300"><span className="text-brand-400 font-bold">Goal:</span> Bulk upload matches to assign specific homework while focusing on team strategy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personas;