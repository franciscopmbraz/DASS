import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from './Navbar';
import AnalysisView from './AnalysisView';
import ChatWidget from './ChatWidget';
import { geminiService } from '../services/geminiService';
import { fileService } from '../services/fileService';
import { AnalysisResult } from '../types';
import { Upload, FileVideo, X, Play, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<any>(null);
    const [loadingSession, setLoadingSession] = useState(true);

    // Analysis State
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [analysisStatus, setAnalysisStatus] = useState("Analyzing Gameplay...");
    const [selectedGame, setSelectedGame] = useState<string>("Auto-Detect");

    // Check Auth
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoadingSession(false);
            if (!session) {
                navigate('/login');
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                navigate('/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate
        const errorMsg = fileService.validateVideoFile(file);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        setVideoFile(file);
        setVideoUrl(fileService.createObjectUrl(file));
        setError(null);
        setAnalysisResult(null); // Reset previous analysis
    };

    const startAnalysis = async () => {
        if (!videoFile) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const prompt = selectedGame === "Auto-Detect"
                ? "Analyze this gameplay footage. Identify the game being played and provide coaching analysis relevant to that specific game's mechanics and strategy."
                : `Analyze this ${selectedGame} gameplay.`;

            const result = await geminiService.analyzeVideo(videoFile, prompt, (status) => {
                setAnalysisStatus(status);
            });
            setAnalysisResult(result);
        } catch (err: any) {
            setError(err.message || "Failed to analyze video.");
        } finally {
            setIsAnalyzing(false);
            setAnalysisStatus("Analyzing Gameplay...");
        }
    };

    const clearFile = () => {
        if (videoUrl) {
            fileService.revokeObjectUrl(videoUrl);
        }
        setVideoFile(null);
        setVideoUrl(null);
        setAnalysisResult(null);
    };

    if (loadingSession) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-brand-500/30">
            <Navbar />

            <main className="container mx-auto px-4 py-8 pt-24">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-500">
                        AI Gameplay Analysis
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Upload your gameplay footage and let our Gemini-powered AI coach analyze your performance, identifying strengths and areas for improvement.
                    </p>
                </header>

                {!videoFile ? (
                    // Upload State
                    <div className="max-w-xl mx-auto">
                        <div className="border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-2xl p-12 text-center hover:border-brand-500/50 hover:bg-brand-500/5 transition-all group">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-brand-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Upload Gameplay Video</h3>
                            <p className="text-slate-400 mb-8">
                                Drag and drop or click to select<br />
                                <span className="text-sm text-slate-500">(MP4, WebM, MOV up to 300MB)</span>
                            </p>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="video-upload"
                            />
                            <label
                                htmlFor="video-upload"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold cursor-pointer transition-colors shadow-lg shadow-brand-500/20"
                            >
                                Select Video File
                            </label>
                            {error && (
                                <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Analysis State
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Video & Controls */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 relative group">
                                <video
                                    src={videoUrl!}
                                    controls
                                    className="w-full aspect-video bg-black object-contain"
                                />
                                <button
                                    onClick={clearFile}
                                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"
                                    title="Remove video"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-100 rounded-xl flex items-center">
                                    <span className="mr-2">⚠️</span> {error}
                                </div>
                            )}

                            {!analysisResult && !isAnalyzing && (
                                <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                                    <div className="relative w-full sm:w-64">
                                        <select
                                            value={selectedGame}
                                            onChange={(e) => setSelectedGame(e.target.value)}
                                            className="w-full appearance-none bg-slate-900 border border-slate-700 text-white py-4 px-4 pr-8 rounded-xl focus:outline-none focus:border-brand-500 cursor-pointer text-base"
                                        >
                                            <option value="Auto-Detect">Auto-Detect Game</option>
                                            <option value="League of Legends">League of Legends</option>
                                            <option value="Valorant">Valorant</option>
                                            <option value="CS2">Counter-Strike 2</option>
                                            <option value="Overwatch 2">Overwatch 2</option>
                                            <option value="Dota 2">Dota 2</option>
                                            <option value="Fortnite">Fortnite</option>
                                            <option value="Apex Legends">Apex Legends</option>
                                            <option value="Rocket League">Rocket League</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                    <button
                                        onClick={startAnalysis}
                                        className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.02]"
                                    >
                                        <Play className="w-5 h-5 mr-2 fill-current" />
                                        Start Analysis
                                    </button>
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="glass-card p-8 rounded-xl border border-brand-500/30 text-center animate-pulse">
                                    <Loader2 className="w-12 h-12 text-brand-400 animate-spin mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">{analysisStatus}</h3>
                                    <p className="text-slate-400">Our AI coach is reviewing your footage. This may take a moment.</p>
                                </div>
                            )}

                            {analysisResult && (
                                <AnalysisView analysis={analysisResult} />
                            )}
                        </div>

                        {/* Right Column: Chat (Only if analysis is ready) */}
                        <div className="lg:col-span-1">
                            {analysisResult ? (
                                <div className="sticky top-24">
                                    <ChatWidget />
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center p-8 border border-white/5 rounded-2xl bg-white/5 text-center">
                                    <p className="text-slate-500">
                                        Chat will be available after analysis is complete.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
