
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SectionResultProps {
  sectionKey: string;
  sectionData: any;
  score: {
    score: number;
    maxScore: number;
    percentage: number;
    severityLabel: string;
    severityDescription: string;
  };
  answers: Record<number, number>;
  answerOptions: { value: number; label: string }[];
}

const SectionResult: React.FC<SectionResultProps> = ({
  sectionKey,
  sectionData,
  score,
  answers,
  answerOptions,
}) => {
  return (
    <Card>
      <CardHeader className={sectionData.iconClass}>
        <CardTitle>{sectionData.title}</CardTitle>
        <CardDescription className="text-foreground/80">
          {sectionData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Your Result: {score.severityLabel}</span>
            <span className="text-sm">{score.score} out of {score.maxScore} points</span>
          </div>
          <Progress value={score.percentage} className="h-3" />
          
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="font-medium">{score.severityDescription}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Your responses:</h3>
            <ul className="space-y-3">
              {sectionData.questions.map((question: any) => (
                <li key={question.id} className="flex justify-between items-center p-2 rounded hover:bg-muted/50">
                  <span>{question.text}</span>
                  <span className="font-medium">
                    {answerOptions[answers[question.id] || 0].label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionResult;
