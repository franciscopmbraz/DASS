import React from 'react';

interface StepReviewProps {
    data: any;
    onChange: (field: string, value: any) => void;
    game: string;
}

const StepReview: React.FC<StepReviewProps> = ({ data, onChange, game }) => {
    return (
        <div className="space-y-8">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Finalize your Plan</h3>
                <p className="text-slate-400 text-sm">Review the details before our AI generates your schedule.</p>
            </div>

            <div className="bg-brand-500/5 border border-brand-500/20 p-6 rounded-2xl mb-8 relative overflow-hidden group">
                {/* Subtle glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-all"></div>

                <h4 className="font-bold text-brand-400 mb-4 uppercase tracking-wider text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
                    Plan Summary
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-brand-500/10 pb-2">
                        <span className="text-slate-400">Game</span>
                        <span className="text-white font-medium">{game}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-500/10 pb-2">
                        <span className="text-slate-400">Main Goal</span>
                        <span className="text-white font-medium">{data.goal_main || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Time Commitment</span>
                        <span className="text-white font-medium">{data.availability_days || '?'}, {data.availability_hours || '?'}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Plan Title</label>
                    <input
                        type="text"
                        value={data.title || ''}
                        onChange={(e) => onChange('title', e.target.value)}
                        placeholder={`Ex: ${game} Improvement Plan`}
                        required
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Description <span className="text-slate-500 text-xs font-normal">(Optional)</span></label>
                    <textarea
                        value={data.description || ''}
                        onChange={(e) => onChange('description', e.target.value)}
                        placeholder="Briefly describe what this plan is for or add any personal reminders..."
                        rows={3}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-colors resize-none"
                    />
                </div>
            </div>

            <p className="text-xs text-slate-500 text-center mt-6 animate-pulse">
                Clicking "Create Plan" will generate a 4-week schedule using Gemini AI.
            </p>
        </div>
    );
};

export default StepReview;
