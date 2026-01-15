import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Crosshair } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950"></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[128px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse-slow delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F2229] border border-[#1E3A45] mb-8">
                    <span className="text-[10px] sm:text-xs font-bold text-[#2DD4BF] tracking-wider uppercase">NOW IN PRIVATE BETA</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 max-w-5xl leading-[1.1]">
                    The AI Coach that <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#8B5CF6]">
                        Watches, Listens, and Teaches.
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                    Stop guessing why you lost. GameCoach AI bridges the insight gap with conversational, frame-by-frame analysis for the price of lunch.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-20">
                    <Link
                        to="/dashboard"
                        className="group flex items-center gap-3 px-10 py-5 bg-[#0F766E] hover:bg-[#0d6861] text-white rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
                    >
                        Analyze My Match <ArrowRight size={20} />
                    </Link>

                    <a
                        href="#demo"
                        className="flex items-center gap-3 px-10 py-5 bg-[#1E293B] hover:bg-[#253248] text-white rounded-xl font-bold text-lg transition-all border border-slate-700 hover:border-slate-500"
                    >
                        <Play size={20} fill="white" /> Watch Demo
                    </a>
                </div>

                {/* Stats/Social Proof Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 text-center">
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">400k+</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Frames Analyzed</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">Gemini 1.5</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Powered Engine</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">100%</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Anti-Cheat Safe</div>
                    </div>
                </div>

            </div>

            {/* Decorative Grid */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        </div>
    );
};

export default Hero;
