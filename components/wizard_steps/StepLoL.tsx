import React from 'react';

interface StepLoLProps {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepLoL: React.FC<StepLoLProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-8 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {/* Injecting scrollbar styles locally */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(20, 184, 166, 0.5);
                }
            `}</style>

            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">League of Legends</h3>
                <p className="text-slate-400 text-sm">Tell us about your Summoner's Rift experience.</p>
            </div>

            {/* Competitive Profile */}
            <section className="space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Competitive Profile
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Current Rank?</label>
                    <input type="text" value={data.lol_rank || ''} onChange={(e) => onChange('lol_rank', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="e.g. Emerald IV" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Main Role?</label>
                    <div className="flex flex-wrap gap-3">
                        {['Top', 'Jungle', 'Mid', 'ADC', 'Support'].map(role => (
                            <button key={role} onClick={() => onChange('lol_role_main', role)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.lol_role_main === role
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Secondary Role?</label>
                    <input type="text" value={data.lol_role_secondary || ''} onChange={(e) => onChange('lol_role_secondary', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Optional" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Champion Pool Size?</label>
                    <input type="text" value={data.lol_champ_pool || ''} onChange={(e) => onChange('lol_champ_pool', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Ex: 3 mains, 2 pockets" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Preferred Phase?</label>
                    <div className="flex gap-3">
                        {['Early Game', 'Mid Game', 'Late Game'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_phase', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.lol_phase === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Playstyle */}
            <section className="space-y-5 pt-6 border-t border-white/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Playstyle
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Playstyle:</label>
                    <div className="flex gap-3">
                        {['Aggressive', 'Safe', 'Adaptive'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_style', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.lol_style === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Do you shotcall?</label>
                    <div className="flex gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
                        {['Yes', 'No'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${data.lol_shotcall === opt ? 'border-brand-500' : 'border-slate-500 group-hover:border-slate-400'}`}>
                                    {data.lol_shotcall === opt && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>}
                                </div>
                                <input type="radio" checked={data.lol_shotcall === opt} onChange={() => onChange('lol_shotcall', opt)} className="hidden" />
                                <span className={`${data.lol_shotcall === opt ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'} transition-colors`}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Focus:</label>
                    <div className="flex gap-3">
                        {['Lane', 'Map'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_focus', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.lol_focus === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Needs */}
            <section className="space-y-5 pt-6 border-t border-white/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Training Needs
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Biggest Challenge?</label>
                    <div className="relative">
                        <select value={data.lol_challenge || ''} onChange={(e) => onChange('lol_challenge', e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 appearance-none transition-colors">
                            <option value="">Select...</option>
                            {['CS', 'Teamfights', 'Vision', 'Roaming', 'Decision Making'].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Training Focus:</label>
                    <div className="flex flex-col gap-3">
                        {['Specific Champions', 'Fundamentals', 'Fast Climb'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_training_type', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${data.lol_training_type === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StepLoL;
