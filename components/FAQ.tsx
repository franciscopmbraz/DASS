import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What does this platform do?",
        answer: "Our platform uses artificial intelligence to analyze gameplay videos and create personalized training programs designed to improve specific aspects of a player’s performance."
    },
    {
        question: "How does the AI analyze my gameplay?",
        answer: "The AI reviews your uploaded gameplay videos, identifies patterns, mistakes, strengths, and weaknesses, and compares them with optimal gameplay models to generate actionable insights."
    },
    {
        question: "What kind of games are supported?",
        answer: "The platform supports a wide range of competitive and casual games. Supported titles may vary, and new games are added regularly."
    },
    {
        question: "What type of improvements can I expect?",
        answer: "Improvements can include mechanics, decision-making, positioning, reaction time, strategy, consistency, and other gameplay-specific skills depending on the game."
    },
    {
        question: "How are the training sessions created?",
        answer: "Based on the video analysis and user data, the AI generates custom drills, exercises, and recommendations tailored to your skill level and the areas that need improvement."
    },
    {
        question: "Is this platform suitable for beginners?",
        answer: "Yes. The platform adapts to all skill levels, from beginners to advanced and competitive players."
    },
    {
        question: "Do I need special hardware or software?",
        answer: "No special hardware is required. You only need a way to record your gameplay and upload the video to the platform."
    },
    {
        question: "How long does the analysis take?",
        answer: "Analysis time depends on the video length and complexity, but most results are available within a short period after upload."
    },
    {
        question: "Can I track my progress over time?",
        answer: "Yes. The platform allows you to track improvements, compare past performances, and see how your gameplay evolves over time."
    },
    {
        question: "Is my gameplay data secure?",
        answer: "Yes. All uploaded videos and personal data are handled securely and used only for analysis and improvement purposes."
    },
    {
        question: "Can I use the platform for team or multiplayer analysis?",
        answer: "Yes. The platform can analyze individual performance as well as team-based gameplay, depending on the game."
    },
    {
        question: "How often should I upload gameplay videos?",
        answer: "For best results, regular uploads are recommended so the AI can continuously adapt training to your progress."
    },
    {
        question: "How do I get started?",
        answer: "Simply create an account, upload your gameplay video, and let the AI analyze your performance and generate your personalized training plan."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>
            <div className="absolute -left-20 top-40 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Everything you need to know about GameCoach AI and how it helps you win.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border transition-all duration-300 rounded-xl overflow-hidden ${openIndex === index
                                    ? 'bg-slate-900 border-brand-500/50 shadow-[0_0_20px_rgba(45,212,191,0.1)]'
                                    : 'bg-slate-900/50 border-white/5 hover:border-white/10'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-bold pr-8 transition-colors ${openIndex === index ? 'text-brand-400' : 'text-white'
                                    }`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-brand-400 shrink-0" size={20} />
                                ) : (
                                    <ChevronDown className="text-slate-500 shrink-0" size={20} />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
