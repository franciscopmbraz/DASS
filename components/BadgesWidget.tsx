import React from 'react';
import { achievements } from '../data/achievements';
import { Medal, Lock, Brain, Trophy, Zap, Target, Shield, Clock, Calendar, BarChart2, Video, Crosshair, Map, MousePointer, Activity, Monitor, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const BadgesWidget: React.FC = () => {
    // Filter for completed or unlocked achievements
    // For this demo, we'll consider an achievement "earned" if progress > 0 for tiers, or progress >= max for single-tier
    const earnedAchievements = achievements.filter(a => {
        if (a.tiers) {
            // For tiered achievements, check if at least Bronze is unlocked
            return a.currentProgress >= a.tiers[0].requirement;
        }
        return a.currentProgress >= a.maxProgress;
    });

    const getIcon = (iconType: string) => {
        const size = 20;
        switch (iconType) {
            case 'brain-upload': return <Brain size={size} />;
            case 'trend-up': return <Activity size={size} />;
            case 'lightning': return <Zap size={size} />;
            case 'puzzle': return <Monitor size={size} />;
            case 'crosshair-gear': return <Crosshair size={size} />;
            case 'scale': return <BarChart2 size={size} />;
            case 'fire': return <Zap size={size} />;
            case 'shield-check': return <Shield size={size} />;
            case 'sparkles': return <Award size={size} />;
            case 'calendar': return <Calendar size={size} />;
            case 'sword': return <Trophy size={size} />;
            case 'dumbbell': return <Activity size={size} />;
            case 'graph-grow': return <BarChart2 size={size} />;
            case 'video-stack': return <Video size={size} />;
            case 'drill': return <Target size={size} />;
            case 'clock-rewind': return <Clock size={size} />;
            case 'target': return <Target size={size} />;
            case 'brain-map': return <Map size={size} />;
            case 'minion-sword': return <MousePointer size={size} />;
            case 'val-orb': return <Zap size={size} />;
            case 'headshot-spark': return <Crosshair size={size} />;
            default: return <Medal size={size} />;
        }
    };

    const getTierColor = (achievement: any) => {
        if (!achievement.tiers) return 'bg-brand-500 text-white shadow-[0_0_10px_rgba(20,184,166,0.4)]';

        // Detailed tier logic re-use or simplified for widget
        const p = achievement.currentProgress;
        const tiers = achievement.tiers;
        if (p >= tiers[3].requirement) return 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse'; // Platinum
        if (p >= tiers[2].requirement) return 'bg-yellow-500 text-white shadow-[0_0_10px_rgba(234,179,8,0.4)]'; // Gold
        if (p >= tiers[1].requirement) return 'bg-slate-400 text-slate-900 shadow-[0_0_10px_rgba(148,163,184,0.4)]'; // Silver
        return 'bg-amber-700 text-amber-100 shadow-[0_0_10px_rgba(180,83,9,0.4)]'; // Bronze
    }

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-brand-400">
                    <Medal size={20} /> Badges
                </h2>
                <Link to="/achievements" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider">
                    View All
                </Link>
            </div>

            {earnedAchievements.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                    {earnedAchievements.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className="group relative flex flex-col items-center"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${getTierColor(achievement)} animate-in zoom-in duration-500 fill-mode-backwards`}>
                                {getIcon(achievement.iconType)}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 bg-slate-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-white/10">
                                {achievement.title}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-slate-500">
                    <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock size={20} />
                    </div>
                    <p className="text-sm">No badges unlocked yet.</p>
                    <Link to="/training" className="text-xs text-brand-400 font-bold hover:underline mt-2 inline-block">Start Training</Link>
                </div>
            )}
        </div>
    );
};

export default BadgesWidget;
