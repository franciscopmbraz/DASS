import React from 'react';

interface StepReviewProps {
    data: any;
    onChange: (field: string, value: any) => void;
    game: string;
}

const StepReview: React.FC<StepReviewProps> = ({ data, onChange, game }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Finalize your Plan</h3>

            <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl mb-6">
                <h4 className="font-semibold text-purple-400 mb-2">Summary</h4>
                <p className="text-gray-300 text-sm">
                    Game: <span className="text-white">{game}</span><br />
                    Goal: <span className="text-white">{data.goal_main}</span><br />
                    Availability: <span className="text-white">{data.availability_days}, {data.availability_hours}</span>
                </p>
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2">Plan Title</label>
                <input
                    type="text"
                    value={data.title || ''}
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder={`Ex: ${game} Improvement Plan`}
                    required
                    className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea
                    value={data.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    placeholder="Briefly describe what this plan is for..."
                    rows={4}
                    className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
                Our AI will use your answers to generate a personalized training schedule.
            </p>
        </div>
    );
};

export default StepReview;
