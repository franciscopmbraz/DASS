import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Plus, Search, Filter } from 'lucide-react';
import TrainingCard from './TrainingCard';
import CreateTrainingWizard from './CreateTrainingWizard';
import { fetchTrainings, deleteTraining, Training } from '../services/trainingService';

const TrainingPage: React.FC = () => {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'completed'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadTrainings = async () => {
        setIsLoading(true);
        try {
            const data = await fetchTrainings();
            setTrainings(data);
        } catch (error) {
            console.error('Failed to load trainings', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTrainings();
    }, []);

    const filteredTrainings = trainings.filter((t) => {
        const matchesFilter = filter === 'all' || t.status === filter;
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleDelete = async (id: string) => {
        try {
            await deleteTraining(id);
            setTrainings(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Failed to delete training', error);
            alert('Failed to delete training plan. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-brand-500 selection:text-white relative overflow-hidden">
            {/* Background Elements (Copied from Hero/Landing Style) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/valorant/1920/1080')] bg-cover bg-center opacity-10 blur-sm mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950"></div>
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px]"></div>
            </div>

            <Navbar isScrolled={isScrolled} />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                            Your Training <span className="text-brand-500">Plans</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            Manage your AI-generated training schedules and track your progress to reach the next rank.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        Create New Plan
                    </button>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 bg-slate-900/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search training plans..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-white pl-12 pr-4 py-3 focus:outline-none placeholder-slate-600"
                        />
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
                        {(['all', 'in_progress', 'new', 'completed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === f
                                    ? 'bg-brand-500 text-slate-950 shadow-lg shadow-brand-500/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {f === 'all' ? 'All Plans' : f === 'in_progress' ? 'In Progress' : f === 'new' ? 'New' : 'Completed'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
                    </div>
                ) : filteredTrainings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTrainings.map((training) => (
                            <TrainingCard
                                key={training.id}
                                training={training}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-white/5 border-dashed">
                        <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-slate-800/50 mb-6 group">
                            <Plus className="text-slate-600 group-hover:text-brand-500 transition-colors" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No plans found</h3>
                        <p className="text-slate-400 max-w-md mx-auto mb-8">
                            {searchQuery || filter !== 'all'
                                ? 'We couldn\'t find any plans matching your current filters.'
                                : 'Start your journey by creating your first personalized training plan.'}
                        </p>
                        {filter === 'all' && !searchQuery && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-brand-400 hover:text-brand-300 font-bold hover:underline underline-offset-4"
                            >
                                Generate AI Plan
                            </button>
                        )}
                    </div>
                )}
            </main>

            {isModalOpen && (
                <CreateTrainingWizard
                    onClose={() => setIsModalOpen(false)}
                    onCreated={loadTrainings}
                />
            )}
        </div>
    );
};

export default TrainingPage;
