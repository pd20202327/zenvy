
import React from 'react';
import { Button } from '@/components/ui/button';
import { BreathingPattern } from './types';

interface PatternSelectorProps {
  patterns: BreathingPattern[];
  selectedPattern: BreathingPattern;
  onPatternChange: (patternId: string) => void;
}

const PatternSelector: React.FC<PatternSelectorProps> = ({ 
  patterns, 
  selectedPattern, 
  onPatternChange 
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Breathing Patterns</h2>
      
      <div className="space-y-4">
        {patterns.map((pattern) => (
          <Button
            key={pattern.id}
            variant={selectedPattern.id === pattern.id ? "default" : "outline"}
            className="w-full min-h-[160px] sm:min-h-[140px] justify-start flex flex-col items-start p-6"
            onClick={() => onPatternChange(pattern.id)}
          >
            <div className="text-left w-full">
              <div className="text-lg font-semibold mb-2">{pattern.name}</div>
              <div className="text-sm text-muted-foreground break-words whitespace-normal">
                {pattern.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PatternSelector;
