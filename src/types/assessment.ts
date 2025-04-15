
export type AssessmentQuestion = {
  id: number;
  text: string;
  section: AssessmentSectionKey;
};

export type AssessmentSectionKey = 
  | 'mood'
  | 'anxiety'
  | 'selfEsteem'
  | 'relationships'
  | 'anger'
  | 'trauma'
  | 'functioning';

export interface AssessmentSection {
  key: AssessmentSectionKey;
  title: string;
  description: string;
  iconClass: string;
  questions: AssessmentQuestion[];
  maxScore: number;
  severityLevels: {
    [key: string]: {
      min: number;
      max: number;
      label: string;
      description: string;
    };
  };
}

export interface Assessment {
  sections: {
    [key in AssessmentSectionKey]: AssessmentSection;
  };
  answers: {
    [key: number]: number;
  };
}

export interface AssessmentResult {
  sectionScores: {
    [key in AssessmentSectionKey]: {
      score: number;
      maxScore: number;
      percentage: number;
      severityLabel: string;
      severityDescription: string;
    };
  };
  totalScore: number;
  totalMaxScore: number;
  totalPercentage: number;
}
