import React from 'react';
import { Achievement, Tier } from '../data/achievements';
import { Lock, Brain, Trophy, Zap, Target, Shield, Clock, Calendar, BarChart2, Video, Crosshair, Map, MousePointer, Activity, Monitor, Award } from 'lucide-react';

interface AchievementCardProps {
    achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
    const { title, description, maxProgress, currentProgress, isLocked, iconType, tiers } = achievement;

    // Determine current tier based on progress if tiers exist
    let currentTier: Tier | undefined;
    let nextTier: Tier | undefined;
    let tierColor = 'text-slate-400 bg-slate-800 border-slate-700';
    let progressColor = 'bg-brand-500';

    if (tiers) {
        // Find the highest unlocked tier
        // Assuming tiers are sorted Bronze -> Platinum
        for (let i = 0; i < tiers.length; i++) {
            if (currentProgress >= tiers[i].requirement) {
                currentTier = tiers[i];
            } else {
                nextTier = tiers[i];
                break;
            }
        }

        if (currentTier) {
            switch (currentTier.name) {
                case 'Bronze':
                    tierColor = 'text-amber-700 bg-amber-900/20 border-amber-700/50';
                    progressColor = 'bg-amber-600';
                    break;
                case 'Silver':
                    tierColor = 'text-slate-300 bg-slate-400/10 border-slate-400/50';
                    progressColor = 'bg-slate-400';
                    break;
                case 'Gold':
                    tierColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50';
                    progressColor = 'bg-yellow-500';
                    break;
                case 'Platinum':
                    tierColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]';
                    progressColor = 'bg-cyan-400';
                    break;
            }
        }
    }

    const percentage = Math.min(100, Math.round((currentProgress / (nextTier ? nextTier.requirement : maxProgress)) * 100));
    const isCompleted = currentProgress >= maxProgress;

    const getIcon = () => {
        const size = 24;
        switch (iconType) {
            case 'brain-upload': return <Brain size={size} />;
            case 'trend-up': return <Activity size={size} />;
            case 'lightning': return <Zap size={size} />;
            case 'puzzle': return <Monitor size={size} />;
            case 'crosshair-gear': return <Crosshair size={size} />;
            case 'scale': return <BarChart2 size={size} />;
            case 'fire': return <Zap size={size} />; // Clutch
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
            case 'minion-sword': return <MousePointer size={size} />; // Approx
            default: return <Trophy size={size} />;
        }
    };

    return (
        <div className={`relative group rounded-2xl p-6 border transition-all duration-300 overflow-hidden
            ${isLocked
                ? 'bg-slate-900/20 border-white/5 opacity-60' // Locked style
                : `bg-slate-900/40 border-white/10 hover:border-brand-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]` // Unlocked style
            }
        `}>
            {/* Background Glow for Platinum */}
            {currentTier?.name === 'Platinum' && (
                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none" />
            )}

            <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border
                    ${isLocked ? 'bg-slate-800 text-slate-600 border-white/5' : tierColor}
                `}>
                    {isLocked ? <Lock size={20} /> : getIcon()}
                </div>
                <div>
                    <h3 className={`font-bold text-lg leading-tight mb-1 ${currentTier?.name === 'Platinum' ? 'text-cyan-50' : 'text-white'}`}>
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {currentTier ? currentTier.description : description}
                    </p>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className={isCompleted ? 'text-brand-400' : 'text-slate-500'}>
                        {isCompleted ? 'Completed' : currentTier ? currentTier.name : 'Progress'}
                    </span>
                    <span className="text-slate-300">
                        {currentProgress} / {nextTier ? nextTier.requirement : maxProgress}
                    </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${isLocked ? 'bg-slate-700' : progressColor}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {nextTier && (
                    <div className="text-xs text-slate-500 mt-2 text-right">
                        Next: {nextTier.name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AchievementCard;
