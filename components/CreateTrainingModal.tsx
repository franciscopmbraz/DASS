import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createTraining } from '../services/trainingService';

interface CreateTrainingModalProps {
    onClose: () => void;
    onCreated: () => void;
}

const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({ onClose, onCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [game, setGame] = useState('League of Legends'); // Default or select
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTraining({
                title,
                description,
                game,
            });
            onCreated();
            onClose();
        } catch (error) {
            console.error('Error creating training:', error);
            // Handle error (show toast/alert)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#18181b] p-8 rounded-2xl w-full max-w-md border border-white/10 relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">New Training Plan</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Game</label>
                        <select
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                            className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                            <option value="League of Legends">League of Legends</option>
                            <option value="Valorant">Valorant</option>
                            <option value="CS2">CS2</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Plan Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Aim Training - Week 1"
                            required
                            className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the focus of this training..."
                            rows={4}
                            className="w-full bg-[#09090b] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? 'Creating...' : 'Create Plan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTrainingModal;
