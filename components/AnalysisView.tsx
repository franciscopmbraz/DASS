import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle, AlertTriangle, Play, Zap, Target, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface AnalysisViewProps {
    analysis: AnalysisResult;
    onTimestampClick?: (timestamp: string) => void;
}

const RatingBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-300">{label}</span>
            <span className={`text-sm font-bold text-${color}-400`}>{value}/100</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full bg-${color}-500 transition-all duration-1000 ease-out`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, onTimestampClick }) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Summary Section */}
            <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center relative z-10">
                    <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                    Executive Gameplay Summary
                </h3>
                <p className="text-slate-300 leading-relaxed relative z-10">
                    {analysis.summary}
                </p>
            </div>

            {/* Mechanics & Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mechanics Ratings */}
                <div className="glass-card p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <h3 className="text-lg font-bold text-blue-400 mb-6 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Mechanics Breakdown
                    </h3>

                    {/* FPS Mechanics */}
                    {analysis.mechanics.aim_rating !== undefined && (
                        <RatingBar label="Aim Accuracy" value={analysis.mechanics.aim_rating} color="blue" />
                    )}
                    {analysis.mechanics.crosshair_placement && (
                        <div className="mb-4">
                            <span className="text-sm font-medium text-slate-300 block mb-1">Crosshair Placement</span>
                            <span className="font-bold text-white bg-blue-500/20 px-2 py-1 rounded text-sm">{analysis.mechanics.crosshair_placement}</span>
                        </div>
                    )}

                    {/* MOBA Mechanics */}
                    {analysis.mechanics.cs_rating !== undefined && (
                        <RatingBar label="CS & Farm Efficiency" value={analysis.mechanics.cs_rating} color="yellow" />
                    )}
                    {analysis.mechanics.trading_rating !== undefined && (
                        <RatingBar label="Trading & Laning" value={analysis.mechanics.trading_rating} color="orange" />
                    )}

                    {/* Shared Mechanics */}
                    {analysis.mechanics.movement_rating !== undefined && (
                        <RatingBar label="Movement" value={analysis.mechanics.movement_rating} color="indigo" />
                    )}
                    {analysis.mechanics.positioning_rating !== undefined && (
                        <RatingBar label="Positioning" value={analysis.mechanics.positioning_rating} color="purple" />
                    )}


                    <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                        {/* Dynamic Extra Checks */}
                        {analysis.mechanics.reaction_time && (
                            <div className="text-center p-3 bg-white/5 rounded-lg">
                                <div className="text-xs text-slate-400 mb-1">Est. Reaction Time</div>
                                <div className="font-bold text-white">{analysis.mechanics.reaction_time}</div>
                            </div>
                        )}
                        {analysis.mechanics.skill_shots && (
                            <div className="text-center p-3 bg-white/5 rounded-lg col-span-2">
                                <div className="text-xs text-slate-400 mb-1">Skill Shots</div>
                                <div className="font-bold text-white text-sm">{analysis.mechanics.skill_shots}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Economy & Strategy (FPS) OR Macro (MOBA) */}
                {analysis.economy ? (
                    <div className="glass-card p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2" />
                            Economy & Strategy
                        </h3>
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xl font-bold text-white mr-4">
                                {analysis.economy.rating}
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">Economy Efficiency Score</div>
                                <div className="text-emerald-300 font-medium">{analysis.economy.rating >= 70 ? 'High Efficiency' : 'Needs Improvement'}</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300 italic mb-4">
                            "{analysis.economy.analysis}"
                        </p>
                    </div>
                ) : analysis.macro ? (
                    <div className="glass-card p-6 rounded-xl border border-violet-500/20 bg-violet-500/5">
                        <h3 className="text-lg font-bold text-violet-400 mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Macro Strategy
                        </h3>
                        {analysis.macro.vision_score_rating !== undefined && (
                            <RatingBar label="Vision Control" value={analysis.macro.vision_score_rating} color="violet" />
                        )}
                        <div className="space-y-3 mt-4">
                            <div className="bg-violet-500/10 p-3 rounded-lg">
                                <div className="text-xs text-violet-300 mb-1 font-bold">Map Awareness</div>
                                <p className="text-sm text-slate-200">{analysis.macro.map_awareness}</p>
                            </div>
                            <div className="bg-violet-500/10 p-3 rounded-lg">
                                <div className="text-xs text-violet-300 mb-1 font-bold">Objective Control</div>
                                <p className="text-sm text-slate-200">{analysis.macro.objective_control}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>


            {/* Round Analysis (FPS) OR Phase Analysis (MOBA) */}
            {analysis.rounds_analyzed && (
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Activity className="w-5 h-5 text-brand-400 mr-2" />
                        Round Analysis
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="text-xs uppercase bg-white/5 text-slate-400">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Round</th>
                                    <th className="px-4 py-3">Outcome</th>
                                    <th className="px-4 py-3">K/D/A</th>
                                    <th className="px-4 py-3 rounded-r-lg">Highlight / Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.rounds_analyzed.map((round) => (
                                    <tr key={round.round_number} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-medium text-white">#{round.round_number}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${round.outcome === 'Win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                {round.outcome}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono">{round.kda}</td>
                                        <td className="px-4 py-3 text-slate-400">{round.highlight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {analysis.phases_analyzed && (
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Activity className="w-5 h-5 text-brand-400 mr-2" />
                        Phase Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysis.phases_analyzed.map((phase, idx) => (
                            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-white">{phase.phase}</h4>
                                    <span className={`text-xs px-2 py-1 rounded ${phase.performance === 'Good' || phase.performance === 'Excellent' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {phase.performance}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300">{phase.notes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Key Moments */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Play className="w-5 h-5 text-brand-400 mr-2" />
                    Key Moments (Click to jump)
                </h3>
                <div className="space-y-3">
                    {analysis.key_moments.map((moment, index) => (
                        <div
                            key={index}
                            onClick={() => onTimestampClick?.(moment.timestamp)}
                            className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-brand-500/20 border border-transparent hover:border-brand-500/50 transition-all cursor-pointer group"
                        >
                            <div className="bg-brand-500/20 text-brand-300 px-3 py-1 rounded text-xs font-mono mr-4 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                {moment.timestamp}
                            </div>
                            <p className="text-slate-300 group-hover:text-white transition-colors text-sm">
                                {moment.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Improvement Plan */}
            <div className="glass-card p-6 rounded-xl border border-brand-500/20 bg-brand-500/5 mb-8">
                <h3 className="text-xl font-bold text-brand-300 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Actionable Improvement Plan
                </h3>
                <div className="text-slate-200 whitespace-pre-line leading-relaxed">
                    {analysis.improvement_plan}
                </div>
            </div>
        </div>
    );
};

export default AnalysisView;
