
import { AssessmentSectionKey } from '@/types/assessment';

interface UseAssessmentNavigationProps {
  currentQuestionIndex: number;
  currentSectionQuestions: any[];
  currentSection: AssessmentSectionKey;
  sectionKeys: AssessmentSectionKey[];
  setCurrentQuestionIndex: (index: number) => void;
  setCurrentSection: (section: AssessmentSectionKey) => void;
  calculateResults: () => void;
  assessmentSections: any;
}

export const useAssessmentNavigation = ({
  currentQuestionIndex,
  currentSectionQuestions,
  currentSection,
  sectionKeys,
  setCurrentQuestionIndex,
  setCurrentSection,
  calculateResults,
  assessmentSections
}: UseAssessmentNavigationProps) => {
  
  // Navigate to previous question
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Move to previous section if at first question
      const currentSectionIndex = sectionKeys.indexOf(currentSection);
      if (currentSectionIndex > 0) {
        const prevSection = sectionKeys[currentSectionIndex - 1] as AssessmentSectionKey;
        setCurrentSection(prevSection);
        setCurrentQuestionIndex(assessmentSections[prevSection].questions.length - 1);
      }
    }
  };

  // Navigate to next question
  const goToNext = () => {
    // If there are more questions in this section
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next section
      const currentSectionIndex = sectionKeys.indexOf(currentSection);
      if (currentSectionIndex < sectionKeys.length - 1) {
        setCurrentSection(sectionKeys[currentSectionIndex + 1] as AssessmentSectionKey);
        setCurrentQuestionIndex(0);
      } else {
        // End of assessment
        calculateResults();
      }
    }
  };

  return {
    goToPrevious,
    goToNext
  };
};
