
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import CircularProgress from './CircularProgress';
import TimerControls from './TimerControls';
import { useToast } from '@/hooks/use-toast';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [session, setSession] = useState(1);
  const { toast } = useToast();

  const workDuration = 25 * 60; // 25 minutes
  const breakDuration = 5 * 60; // 5 minutes

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeLeft(isBreak ? breakDuration : workDuration);
  }, [isBreak, workDuration, breakDuration]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const switchMode = useCallback(() => {
    const newIsBreak = !isBreak;
    setIsBreak(newIsBreak);
    setTimeLeft(newIsBreak ? breakDuration : workDuration);
    setIsActive(false);
    
    if (!newIsBreak) {
      setSession(prev => prev + 1);
    }

    toast({
      title: newIsBreak ? "Time for a break!" : "Back to work!",
      description: newIsBreak 
        ? "Take a well-deserved 5-minute break." 
        : "Ready to start another focused session?",
    });
  }, [isBreak, breakDuration, workDuration, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      switchMode();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, switchMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDuration = isBreak ? breakDuration : workDuration;
  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-8 text-center transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/60">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800 mb-2">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Session {session}
        </p>
      </div>

      {/* Circular Progress Timer */}
      <div className="mb-8">
        <CircularProgress 
          progress={progress} 
          isBreak={isBreak}
          time={formatTime(timeLeft)}
        />
      </div>

      {/* Controls */}
      <TimerControls 
        isActive={isActive}
        onToggle={toggleTimer}
        onReset={reset}
        isBreak={isBreak}
      />

      {/* Mode Indicator */}
      <div className="mt-6 flex items-center justify-center space-x-3">
        <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
          !isBreak ? 'bg-emerald-400 scale-125' : 'bg-gray-300'
        }`} />
        <span className="text-xs text-gray-500 font-medium">FOCUS</span>
        <div className="h-px w-8 bg-gray-200" />
        <span className="text-xs text-gray-500 font-medium">BREAK</span>
        <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
          isBreak ? 'bg-blue-400 scale-125' : 'bg-gray-300'
        }`} />
      </div>
    </div>
  );
};

export default PomodoroTimer;
