
import React from 'react';
import { AssessmentSectionKey, Assessment } from '@/types/assessment';
import { useSectionStatus } from '@/hooks/useSectionStatus';

interface SectionTabsProps {
  sectionKeys: AssessmentSectionKey[];
  assessmentSections: any;
  currentSection: AssessmentSectionKey;
  assessment: Assessment;
  onSectionClick?: (section: AssessmentSectionKey) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({
  sectionKeys,
  assessmentSections,
  currentSection,
  assessment,
  onSectionClick
}) => {
  const { getSectionStatusClass } = useSectionStatus({ assessment, currentSection });
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sectionKeys.map((section, index) => (
        <div
          key={section}
          className={`px-3 py-1 text-sm rounded-full border-2 ${getSectionStatusClass(section)} ${onSectionClick ? 'cursor-pointer' : ''}`}
          onClick={() => onSectionClick && onSectionClick(section)}
        >
          {index + 1}. {assessmentSections[section].title.split('&')[0].trim()}
        </div>
      ))}
    </div>
  );
};

export default SectionTabs;
