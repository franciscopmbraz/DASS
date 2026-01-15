import React from 'react';
import { Video, Target, TrendingUp, Users, Brain, Zap } from 'lucide-react';

const Features: React.FC = () => {
    const features = [
        {
            icon: <Video size={32} />,
            title: "AI Video Analysis",
            description: "Upload your gameplay and let our advanced vision models identify mistakes, missed opportunities, and mechanical errors in seconds.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            icon: <Target size={32} />,
            title: "Personalized Training",
            description: "Get custom daily routines tailored to your specific weaknesses. No more generic advise—train what actually matters for YOU.",
            color: "text-brand-400",
            bg: "bg-brand-500/10",
            border: "border-brand-500/20"
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Progress Tracking",
            description: "Visualize your improvement over time withdetailed stats and graphs. Watch your rank climb as you master new skills.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            icon: <Brain size={32} />,
            title: "Smart Meta Insights",
            description: "Stay ahead of the competition with AI-curated meta analysis that adapts to the latest patches and pro play strategies.",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            icon: <Zap size={32} />,
            title: "Instant Feedback",
            description: "Don't wait for a human coach. Get immediate feedback on your decision making, positioning, and ability usage 24/7.",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            icon: <Users size={32} />,
            title: "Pro Comparisons",
            description: "Compare your metrics directly against pro player data to see exactly where you stack up and what you need to reach Challenger.",
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/20"
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-3">Why GameCoach AI?</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    Level Up Faster Than Ever Before
                </h3>
                <p className="text-slate-400 text-lg">
                    Traditional coaching is expensive and slow. Our AI works instantly, costs a fraction of the price, and provides objective, data-driven insights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border ${feature.border} hover:bg-slate-800/50 transition-all hover:-translate-y-2 duration-300 group`}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            {feature.icon}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                        <p className="text-slate-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
