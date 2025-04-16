
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
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-2">Breathing Patterns</h2>
      
      <div className="space-y-2">
        {patterns.map((pattern) => (
          <Button
            key={pattern.id}
            variant={selectedPattern.id === pattern.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onPatternChange(pattern.id)}
          >
            <div className="text-left">
              <div className="font-medium">{pattern.name}</div>
              <div className="text-xs text-muted-foreground">
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
