
import React from 'react';

interface CircularProgressProps {
  progress: number;
  isBreak: boolean;
  time: string;
}

const CircularProgress = ({ progress, isBreak, time }: CircularProgressProps) => {
  const radius = 120;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Background Circle */}
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-all duration-500"
      >
        {/* Background track */}
        <circle
          stroke="#f1f5f9"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={isBreak ? "#60a5fa" : "#34d399"}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${isBreak ? '#60a5fa40' : '#34d39940'})`,
          }}
        />
      </svg>
      
      {/* Time Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-light text-gray-800 mb-1 transition-all duration-300">
            {time}
          </div>
          <div className={`text-xs font-medium transition-all duration-300 ${
            isBreak ? 'text-blue-500' : 'text-emerald-500'
          }`}>
            {isBreak ? 'BREAK' : 'FOCUS'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
