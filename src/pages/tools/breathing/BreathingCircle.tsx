
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

  const baseSize = 200;
  const phaseSize = {
    inhale: isBreathing ? baseSize * 1.5 : baseSize,
    hold: baseSize * 1.5,
    exhale: isBreathing ? baseSize : baseSize * 1.5,
    pause: baseSize
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div 
        className={`breathe-circle flex items-center justify-center ${getAnimationClass()}`}
        style={{ 
          width: `${phaseSize[breathPhase]}px`, 
          height: `${phaseSize[breathPhase]}px`,
          transition: 'width 3s, height 3s'
        }}
      >
        <div className="text-center">
          <div className="text-3xl font-medium text-primary-foreground">{countdown}</div>
          <div className="text-xl text-primary-foreground/80 capitalize">
            {breathPhase}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingCircle;
