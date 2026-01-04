import React from 'react';
import { Training } from '../services/trainingService';
import { Play, Eye, RotateCcw, Clock, CheckCircle } from 'lucide-react';

interface TrainingCardProps {
    training: Training;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
                return 'bg-purple-600/20 text-purple-400 border-purple-600/50';
            case 'in_progress':
                return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50';
            case 'completed':
                return 'bg-green-600/20 text-green-400 border-green-600/50';
            default:
                return 'bg-gray-600/20 text-gray-400 border-gray-600/50';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return 'New';
            case 'in_progress': return 'In Progress';
            case 'completed': return 'Completed';
            default: return status;
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return null; // Or a sparkle icon
            case 'in_progress': return <Clock size={14} className="mr-1" />;
            case 'completed': return <CheckCircle size={14} className="mr-1" />;
            default: return null;
        }
    }

    return (
        <div className="bg-[#1f1f23] rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group relative overflow-hidden">
            {/* Background Image Placeholder / Gradient */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusColor(training.status)}`}>
                    {getStatusIcon(training.status)}
                    {getStatusLabel(training.status)}
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 relative z-10">{training.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10 relative z-10">{training.description}</p>

            <div className="mb-4 relative z-10">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>PROGRESS</span>
                    <span>{training.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${training.progress}%` }}
                    />
                </div>
            </div>

            <div className="flex gap-3 relative z-10">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">
                    {training.status === 'new' ? 'Start' : training.status === 'completed' ? 'Review' : 'Continue'}
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                    {training.status === 'completed' ? <RotateCcw size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default TrainingCard;
