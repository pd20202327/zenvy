
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavigationControlsProps {
  goToPrevious: () => void;
  goToNext: () => void;
  isFirstQuestion: boolean;
  isFirstSection: boolean;
  isLastQuestion: boolean;
  isLastSection: boolean;
  currentAnswerSelected: boolean;
  overallProgress: number;
  answeredQuestionsCount: number;
  totalQuestionsCount: number;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  goToPrevious,
  goToNext,
  isFirstQuestion,
  isFirstSection,
  isLastQuestion,
  isLastSection,
  currentAnswerSelected,
  overallProgress,
  answeredQuestionsCount,
  totalQuestionsCount,
}) => {
  const isPreviousDisabled = isFirstQuestion && isFirstSection;
  const showViewResults = isLastQuestion && isLastSection;

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Overall Progress
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>You've answered {answeredQuestionsCount} of {totalQuestionsCount} questions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Progress value={overallProgress} className="h-1 mt-1 w-32" />
      </div>
      
      <div className="space-x-2">
        <Button 
          variant="outline" 
          onClick={goToPrevious}
          disabled={isPreviousDisabled}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        
        <Button 
          onClick={goToNext}
          disabled={!currentAnswerSelected}
        >
          {!showViewResults ? (
            <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
          ) : (
            'View Results'
          )}
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
