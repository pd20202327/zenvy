
import { useMemo } from 'react';
import { AssessmentSectionKey } from '@/types/assessment';

interface UseAssessmentProgressProps {
  currentQuestionIndex: number;
  currentSectionQuestions: any[];
  answers: Record<number, number>;
  allQuestions: any[];
}

export const useAssessmentProgress = ({
  currentQuestionIndex,
  currentSectionQuestions,
  answers,
  allQuestions
}: UseAssessmentProgressProps) => {
  
  // Calculate progress for current section
  const sectionProgress = useMemo(() => {
    return (currentQuestionIndex + 1) / currentSectionQuestions.length * 100;
  }, [currentQuestionIndex, currentSectionQuestions.length]);
  
  // Calculate overall progress
  const answeredQuestionsCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);
  
  const overallProgress = useMemo(() => {
    return (answeredQuestionsCount / allQuestions.length) * 100;
  }, [answeredQuestionsCount, allQuestions.length]);

  return {
    sectionProgress,
    overallProgress,
    answeredQuestionsCount
  };
};
