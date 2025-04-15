
import { useState } from 'react';
import { Assessment, AssessmentSectionKey } from '@/types/assessment';
import { assessmentSections } from '@/data/assessmentData';

export const useAssessmentState = () => {
  const [currentSection, setCurrentSection] = useState<AssessmentSectionKey>('mood');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessment, setAssessment] = useState<Assessment>({
    sections: assessmentSections,
    answers: {}
  });
  const [showResults, setShowResults] = useState(false);

  // Set answer for current question
  const setAnswer = (questionId: number, value: number) => {
    const updatedAnswers = { ...assessment.answers, [questionId]: value };
    setAssessment({ ...assessment, answers: updatedAnswers });
  };

  // Reset assessment to initial state
  const resetAssessment = () => {
    setAssessment({ sections: assessmentSections, answers: {} });
    setCurrentSection('mood');
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  return {
    currentSection,
    setCurrentSection,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    assessment,
    setAssessment,
    showResults,
    setShowResults,
    setAnswer,
    resetAssessment
  };
};
