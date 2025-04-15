
import React from 'react';
import { AssessmentSectionKey } from '@/types/assessment';
import { assessmentQuestions, assessmentSections, answerOptions } from '@/data/assessmentData';
import { AssessmentHeader, PrivacyNotice } from '@/components/assessment/AssessmentHeader';
import QuestionDisplay from '@/components/assessment/QuestionDisplay';
import NavigationControls from '@/components/assessment/NavigationControls';
import SectionTabs from '@/components/assessment/SectionTabs';
import ResultsPage from '@/components/assessment/ResultsPage';
import { useAssessmentState } from '@/hooks/useAssessmentState';
import { useAssessmentNavigation } from '@/hooks/useAssessmentNavigation';
import { useAssessmentScoring } from '@/hooks/useAssessmentScoring';
import { useAssessmentProgress } from '@/hooks/useAssessmentProgress';

const AssessmentPage: React.FC = () => {
  const allQuestions = assessmentQuestions;
  const sectionKeys = Object.keys(assessmentSections) as AssessmentSectionKey[];
  
  const {
    currentSection,
    setCurrentSection,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    assessment,
    showResults,
    setShowResults,
    setAnswer,
    resetAssessment
  } = useAssessmentState();
  
  // Get questions for current section
  const currentSectionQuestions = assessmentSections[currentSection].questions;
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  const { assessmentResult, calculateResults, downloadResults } = useAssessmentScoring({
    assessment,
    sectionKeys,
    setShowResults
  });
  
  const { goToPrevious, goToNext } = useAssessmentNavigation({
    currentQuestionIndex,
    currentSectionQuestions,
    currentSection,
    sectionKeys,
    setCurrentQuestionIndex,
    setCurrentSection,
    calculateResults,
    assessmentSections
  });
  
  const { sectionProgress, overallProgress, answeredQuestionsCount } = useAssessmentProgress({
    currentQuestionIndex,
    currentSectionQuestions,
    answers: assessment.answers,
    allQuestions
  });

  // Handle answer selection
  const handleAnswerSelection = (value: number) => {
    setAnswer(currentQuestion.id, value);
    
    // Automatically proceed to next question
    setTimeout(() => {
      goToNext();
    }, 300); // Small delay for better UX
  };

  if (showResults && assessmentResult) {
    return (
      <ResultsPage
        assessment={assessment}
        assessmentResult={assessmentResult}
        sectionKeys={sectionKeys}
        resetAssessment={resetAssessment}
        downloadResults={downloadResults}
        answerOptions={answerOptions}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <AssessmentHeader />
      
      <SectionTabs
        sectionKeys={sectionKeys}
        assessmentSections={assessmentSections}
        currentSection={currentSection}
        assessment={assessment}
      />
      
      <QuestionDisplay
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentSectionQuestions.length}
        sectionProgress={sectionProgress}
        sectionTitle={assessmentSections[currentSection].title}
        sectionDescription={assessmentSections[currentSection].description}
        iconClass={assessmentSections[currentSection].iconClass}
        selectedAnswer={assessment.answers[currentQuestion.id]}
        setAnswer={handleAnswerSelection}
        answerOptions={answerOptions}
      />
      
      <NavigationControls
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        isFirstQuestion={currentQuestionIndex === 0}
        isFirstSection={sectionKeys.indexOf(currentSection) === 0}
        isLastQuestion={currentQuestionIndex === currentSectionQuestions.length - 1}
        isLastSection={sectionKeys.indexOf(currentSection) === sectionKeys.length - 1}
        currentAnswerSelected={assessment.answers[currentQuestion.id] !== undefined}
        overallProgress={overallProgress}
        answeredQuestionsCount={answeredQuestionsCount}
        totalQuestionsCount={allQuestions.length}
      />
      
      <div className="mt-6">
        <PrivacyNotice />
      </div>
    </div>
  );
};

export default AssessmentPage;
