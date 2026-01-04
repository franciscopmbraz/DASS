import React from 'react';

interface StepValorantProps {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepValorant: React.FC<StepValorantProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-6 h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-white mb-4">Valorant Details</h3>

            <section className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400">Competitive Profile</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Rank?</label>
                    <input type="text" value={data.val_rank || ''} onChange={(e) => onChange('val_rank', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Role?</label>
                    <div className="flex flex-wrap gap-2">
                        {['Duelist', 'Controller', 'Sentinel', 'Initiator'].map(role => (
                            <button key={role} onClick={() => onChange('val_role', role)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.val_role === role ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Playgroup:</label>
                    <div className="flex gap-2">
                        {['SoloQ', 'Stack'].map(opt => (
                            <button key={opt} onClick={() => onChange('val_stack', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.val_stack === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Agents?</label>
                    <input type="text" value={data.val_agents || ''} onChange={(e) => onChange('val_agents', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                        placeholder="Ex: Jett, Omen" />
                </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-purple-400">Mechanics & Tactics</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Aim Quality:</label>
                    <select value={data.val_aim || ''} onChange={(e) => onChange('val_aim', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                        <option value="">Select...</option>
                        {['Weak', 'Average', 'Good', 'Inconsistent'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Do you use an aim routine?</span>
                    <input type="checkbox" checked={data.val_routine || false} onChange={(e) => onChange('val_routine', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Fixed sensitivity?</span>
                    <input type="checkbox" checked={data.val_sens_fixed || false} onChange={(e) => onChange('val_sens_fixed', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Preferred Entry Style:</label>
                    <div className="flex gap-2">
                        {['Entry', 'Support'].map(opt => (
                            <button key={opt} onClick={() => onChange('val_entry', opt)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${data.val_entry === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300">Active communication?</span>
                    <input type="checkbox" checked={data.val_comms || false} onChange={(e) => onChange('val_comms', e.target.checked)} className="w-5 h-5 accent-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Needs most focus:</label>
                    <select value={data.val_focus || ''} onChange={(e) => onChange('val_focus', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                        <option value="">Select...</option>
                        {['Aim', 'Utility', 'Positioning', 'Clutch', 'Reading Enemy'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </section>
        </div>
    );
};

export default StepValorant;
