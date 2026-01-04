import React from 'react';

interface StepGeneralInfoProps {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepGeneralInfo: React.FC<StepGeneralInfoProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-8 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {/* Injecting scrollbar styles locally if global CSS isn't available/found easily */}
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
                <h3 className="text-2xl font-bold text-white mb-2">Create Your Profile</h3>
                <p className="text-slate-400 text-sm">Help our AI understand your gaming habits and goals.</p>
            </div>

            {/* Availability */}
            <section className="space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Availability
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">How many days/week can you play?</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['1–2', '3–4', '5–6', 'Every day'].map(opt => (
                            <button key={opt} onClick={() => onChange('availability_days', opt)}
                                className={`p-4 rounded-xl border text-sm font-medium transition-all ${data.availability_days === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Average hours per session?</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['<1h', '1–2h', '2–4h', '+4h'].map(opt => (
                            <button key={opt} onClick={() => onChange('availability_hours', opt)}
                                className={`p-4 rounded-xl border text-sm font-medium transition-all ${data.availability_hours === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Preferred time of day?</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Morning', 'Afternoon', 'Night', 'Variable'].map(opt => (
                            <button key={opt} onClick={() => onChange('availability_period', opt)}
                                className={`p-4 rounded-xl border text-sm font-medium transition-all ${data.availability_period === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Goals */}
            <section className="space-y-5 pt-6 border-t border-white/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Goals
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Main Goal?</label>
                    <div className="relative">
                        <select value={data.goal_main || ''} onChange={(e) => onChange('goal_main', e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 appearance-none transition-colors">
                            <option value="">Select your main objective...</option>
                            <option value="Rank up">Rank up related</option>
                            <option value="Improve mechanics">Improve mechanics</option>
                            <option value="Compete">Compete (scrims, tournaments)</option>
                            <option value="Consistency">Play consistently</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Specific rank/goal?</label>
                    <input type="text" value={data.goal_specific || ''} onChange={(e) => onChange('goal_specific', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Ex: Diamond 1, Learning Riven..." />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Solo or Team?</label>
                    <div className="flex gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
                        {['Solo', 'Team'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${data.goal_type === opt ? 'border-brand-500' : 'border-slate-500 group-hover:border-slate-400'}`}>
                                    {data.goal_type === opt && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>}
                                </div>
                                <input type="radio" checked={data.goal_type === opt} onChange={() => onChange('goal_type', opt)} className="hidden" />
                                <span className={`${data.goal_type === opt ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'} transition-colors`}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* Profile */}
            <section className="space-y-5 pt-6 border-t border-white/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Player Profile
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Playstyle:</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Mechanical', 'Strategic', 'Balanced'].map(opt => (
                            <button key={opt} onClick={() => onChange('profile_style', opt)}
                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${data.profile_style === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Preferred training:</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Short & Intense', 'Long & Consistent'].map(opt => (
                            <button key={opt} onClick={() => onChange('profile_training', opt)}
                                className={`p-4 rounded-xl border text-sm font-medium transition-all ${data.profile_training === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Any limitations? (Time, Stress, Hardware)</label>
                    <input type="text" value={data.profile_limitations || ''} onChange={(e) => onChange('profile_limitations', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Ex: FPS drops, only play weekends..." />
                </div>
            </section>
        </div>
    );
};

export default StepGeneralInfo;
