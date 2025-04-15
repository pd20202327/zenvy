
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AssessmentQuestion } from '@/types/assessment';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface QuestionDisplayProps {
  currentQuestion: AssessmentQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  sectionProgress: number;
  sectionTitle: string;
  sectionDescription: string;
  iconClass: string;
  selectedAnswer: number | undefined;
  setAnswer: (value: number) => void;
  answerOptions: { value: number; label: string }[];
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  sectionProgress,
  sectionTitle,
  sectionDescription,
  iconClass,
  selectedAnswer,
  setAnswer,
  answerOptions,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className={iconClass}>
        <CardTitle>{sectionTitle}</CardTitle>
        <CardDescription className="text-foreground/80">
          {sectionDescription}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>Section Progress</span>
          </div>
          <Progress value={sectionProgress} className="h-2" />
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-6">{currentQuestion.text}</h3>
          
          <RadioGroup 
            value={selectedAnswer?.toString() || ""}
            onValueChange={(value) => setAnswer(parseInt(value))}
            className="space-y-3"
          >
            {answerOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value.toString()} 
                  id={`option-${currentQuestion.id}-${option.value}`} 
                />
                <Label 
                  htmlFor={`option-${currentQuestion.id}-${option.value}`} 
                  className="cursor-pointer w-full py-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;
