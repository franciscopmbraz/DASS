import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainingById, updateTrainingDetails, updateTrainingProgress, Training } from '../services/trainingService';
import { userService } from '../services/userService';
import { supabase } from '../lib/supabase';
import Navbar from './Navbar';
import {
    Calendar, CheckCircle, Clock, ChevronRight, Play, Crosshair, Zap,
    TrendingUp, Award, Map, Trophy, ChevronDown, CheckSquare, Square, X, Save, Edit2, ChevronLeft
} from 'lucide-react';

const TrainingDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [training, setTraining] = useState<Training | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
    const [showRankModal, setShowRankModal] = useState(false);
    const [rankInput, setRankInput] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const fetchTraining = async () => {
            if (!id) return;
            try {
                const data = await getTrainingById(id);
                setTraining(data);
            } catch (error) {
                console.error("Error fetching training:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTraining();
    }, [id]);

    const calculateTotalExercises = (schedule: any) => {
        if (!schedule || !schedule.weeks) return 0;
        let total = 0;
        schedule.weeks.forEach((week: any) => {
            if (week.daily_routine) {
                week.daily_routine.forEach((day: any) => {
                    if (day.exercises && Array.isArray(day.exercises)) {
                        total += day.exercises.length;
                    } else if (day.activity) {
                        const parts = day.activity.split(/(Warm-up:|Study:|Ranked Games:|Review:|Flex Day:|Alternative:)/g);
                        let dayCount = 0;
                        if (parts.length > 1) {
                            for (let i = 1; i < parts.length; i += 2) {
                                if (parts[i + 1]?.trim()) dayCount++;
                            }
                        } else {
                            dayCount = 1;
                        }
                        total += dayCount;
                    }
                });
            }
        });
        return total;
    };

    const handleMarkDone = async (exerciseId: string, difficulty: string) => {
        if (!training || !id) return;

        const currentDetails = training.details || {};
        const userProgress = currentDetails.user_progress || {
            completed_exercises: [],
            xp: 0,
            streak: 0,
            completed_days: []
        };

        const isDone = userProgress.completed_exercises.includes(exerciseId);
        let newCompletedExercises = [...userProgress.completed_exercises];
        let newXp = userProgress.xp;

        // XP Values
        const xpMap: Record<string, number> = { "Low": 50, "Medium": 100, "High": 200, "Auto": 50 };
        const xpValue = xpMap[difficulty] || 50;

        if (isDone) {
            // Undo
            newCompletedExercises = newCompletedExercises.filter((x: string) => x !== exerciseId);
            newXp -= xpValue;
        } else {
            // Mark Done
            newCompletedExercises.push(exerciseId);
            newXp += xpValue;
        }

        const updatedProgress = {
            ...userProgress,
            completed_exercises: newCompletedExercises,
            xp: Math.max(0, newXp)
        };

        const newDetails = {
            ...currentDetails,
            user_progress: updatedProgress
        };

        const currentSchedule = details.schedule || details;
        const totalExercises = calculateTotalExercises(currentSchedule);
        const progressPercentage = totalExercises > 0
            ? Math.round((newCompletedExercises.length / totalExercises) * 100)
            : 0;

        setTraining({ ...training, details: newDetails, progress: progressPercentage }); // Optimistic UI

        try {
            await Promise.all([
                updateTrainingDetails(id, newDetails),
                updateTrainingProgress(id, progressPercentage)
            ]);

            // Update Global User XP
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const delta = isDone ? -xpValue : xpValue; // If was done (undoing), substract. If not done (doing), add.
                const { leveledUp, level } = await userService.updateUserXP(user.id, delta);

                if (leveledUp) {
                    // Show a level up celebration (could be a toast or modal)
                    // For now, using a simple alert/console, but ideally a nice UI component
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-24 right-4 z-[100] px-6 py-4 rounded-xl shadow-2xl border bg-brand-500/10 border-brand-500/20 text-brand-400 flex items-center gap-3 animate-in slide-in-from-right duration-500';
                    notification.innerHTML = `
                        <div class="h-10 w-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            ${level}
                        </div>
                        <div>
                            <p class="font-bold text-white">Level Up!</p>
                            <p class="text-sm">You reached Level ${level}!</p>
                        </div>
                     `;
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 4000);
                }
            }

        } catch (error) {
            console.error("Failed to update progress", error);
        }
    };

    const getCurrentRank = () => {
        if (!training || !training.details) return "Unranked";
        const answers = training.details.answers || {};
        // Check game specific rank fields
        if (answers.lol_rank) return answers.lol_rank;
        if (answers.val_rank) return answers.val_rank;
        if (answers.cs_rank) return answers.cs_rank; // Assuming CS field
        return answers.current_rank || "Unranked";
    };

    const getRankGoal = () => {
        if (!training || !training.details) return "TBD";
        const answers = training.details.answers || {};
        return answers.goal_specific || "Rank Up";
    };

    const handleUpdateRank = async () => {
        if (!training || !id || !rankInput.trim()) return;

        const currentDetails = training.details || {};
        const currentAnswers = currentDetails.answers || {};

        // Determine which field to update based on game or existing data
        // For simplicity, we update the one that exists, or default to a generic one if none
        let updatedAnswers = { ...currentAnswers };

        if (updatedAnswers.lol_rank) updatedAnswers.lol_rank = rankInput;
        else if (updatedAnswers.val_rank) updatedAnswers.val_rank = rankInput;
        else if (updatedAnswers.cs_rank) updatedAnswers.cs_rank = rankInput;
        else updatedAnswers.current_rank = rankInput; // Fallback

        const newDetails = {
            ...currentDetails,
            answers: updatedAnswers
        };

        setTraining({ ...training, details: newDetails });
        setShowRankModal(false);
        setRankInput('');

        try {
            await updateTrainingDetails(id, newDetails);
        } catch (error) {
            console.error("Failed to update rank", error);
        }
    };

    const details = training?.details || {};
    const schedule = details.schedule || details;
    const weeks = schedule.weeks || [];
    const currentWeekData = weeks.find((w: any) => w.week_number === selectedWeek);

    const weekDays = React.useMemo(() => {
        return [1, 2, 3, 4, 5, 6, 7].filter(day => {
            if (!currentWeekData || !currentWeekData.daily_routine || !Array.isArray(currentWeekData.daily_routine)) return false;

            const dayRoutine = currentWeekData.daily_routine.find((item: any) => {
                const d = item.day ? item.day.toString() : "";
                const dayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const target = dayMap[day - 1];
                return d.includes(target) || d.includes(`Day ${day}`) || d.includes(day.toString());
            });

            // Filter out if no routine exists or if it has no exercises/content
            if (!dayRoutine) return false;

            const hasExercises = (dayRoutine.exercises && Array.isArray(dayRoutine.exercises) && dayRoutine.exercises.length > 0) ||
                (dayRoutine.activity && dayRoutine.activity.length > 0);

            return hasExercises;
        });
    }, [currentWeekData]);

    // Ensure we select a valid day if the current one is hidden
    useEffect(() => {
        if (weekDays.length > 0 && !weekDays.includes(selectedDay)) {
            setSelectedDay(weekDays[0]);
        }
    }, [selectedWeek, weekDays, selectedDay]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!training) {
        return <div className="text-white text-center pt-20">Training plan not found.</div>;
    }

    const dayMapping = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const targetDayName = dayMapping[selectedDay - 1];

    let exercisesForDay: any[] = [];
    if (currentWeekData?.daily_routine) {
        const dayRoutine = currentWeekData.daily_routine.find((item: any) => {
            const d = item.day ? item.day.toString() : "";
            return d.includes(targetDayName) || d.includes(`Day ${selectedDay}`) || d.includes(selectedDay.toString());
        });

        if (dayRoutine) {
            if (dayRoutine.exercises && Array.isArray(dayRoutine.exercises)) {
                exercisesForDay = dayRoutine.exercises.map((ex: any, i: number) => ({ ...ex, id: `w${selectedWeek}-d${selectedDay}-e${i}`, difficulty: ex.difficulty || "Medium" }));
            } else {
                const rawActivity = dayRoutine.activity || "";
                const keywords = ["Warm-up:", "Study:", "Ranked Games:", "Review:", "Flex Day:", "Alternative:"];
                const parts = rawActivity.split(/(Warm-up:|Study:|Ranked Games:|Review:|Flex Day:|Alternative:)/g);
                let idx = 0;
                if (parts.length > 1) {
                    for (let i = 1; i < parts.length; i += 2) {
                        if (parts[i + 1]?.trim()) {
                            exercisesForDay.push({
                                activity: parts[i].replace(":", "").trim(),
                                description: parts[i + 1]?.trim(),
                                duration: dayRoutine.duration,
                                id: `w${selectedWeek}-d${selectedDay}-e${idx}`,
                                difficulty: "Medium"
                            });
                            idx++;
                        }
                    }
                } else {
                    exercisesForDay.push({
                        activity: rawActivity,
                        duration: dayRoutine.duration,
                        id: `w${selectedWeek}-d${selectedDay}-0`,
                        difficulty: "Medium"
                    });
                }
            }
        }
    }

    const userProgress = details.user_progress || { completed_exercises: [], xp: 0, streak: 0, completed_days: [] };
    const completedCount = exercisesForDay.filter(ex => userProgress.completed_exercises.includes(ex.id)).length;
    const totalCount = exercisesForDay.length;
    const dailyCompletion = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;



    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-brand-500 selection:text-white">
            <Navbar isScrolled={isScrolled} />

            <div className="pt-24 flex h-screen overflow-hidden">
                <aside className="w-64 bg-slate-900/50 border-r border-white/5 flex-shrink-0 flex flex-col pt-6 hidden md:flex backdrop-blur-sm">
                    <div className="px-6 mb-8">
                        <div className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">Current Plan</div>
                        <h2 className="text-xl font-bold text-white leading-tight mb-2">{training.title}</h2>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <div className="flex items-center bg-slate-800 rounded-lg p-1">
                                <button
                                    onClick={() => {
                                        if (selectedWeek > 1) {
                                            setSelectedWeek(selectedWeek - 1);
                                            // selectedDay will be auto-corrected by the useEffect
                                        }
                                    }}
                                    disabled={selectedWeek === 1}
                                    className={`p-1 rounded hover:bg-slate-700 transition-colors ${selectedWeek === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                <span className="px-2 font-medium text-slate-300">Week {selectedWeek}</span>
                                <button
                                    onClick={() => {
                                        if (selectedWeek < weeks.length) {
                                            setSelectedWeek(selectedWeek + 1);
                                            // selectedDay will be auto-corrected by the useEffect
                                        }
                                    }}
                                    disabled={selectedWeek === weeks.length}
                                    className={`p-1 rounded hover:bg-slate-700 transition-colors ${selectedWeek === weeks.length ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                            <span>•</span>
                            <span>Day {selectedDay}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-700">
                        {weekDays.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${selectedDay === day
                                    ? 'bg-brand-500/10 text-white border border-brand-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-xs font-bold ${selectedDay === day ? 'bg-brand-500 text-slate-900' : 'bg-white/5 text-slate-500'
                                    }`}>
                                    {day === 1 ? <Play size={12} fill="currentColor" /> :
                                        day === 4 ? <Clock size={12} /> :
                                            day === 7 ? <Trophy size={12} /> :
                                                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />}
                                </div>
                                <div className="text-left">
                                    <div className="text-xs font-bold opacity-70">Day {day}</div>
                                    <div className="text-sm font-medium line-clamp-2 leading-tight">
                                        {getDayTitle(day, currentWeekData)}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                <main
                    className="flex-1 overflow-y-auto p-8 relative"
                    onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 20)}
                >
                    <div className="absolute top-0 left-0 w-full h-96 bg-brand-500/5 blur-[100px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
                            Personalized Plan Generated
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">
                                {currentWeekData?.focus || "Training Session"}
                            </span>.
                        </h1>

                        <p className="text-lg text-slate-400 max-w-2xl mb-12">
                            Stop guessing why you miss. This session uses frame-by-frame data from your last match to target your weaknesses.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Current Rank */}
                            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group flex flex-col justify-center items-center text-center">
                                <div className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer z-10 transition-colors"
                                    onClick={() => {
                                        setRankInput(getCurrentRank() === "Unranked" ? "" : getCurrentRank());
                                        setShowRankModal(true);
                                    }}
                                >
                                    <div className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <Edit2 size={16} className="text-brand-400" />
                                    </div>
                                </div>
                                <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Award size={16} className="text-amber-500" /> Current Rank
                                </div>
                                <h3 className="text-3xl font-extrabold text-white mb-1">{getCurrentRank()}</h3>
                                <p className="text-xs text-slate-500">Click icon to update</p>
                            </div>

                            {/* Rank Goal */}
                            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group flex flex-col justify-center items-center text-center">
                                <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Map size={16} className="text-emerald-500" /> Rank Goal
                                </div>
                                <h3 className="text-3xl font-extrabold text-white mb-1">{getRankGoal()}</h3>
                                <p className="text-xs text-slate-500">Keep pushing!</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-sm text-slate-400 font-medium">Daily Completion</div>
                                        <div className="text-3xl font-bold text-white mt-1">{dailyCompletion}%</div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${dailyCompletion === 100 ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-800 text-slate-500'}`}>
                                        <CheckCircle size={20} />
                                    </div>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className="bg-brand-500 h-full rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)] transition-all duration-500"
                                        style={{ width: `${dailyCompletion}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-slate-500 mt-3">{completedCount} of {totalCount} tasks completed today</div>
                            </div>

                            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-sm text-slate-400 font-medium">Current Streak</div>
                                        <div className="text-3xl font-bold text-white mt-1">{userProgress.streak} <span className="text-sm font-normal text-slate-500">Days</span></div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                        <Zap size={20} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500 mt-2">Keep it up! Consistency is key.</div>
                            </div>

                            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-sm text-slate-400 font-medium">Total XP</div>
                                        <div className="text-3xl font-bold text-white mt-1">{(userProgress.xp || 0).toLocaleString()}</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                        <TrendingUp size={20} />
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500 mt-2">Earn XP by completing exercises.</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-brand-400 font-bold uppercase tracking-wider text-sm mb-1">{getDayTitle(selectedDay, currentWeekData)}</h3>
                            <div className="flex justify-between items-end">
                                <h2 className="text-2xl font-bold text-white">Today's Exercises</h2>
                                <span className="text-sm text-slate-400">Estimated time: ~1h 15m</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {exercisesForDay.length > 0 ? (
                                exercisesForDay.map((ex: any, index: number) => (
                                    <ExerciseCard
                                        key={ex.id}
                                        routine={ex}
                                        index={index}
                                        isExpanded={expandedExercise === index}
                                        onToggle={() => setExpandedExercise(expandedExercise === index ? null : index)}
                                        onMarkDone={() => handleMarkDone(ex.id, ex.difficulty)}
                                        isDone={userProgress.completed_exercises.includes(ex.id)}
                                    />
                                ))
                            ) : (
                                <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                                        <Calendar size={20} className="text-slate-500" />
                                    </div>
                                    <p className="text-slate-400 font-medium">Rest Day or No Exercises Scheduled</p>
                                    <p className="text-slate-600 text-sm mt-1">Take this time to recover.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 relative overflow-hidden flex items-center justify-between">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Keep the streak alive!</h3>
                                <p className="text-white/80 max-w-md text-sm">Consistency is key. Finish your tasks today to earn a bonus XP.</p>
                            </div>
                            <button className="relative z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                                <TrendingUp size={18} />
                                View Leaderboard
                            </button>
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
                        </div>

                        <div className="h-24"></div>
                    </div>
                </main>
            </div>
            {/* Rank Update Modal */}
            {showRankModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
                        <button
                            onClick={() => setShowRankModal(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-4">Update Current Rank</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Congratulations on your progress! Update your rank to track your climb.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">New Rank</label>
                                <input
                                    type="text"
                                    value={rankInput}
                                    onChange={(e) => setRankInput(e.target.value)}
                                    placeholder="e.g. Diamond II"
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setShowRankModal(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateRank}
                                    className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-slate-900 rounded-lg font-bold flex items-center gap-2 transition-all"
                                >
                                    <Save size={18} />
                                    Update Rank
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ExerciseCard = ({ routine, index, isExpanded, onToggle, onMarkDone, isDone }: any) => {
    const getIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('aim') || lower.includes('gridshot') || lower.includes('mechanics') || lower.includes('warm-up')) return <Crosshair size={24} />;
        if (lower.includes('review') || lower.includes('vod') || lower.includes('study')) return <Play size={24} />;
        if (lower.includes('game') || lower.includes('ranked')) return <Zap size={24} />;
        return <CheckCircle size={24} />;
    };

    const title = routine.activity || "Exercise";
    const description = routine.description || "";
    const getDifficultyColor = (diff: string) => {
        switch (diff?.toLowerCase()) {
            case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    }

    return (
        <div className={`bg-slate-900/40 border rounded-2xl overflow-hidden transition-all group ${isDone ? 'border-brand-500/30 bg-brand-500/5' : 'border-white/5 hover:border-brand-500/20'}`}>
            <div className="p-5 flex items-start gap-5">
                <div className="cursor-pointer flex-1 flex items-start gap-5" onClick={onToggle}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1 transition-colors
                        ${isDone ? 'bg-brand-500 text-slate-900' :
                            title.toLowerCase().includes('vod') || title.toLowerCase().includes('study') ? 'bg-cyan-500/10 text-cyan-400' :
                                title.toLowerCase().includes('aim') || title.toLowerCase().includes('warm') ? 'bg-indigo-500/10 text-indigo-400' :
                                    'bg-brand-500/10 text-brand-400'
                        } `}>
                        {isDone ? <CheckCircle size={24} /> : getIcon(title)}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h4 className={`text-lg font-bold transition-colors ${isDone ? 'text-brand-400' : 'text-white group-hover:text-brand-400'}`}>{title}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(routine.difficulty)}`}>
                                {routine.difficulty || "Medium"}
                            </span>
                        </div>

                        {description && (
                            <p className={`text-sm text-slate-400 mb-3 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                {description}
                            </p>
                        )}

                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center text-slate-400">
                                <Clock size={12} className="mr-1" /> {routine.duration}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3 self-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onMarkDone();
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all
                            ${isDone
                                ? 'bg-brand-500/20 text-brand-400 hover:bg-brand-500/30'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        {isDone ? (
                            <>
                                <CheckSquare size={18} /> Done
                            </>
                        ) : (
                            <>
                                <Square size={18} /> Mark Done
                            </>
                        )}
                    </button>
                    <button onClick={onToggle} className="text-slate-500 hover:text-white transition-colors">
                        <ChevronDown size={20} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {isExpanded && !description && (
                <div className="px-5 pb-5 pt-0 pl-[4.5rem]">
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-slate-300">
                        <p>Focus on maintaining consistent performance. Take notes on what went wrong if you fail.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const getDayTitle = (day: number, weekData: any) => {
    if (!weekData || !weekData.daily_routine) return "Training";

    const dayMapping = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const targetDayName = dayMapping[day - 1];

    const dayRoutine = weekData.daily_routine.find((item: any) => {
        const d = item.day ? item.day.toString() : "";
        return d.includes(targetDayName) || d.includes(`Day ${day}`) || d.includes(day.toString());
    });

    if (!dayRoutine) return "Rest";

    // 1. Explicit theme from API
    if (dayRoutine.theme) return dayRoutine.theme;

    // 2. Derive from exercises
    if (dayRoutine.exercises && Array.isArray(dayRoutine.exercises) && dayRoutine.exercises.length > 0) {
        const exerciseNames = dayRoutine.exercises.map((e: any) => e.activity || e.name || "").join(" ").toLowerCase();

        if (exerciseNames.includes("vod") || exerciseNames.includes("review")) return "VOD Review";
        if (exerciseNames.includes("aim") || exerciseNames.includes("mechanics") || exerciseNames.includes("click")) return "Mechanics";
        if (exerciseNames.includes("ranked") || exerciseNames.includes("game") || exerciseNames.includes("match")) return "Ranked Games";
        if (exerciseNames.includes("positioning") || exerciseNames.includes("macro")) return "Macro & Positioning";
        if (exerciseNames.includes("team") || exerciseNames.includes("comms")) return "Team Play";

        // Fallback to first exercise name if brief
        const first = dayRoutine.exercises[0].activity || dayRoutine.exercises[0].name;
        if (first && first.length < 20) return first;
    }

    // 3. Fallback from hardcoded legacy list (optional, but good for very old data)
    const titles = [
        "Mechanics", "VOD Review", "Positioning", "Rest",
        "Team Play", "Game Sense", "Assessment"
    ];
    return titles[day - 1] || "Training";
}

export default TrainingDetailsPage;
