import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { createTraining } from '../services/trainingService';
import { geminiService } from '../services/geminiService';
import StepGameSelection from './wizard_steps/StepGameSelection';
import StepGeneralInfo from './wizard_steps/StepGeneralInfo';
import StepLoL from './wizard_steps/StepLoL';
import StepValorant from './wizard_steps/StepValorant';
import StepCS2 from './wizard_steps/StepCS2';
import StepReview from './wizard_steps/StepReview';

interface CreateTrainingWizardProps {
    onClose: () => void;
    onCreated: () => void;
}

const CreateTrainingWizard: React.FC<CreateTrainingWizardProps> = ({ onClose, onCreated }) => {
    const [step, setStep] = useState(0);
    const [game, setGame] = useState('');
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const totalSteps = 4;

    const handleGameSelect = (selectedGame: string) => {
        setGame(selectedGame);
        setFormData({ ...formData, game: selectedGame });
        setStep(1);
    };

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step < totalSteps - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setStatusMessage('Generating personalized plan with AI...');

        try {
            // 1. Generate AI Plan
            const generatedPlan = await geminiService.generateTrainingPlan(game, formData);

            // 2. Save to Database
            setStatusMessage('Saving training plan...');
            await createTraining({
                game,
                title: formData.title || `${game} Training Plan`,
                description: formData.description || 'AI Generated Plan',
                details: {
                    answers: formData,
                    schedule: generatedPlan
                }
            });

            onCreated();
            onClose();
        } catch (error) {
            console.error('Error creating training:', error);
            setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const renderCurrentStep = () => {
        switch (step) {
            case 0:
                return <StepGameSelection selectedGame={game} onSelect={handleGameSelect} />;
            case 1:
                return <StepGeneralInfo data={formData} onChange={handleChange} />;
            case 2:
                if (game === 'League of Legends') return <StepLoL data={formData} onChange={handleChange} />;
                if (game === 'Valorant') return <StepValorant data={formData} onChange={handleChange} />;
                if (game === 'Counter Strike 2') return <StepCS2 data={formData} onChange={handleChange} />;
                return <div>Unknown Game</div>;
            case 3:
                return <StepReview data={formData} onChange={handleChange} game={game} />;
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900/90 rounded-3xl w-full max-w-2xl border border-white/10 relative shadow-2xl shadow-brand-900/10 flex flex-col max-h-[90vh] overflow-hidden backdrop-blur-xl">

                {/* Background Blobs (Decoration) */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10 bg-white/5">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">New Training Plan</h2>
                        <div className="flex gap-2 mt-3">
                            {[0, 1, 2, 3].map(s => (
                                <div
                                    key={s}
                                    className={`h-1.5 w-10 index-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-slate-700'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1 relative z-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-brand-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                                <Loader2 size={56} className="text-brand-500 animate-spin relative z-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Creating your Plan</h3>
                            <p className="text-slate-400 animate-pulse">{statusMessage}</p>
                        </div>
                    ) : (
                        <>
                            {statusMessage.startsWith('Error') && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-2 bg-red-500/20 rounded-lg">⚠️</div>
                                    <div>
                                        <h4 className="font-bold text-red-100">Something went wrong</h4>
                                        <p className="text-sm text-red-300">{statusMessage}</p>
                                    </div>
                                </div>
                            )}
                            <div className="animate-in slide-in-from-right-4 duration-300 fade-in">
                                {renderCurrentStep()}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!loading && step > 0 && (
                    <div className="p-6 border-t border-white/5 flex justify-between bg-black/20 backdrop-blur-md sticky bottom-0 z-20">
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-2 text-slate-400 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors hover:bg-white/5"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>

                        {step < totalSteps - 1 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5"
                            >
                                Next <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5"
                            >
                                Create Plan <Check size={18} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateTrainingWizard;
