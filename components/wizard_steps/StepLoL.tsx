import React from 'react';

interface StepLoLProps {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepLoL: React.FC<StepLoLProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-6 h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-white mb-4">League of Legends Details</h3>

            {/* Competitive Profile */}
            <section className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400">Competitive Profile</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Rank?</label>
                    <input type="text" value={data.lol_rank || ''} onChange={(e) => onChange('lol_rank', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Role?</label>
                    <div className="flex flex-wrap gap-2">
                        {['Top', 'Jungle', 'Mid', 'ADC', 'Support'].map(role => (
                            <button key={role} onClick={() => onChange('lol_role_main', role)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.lol_role_main === role ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Secondary Role?</label>
                    <input type="text" value={data.lol_role_secondary || ''} onChange={(e) => onChange('lol_role_secondary', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Champion Pool Size?</label>
                    <input type="text" value={data.lol_champ_pool || ''} onChange={(e) => onChange('lol_champ_pool', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                        placeholder="Ex: 3 mains, 2 pockets" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Preferred Phase?</label>
                    <div className="flex gap-2">
                        {['Early Game', 'Mid Game', 'Late Game'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_phase', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.lol_phase === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Playstyle */}
            <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-purple-400">Playstyle</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Playstyle:</label>
                    <div className="flex gap-2">
                        {['Aggressive', 'Safe', 'Adaptive'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_style', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.lol_style === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Do you shotcall?</label>
                    <div className="flex gap-4">
                        {['Yes', 'No'].map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={data.lol_shotcall === opt} onChange={() => onChange('lol_shotcall', opt)} className="accent-purple-500" />
                                <span className="text-gray-300">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Focus:</label>
                    <div className="flex gap-2">
                        {['Lane', 'Map'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_focus', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.lol_focus === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Needs */}
            <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-purple-400">Training Needs</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Biggest Challenge?</label>
                    <select value={data.lol_challenge || ''} onChange={(e) => onChange('lol_challenge', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                        <option value="">Select...</option>
                        {['CS', 'Teamfights', 'Vision', 'Roaming', 'Decision Making'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Training Focus:</label>
                    <div className="flex flex-col gap-2">
                        {['Specific Champions', 'Fundamentals', 'Fast Climb'].map(opt => (
                            <button key={opt} onClick={() => onChange('lol_training_type', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm text-left transition-all ${data.lol_training_type === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
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
