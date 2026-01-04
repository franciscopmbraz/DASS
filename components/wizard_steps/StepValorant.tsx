import React from 'react';

interface StepValorantProps {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepValorant: React.FC<StepValorantProps> = ({ data, onChange }) => {
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
                <h3 className="text-2xl font-bold text-white mb-2">Valorant Details</h3>
                <p className="text-slate-400 text-sm">Let's dial in your tactical shooter profile.</p>
            </div>


            <section className="space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Competitive Profile
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Current Rank?</label>
                    <input type="text" value={data.val_rank || ''} onChange={(e) => onChange('val_rank', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="e.g. Ascendant 2" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Main Role?</label>
                    <div className="flex flex-wrap gap-3">
                        {['Duelist', 'Controller', 'Sentinel', 'Initiator'].map(role => (
                            <button key={role} onClick={() => onChange('val_role', role)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.val_role === role
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
                        {['SoloQ', 'Stack'].map(opt => (
                            <button key={opt} onClick={() => onChange('val_stack', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.val_stack === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Main Agents?</label>
                    <input type="text" value={data.val_agents || ''} onChange={(e) => onChange('val_agents', e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                        placeholder="Ex: Jett, Omen" />
                </div>
            </section>

            <section className="space-y-5 pt-6 border-t border-white/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
                    <span className="w-8 h-[1px] bg-brand-500/50 mr-3"></span>
                    Mechanics & Tactics
                </h4>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Aim Quality:</label>
                    <div className="relative">
                        <select value={data.val_aim || ''} onChange={(e) => onChange('val_aim', e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 appearance-none transition-colors">
                            <option value="">Select...</option>
                            {['Weak', 'Average', 'Good', 'Inconsistent'].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Do you use an aim routine?</span>
                    <input type="checkbox" checked={data.val_routine || false} onChange={(e) => onChange('val_routine', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Fixed sensitivity?</span>
                    <input type="checkbox" checked={data.val_sens_fixed || false} onChange={(e) => onChange('val_sens_fixed', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Preferred Entry Style:</label>
                    <div className="flex gap-3">
                        {['Entry', 'Support'].map(opt => (
                            <button key={opt} onClick={() => onChange('val_entry', opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${data.val_entry === opt
                                    ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300 font-medium">Active communication?</span>
                    <input type="checkbox" checked={data.val_comms || false} onChange={(e) => onChange('val_comms', e.target.checked)} className="w-5 h-5 accent-brand-500 rounded focus:ring-brand-500" />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Needs most focus:</label>
                    <div className="relative">
                        <select value={data.val_focus || ''} onChange={(e) => onChange('val_focus', e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 appearance-none transition-colors">
                            <option value="">Select...</option>
                            {['Aim', 'Utility', 'Positioning', 'Clutch', 'Reading Enemy'].map(opt => (
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

export default StepValorant;
