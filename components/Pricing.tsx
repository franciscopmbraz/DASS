import React from 'react';
import { Check, X, Zap, Star, Crown } from 'lucide-react';

interface PricingTierProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    limitations?: string[];
    color: 'green' | 'blue' | 'purple';
    icon: React.ElementType;
    ctaText: string;
    popular?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
    name,
    price,
    description,
    features,
    limitations,
    color,
    icon: Icon,
    ctaText,
    popular,
}) => {
    const colorStyles = {
        green: {
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-400',
            button: 'bg-emerald-600 hover:bg-emerald-500',
            icon: 'text-emerald-400',
            glow: 'shadow-emerald-900/20',
        },
        blue: {
            border: 'border-blue-500/30',
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            button: 'bg-blue-600 hover:bg-blue-500',
            icon: 'text-blue-400',
            glow: 'shadow-blue-900/20',
        },
        purple: {
            border: 'border-purple-500/30',
            bg: 'bg-purple-500/10',
            text: 'text-purple-400',
            button: 'bg-purple-600 hover:bg-purple-500',
            icon: 'text-purple-400',
            glow: 'shadow-purple-900/20',
        },
    };

    const styles = colorStyles[color];

    return (
        <div className={`relative flex flex-col p-6 rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl ${styles.glow} ${popular ? 'ring-2 ring-brand-500 shadow-2xl scale-105 z-10' : ''}`}>
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-500 to-blue-600 rounded-full text-xs font-bold text-white shadow-lg uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <div className={`inline-flex p-3 rounded-xl bg-slate-900/50 mb-4 ${styles.icon}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                <p className="text-slate-400 text-sm h-10">{description}</p>
            </div>

            <div className="mb-8">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">{price}</span>
                    {price !== 'Free' && <span className="text-slate-500 ml-2">/ month</span>}
                </div>
            </div>

            <div className="flex-grow space-y-4 mb-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                        <Check className={`w-5 h-5 ${styles.text} mr-3 flex-shrink-0 mt-0.5`} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                ))}
                {limitations?.map((limitation, index) => (
                    <div key={`limit-${index}`} className="flex items-start opacity-60">
                        <X className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-500 text-sm">{limitation}</span>
                    </div>
                ))}
            </div>

            <button className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ${styles.button} shadow-lg shadow-black/20`}>
                {ctaText}
            </button>
        </div>
    );
};

const Pricing: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden" id="pricing">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-900/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Choose Your <span className="text-brand-400">Plan</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Unlock the full potential of video analysis with our tailored plans.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
                    <PricingTier
                        name="Normal"
                        price="€9"
                        description="For occasional users, students, and curious minds."
                        color="green"
                        icon={Zap}
                        ctaText="Start Free Trial"
                        features={[
                            "Up to 3 analyzed videos / month",
                            "Responses with gemini-2.5-flash",
                            "Basic semantic search (top 3 excerpts)",
                            "Chat history per video",
                            "Normal latency"
                        ]}
                        limitations={[
                            "No video re-analysis",
                            "No export",
                            "No multi-video questions"
                        ]}
                    />

                    <PricingTier
                        name="Pro"
                        price="€29"
                        description="For creators, advanced students, and professionals."
                        color="blue"
                        icon={Star}
                        ctaText="Get Started"
                        popular={true}
                        features={[
                            "Up to 15 analyzed videos / month",
                            "Up to 15 mins per video",
                            "Advanced chat with long context",
                            "Improved semantic search (top 8 excerpts)",
                            "Contextual questions ('Explain verify', 'Where was X?')",
                            "Partial video re-analysis (e.g., chapters)",
                            "Export summaries & Q&A",
                            "Medium priority queue",
                            "Gemini 2.5 Flash with Lite fallback"
                        ]}
                    />

                    <PricingTier
                        name="Expert"
                        price="€79–€99"
                        description="For teams, researchers, courses, and companies."
                        color="purple"
                        icon={Crown}
                        ctaText="Contact Sales"
                        features={[
                            "Up to 50 analyzed videos / month",
                            "Up to 40 mins per video",
                            "Cross-video questions",
                            "Deep context chat (top 15 excerpts)",
                            "Structured analysis (timelines, entities)",
                            "Advanced Export (Markdown / PDF)",
                            "API access (limited)",
                            "High priority (fewer 503s)",
                            "Response logs & auditing"
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Pricing;
