
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock, ArrowLeft, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import PatternSelector from './breathing/PatternSelector';
import BreathingCircle from './breathing/BreathingCircle';
import { useBreathingLogic } from './breathing/useBreathingLogic';
import { breathingPatterns } from './breathing/breathingPatterns';
import { BreathingPattern } from './breathing/types';

const Breathing: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  
  const {
    isBreathing,
    breathPhase,
    countdown,
    breathCount,
    isMuted,
    setIsMuted,
    toggleBreathing
  } = useBreathingLogic(selectedPattern);

  const changePattern = (patternId: string) => {
    if (isBreathing) {
      toggleBreathing();
    }
    const newPattern = breathingPatterns.find(p => p.id === patternId) || breathingPatterns[0];
    setSelectedPattern(newPattern);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/tools">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Breathing Exercises</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <PatternSelector
            selectedPattern={selectedPattern}
            onPatternChange={changePattern}
            patterns={breathingPatterns}
          />
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="text-center pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Breaths: {breathCount}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="text-5xl font-bold mb-4">{breathPhase}</div>
              
              <BreathingCircle
                breathPhase={breathPhase}
                countdown={countdown}
                isBreathing={isBreathing}
              />
              
              <Button 
                size="lg" 
                onClick={toggleBreathing}
                className="text-lg font-semibold px-8"
              >
                {isBreathing ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" /> Start
                  </>
                )}
              </Button>
            </CardContent>
            
            <CardFooter>
              <Alert className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Find a comfortable position, sit up straight, and try to focus solely on your breath.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Breathing;
