import React from 'react';
import { Gamepad2, Crosshair, Swords } from 'lucide-react';

interface StepGameSelectionProps {
    selectedGame: string;
    onSelect: (game: string) => void;
}

const StepGameSelection: React.FC<StepGameSelectionProps> = ({ selectedGame, onSelect }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Choose your Game</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['League of Legends', 'Valorant', 'Counter Strike 2'].map((game) => (
                    <button
                        key={game}
                        onClick={() => onSelect(game)}
                        className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 group ${selectedGame === game
                            ? 'border-brand-500 bg-brand-500/10 text-white shadow-[0_0_30px_rgba(20,184,166,0.2)] transform -translate-y-1'
                            : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-brand-500/50 hover:bg-slate-800 hover:text-white hover:shadow-lg'
                            }`}
                    >
                        <div className={`mb-4 p-4 rounded-full transition-colors ${selectedGame === game ? 'bg-brand-500 text-slate-900' : 'bg-white/5 text-slate-500 group-hover:bg-brand-500/20 group-hover:text-brand-400'}`}>
                            {game === 'League of Legends' && <Swords size={32} />}
                            {game === 'Valorant' && <Crosshair size={32} />}
                            {game === 'Counter Strike 2' && <Gamepad2 size={32} />}
                        </div>
                        <span className="font-bold text-center text-lg">{game}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StepGameSelection;
