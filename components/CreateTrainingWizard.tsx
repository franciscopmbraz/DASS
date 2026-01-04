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
            // Ideally show an error toast here
        } finally {
            setLoading(false);
            if (!statusMessage.startsWith('Error')) {
                // Only clear if no error set above (though the logic here is tricky with state updates, let's just use a timeout or manual clear)
            }
            // For now, let's not auto-clear if it's an error so the user can read it.
            // If success, the component unmounts.
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-[#18181b] rounded-2xl w-full max-w-2xl border border-white/10 relative shadow-2xl flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-xl font-bold text-white">New Training Plan</h2>
                        <div className="flex gap-1 mt-2">
                            {[0, 1, 2, 3].map(s => (
                                <div key={s} className={`h-1 w-8 rounded-full transition-colors ${s <= step ? 'bg-purple-600' : 'bg-gray-700'}`} />
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <Loader2 size={48} className="text-purple-600 animate-spin mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Creating your Plan</h3>
                            <p className="text-gray-400">{statusMessage}</p>
                        </div>
                    ) : (
                        <>
                            {statusMessage.startsWith('Error') && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-2 bg-red-500/20 rounded-lg">⚠️</div>
                                    <div>
                                        <h4 className="font-bold text-red-100">Something went wrong</h4>
                                        <p className="text-sm">{statusMessage}</p>
                                    </div>
                                </div>
                            )}
                            {renderCurrentStep()}
                        </>
                    )}
                </div>

                {/* Footer */}
                {!loading && step > 0 && (
                    <div className="p-6 border-t border-white/10 flex justify-between bg-[#1f1f23] rounded-b-2xl">
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>

                        {step < totalSteps - 1 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-purple-900/20"
                            >
                                Next <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-green-900/20"
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
