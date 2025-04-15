
import { Assessment, AssessmentSectionKey } from '@/types/assessment';

interface UseSectionStatusProps {
  assessment: Assessment;
  currentSection: AssessmentSectionKey;
}

export const useSectionStatus = ({ assessment, currentSection }: UseSectionStatusProps) => {
  // Determine the visual status class for each section
  const getSectionStatusClass = (sectionKey: AssessmentSectionKey) => {
    if (currentSection === sectionKey) return "border-primary";
    
    // Check if all questions in this section are answered
    const sectionQuestions = assessment.sections[sectionKey].questions;
    const allAnswered = sectionQuestions.every(q => assessment.answers[q.id] !== undefined);
    
    if (allAnswered) return "border-green-500";
    return "border-muted";
  };

  return { getSectionStatusClass };
};
