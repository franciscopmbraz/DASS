import React from 'react';

interface StepCS2Props {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepCS2: React.FC<StepCS2Props> = ({ data, onChange }) => {
    return (
        <div className="space-y-6 h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-white mb-4">Counter Strike 2 Details</h3>

            <section className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400">Competitive Profile</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Rank?</label>
                    <input type="text" value={data.cs2_rank || ''} onChange={(e) => onChange('cs2_rank', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Role?</label>
                    <div className="flex flex-wrap gap-2">
                        {['Rifler', 'AWPer', 'Support', 'IGL'].map(role => (
                            <button key={role} onClick={() => onChange('cs2_role', role)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.cs2_role === role ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Playgroup:</label>
                    <div className="flex gap-2">
                        {['Solo', 'Team'].map(opt => (
                            <button key={opt} onClick={() => onChange('cs2_team', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.cs2_team === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Maps?</label>
                    <input type="text" value={data.cs2_maps || ''} onChange={(e) => onChange('cs2_maps', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                        placeholder="Ex: Mirage, Ancient" />
                </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-purple-400">Mechanics & Tactics</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Aim Quality:</label>
                    <input type="text" value={data.cs2_aim || ''} onChange={(e) => onChange('cs2_aim', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Daily aim train?</span>
                    <input type="checkbox" checked={data.cs2_daily_aim || false} onChange={(e) => onChange('cs2_daily_aim', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Stable sensitivity?</span>
                    <input type="checkbox" checked={data.cs2_stable_sens || false} onChange={(e) => onChange('cs2_stable_sens', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Consistent utility usage?</span>
                    <input type="checkbox" checked={data.cs2_util || false} onChange={(e) => onChange('cs2_util', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Know smokes/execs?</span>
                    <input type="checkbox" checked={data.cs2_knows_execs || false} onChange={(e) => onChange('cs2_knows_execs', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Needs most focus:</label>
                    <select value={data.cs2_focus || ''} onChange={(e) => onChange('cs2_focus', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                        <option value="">Select...</option>
                        {['Aim', 'Nades', 'Positioning', 'Timing', 'Communication'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </section>
        </div>
    );
};

export default StepCS2;
