import React, { useEffect, useState } from 'react';
import { Analysis } from '../types';
import { fetchUserAnalyses } from '../services/analysisService';
import { Play, Calendar, ChevronRight } from 'lucide-react';

interface AnalysisHistorySidebarProps {
    onSelectAnalysis: (analysis: Analysis) => void;
    currentAnalysisId?: string;
}

export const AnalysisHistorySidebar: React.FC<AnalysisHistorySidebarProps> = ({ onSelectAnalysis, currentAnalysisId }) => {
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await fetchUserAnalyses();
            setAnalyses(data);
        } catch (error) {
            console.error("Failed to load history:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    };

    return (
        <div className="bg-slate-900 border-r border-white/5 w-80 flex flex-col h-full sticky top-0">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">History</h2>
                <span className="text-xs text-brand-400 cursor-pointer hover:underline" onClick={loadHistory}>Refresh</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {loading ? (
                    <div className="text-center text-slate-500 py-8">Loading history...</div>
                ) : analyses.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">No analyses yet.</div>
                ) : (
                    analyses.map((analysis) => (
                        <div
                            key={analysis.id}
                            onClick={() => onSelectAnalysis(analysis)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border group relative
                                ${currentAnalysisId === analysis.id
                                    ? 'bg-brand-500/10 border-brand-500/50'
                                    : 'bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider
                                    ${analysis.game.includes('League') ? 'bg-blue-500/20 text-blue-400' :
                                        analysis.game.includes('Valorant') ? 'bg-red-500/20 text-red-400' :
                                            'bg-purple-500/20 text-purple-400'}`}
                                >
                                    {analysis.game.split(' ')[0]}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center">
                                    <Calendar size={10} className="mr-1" />
                                    {formatDate(analysis.created_at)}
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1 group-hover:text-brand-400 transition-colors">
                                {analysis.video_title || "Untitled Analysis"}
                            </h3>

                            {currentAnalysisId === analysis.id && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <ChevronRight className="w-4 h-4 text-brand-500" />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => onSelectAnalysis(null as any)} // Hacky way to signal "New Analysis" if I use null, or I handle it in parent
                    className="w-full py-3 rounded-lg border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-all flex items-center justify-center text-sm font-medium"
                >
                    <Play size={16} className="mr-2" />
                    New Analysis
                </button>
            </div>
        </div>
    );
};
