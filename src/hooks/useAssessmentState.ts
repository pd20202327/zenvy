
import { useState, useEffect } from 'react';
import { Assessment, AssessmentSectionKey } from '@/types/assessment';
import { assessmentSections } from '@/data/assessmentData';

export const useAssessmentState = () => {
  // Load saved assessment state from localStorage
  const [currentSection, setCurrentSection] = useState<AssessmentSectionKey>(() => {
    const savedSection = localStorage.getItem('currentSection');
    return (savedSection as AssessmentSectionKey) || 'mood';
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  
  const [assessment, setAssessment] = useState<Assessment>(() => {
    const savedAssessment = localStorage.getItem('assessment');
    return savedAssessment 
      ? JSON.parse(savedAssessment) 
      : { sections: assessmentSections, answers: {} };
  });
  
  const [showResults, setShowResults] = useState(() => {
    const savedResults = localStorage.getItem('showResults');
    return savedResults === 'true';
  });
  
  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('currentSection', currentSection);
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
    localStorage.setItem('assessment', JSON.stringify(assessment));
    localStorage.setItem('showResults', showResults.toString());
  }, [currentSection, currentQuestionIndex, assessment, showResults]);

  // Set answer for current question
  const setAnswer = (questionId: number, value: number) => {
    const updatedAnswers = { ...assessment.answers, [questionId]: value };
    setAssessment({ ...assessment, answers: updatedAnswers });
  };

  // Reset assessment to initial state (clear localStorage for assessment data)
  const resetAssessment = () => {
    setAssessment({ sections: assessmentSections, answers: {} });
    setCurrentSection('mood');
    setCurrentQuestionIndex(0);
    setShowResults(false);
    
    // Clear assessment data from localStorage
    localStorage.removeItem('currentSection');
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('assessment');
    localStorage.removeItem('showResults');
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
