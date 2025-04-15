
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BreathingPattern } from './types';

interface PatternSelectorProps {
  selectedPattern: BreathingPattern;
  onPatternChange: (patternId: string) => void;
  patterns: BreathingPattern[];
}

const PatternSelector: React.FC<PatternSelectorProps> = ({
  selectedPattern,
  onPatternChange,
  patterns
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Breathing Patterns</CardTitle>
        <CardDescription>Select a pattern to begin</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="4-7-8" value={selectedPattern.id} onValueChange={onPatternChange} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="4-7-8">4-7-8</TabsTrigger>
            <TabsTrigger value="box">Box</TabsTrigger>
            <TabsTrigger value="deep">Deep</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium">{selectedPattern.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedPattern.description}</p>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 bg-muted/50 rounded">
                <div className="text-lg font-semibold">{selectedPattern.inhale}</div>
                <div className="text-xs">Inhale</div>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded">
                <div className="text-lg font-semibold">{selectedPattern.hold1}</div>
                <div className="text-xs">Hold</div>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded">
                <div className="text-lg font-semibold">{selectedPattern.exhale}</div>
                <div className="text-xs">Exhale</div>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded">
                <div className="text-lg font-semibold">{selectedPattern.hold2}</div>
                <div className="text-xs">Hold</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm">Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                {selectedPattern.benefits.map((benefit, index) => (
                  <li key={index}>• {benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatternSelector;
