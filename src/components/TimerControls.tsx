
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  isBreak: boolean;
}

const TimerControls = ({ isActive, onToggle, onReset, isBreak }: TimerControlsProps) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Reset Button */}
      <button
        onClick={onReset}
        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <RotateCcw size={20} />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={onToggle}
        className={`p-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
          isBreak
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
        }`}
        style={{
          boxShadow: `0 8px 32px ${isBreak ? '#60a5fa40' : '#34d39940'}`,
        }}
      >
        {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>

      {/* Spacer for symmetry */}
      <div className="w-12" />
    </div>
  );
};

export default TimerControls;
