import React, { useState, useEffect } from 'react';
import { Cpu, Check, Play, Smartphone, Tablet, Monitor } from 'lucide-react';
import LockedInImage from '../assets/esports-locked-in.png';

const AiShowcase: React.FC = () => {
    // Tabs removed as per new design


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">

                {/* Left Content */}
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 font-bold text-sm tracking-wide uppercase">
                        <Cpu size={16} /> Powered by Gemini 2.0
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        The World's Most <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-brand-500">Advanced Gaming AI</span>
                    </h2>

                    <p className="text-lg text-slate-400 leading-relaxed">
                        Our proprietary models are trained on millions of pro matches. GameCoach AI doesn't just see the screen—it understands the game state, predicts enemy movements, and identifies win conditions in real-time.
                    </p>

                    <div className="flex flex-col gap-4">
                        {['Frame-by-frame analysis with 99.8% aaccuracy', 'Real-time contextual coaching', 'Personalized drills based on YOUR gameplay'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-slate-900 shrink-0">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="text-slate-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-4 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                        <Play size={20} fill="currentColor" /> See It In Action
                    </button>
                </div>

                {/* Right Visual */}
                <div className="flex-1 w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-purple-500/20 blur-[100px] rounded-full"></div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60"></div>
                        <img
                            src={LockedInImage}
                            alt="Esports Player Locked In"
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay Badge */}
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-lg border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-white font-bold text-sm">System Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiShowcase;
