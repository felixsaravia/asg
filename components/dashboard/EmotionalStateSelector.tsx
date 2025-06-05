
import React from 'react';
import { EmotionalFeeling } from '../../types';

interface EmotionalStateSelectorProps {
  currentFeeling: EmotionalFeeling | null;
  onFeelingSelect: (feeling: EmotionalFeeling) => void;
}

const feelingOptions: { feeling: EmotionalFeeling; emoji: string; color: string }[] = [
  { feeling: EmotionalFeeling.Feliz, emoji: '😊', color: 'bg-yellow-400 hover:bg-yellow-500' },
  { feeling: EmotionalFeeling.Calmado, emoji: '😌', color: 'bg-green-400 hover:bg-green-500' },
  { feeling: EmotionalFeeling.Entusiasmado, emoji: '🤩', color: 'bg-orange-400 hover:bg-orange-500' },
  { feeling: EmotionalFeeling.Neutral, emoji: '😐', color: 'bg-slate-400 hover:bg-slate-500' },
  { feeling: EmotionalFeeling.Ansioso, emoji: '😟', color: 'bg-blue-400 hover:bg-blue-500' },
  { feeling: EmotionalFeeling.Triste, emoji: '😢', color: 'bg-indigo-400 hover:bg-indigo-500' },
  { feeling: EmotionalFeeling.Enojado, emoji: '😠', color: 'bg-red-400 hover:bg-red-500' },
];

export const EmotionalStateSelector: React.FC<EmotionalStateSelectorProps> = ({ currentFeeling, onFeelingSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {feelingOptions.map((option) => (
        <button
          key={option.feeling}
          onClick={() => onFeelingSelect(option.feeling)}
          className={`p-2 sm:p-3 rounded-lg text-2xl sm:text-3xl transition-all duration-150 ease-in-out transform hover:scale-110
            ${option.color}
            ${currentFeeling === option.feeling ? 'ring-4 ring-offset-2 ring-primary-dark shadow-lg scale-110' : 'shadow-md'}`}
          title={option.feeling}
          aria-pressed={currentFeeling === option.feeling}
        >
          {option.emoji}
        </button>
      ))}
    </div>
  );
};
    