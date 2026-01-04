import React from 'react';

interface StepCS2Props {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepCS2: React.FC<StepCS2Props> = ({ data, onChange }) => {
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
                <h3 className="text-2xl font-bold text-white mb-2">Counter Strike 2</h3>
                <p className="text-slate-400 text-sm">Analyze your skills on the server.</p>
            </div>

            <section className="space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Competitive Profile
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Current Rank?</label>
                    <input type="text" value={data.cs2_rank || ''} onChange={(e) => onChange('cs2_rank', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="e.g. 15,000 Premier" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Main Role?</label>
                    <div className="flex flex-wrap gap-3">
                        {['Rifler', 'AWPer', 'Support', 'IGL'].map(role => (
                            <button key={role} onClick={() => onChange('cs2_role', role)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.cs2_role === role
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Playgroup:</label>
                    <div className="flex gap-3">
                        {['Solo', 'Team'].map(opt => (
                            <button key={opt} onClick={() => onChange('cs2_team', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.cs2_team === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Main Maps?</label>
                    <input type="text" value={data.cs2_maps || ''} onChange={(e) => onChange('cs2_maps', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Ex: Mirage, Ancient" />
                </div>
            </section>

            <section className="space-y-5 pt-6 border-t border-white/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Mechanics & Tactics
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Aim Quality:</label>
                    <input type="text" value={data.cs2_aim || ''} onChange={(e) => onChange('cs2_aim', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Describe your aim (e.g. crisp, inconsistent...)" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Daily aim train?</span>
                    <input type="checkbox" checked={data.cs2_daily_aim || false} onChange={(e) => onChange('cs2_daily_aim', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Stable sensitivity?</span>
                    <input type="checkbox" checked={data.cs2_stable_sens || false} onChange={(e) => onChange('cs2_stable_sens', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Consistent utility usage?</span>
                    <input type="checkbox" checked={data.cs2_util || false} onChange={(e) => onChange('cs2_util', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Know smokes/execs?</span>
                    <input type="checkbox" checked={data.cs2_knows_execs || false} onChange={(e) => onChange('cs2_knows_execs', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Needs most focus:</label>
                    <div className="relative">
                        <select value={data.cs2_focus || ''} onChange={(e) => onChange('cs2_focus', e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 appearance-none transition-colors">
                            <option value="">Select...</option>
                            {['Aim', 'Nades', 'Positioning', 'Timing', 'Communication'].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StepCS2;
