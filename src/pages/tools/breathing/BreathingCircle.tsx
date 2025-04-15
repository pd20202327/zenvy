
import React, { useEffect, useRef } from 'react';
import { BreathPhase } from './types';
import { useTheme } from '@/contexts/ThemeContext';

interface BreathingCircleProps {
  breathPhase: BreathPhase;
  countdown: number;
  isBreathing: boolean;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({
  breathPhase,
  countdown,
  isBreathing
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!circleRef.current) return;
    
    circleRef.current.classList.remove('scale-100', 'scale-125', 'opacity-50', 'opacity-80', 'opacity-100');
    
    switch (breathPhase) {
      case BreathPhase.INHALE:
        circleRef.current.classList.add('scale-125', 'opacity-100');
        break;
      case BreathPhase.HOLD1:
        circleRef.current.classList.add('scale-125', 'opacity-80');
        break;
      case BreathPhase.EXHALE:
        circleRef.current.classList.add('scale-100', 'opacity-50');
        break;
      case BreathPhase.HOLD2:
        circleRef.current.classList.add('scale-100', 'opacity-80');
        break;
    }
  }, [breathPhase]);

  const getCircleColor = () => {
    if (isDarkMode) {
      return breathPhase === BreathPhase.INHALE ? 'bg-primary/30' : 'bg-primary/20';
    }
    return breathPhase === BreathPhase.INHALE ? 'bg-primary/30' : 'bg-primary/15';
  };

  return (
    <div className="relative flex justify-center items-center mb-8">
      <div 
        ref={circleRef}
        className={`w-56 h-56 rounded-full transition-all duration-[1.5s] ease-in-out scale-100 opacity-50 ${getCircleColor()}`}
      />
      {isBreathing && (
        <div className="absolute text-4xl font-bold">{countdown}</div>
      )}
    </div>
  );
};

export default BreathingCircle;
