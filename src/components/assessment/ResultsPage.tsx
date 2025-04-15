
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, FileText, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Assessment, AssessmentResult, AssessmentSectionKey } from '@/types/assessment';
import ResultsOverview from './ResultsOverview';
import SectionResult from './SectionResult';

interface ResultsPageProps {
  assessment: Assessment;
  assessmentResult: AssessmentResult;
  sectionKeys: AssessmentSectionKey[];
  resetAssessment: () => void;
  downloadResults: () => void;
  answerOptions: { value: number; label: string }[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  assessment,
  assessmentResult,
  sectionKeys,
  resetAssessment,
  downloadResults,
  answerOptions
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Your Assessment Results</h1>
      
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          This assessment is not a diagnostic tool. It's designed to help you understand your mental health needs.
          If your results indicate severe symptoms, please consider speaking with a mental health professional.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {sectionKeys.map(section => (
            <TabsTrigger key={section} value={section}>
              {assessment.sections[section].title.split('&')[0].trim()}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <ResultsOverview 
            assessmentResult={assessmentResult}
            sectionKeys={sectionKeys}
            assessmentSections={assessment.sections}
            resetAssessment={resetAssessment}
            downloadResults={downloadResults}
          />
        </TabsContent>
        
        {sectionKeys.map((section) => (
          <TabsContent key={section} value={section} className="space-y-6">
            <SectionResult
              sectionKey={section}
              sectionData={assessment.sections[section]}
              score={assessmentResult.sectionScores[section]}
              answers={assessment.answers}
              answerOptions={answerOptions}
            />
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Self-Help Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Explore resources tailored to your assessment results.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tools">
                  <FileText className="mr-2 h-4 w-4" /> Browse Resources
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Wellness Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Try interactive exercises to improve your mental wellbeing.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tools">
                  <ArrowRight className="mr-2 h-4 w-4" /> Explore Tools
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
