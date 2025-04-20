
import React from 'react';

interface BreathingCircleProps {
  breathPhase: 'inhale' | 'hold' | 'exhale' | 'pause';
  countdown: number;
  isBreathing: boolean;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ 
  breathPhase, 
  countdown, 
  isBreathing 
}) => {
  const getAnimationClass = () => {
    if (!isBreathing) return '';
    
    // Only opacity animations, no size changes
    switch (breathPhase) {
      case 'inhale':
        return 'animate-[breathe-in_4s_ease-in-out_forwards]';
      case 'hold':
        return '';
      case 'exhale':
        return 'animate-[breathe-out_7s_ease-in-out_forwards]';
      case 'pause':
        return '';
      default:
        return '';
    }
  };

  // Even smaller fixed circle size
  const circleSize = 'w-[180px] h-[180px] sm:w-[250px] sm:h-[250px]';
  
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div 
        className={`breathe-circle flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm ${circleSize} ${getAnimationClass()}`}
      >
        <div className="text-center p-8">
          <div className="text-3xl sm:text-5xl font-medium text-primary-foreground mb-4">
            {countdown}
          </div>
          <div className="text-lg sm:text-2xl text-primary-foreground/80 capitalize">
            {breathPhase}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingCircle;
