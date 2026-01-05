import React from 'react';
import { Training } from '../services/trainingService';
import { Play, Eye, RotateCcw, Clock, CheckCircle, Trash2 } from 'lucide-react';

interface TrainingCardProps {
    training: Training;
    onDelete: (id: string) => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ training, onDelete }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
                return 'bg-brand-500/10 text-brand-400 border-brand-500/20';
            case 'in_progress':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return 'New Plan';
            case 'in_progress': return 'In Progress';
            case 'completed': return 'Completed';
            default: return status;
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return null;
            case 'in_progress': return <Clock size={12} className="mr-1.5" />;
            case 'completed': return <CheckCircle size={12} className="mr-1.5" />;
            default: return null;
        }
    }

    return (
        <div className="group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-brand-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] overflow-hidden">
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center ${getStatusColor(training.status)}`}>
                    {getStatusIcon(training.status)}
                    {getStatusLabel(training.status)}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <a href={`/training/${training.id}`} className="block">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{training.title}</h3>
                </a>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 min-h-[40px] leading-relaxed">{training.description}</p>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                        <span>Progress</span>
                        <span className="text-slate-300">{training.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                            className="bg-brand-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                            style={{ width: `${training.progress}%` }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <a href={`/training/${training.id}`} className="flex-1 bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-900/20 group-hover:shadow-brand-500/20 flex items-center justify-center text-center">
                        {training.status === 'new' ? (
                            <>Start Training <Play size={16} className="ml-2 fill-current" /></>
                        ) : training.status === 'completed' ? (
                            <>Review Results <CheckCircle size={16} className="ml-2" /></>
                        ) : (
                            <>Continue <Play size={16} className="ml-2 fill-current" /></>
                        )}
                    </a>

                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this training plan?')) {
                                onDelete(training.id);
                            }
                        }}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-colors border border-red-500/20 flex items-center justify-center"
                        title="Delete Plan"
                    >
                        <Trash2 size={20} />
                    </button>

                    <a href={`/training/${training.id}`} className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors border border-white/5 flex items-center justify-center">
                        <Eye size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TrainingCard;
