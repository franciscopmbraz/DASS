import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Plus, Search, Filter } from 'lucide-react';
import TrainingCard from './TrainingCard';
import CreateTrainingWizard from './CreateTrainingWizard';
import { fetchTrainings, Training } from '../services/trainingService';

const TrainingPage: React.FC = () => {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'completed'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="min-h-screen bg-[#09090b] font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Your Training Plans</h1>
                        <p className="text-gray-400">Manage your training plans and improve your skills in the game.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20"
                    >
                        <Plus size={20} />
                        Create New Plan
                    </button>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-[#18181b] p-2 rounded-2xl border border-white/5">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search training plan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-white pl-12 pr-4 py-3 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
                        {(['all', 'in_progress', 'new', 'completed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-[#09090b] text-gray-400 hover:bg-[#27272a] hover:text-white'
                                    }`}
                            >
                                {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f === 'new' ? 'New' : 'Completed'}
                            </button>
                        ))}

                        <button className="p-2 text-gray-400 hover:text-white ml-auto md:ml-2">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* content */}
                {isLoading ? (
                    <div className="text-center text-gray-400 py-20">Loading your training plans...</div>
                ) : filteredTrainings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrainings.map((training) => (
                            <TrainingCard key={training.id} training={training} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#18181b] rounded-2xl border border-white/5">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-purple-600/10 mb-4">
                            <Plus className="text-purple-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No training plans found</h3>
                        <p className="text-gray-400 max-w-md mx-auto mb-6">
                            {searchQuery || filter !== 'all'
                                ? 'Try adjusting your filters or search.'
                                : 'Start creating your first personalized training plan.'}
                        </p>
                        {filter === 'all' && !searchQuery && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-purple-400 hover:text-purple-300 font-medium"
                            >
                                Create my first plan
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
