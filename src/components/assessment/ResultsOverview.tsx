
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileDown } from 'lucide-react';
import { AssessmentResult, AssessmentSectionKey } from '@/types/assessment';

interface ResultsOverviewProps {
  assessmentResult: AssessmentResult;
  sectionKeys: AssessmentSectionKey[];
  assessmentSections: any;
  resetAssessment: () => void;
  downloadResults: () => void;
}

const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  assessmentResult,
  sectionKeys,
  assessmentSections,
  resetAssessment,
  downloadResults,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Overview</CardTitle>
        <CardDescription>
          Summary of your scores across all sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sectionKeys.map((section) => {
            const score = assessmentResult.sectionScores[section];
            return (
              <div key={section} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{assessmentSections[section].title}</span>
                  <span>
                    <span className={`font-semibold ${score.percentage > 60 ? 'text-destructive' : 'text-primary'}`}>
                      {score.severityLabel}
                    </span> 
                    ({score.score}/{score.maxScore})
                  </span>
                </div>
                <Progress value={score.percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={resetAssessment} className="w-full sm:w-auto">
          Retake Assessment
        </Button>
        <Button onClick={downloadResults} className="w-full sm:w-auto">
          <FileDown className="mr-2 h-4 w-4" /> Download Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsOverview;
