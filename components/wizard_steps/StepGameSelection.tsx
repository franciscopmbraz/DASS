import React from 'react';
import { Gamepad2, Crosshair, Swords } from 'lucide-react';

interface StepGameSelectionProps {
    selectedGame: string;
    onSelect: (game: string) => void;
}

const StepGameSelection: React.FC<StepGameSelectionProps> = ({ selectedGame, onSelect }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Choose your Game</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['League of Legends', 'Valorant', 'Counter Strike 2'].map((game) => (
                    <button
                        key={game}
                        onClick={() => onSelect(game)}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${selectedGame === game
                                ? 'border-purple-500 bg-purple-500/10 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                                : 'border-white/10 bg-[#09090b] text-gray-400 hover:border-white/30 hover:bg-[#27272a] hover:text-white'
                            }`}
                    >
                        {game === 'League of Legends' && <Swords size={32} className="mb-3" />}
                        {game === 'Valorant' && <Crosshair size={32} className="mb-3" />}
                        {game === 'Counter Strike 2' && <Gamepad2 size={32} className="mb-3" />}
                        <span className="font-bold text-center">{game}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StepGameSelection;
