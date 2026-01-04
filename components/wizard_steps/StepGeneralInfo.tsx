import React from 'react';

interface StepGeneralInfoProps {
    data: any;
    onChange: (field: string, value: any) => void;
}

const StepGeneralInfo: React.FC<StepGeneralInfoProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-6 h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-white mb-4">General Data</h3>

            {/* Availability */}
            <section className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400">Availability</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">How many days/week can you play?</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['1–2', '3–4', '5–6', 'Every day'].map(opt => (
                            <button key={opt} onClick={() => onChange('availability_days', opt)}
                                className={`p-3 rounded-lg border text-sm transition-all ${data.availability_days === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Average hours per session?</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['<1h', '1–2h', '2–4h', '+4h'].map(opt => (
                            <button key={opt} onClick={() => onChange('availability_hours', opt)}
                                className={`p-3 rounded-lg border text-sm transition-all ${data.availability_hours === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Preferred time of day?</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Morning', 'Afternoon', 'Night', 'Variable'].map(opt => (
                            <button key={opt} onClick={() => onChange('availability_period', opt)}
                                className={`p-3 rounded-lg border text-sm transition-all ${data.availability_period === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Goals */}
            <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-purple-400">Goals</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Goal?</label>
                    <select value={data.goal_main || ''} onChange={(e) => onChange('goal_main', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                        <option value="">Select...</option>
                        <option value="Rank up">Rank up</option>
                        <option value="Improve mechanics">Improve mechanics</option>
                        <option value="Compete">Compete (scrims, tournaments)</option>
                        <option value="Consistency">Play consistently</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Specific rank/goal?</label>
                    <input type="text" value={data.goal_specific || ''} onChange={(e) => onChange('goal_specific', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                        placeholder="Ex: Diamond 1, Learning Riven..." />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Solo or Team?</label>
                    <div className="flex gap-4">
                        {['Solo', 'Team'].map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={data.goal_type === opt} onChange={() => onChange('goal_type', opt)} className="accent-purple-500" />
                                <span className="text-gray-300">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* Profile */}
            <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-purple-400">Player Profile</h4>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Playstyle:</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Mechanical', 'Strategic', 'Balanced'].map(opt => (
                            <button key={opt} onClick={() => onChange('profile_style', opt)}
                                className={`p-2 rounded-lg border text-sm transition-all ${data.profile_style === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Preferred training:</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Short & Intense', 'Long & Consistent'].map(opt => (
                            <button key={opt} onClick={() => onChange('profile_training', opt)}
                                className={`p-2 rounded-lg border text-sm transition-all ${data.profile_training === opt ? 'bg-purple-600 border-purple-600 text-white' : 'bg-[#09090b] border-white/10 text-gray-400 hover:border-white/30'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2">Any limitations? (Time, Stress, Hardware)</label>
                    <input type="text" value={data.profile_limitations || ''} onChange={(e) => onChange('profile_limitations', e.target.value)}
                        className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                        placeholder="Ex: FPS drops, only play weekends..." />
                </div>
            </section>
        </div>
    );
};

export default StepGeneralInfo;
