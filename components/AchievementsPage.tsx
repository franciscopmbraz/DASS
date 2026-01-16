import React, { useState } from 'react';
import Navbar from './Navbar';
import AchievementCard from './AchievementCard';
import { achievements } from '../data/achievements';
import { Search, Trophy, Medal, Star, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AchievementsPage: React.FC = () => {
    const [filter, setFilter] = useState('All Achievements');
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [userXP, setUserXP] = useState(0);
    const [userLevel, setUserLevel] = useState(1);
    const [loading, setLoading] = useState(true);

    // Categories mapping for tabs
    const categories = ['All Achievements', 'Training Master', 'AI Analyst', 'Social Climber', 'CS2', 'LoL', 'Valorant'];

    const filteredAchievements = achievements.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
        let matchesFilter = true;

        if (filter !== 'All Achievements') {
            if (filter === 'Training Master') matchesFilter = a.category === 'Learning & Improvement';
            else if (filter === 'AI Analyst') matchesFilter = a.category === 'Gameplay & Performance';
            else if (filter === 'Social Climber') matchesFilter = a.category === 'Fun & Engagement';
            else matchesFilter = a.game === filter || a.category === filter;
        }

        return matchesSearch && matchesFilter;
    });

    const completedCount = achievements.filter(a => a.currentProgress >= a.maxProgress).length;
    const completionPercentage = Math.round((completedCount / achievements.length) * 100);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        fetchUserProfile();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchUserProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('users')
                    .select('xp, level')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setUserXP(data.xp || 0);
                    setUserLevel(data.level || 1);
                }
            }
        } catch (error) {
            console.error('Error fetching user stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-brand-500 selection:text-white relative overflow-hidden">
            {/* Background elements (matching Landing Page) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/valorant/1920/1080')] bg-cover bg-center opacity-5 blur-sm mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950"></div>
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px]"></div>
            </div>

            <Navbar isScrolled={isScrolled} />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Header Section */}
                <div className="lg:flex justify-between items-end mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                            Achievements & <span className="text-brand-500">Badges</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            Track your progress, unlock legendary badges, and prove your mastery across the platform.
                        </p>
                    </div>

                    <div className="mt-8 lg:mt-0 flex gap-4">
                        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center text-brand-400">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Global Rank</div>
                                <div className="text-xl font-bold text-white">TOP 2%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total XP</div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <h3 className="text-4xl font-extrabold text-white">{loading ? '...' : userXP.toLocaleString()}</h3>
                            <span className="text-brand-500 font-bold text-sm">XP</span>
                        </div>
                        <div className="text-sm text-emerald-400 flex items-center gap-1 font-bold">
                            <Star size={14} fill="currentColor" /> +150 this week
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Completion</div>
                        <div className="flex items-baseline gap-2 mb-4">
                            <h3 className="text-4xl font-extrabold text-white">{completionPercentage}%</h3>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div className="bg-brand-500 h-full rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Level</div>
                        <h3 className="text-4xl font-extrabold text-white mb-1">Level {loading ? '...' : userLevel}</h3>
                        <div className="text-brand-400 font-bold italic">Expert Explorer</div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
                    <div className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                                     ${filter === cat
                                        ? 'bg-brand-500 text-slate-900 shadow-lg shadow-brand-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }
                                 `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative group w-full lg:w-80">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search achievements..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900/50 text-white pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 placeholder-slate-600 transition-all"
                        />
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map(achievement => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}

                    {filteredAchievements.length === 0 && (
                        <div className="col-span-full py-20 text-center text-slate-500">
                            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">No achievements found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AchievementsPage;
