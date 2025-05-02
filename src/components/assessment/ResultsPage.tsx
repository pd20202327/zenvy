
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatbot } from '@/contexts/ChatbotContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, FileText, ArrowRight, MessageSquare, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Assessment, AssessmentResult, AssessmentSectionKey } from '@/types/assessment';
import ResultsOverview from './ResultsOverview';
import SectionResult from './SectionResult';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { setAssessmentContext } = useChatbot();
  const [activeSection, setActiveSection] = React.useState<string>("overview");
  
  const navigateToChat = () => {
    setAssessmentContext({
      sectionScores: assessmentResult.sectionScores
    });
    navigate('/tools/chatbot');
  };
  
  const navigateToTools = () => {
    navigate('/tools');
  };
  
  const handleRetest = () => {
    resetAssessment();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Assessment Results</h1>
        <Button onClick={handleRetest} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Retest</span>
        </Button>
      </div>
      
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          This assessment is not a diagnostic tool. It's designed to help you understand your mental health needs.
          If your results indicate severe symptoms, please consider speaking with a mental health professional.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with section options */}
        <div className="md:w-72 flex-shrink-0">
          <div className="bg-card rounded-lg border p-2 mb-4 md:mb-0 md:sticky md:top-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
              <Button 
                onClick={() => setActiveSection("overview")} 
                variant={activeSection === "overview" ? "default" : "ghost"}
                className={cn(
                  "justify-start text-left py-3 h-auto",
                  activeSection === "overview" ? "bg-primary" : "",
                  "text-sm md:text-base font-medium"
                )}
              >
                Overview
              </Button>
              {sectionKeys.map(section => (
                <Button 
                  key={section} 
                  onClick={() => setActiveSection(section)}
                  variant={activeSection === section ? "default" : "ghost"}
                  className={cn(
                    "justify-start text-left py-3 h-auto min-h-[48px]",
                    activeSection === section ? "bg-primary" : "",
                    "text-xs md:text-sm font-medium break-words"
                  )}
                >
                  {assessment.sections[section].title.split('&')[0].trim()}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          {activeSection === "overview" && (
            <ResultsOverview 
              assessmentResult={assessmentResult}
              sectionKeys={sectionKeys}
              assessmentSections={assessment.sections}
              resetAssessment={resetAssessment}
              downloadResults={downloadResults}
            />
          )}
          
          {sectionKeys.map((section) => (
            activeSection === section && (
              <SectionResult
                key={section}
                sectionKey={section}
                sectionData={assessment.sections[section]}
                score={assessmentResult.sectionScores[section]}
                answers={assessment.answers}
                answerOptions={answerOptions}
              />
            )
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Self-Help Library</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Explore resources tailored to your assessment results.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={navigateToTools} variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Browse Resources
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Wellness Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Try interactive exercises to improve your mental wellbeing.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={navigateToTools} variant="outline" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" /> Explore Tools
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">AI Therapy Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Talk with our AI companion for emotional support and guidance.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={navigateToChat} variant="default" className="w-full bg-primary/90 hover:bg-primary/80">
                <MessageSquare className="mr-2 h-4 w-4" /> Start Chatting
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
